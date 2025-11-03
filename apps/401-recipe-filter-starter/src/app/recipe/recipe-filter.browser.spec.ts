import { outputBinding } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import userEvent from '@testing-library/user-event';
import { page } from 'vitest/browser';
import { RecipeFilter } from './recipe-filter.ng';

describe(RecipeFilter.name, () => {
  it.todo('🚧 triggers filterChange output');

  async function mountRecipeFilter() {
    const filterChangeSpy = vi.fn();

    TestBed.createComponent(RecipeFilter, {
      bindings: [
        // TODO: add output bindings here
      ],
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
