import { render, screen } from '@testing-library/angular';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it.todo('🚧 searches recipes without filtering', async () => {
    const { getRecipeNameEls } = await mountRecipeSearch();

    throw new Error('🚧 Work in progress!');
  });

  async function mountRecipeSearch() {
    const { fixture } = await render(RecipeSearch);
    await fixture.whenStable();

    return {
      getRecipeNameEls() {
        throw new Error('🚧 Work in progress!');
      },
    };
  }
});
