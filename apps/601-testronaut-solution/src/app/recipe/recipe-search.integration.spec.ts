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
  it('searches recipes without filtering', async () => {
    const { getRecipeNameEls } = await renderComponent();

    expect(getRecipeNameEls()).toHaveLength(2);
    expect(getRecipeNameEls()[0]).toHaveTextContent('Burger');
    expect(getRecipeNameEls()[1]).toHaveTextContent('Salad');
  });

  it('filters filter recipes by keywords', async () => {
    const { getRecipeNameEls, updateFilter } = await renderComponent();

    await updateFilter({
      keywords: 'Burg',
    });

    expect(getRecipeNameEls()).toHaveLength(1);
    expect(getRecipeNameEls()[0]).toHaveTextContent('Burger');
  });

  it('adds recipe to meal planner', async () => {
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
      getRecipeNameEls() {
        return screen.queryAllByRole('heading');
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
