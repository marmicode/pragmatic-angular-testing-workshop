import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { page } from 'vitest/browser';
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
    const { getRecipeNameEls } = await mountRecipeSearch();

    await expect.element(getRecipeNameEls()).toHaveLength(2);
    await expect.element(getRecipeNameEls().nth(0)).toHaveTextContent('Burger');
    await expect.element(getRecipeNameEls().nth(1)).toHaveTextContent('Salad');
  });

  it('filters recipes by keywords', async () => {
    const { getRecipeNameEls, updateFilter } = await mountRecipeSearch();

    await updateFilter({
      keywords: 'Burg',
    });

    await expect.element(getRecipeNameEls()).toHaveTextContent('Burger');
  });

  it('adds recipe to meal planner', async () => {
    const { getFirstAddButton, getMealPlannerRecipeNames } =
      await mountRecipeSearch();

    await getFirstAddButton().click();

    await expect.poll(() => getMealPlannerRecipeNames()).toEqual(['Burger']);
  });

  it("should disable add button if can't add", async () => {
    const { getFirstAddButton } =
      await mountRecipeSearchWithBurgerInMealPlanner();

    /* Can't add burger because there is already a burger with the same id. */
    await expect.element(getFirstAddButton()).toBeDisabled();
  });

  async function mountRecipeSearchWithBurgerInMealPlanner() {
    const { mealPlanner, ...utils } = await mountRecipeSearch();

    mealPlanner.addRecipe(recipeMother.withBasicInfo('Burger').build());

    return utils;
  }

  async function mountRecipeSearch() {
    TestBed.configureTestingModule({
      providers: [provideMealRepositoryFake(), provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    TestBed.createComponent(RecipeSearch);

    const mealPlanner = TestBed.inject(MealPlanner);

    return {
      mealPlanner,
      async getMealPlannerRecipeNames() {
        const recipes = await firstValueFrom(mealPlanner.recipes$);
        return recipes.map((recipe) => recipe.name);
      },
      getFirstAddButton() {
        return page.getByRole('button', { name: 'ADD' }).first();
      },
      getRecipeNameEls() {
        return page.getByRole('heading');
      },
      async updateFilter({ keywords }: { keywords: string }) {
        await page.getByLabelText('Keywords').fill(keywords);
      },
    };
  }
});
