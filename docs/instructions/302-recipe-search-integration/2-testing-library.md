---
sidebar_label: 2 - Testing Library
---

# Recipe Search Integration with Testing Library

## Setup

```sh
pnpm cook start 302-recipe-search-integration-testing-library
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal #1: Test `RecipeSearch` with Real Server

`RecipeSearch` component should fetch recipes using `RecipeRepository` on startup and display them using `RecipePreview` component.

**Implement tests** for `RecipeSearch` and make sure that:

- recipe names are displayed:

```html
...
<h2>Burger</h2>
...
```

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-search.integration.spec.ts`.

#### 3. Configure Testing Library with HTTP client to reach the real server:

```ts
await render(RecipeSearch, { providers: [provideHttpClient()] });
```

#### 4. Query DOM and check names are displayed. _Cf. [Testing Library queries docs](#-testing-library-queries-docs--or-how-to-choose-the-right-query)_

#### 5. [optional] Checkout the implementation if you've opted for TDD option:

```sh
pnpm cook checkout-impl
```

#### 6. ✅ Make sure tests are passing.

## 🎯 Goal #2: Test `RecipeSearch` with a Test Double

Same goal as [Goal #1](#-goal-1-test-recipesearch-with-real-server)

But this time, we don't want to make real HTTP calls to our remote service.
Therefore, we will replace the `RecipeRepository` service with a test double.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-search.integration.spec.ts`.

#### 3. Configure the `TestBed` with a test double:

```ts
await render(RecipeSearch, {
  providers: [provideRecipeRepositoryFake()],
  configureTestbed(testBed) {
    ...
  }
});
```

Cf. [How to configure `TestBed` before mounting the component with Testing Library](#-tip-how-to-configure-testbed-before-mounting-the-component-with-testing-library)

#### 4. Query DOM and check names are displayed. _Cf. [query DOM with `fixture.debugElement`](#-tip-query-dom-with-fixturedebugelement)_

#### 5. [optional] Checkout the implementation if you've opted for TDD option:

```sh
pnpm cook checkout-impl
```

#### 6. ✅ Make sure tests are passing.

## 📖 Appendices

### 🔗 `@testing-library/angular`'s `render` docs

[https://testing-library.com/docs/angular-testing-library/api#render](https://testing-library.com/docs/angular-testing-library/api#render)

### 🔗 Testing Library Queries docs — or how to choose the right query

[https://testing-library.com/docs/queries/about](https://testing-library.com/docs/queries/about)

### 🎁 Tip: How to configure `TestBed` before mounting the component with Testing Library

```ts
render(MyThing, {
  configureTestBed(testBed) {
    testBed.inject(MyFake).configure(someData);
  },
});
```
