import { AsyncPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { firstValueFrom } from 'rxjs';
import { MealPlanner } from '../meal-planner/meal-planner';
import { provideMealRepositoryFake } from '../meal-planner/meal-repository.fake';
import { RecipeAddButton } from '../meal-planner/recipe-add-button.ng';
import { recipeMother } from '../testing/recipe.mother';
import { RecipeFilterCriteria } from './recipe-filter-criteria';
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

  it('searches recipes using given filter', async () => {
    const { getRecipeNames, updateFilter } = await mountRecipeSearch();

    await updateFilter({
      keywords: 'Burg',
      maxIngredientCount: 3,
    });

    expect(getRecipeNames()).toEqual(['Burger']);
  });

  it('adds recipe to meal planner', async () => {
    const { getFirstAddButton, getMealPlannerRecipeNames } =
      await mountRecipeSearch();

    await userEvent.click(getFirstAddButton());

    expect(await getMealPlannerRecipeNames()).toEqual(['Burger']);
  });

  it("should disable add button if can't add", async () => {
    const { getFirstAddButton } =
      await mountRecipeSearchWithBurgerInMealPlanner();

    /* Can't add burger because there is already a burger with the same id. */
    expect(getFirstAddButton()).toBeDisabled();
  });

  async function mountRecipeSearchWithBurgerInMealPlanner() {
    const { mealPlanner, whenStable, ...utils } = await mountRecipeSearch();

    mealPlanner.addRecipe(recipeMother.withBasicInfo('Burger').build());

    await whenStable();

    return { ...utils };
  }

  async function mountRecipeSearch() {
    const { debugElement, fixture } = await render(RecipeSearch, {
      providers: [provideMealRepositoryFake(), provideRecipeRepositoryFake()],
      configureTestBed(testBed) {
        testBed.overrideComponent(RecipeSearch, {
          set: {
            imports: [AsyncPipe, RecipeAddButton],
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

    const mealPlanner = TestBed.inject(MealPlanner);

    return {
      mealPlanner,
      getFirstAddButton() {
        return screen.getAllByRole<HTMLButtonElement>('button', {
          name: 'ADD',
        })[0];
      },
      async getMealPlannerRecipeNames() {
        const recipes = await firstValueFrom(mealPlanner.recipes$);
        return recipes.map((recipe) => recipe.name);
      },
      getRecipeNames() {
        return debugElement
          .queryAll(By.css('wm-recipe-preview'))
          .map((previewEl) => previewEl.properties.recipe.name);
      },
      async updateFilter(filter: RecipeFilterCriteria) {
        debugElement
          .query(By.css('wm-recipe-filter'))
          .triggerEventHandler('filterChange', filter);
        await fixture.whenStable();
      },
      async whenStable() {
        return fixture.whenStable();
      },
    };
  }
});
