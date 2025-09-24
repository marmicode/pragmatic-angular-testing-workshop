# Setup

```sh
git switch testing-501-recipe-preview-ct-starter
```

# 🎯 Goal: Test `RecipePreviewComponent` using Playwright Component Testing

Thanks to [Playwright Component Testing](https://playwright.dev/docs/test-components), we can isolate a component or a block and test it in Playwright.

Let's test that `RecipePreviewComponent` is showing the recipe name properly.

## 📝 Steps

1. Run Playwright component tests:

```sh
pnpm nx test-ui --ui
```

2. Open [`recipe-preview.component.pw.ts`](../apps/whiskmate/src/app/recipe/recipe-preview.component.pw.ts).

3. `RecipePreviewComponent` needs a `recipe` input. You can create a recipe using the `recipeMother` object mother and passing along to the component using the `componentProperties` option. e.g.:

```ts
const component = mount(GreetingsComponent, {
  inputs: {
    name: 'Foo',
  },
});
```

4. Check that the recipe name is shown.

Playwright provides built-in locators similar to Testing Library. Cf. [https://playwright.dev/docs/locators](https://playwright.dev/docs/locators)

# Appendices

## Playwright Assertions

- [https://playwright.dev/docs/test-assertions](https://playwright.dev/docs/test-assertions)
