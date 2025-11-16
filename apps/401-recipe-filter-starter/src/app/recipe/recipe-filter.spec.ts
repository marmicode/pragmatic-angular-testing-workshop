import { outputBinding } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { createSpy } from '@whiskmate/testing/create-spy';
import { RecipeFilter } from './recipe-filter.ng';

describe(RecipeFilter.name, () => {
  it.todo('🚧 triggers filterChange output', async () => {
    throw new Error('🚧 Work in progress!');
  });

  async function mountRecipeFilter() {
    const filterChangeSpy = createSpy();

    const { fixture } = await render(RecipeFilter, {
      bindings: [
        // TODO: add output bindings here
      ],
    });
    await fixture.whenStable();

    return {
      filterChangeSpy,
      async setInputValue(
        label: 'Keywords' | 'Max Ingredients' | 'Max Steps',
        value: string,
      ) {
        const inputEl = screen.getByLabelText(label);
        await userEvent.type(inputEl, value);
      },
    };
  }
});
