---
sidebar_label: 301 - Recipe Search Isolated
---

# Recipe Search Isolated

## Setup

```sh
pnpm cook start 301-recipe-search-isolated
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal #1: Test `RecipeSearch` with Real Server

`RecipeSearch` component should fetch recipes using `RecipeRepository` on startup.

**Implement tests** for `RecipeSearch` and make sure that:

- `recipes` property is set with the recipes returned by `RecipeRepository`.

```ts
export class RecipeSearch {
  recipes: Recipe[];
}
```

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-search.isolated.spec.ts`.

#### 3. Configure the `TestBed` with real server:

```ts
TestBed.configureTestingModule({ providers: [provideHttpClient()] });
```

#### 4. Check `component.recipes` property.

#### 5. [optional] Checkout the implementation if you've opted for TDD option.

```sh
pnpm cook checkout-impl
```

#### 6. ✅ Make sure tests are passing.

## 🎯 Goal #2: Test `RecipeSearch` with a Test Double

Same goal as [Goal #1](#-goal-1-test-recipesearch-with-real-server)

We don't want to make real HTTP calls to our remote service.
Therefore, we will replace the `RecipeRepository` service with a test double.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-search.isolated.spec.ts`.

#### 3. Configure the `TestBed` with a test double:

```ts
TestBed.configureTestingModule({ providers: [provideRecipeRepositoryFake()] });
const fake = TestBed.inject(RecipeRepositoryFake);

/* Configure the fake. */
fake...
```

#### 4. Check `component.recipes` property.

#### 5. [optional] Checkout the implementation if you've opted for TDD option.

```sh
pnpm cook checkout-impl
```

#### 6. ✅ Make sure tests are passing.

## 📖 Appendices

### 🎁 Tip: polling until success with `expect.poll`

```ts
await expect.poll(() => getSomething()).toBe(42);
```
