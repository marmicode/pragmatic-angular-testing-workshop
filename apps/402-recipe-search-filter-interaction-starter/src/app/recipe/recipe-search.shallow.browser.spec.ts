import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
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
    const { getRecipeNames } = await mountRecipeSearch();

    await expect.poll(() => getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  async function mountRecipeSearch() {
    TestBed.configureTestingModule({
      providers: [provideRecipeRepositoryFake()],
    });

    TestBed.overrideComponent(RecipeSearch, {
      set: {
        imports: [AsyncPipe],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    TestBed.createComponent(RecipeSearch);

    return {
      getRecipeNames() {
        return page
          .getByTestId('recipe-preview')
          .elements()
          .map((el) => new DebugElement(el).properties.recipe.name);
      },
    };
  }
});
