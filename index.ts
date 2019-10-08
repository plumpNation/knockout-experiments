import faker from 'faker';
import ko from 'knockout';

ko.options.deferUpdates = true;

// /////////////////////////////////////////////////////////////////////////////

/**
 * Class to represent a row in the seat reservations grid
 */
class Person {
  name: string;
  age: KnockoutObservable<number>;

  constructor (name: string, age: number) {
    this.name = name;
    this.age = ko.observable(age);
  }
}

/**
 * Overall viewmodel for this screen, along with initial state
 */
class IndexViewModel {
  persons: KnockoutObservableArray<Person>;

  constructor() {
    const initialPersons: Person[] = Array.from(Array(10))
      .map(() => new Person(faker.name.firstName(), faker.random.number(60)));

    testObservableUpdate();

    // Editable data
    this.persons = ko.observableArray(initialPersons);
  }
}

// /////////////////////////////////////////////////////////////////////////////

const viewModel = new IndexViewModel();

ko.applyBindings(viewModel);

// /////////////////////////////////////////////////////////////////////////////

function testObservableUpdate() {
  const person = new Person('jeff', 60);

  person.age(35);

  console.assert(person.age() === 35, 'should be updated');
}