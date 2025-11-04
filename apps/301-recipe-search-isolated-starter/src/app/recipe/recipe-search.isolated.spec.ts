import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { recipeMother } from '../testing/recipe.mother';
import {
  RecipeRepositoryFake,
  provideRecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it.todo('🚧 searches recipes without filtering');

  function createComponent() {
    TestBed.configureTestingModule({ providers: [RecipeSearch] });

    const component = TestBed.inject(RecipeSearch);

    component.ngOnInit();

    return { component };
  }
});
