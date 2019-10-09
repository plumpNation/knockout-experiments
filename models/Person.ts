import ko from 'knockout';

/**
 * Class to represent a row in the seat reservations grid
 */
export class Person {
  name: string;
  age: KnockoutObservable<number> = ko.observable();
  children: KnockoutObservableArray<string>;
  ageCopy: number;

  constructor (name: string, age: number) {
    this.name = name;
    this.children = ko.observableArray(['fred', 'harry']);

    this.age(age);

    this.setupSubscriptions();
  }

  public agePlusFive: KnockoutComputed<number> = ko.computed(() => {
    return this.age && (this.age() + 5);
  });

  public agePlusSeven: KnockoutComputed<number> = ko.pureComputed(() => {
    return this.age() + 7;
  });

  private setupSubscriptions = () => {
    this.age.subscribe((age: number) => {
      this.ageCopy = age;
    });

    // this.children.subscribe((changes: string[]) => {
    //   console.log(changes);
    // }, this, "arrayChange");
  }
}