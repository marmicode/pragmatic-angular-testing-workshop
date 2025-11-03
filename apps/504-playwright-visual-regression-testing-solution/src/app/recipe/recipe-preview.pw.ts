import { expect, test } from '@testronaut/angular';
import { recipeMother } from '../testing/recipe.mother';
import { RecipePreview } from './recipe-preview.ng';

test.describe('RecipePreview', () => {
  test('shows recipe name', async ({ page, mount }) => {
    const recipe = recipeMother.withBasicInfo('Burger').build();

    /* Let's listen to the picture loading. */
    const pictureFinishedPromise = page.waitForResponse(recipe.pictureUri);

    await mount(RecipePreview, {
      inputs: { recipe: recipeMother.withBasicInfo('Burger').build() },
    });

    /* Make sure the picture is loaded before taking screenshot. */
    await pictureFinishedPromise;

    await expect.soft(page.getByRole('heading')).toHaveText('Burger');
    await expect.soft(page).toHaveScreenshot();
  });
});
