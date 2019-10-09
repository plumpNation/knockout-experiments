import faker from 'faker';
import ko from 'knockout';

import { Person } from './models/Person';

// /////////////////////////////////////////////////////////////////////////////

/**
 * Overall viewmodel for this screen, along with initial state
 */
class IndexViewModel {
  persons: KnockoutObservableArray<Person>;

  constructor() {

    const initialPersons: Person[] = Array.from(Array(10))
      .map(() => new Person(faker.name.firstName(), faker.random.number(60)));

    testObservableSubscriptionUpdate();
    testObservableSubscriptionUpdateDeferred();
    testComputedClassPropertiesAfterUpdate();
    testComputedClassPropertiesAfterUpdateDeferred();
    testComputedClassPropertiesAfterOverride();
    testComputedClassPropertiesAfterOverrideDeferred();
    testObservableArrayPush();
    testObservableArrayReplaceInnerSimple();
    testObservableArrayReplaceInnerComplex();

    // Editable data
    this.persons = ko.observableArray(initialPersons);
  }
}

// /////////////////////////////////////////////////////////////////////////////

const viewModel = new IndexViewModel();

ko.applyBindings(viewModel);

// /////////////////////////////////////////////////////////////////////////////

function testObservableSubscriptionUpdate() {
  const person = new Person('jeff', 60);

  person.age(35);

  console.assert(person.subscribedAge === 35, 'subscriptions be updated immediately');
}

function testObservableSubscriptionUpdateDeferred() {
  ko.options.deferUpdates = true;
  const person = new Person('jeff', 60);
  ko.options.deferUpdates = false;

  person.age(35);

  console.assert(person.subscribedAge === undefined, 'subscriptions should not be updated immediately');

  setTimeout(() => {
    console.assert(person.subscribedAge === 35, 'subscriptions are deferred');
  }, 0);
}

function testComputedClassPropertiesAfterUpdate() {
  const person = new Person('jeff', 60);

  // here is the udpate
  person.age(40);

  console.assert(person.computed() === 45, 'computed values are updated instantly');
  console.assert(person.pureComputed() === 47, 'pureComputed values should be updated instantly');
}

function testComputedClassPropertiesAfterUpdateDeferred() {
  ko.options.deferUpdates = true;
  const person = new Person('jeff', 60);
  ko.options.deferUpdates = false;

  // here is the udpate
  person.age(40);

  console.assert(person.computed() === 45, 'computed values are updated instantly');
  console.assert(person.pureComputed() === 47, 'pureComputed values should be updated instantly');
}

function testComputedClassPropertiesAfterOverride() {
  const person = new Person('jeff', 60);

  // here is the override
  person.age = ko.observable(20);

  console.assert(person.pureComputed() === 27, 'pureComputed values should be updated instantly');
  console.assert(person.computed() === 65, 'computed values are not updated instantly');

  setTimeout(() => {
    console.assert(person.subscribedAge === undefined, 'subscription should be ignored');
    console.assert(person.computed() === 65, 'computed values are never updated');
  }, 2000);
}

function testComputedClassPropertiesAfterOverrideDeferred() {
  ko.options.deferUpdates = true;
  const person = new Person('jeff', 60);
  ko.options.deferUpdates = false;

  // here is the override
  person.age = ko.observable(20);

  console.assert(person.pureComputed() === 27, 'pureComputed values should be updated instantly');

  // This is extremely weird. Computed has a different behaviour when deferUpdates was turned
  // on when Person's observables were created.
  console.assert(person.computed() === 25, 'computed values are updated instantly');

  setTimeout(() => {
    console.assert(person.subscribedAge === undefined, 'subscription should be ignored');
  }, 2000);
}

function testObservableArrayPush() {
  const person = new Person('jeff', 60);

  person.children.push('jeff junior');
}

function testObservableArrayReplaceInnerSimple() {
  const person = new Person('jeff', 60);

  const newChildren = person.children().concat('jeff junior');

  person.children(newChildren);
}

function testObservableArrayReplaceInnerComplex() {
  const person = new Person('jeff', 60);

  const newChildren = person.children();

  // this shows 3 changes, [deleted, added, added]
  person.children([newChildren[1], 'jeff junior', newChildren[1]]);
}