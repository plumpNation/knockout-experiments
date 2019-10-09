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
    testComputedClassProperty();
    testPureComputedClassProperty();
    testClassOverrideProperty();
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
  ko.options.deferUpdates = false;
  const person = new Person('jeff', 60);

  person.age(35);

  console.assert(person.ageCopy === 35, 'subscriptions be updated immediately');
}

function testObservableSubscriptionUpdateDeferred() {
  ko.options.deferUpdates = true;
  const person = new Person('jeff', 60);
  ko.options.deferUpdates = false;

  person.age(35);

  console.assert(person.ageCopy === undefined, 'subscriptions should not be updated immediately');

  setTimeout(() => {
    console.assert(person.ageCopy === 35, 'subscriptions are deferred');
  }, 0);
}

function testComputedClassProperty() {
  const person = new Person('jeff', 60);

  person.age(40);

  console.assert(person.agePlusFive() === 45, 'computed values are updated instantly');
}

function testPureComputedClassProperty() {
  const person = new Person('jeff', 60);

  person.age(20);

  console.assert(person.agePlusSeven() === 27, 'pureComputed values should be updated instantly');
}

function testClassOverrideProperty() {
  const person = new Person('jeff', 60);

  person.age = ko.observable(20);
  console.assert(person.agePlusSeven() === 27, 'pureComputed values should be updated instantly');
  console.assert(person.agePlusFive() === 65, 'computed values are not updated');

  setTimeout(() => {
    console.assert(person.ageCopy === undefined, 'subscription should be ignored');
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