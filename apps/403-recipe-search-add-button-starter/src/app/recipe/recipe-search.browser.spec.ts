import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';
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

  async function mountRecipeSearch() {
    TestBed.configureTestingModule({
      providers: [provideMealRepositoryFake(), provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    TestBed.createComponent(RecipeSearch);

    return {
      getRecipeNameEls() {
        return page.getByRole('heading');
      },
      async updateFilter({ keywords }: { keywords: string }) {
        await page.getByLabelText('Keywords').fill(keywords);
      },
    };
  }
});
