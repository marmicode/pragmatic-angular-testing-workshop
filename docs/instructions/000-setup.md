# Setup

## 📦 Install stuff

### Install git `>= 2.23`

https://git-scm.com/downloads

:::warning
Make sure to pick a git version `>= 2.23`
:::

### Install NodeJS `>=22.12.0`

:::warning
Make sure to pick a NodeJS version `>=22.12.0`
:::

https://nodejs.org/en/download

### Install pnpm

https://pnpm.io/installation

```sh
corepack enable
```

or if you are using [Volta](https://volta.sh/)

```sh
volta install pnpm
```

## 📥 Retrieve source code and install dependencies

```sh
git clone https://github.com/marmicode/pragmatic-angular-testing-workshop.git

cd pragmatic-angular-testing-workshop

pnpm install
```

## ⌨️ Cook CLI

The `cook` CLI allows you to cook exercises:

- select an exercise from a list
- checkout the implementation when the test is ready _(♻️ TDD mode)_
- go to the solution

```sh
pnpm cook
```

## 🤖 Agentic Tutor

Whenever you need help, you can ask the agentic tutor for a hint.

You can use Claude or Cursor custom command: `/next-hint` or simply ask your favorite agent about "next hint".

Supported Agents:

- Claude
- Cursor
- Gemini

## 🎪 Downgrade to Jest

By default, this workspace uses [Vitest](https://vitest.dev/), but you can downgrade to [Jest](https://jestjs.io/) if you prefer:

```sh
# You will have to run this command each time you reset your local changes
pnpm downgrade-to-jest
```

_Note that the solutions are compatible with both test runners._
