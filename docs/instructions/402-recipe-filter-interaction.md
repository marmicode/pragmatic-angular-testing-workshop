---
sidebar_label: 402 - Recipe Filter Interaction
---

# Recipe Filter Interaction

## Setup

```sh
pnpm cook start 402-recipe-search-filter-interaction
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Test `RecipeSearch` interaction with `RecipeFilter`

`RecipeFilter`'s `filterChange` output should trigger a new search with the given filter and refresh results.

We will test the contract using a shallow test.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-search.shallow.spec.ts`.

#### 3. Add a new test: `it('searches recipes using given filter', ...)`.

#### 4. Trigger `filterChange` on `RecipeFilter`. (Cf. [trigger events using `debugElement.triggerEventHandler`](#-tip-trigger-events-using-debugelementtriggereventhandler))

#### 5. Query DOM and check child recipe preview components properties. (Cf. [query DOM with `fixture.debugElement`](./302-recipe-search-integration.md#-tip-query-dom-with-fixturedebugelement)] & [access element properties](./303-recipe-search-shallow.md#-tip-access-element-properties))

#### 6. [optional] Checkout the implementation if you've opted for TDD option:.

```sh
pnpm cook checkout-impl
```

## 📖 Appendices

### 🎁 Tip: Trigger events using `DebugElement#triggerEventHandler`

You can trigger a custom event as an output using `DebugElement#triggerEventHandler` if a component was "shallowed".

```ts
const debugElement = fixture.query(...);
debugElement.triggerEventHandler('myOutput', myValue);
```
