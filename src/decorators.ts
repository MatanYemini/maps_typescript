// change the decorator to true in config
// Decorator is a function on a class
// When puting a decorator it runs before everything, runs when the class is defined

function Logger(logString: string) {
  return function (constructor: Function) {
    console.log('Logging...');
    console.log(constructor);
  };
}

@Logger('Logging - Person')
class Human {
  name = 'Max';

  constructor() {
    console.log('Creating person object');
  }
}

const hum = new Human();

console.log(hum);

// connect a decorator to an html element
function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

@Logger('LOGGING')
@WithTemplate('<h1>tralala</h1>', 'app')
class Car {
  name = 'CarCari';

  constructor() {
    console.log('Creating person object');
  }
}

// Property decorator
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator');
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor Decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  constructor(t: string, n: number) {
    this.title = t;
    this._price = n;
  }
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price');
    }
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this.price * (1 + tax);
  }
}

class Printer {
  message: string = 'It works';

  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage.bind(p)); // The problem here is that not the same reference as p.showMessage
// Here is sending a ref to a function -> refers to the target of the event and not to the printer
// For this we will add the bind -> it connects the reference to the printer

// Now lets add a decorator for it!!!!!
// So every time we will do something like this -> it will be happen automatically

function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer_2 {
  message: string = 'It works';
  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p_2 = new Printer_2();

const button_2 = document.querySelector('button');
button.addEventListener('click', p_2.showMessage);

// ---

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...registeredValidators[target.constructor.name][propName],
      'required',
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...registeredValidators[target.constructor.name][propName],
      'positive',
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createdCourse);
});
