import { expect, test } from '@testronaut/angular';
import { RecipeFilter } from './recipe-filter.ng';

test.describe('RecipeFilter', () => {
  test('triggers filterChange', async ({ page, mount }) => {
    const { outputs } = await mount(RecipeFilter);

    await page.getByLabel('Keywords').fill('Burger');

    expect
      .poll(() => outputs.filterChange.calls)
      .toMatchObject([{ keywords: 'Burger' }]);
  });
});
