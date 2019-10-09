import test from 'ava';
import ko from 'knockout';

import { Person } from '../models/Person';

// /////////////////////////////////////////////////////////////////////////////

test.afterEach(() => {
  // just to make sure
  // NOTE: tests must be run serially in order to ensure that this runs after each
  // test since even though these tests are run concurrently, we don't get a new knockout
  // for each test.
  ko.options.deferUpdates = false;
});

// /////////////////////////////////////////////////////////////////////////////

test.serial('testSubscription', t => {
  const person = new Person('jeff', 60);

  person.age(35);

  t.is(person.subscribedAge, 35, 'subscriptions are immediately executed');
});

test.serial.cb('testSubscriptionDeferred', t => {
  ko.options.deferUpdates = true;
  const person = new Person('jeff', 60);

  person.age(35);

  t.is(person.subscribedAge, undefined, 'subscriptions are not yet executed');

  setTimeout(() => {
    t.is(person.subscribedAge, 35, 'subscriptions are now executed');
    t.end();
  }, 0);
});

test.serial('testComputedClassProperty', t => {
  const person = new Person('jeff', 60);

  person.age(40);

  t.is(person.computed(), 45, 'computed values are available instantly');
  t.is(person.pureComputed(), 47, 'pureComputed values are available instantly');
});

test.serial('testComputedClassPropertyDeferred', t => {
  ko.options.deferUpdates = true;
  const person = new Person('jeff', 60);

  person.age(40);

  t.is(person.computed(), 45, 'computed values are available instantly');
  t.is(person.pureComputed(), 47, 'pureComputed values are available instantly');
});

test.serial.cb('testOverrideClassProperty', t => {
  const person = new Person('jeff', 60);

  person.age = ko.observable(20);

  t.is(person.pureComputed(), 27, 'pureComputed values are available instantly');

  // NOTE: THIS IS VERY STRANGE. No defer, computed property not available yet,
  // pureComputed is though.
  t.is(person.computed(), 65, 'computed values are not available instantly updated');

  setTimeout(() => {
    t.is(person.subscribedAge, undefined, 'subscription is never executed');
    t.end();
  }, 1000);
});

test.serial.cb('testOverrideClassPropertyDeferred', t => {
  ko.options.deferUpdates = true;
  const person = new Person('jeff', 60);

  person.age = ko.observable(20);

  t.is(person.pureComputed(), 27, 'pureComputed values are available instantly');

  // NOTE: THIS IS VERY STRANGE. Now we are deferring, the computed property is updated
  // instantly and is using the correct value.
  t.is(person.computed(), 25, 'computed values are available instantly updated');

  setTimeout(() => {
    t.is(person.subscribedAge, undefined, 'subscription is never executed');
    t.end();
  }, 1000);
});