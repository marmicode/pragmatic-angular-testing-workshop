import { TestBed } from '@angular/core/testing';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { getRecipeNames } = createComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  it.todo('🚧 filters recipes by keywords');

  function createComponent() {
    TestBed.configureTestingModule({
      providers: [RecipeSearch, provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    const component = TestBed.inject(RecipeSearch);

    return {
      getRecipeNames() {
        return component.recipes()?.map((recipe) => recipe.name);
      },
      async updateFilter({ keywords }: { keywords: string }) {
        // TODO: implement this
        throw new Error('🚧 Work in progress!');
      },
    };
  }
});
