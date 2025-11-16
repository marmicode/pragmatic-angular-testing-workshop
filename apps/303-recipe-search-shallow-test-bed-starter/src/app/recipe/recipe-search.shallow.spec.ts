import { TestBed } from '@angular/core/testing';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it.todo('🚧 searches recipes without filtering', async () => {
    throw new Error('🚧 Work in progress!');
  });

  async function mountRecipeSearch() {
    TestBed.configureTestingModule({
      providers: [provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    const fixture = TestBed.createComponent(RecipeSearch);
    await fixture.whenStable();

    return {
      getRecipeNames() {
        throw new Error('😱 Not implemented yet!');
      },
    };
  }
});
