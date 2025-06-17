# Knockout experiments

## Up and running

```sh
node --version # should be 21+

# Ensure corepack is enabled
corepack enable

# Install dependencies
yarn

# Run the tests
yarn test
```

## Test driven experimentation

The idea of this codebase is to provide a playground to
experiment with knockout and observe and prove it's behaviours.

### Ava

The ava test runner is not so well known, but it's great and
I recommend reading the docs to understand how to use it
correctly.

https://github.com/avajs/ava/blob/main/docs/01-writing-tests.md

You will notice that tests are run serially. This is for a reason,
because knockout is a static instance, so switching on async behaviour
in one test will affect other tests if they are run in parallel.

```js
// Without deferUpdates the code can expect to run
// synchronously.
test.serial('my test description', () => {...});

// With deferUpdates, set values are not flushed
// until the call stack has been finished, so you
// need to either await or add a setTimeout to
// defer the following code to run AFTER ko has
// flushed the updated values to the state.
// I recommend using `await` for simplicity.
test.serial('my test description', async () => {
    ko.options.deferUpdates = true;

    // Add an await on the ko.obversable setter to
    // ensure that the code after it is run on the
    // next call stack.
    await model.propertySetter('someValue');
});
```