import { expect, test } from '@testronaut/angular';
import { recipeMother } from '../testing/recipe.mother';
import { RecipePreview } from './recipe-preview.ng';

test.describe('RecipePreview', () => {
  test('shows recipe name', async ({ page, mount }) => {
    await mount(RecipePreview, {
      inputs: { recipe: recipeMother.withBasicInfo('Burger').build() },
    });

    await expect(page.getByRole('heading')).toHaveText('Burger');
  });
});
