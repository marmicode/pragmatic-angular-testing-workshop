---
sidebar_label: 3 - Vitest Browser Mode
---

# Recipe Search Integration with Vitest Browser Mode

## Setup

```sh
pnpm cook start 302-recipe-search-integration-browser-mode
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

#### 2. Open `src/app/recipe/recipe-search.browser.spec.ts`.

#### 3. Configure `TestBed` with HTTP client to reach the real server:

```ts
TestBed.configureTestingModule({ providers: [provideHttpClient()] });
```

#### 4. Query DOM and check names are displayed.

Cf. [How to query the DOM and make assertions with Vitest Browser Mode](#-tip-how-to-query-the-dom-and-make-assertions-with-vitest-browser-mode)

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

#### 2. Open `src/app/recipe/recipe-search.browser.spec.ts`.

#### 3. Configure the `TestBed` with a test double:

```ts
TestBed.configureTestingModule({ providers: [provideRecipeRepositoryFake()] });

const fake = TestBed.inject(RecipeRepositoryFake);

/* Configure the fake. */
fake...
```

#### 4. Query DOM and check names are displayed.

Cf. [How to query the DOM and make assertions with Vitest Browser Mode](#-tip-how-to-query-the-dom-and-make-assertions-with-vitest-browser-mode)

#### 5. [optional] Checkout the implementation if you've opted for TDD option:

```sh
pnpm cook checkout-impl
```

#### 6. ✅ Make sure tests are passing.

## 📖 Appendices

### 🎁 Tip: How to query the DOM and make assertions with Vitest Browser Mode

- ⚡️ Querying with Vitest Browser Mode: https://vitest.dev/guide/browser/locators.html
- ⚡️ Asserting with Vitest Browser Mode: https://vitest.dev/guide/browser/assertion-api.html
