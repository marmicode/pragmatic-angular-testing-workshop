import { render } from '@testing-library/angular';
import { page } from 'vitest/browser';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it.todo('searches recipes without filtering', async () => {
    const { getRecipeNameEls } = await mountRecipeSearch();

    throw new Error('🚧 Work in progress!');
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
        throw new Error('🚧 Work in progress!');
      },
    };
  }
});
