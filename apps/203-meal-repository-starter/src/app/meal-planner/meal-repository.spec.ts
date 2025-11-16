import { MealRepository } from './meal-repository';
import { TestBed } from '@angular/core/testing';
import { recipeMother } from '../testing/recipe.mother';
import { provideLocalStorageFake } from '../shared/local-storage.fake';

describe(MealRepository.name, () => {
  it.todo('🚧 adds recipes', async () => {
    throw new Error('🚧 Work in progress!');
  });

  it.todo('🚧 returns empty array when storage is empty', async () => {
    throw new Error('🚧 Work in progress!');
  });

  it.todo('🚧 returns empty array when storage value is invalid', async () => {
    throw new Error('🚧 Work in progress!');
  });

  function createMealRepository() {
    const { getMealRepo, ...utils } = setUpMealRepository();
    return {
      ...utils,
      mealRepo: getMealRepo(),
    };
  }

  function setUpMealRepository() {
    TestBed.configureTestingModule({
      providers: [provideLocalStorageFake()],
    });

    const burger = recipeMother.withBasicInfo('Burger').build();
    const salad = recipeMother.withBasicInfo('Salad').build();

    return {
      burger,
      salad,
      getMealRepo() {
        return TestBed.inject(MealRepository);
      },
      setStorageValue(value: string) {
        // @todo
      },
    };
  }
});
