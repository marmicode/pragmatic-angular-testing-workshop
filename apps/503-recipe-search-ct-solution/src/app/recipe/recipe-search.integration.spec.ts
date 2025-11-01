import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { firstValueFrom } from 'rxjs';
import { MealPlanner } from '../meal-planner/meal-planner';
import { provideMealRepositoryFake } from '../meal-planner/meal-repository.fake';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = await renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  it('should filter recipes by keywords', async () => {
    const { getRecipeNames, updateFilter } = await renderComponent();

    await updateFilter({
      keywords: 'Burg',
    });

    expect(getRecipeNames()).toEqual(['Burger']);
  });

  it('should add recipe to meal planner', async () => {
    const { getFirstAddButton, getMealPlannerRecipeNames } =
      await renderComponent();

    await userEvent.click(getFirstAddButton());

    expect(await getMealPlannerRecipeNames()).toEqual(['Burger']);
  });

  it("should disable add button if can't add", async () => {
    const { getFirstAddButton } =
      await renderComponentWithBurgerInMealPlanner();

    /* Can't add burger because there is already a burger with the same id. */
    expect(getFirstAddButton()).toBeDisabled();
  });

  async function renderComponentWithBurgerInMealPlanner() {
    const { mealPlanner, whenStable, ...utils } = await renderComponent();

    mealPlanner.addRecipe(recipeMother.withBasicInfo('Burger').build());

    await whenStable();

    return utils;
  }

  async function renderComponent() {
    const { fixture } = await render(RecipeSearch, {
      providers: [provideMealRepositoryFake(), provideRecipeRepositoryFake()],
      configureTestBed(testBed) {
        testBed
          .inject(RecipeRepositoryFake)
          .setRecipes([
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
          ]);
      },
    });

    const mealPlanner = TestBed.inject(MealPlanner);

    await fixture.whenStable();

    return {
      mealPlanner,
      async getMealPlannerRecipeNames() {
        const recipes = await firstValueFrom(mealPlanner.recipes$);
        return recipes.map((recipe) => recipe.name);
      },
      getFirstAddButton() {
        return screen.getAllByRole<HTMLButtonElement>('button', {
          name: 'ADD',
        })[0];
      },
      getRecipeNames() {
        return screen.queryAllByRole('heading').map((el) => el.textContent);
      },
      async updateFilter({ keywords }: { keywords: string }) {
        await userEvent.type(screen.getByLabelText('Keywords'), keywords);
        await fixture.whenStable();
      },
      async whenStable() {
        return fixture.whenStable();
      },
    };
  }
});
