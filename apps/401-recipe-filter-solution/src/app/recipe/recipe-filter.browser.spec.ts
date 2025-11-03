import { outputBinding } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';
import { RecipeFilterCriteria } from './recipe-filter-criteria';
import { RecipeFilter } from './recipe-filter.ng';

describe(RecipeFilter.name, () => {
  it('triggers filterChange output', async () => {
    const { filterChangeSpy, setInputValue } = await mountRecipeFilter();

    await setInputValue('Keywords', 'Cauliflower');
    await setInputValue('Max Ingredients', '3');
    await setInputValue('Max Steps', '10');

    expect(filterChangeSpy).toHaveBeenLastCalledWith({
      keywords: 'Cauliflower',
      maxIngredientCount: 3,
      maxStepCount: 10,
    } satisfies RecipeFilterCriteria);
  });

  async function mountRecipeFilter() {
    const filterChangeSpy = vi.fn();

    TestBed.createComponent(RecipeFilter, {
      bindings: [outputBinding('filterChange', filterChangeSpy)],
    });

    return {
      filterChangeSpy,
      async setInputValue(
        label: 'Keywords' | 'Max Ingredients' | 'Max Steps',
        value: string,
      ) {
        await page.getByLabelText(label).fill(value);
      },
    };
  }
});
