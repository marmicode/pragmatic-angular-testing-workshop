import { render } from '@testing-library/angular';
import { page } from 'vitest/browser';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { getRecipeNameEls } = await mountRecipeSearch();

    await expect.element(getRecipeNameEls()).toHaveLength(2);
    await expect.element(getRecipeNameEls().nth(0)).toHaveTextContent('Burger');
    await expect.element(getRecipeNameEls().nth(1)).toHaveTextContent('Salad');
  });

  async function mountRecipeSearch() {
    await render(RecipeSearch, {
      providers: [provideRecipeRepositoryFake()],
      configureTestBed(testBed) {
        testBed
          .inject(RecipeRepositoryFake)
          .setRecipes([
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
          ]);
      },
    });

    return {
      getRecipeNameEls() {
        return page.getByRole('heading');
      },
    };
  }
});
