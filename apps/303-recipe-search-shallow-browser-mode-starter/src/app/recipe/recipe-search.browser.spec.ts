import { TestBed } from '@angular/core/testing';
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
    TestBed.configureTestingModule({
      providers: [provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    TestBed.createComponent(RecipeSearch);

    return {
      getRecipeNameEls() {
        return page.getByRole('heading');
      },
    };
  }
});
