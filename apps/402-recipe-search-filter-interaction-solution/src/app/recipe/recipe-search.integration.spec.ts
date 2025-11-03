import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { getRecipeNameEls } = await mountRecipeSearch();

    expect(getRecipeNameEls()).toHaveLength(2);
    expect(getRecipeNameEls()[0]).toHaveTextContent('Burger');
    expect(getRecipeNameEls()[1]).toHaveTextContent('Salad');
  });

  it('filters recipes by keywords', async () => {
    const { getRecipeNameEls, updateFilter } = await mountRecipeSearch();

    await updateFilter({
      keywords: 'Burg',
    });

    expect(getRecipeNameEls()).toHaveLength(1);
    expect(getRecipeNameEls()[0]).toHaveTextContent('Burger');
  });

  async function mountRecipeSearch() {
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
      getRecipeNameEls() {
        return screen.queryAllByRole('heading');
      },
      async updateFilter({ keywords }: { keywords: string }) {
        await userEvent.type(screen.getByLabelText('Keywords'), keywords);
        await fixture.whenStable();
      },
    };
  }
});
