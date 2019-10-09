import ko from 'knockout';

/**
 * Class to represent a row in the seat reservations grid
 */
export class Person {
  name: string;

  // It seems like if you will have a computed class property like `agePlusFive`
  // then ko.observable() must be initialised here.
  age: KnockoutObservable<number> = ko.observable();

  // Not initialising this property here as there is no computed class property
  // using it.
  children: KnockoutObservableArray<string>;

  subscribedAge: number;

  constructor (name: string, age: number) {
    this.name = name;
    this.children = ko.observableArray(['fred', 'harry']);

    this.age(age);

    this.setupSubscriptions();
  }

  public computed: KnockoutComputed<number> = ko.computed(() => {
    return this.age && (this.age() + 5);
  });

  public pureComputed: KnockoutComputed<number> = ko.pureComputed(() => {
    return this.age() + 7;
  });

  private setupSubscriptions = () => {
    this.age.subscribe((age: number) => {
      this.subscribedAge = age;
    });

    // this.children.subscribe((changes: string[]) => {
    //   console.log(changes);
    // }, this, "arrayChange");
  }
}