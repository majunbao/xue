let _name = '';

class Person {
  constructor(name) {
    _name = name;
  }

  get name() {
    return _name;
  }

  set name(newName) {
    _name = newName;
  }

  walk() {
    console.log(this._name + ' is walking.');
  }
}

let person1 = new Person('xio');
console.log(person1);