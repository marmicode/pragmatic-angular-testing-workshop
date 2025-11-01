import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = await renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  it('should filter recipes by keywords', async () => {
    const { getRecipeNames, updateFilter } = await renderComponent();

    await updateFilter({
      keywords: 'Burg',
    });

    expect(getRecipeNames()).toEqual(['Burger']);
  });

  async function renderComponent() {
    const { fixture } = await render(RecipeSearch, {
      providers: [provideRecipeRepositoryFake()],
      configureTestBed(testBed) {
        testBed
          .inject(RecipeRepositoryFake)
          .setRecipes([
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
          ]);
      },
    });

    await fixture.whenStable();

    return {
      getRecipeNames() {
        return screen.queryAllByRole('heading').map((el) => el.textContent);
      },
      async updateFilter({ keywords }: { keywords: string }) {
        await userEvent.type(screen.getByLabelText('Keywords'), keywords);
        await fixture.whenStable();
      },
    };
  }
});
