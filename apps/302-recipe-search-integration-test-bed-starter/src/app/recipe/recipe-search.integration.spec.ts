import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it.todo('🚧 searches recipes without filtering');

  async function mountRecipeSearch() {
    const fixture = TestBed.createComponent(RecipeSearch);
    await fixture.whenStable();

    return {};
  }
});
