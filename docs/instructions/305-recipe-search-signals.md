---
sidebar_label: 305. Recipe Search Signals
---

# Recipe Search Signals

## Setup

```sh
pnpm cook start 305-recipe-search-signals
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Use signals and fix tests

Let's go reactive with signals and see what happens.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Checkout new `RecipeSearch` implementation.

```sh
pnpm cook checkout-impl
```

> This will replace the RxJS reactive approach:
>
> ```ts
> @Component({
>   template: `@for (recipe of recipes$ | async; track recipe.id) {
>     ...
>   }`,
> })
> class RecipeSearch {
>   recipes$ = inject(RecipeRepository).search();
> }
> ```
>
> with a signal-based reactive approach:
>
> ```ts
> @Component({
>   template: `@for (recipe of recipes(); track recipe.id) {
>     ...
>   }`,
> })
> class RecipeSearch {
>   recipes$ = this._repo.search();
> }
> ```

#### 3. 👀 See which tests broke.

#### 4. Fix tests.
