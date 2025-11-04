import { render, screen } from '@testing-library/angular';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { getRecipeNames } = await mountRecipeSearch();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  async function mountRecipeSearch() {
    const { fixture } = await render(RecipeSearch);
    await fixture.whenStable();

    return {
      getRecipeNames() {
        throw new Error('🚧 Work in progress!');
      },
    };
  }
});
