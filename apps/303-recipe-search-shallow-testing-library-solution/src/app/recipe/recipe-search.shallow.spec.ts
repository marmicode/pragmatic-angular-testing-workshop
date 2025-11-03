import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
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
    const { fixture } = await render(RecipeSearch, {
      providers: [provideRecipeRepositoryFake()],
      configureTestBed(testBed) {
        testBed.overrideComponent(RecipeSearch, {
          set: {
            imports: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
          },
        });

        testBed
          .inject(RecipeRepositoryFake)
          .setRecipes([
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
          ]);
      },
    });
    await fixture.whenStable();

    return {
      getRecipeNames() {
        return screen
          .getAllByTestId('recipe-preview')
          .map(
            (previewEl) => new DebugElement(previewEl).properties.recipe.name,
          );
      },
    };
  }
});
