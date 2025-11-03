import { render, screen } from '@testing-library/angular';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { getRecipeNameEls } = await renderComponent();

    expect(getRecipeNameEls()).toHaveLength(2);
    expect(getRecipeNameEls()[0]).toHaveTextContent('Burger');
    expect(getRecipeNameEls()[1]).toHaveTextContent('Salad');
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
      getRecipeNameEls() {
        return screen.queryAllByRole('heading');
      },
    };
  }
});
