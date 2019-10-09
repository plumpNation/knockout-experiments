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
  children: KnockoutObservableArray<string>;
  ageCopy: number;

  constructor (name: string, age: number) {
    this.name = name;
    this.age = ko.observable(age);
    this.children = ko.observableArray(['fred', 'harry']);

    this.setupSubscriptions();
  }

  private setupSubscriptions = () => {
    this.age.subscribe((age: number) => {
      this.ageCopy = age;
    });

    this.children.subscribe((children: string[]) => {
      console.log(children);
    }, this, "arrayChange");
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

function testObservableUpdate() {
  const person = new Person('jeff', 60);

  person.age(35);

  setTimeout(() => {
    console.assert(person.ageCopy === 35, 'should be updated');
  }, 0);
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