import { TestBed } from '@angular/core/testing';
import { test as base, expect } from '@testronaut/angular';
import { firstValueFrom } from 'rxjs';
import { MealPlanner } from '../meal-planner/meal-planner';
import { recipeMother } from '../testing/recipe.mother';
import { Recipe } from './recipe';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

interface MountRecipeSearch {
  getMealPlannerRecipes: () => Promise<Recipe[]>;
}

const test = base.extend<{
  mountRecipeSearch: () => Promise<MountRecipeSearch>;
}>({
  mountRecipeSearch: async ({ mount, runInBrowser }, use) => {
    const _mountRecipeSearch = async () => {
      await runInBrowser('configure', () => {
        // TODO: configure the TestBed
        throw new Error('🚧 Work in progress!');
      });

      await mount(RecipeSearch);

      return {
        getMealPlannerRecipes: () =>
          runInBrowser('get MealPlanner recipes', async () => {
            const mealPlanner = TestBed.inject(MealPlanner);

            // TODO: get the recipes from the meal planner
            throw new Error('🚧 Work in progress!');
          }),
        // TODO: add other methods here
      };
    };

    await use(_mountRecipeSearch);
  },
});

test.describe('RecipeSearch', () => {
  test('should show recipes', async ({ page, mountRecipeSearch }) => {
    test.skip(true, '🚧 work in progress!');
  });

  test('should filter recipes', async ({ page, mountRecipeSearch }) => {
    test.skip(true, '🚧 work in progress!');
  });

  test('should add recipe to meal plan', async ({
    page,
    mountRecipeSearch,
  }) => {
    test.skip(true, '🚧 work in progress!');
  });

  test('should disable add button if recipe is already in meal plan', async ({
    page,
    mountRecipeSearch,
  }) => {
    test.skip(true, '🚧 work in progress!');
  });
});
