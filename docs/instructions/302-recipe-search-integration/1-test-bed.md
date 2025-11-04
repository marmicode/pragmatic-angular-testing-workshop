---
sidebar_label: 1 - TestBed
---

# Recipe Search Integration with `TestBed`

## Setup

```sh
pnpm cook start 302-recipe-search-integration-test-bed
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

#### 3. Configure the `TestBed` with HTTP client to reach the real server:

```ts
TestBed.configureTestingModule({ providers: [provideHttpClient()] });
```

#### 4. Query DOM and check names are displayed. _Cf. [query DOM with `fixture.debugElement`](#-tip-query-dom-with-fixturedebugelement)_

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
TestBed.configureTestingModule({ providers: [provideRecipeRepositoryFake()] });
const fake = TestBed.inject(RecipeRepositoryFake);

/* Configure the fake. */
fake...
```

#### 4. Query DOM and check names are displayed. _Cf. [query DOM with `fixture.debugElement`](#-tip-query-dom-with-fixturedebugelement)_

#### 5. [optional] Checkout the implementation if you've opted for TDD option:

```sh
pnpm cook checkout-impl
```

#### 6. ✅ Make sure tests are passing.

## 📖 Appendices

### 🎁 Tip: Query DOM with `fixture.debugElement`

You can query one or multiple elements using, respectively, `query` and `queryAll` methods.

```ts
const item = fixture.debugElement.query(By.css('.my-item')).nativeElement.textContent;

const items = fixture.debugElement.queryAll(By.css('.my-item')).map((el) => el.nativeElement.textContent);
```
