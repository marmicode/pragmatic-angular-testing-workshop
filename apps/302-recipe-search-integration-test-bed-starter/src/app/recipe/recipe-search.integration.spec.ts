import { TestBed } from '@angular/core/testing';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it.todo('🚧 searches recipes without filtering');

  async function mountRecipeSearch() {
    const fixture = TestBed.createComponent(RecipeSearch);
    await fixture.whenStable();

    return {};
  }
});
