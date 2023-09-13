# `@skip-router/core`

Provides core functionality for interacting with the Skip API.

## Installation

```bash
npm install @skip-router/core
```

## Running Unit Tests

To run tests simply run:

```bash
npm test
```

Watch mode:

```bash
npm run test -- --watch
```

Get Coverage:

```bash
npm run test -- --coverage
```

## Running e2e Tests

e2e tests depend on [Starship](https://starship.cosmology.tech/) to test interactions with various blockchains.

Setup and install Starship dependencies:

```bash
npm run e2e:setup
```

Start the Starship devnets:

```bash
npm run e2e:start
```

Run the e2e tests:

```bash
npm run e2e:test # or npm run e2e:test -- --watch
```

Stop the Starship devnets:

```bash
npm run e2e:stop
```
