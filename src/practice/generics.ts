const names: Array<string> = [];

const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve('this is done!');
  }, 2000);
});

function merge(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max' }, { age: 30 });
// Why we cannot access?

// This will enable the understand that they both can be reached
function mergeG<T, U>(objA: T, objB: U): T & U {
  return Object.assign(objA, objB);
}

// Make it objects merge
function mergeGO<T extends object, U extends object>(objA: T, objB: U): T & U {
  return Object.assign(objA, objB);
}

// Check for attributes
interface Lengthy {
  length: number;
}

// gets an type that has a length (object) and returns a tuple with T and string
function countAndPrint<T extends Lengthy>(element: T): [T, string] {
  let desc = 'Got No Value';
  if (element.length === 1) {
    desc += 'jajsdjasd';
  }

  return [element, desc];
}

console.log(countAndPrint('asdasd'));

// extract and convert
function extractAndConvert(obj: object, key: object) {
  // Who said this key is in the object? Generics
}

function extractAndConvertCorrect<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'value ' + obj[key];
}

// If we want the same data type to all
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();

textStorage.addItem('Max');
textStorage.addItem('Maxi');

const numberStorage = new DataStorage<number>();

numberStorage.addItem(11);

// Partial
// changes the properties to be optional
interface Yemini {
  name: string;
  description: string;
}

function coolMatan(name: string, description: string): Yemini {
  let x: Partial<Yemini> = {};
  x.name = 'Yhoo';
  x.description = 'sadsad';
  return x as Yemini;
}

// Show the difference from Generic and Union types.
