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

test.serial('testObservableUpdate', t => {
  const person = new Person('jeff', 60);

  person.age(35);

  t.is(person.ageCopy, 35, 'subscriptions are immediately executed');
});

test.serial.cb('testObservableUpdateDeferred', t => {
  ko.options.deferUpdates = true;
  const person = new Person('jeff', 60);

  person.age(35);

  t.is(person.ageCopy, undefined, 'subscriptions should not be updated yet');

  setTimeout(() => {
    t.is(person.ageCopy, 35, 'subscriptions are deferred');
    t.end();
  }, 0);
});

// test.serial('testComputedClassProperty', t => {
//   const person = new Person('jeff', 60);

//   person.age(40);

//   t.is(person.agePlusFive(), 45, 'computed values are updated instantly');
// })

// test.serial('testPureComputedClassProperty', t => {
//   const person = new Person('jeff', 60);

//   person.age(20);

//   t.is(person.agePlusSeven(), 27, 'pureComputed values should be updated instantly');
// });

// test.serial.cb('testClassOverrideProperty', t => {
//   ko.options.deferUpdates = true;
//   const person = new Person('jeff', 60);

//   person.age = ko.observable(20);

//   t.is(person.agePlusSeven(), 27, 'pureComputed values should be updated instantly');
//   t.is(person.agePlusFive(), 65, 'computed values are not updated');

//   setTimeout(() => {
//     t.is(person.ageCopy, undefined, 'subscription should be ignored because we overwrote the value of age');
//     t.end();
//   }, 2000);
// });

// test.serial('testObservableArrayPush', t => {
//   const person = new Person('jeff', 60);

//   person.children.push('jeff junior');
// });

// test.serial('testObservableArrayReplaceInnerSimple', t => {
//   const person = new Person('jeff', 60);

//   const newChildren = person.children().concat('jeff junior');

//   person.children(newChildren);
// });

// test.serial('testObservableArrayReplaceInnerComplex', t => {
//   const person = new Person('jeff', 60);

//   const newChildren = person.children();

//   // this shows 3 changes, [deleted, added, added]
//   person.children([newChildren[1], 'jeff junior', newChildren[1]]);
// });