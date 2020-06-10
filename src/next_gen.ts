console.log('try');
// explain about spread

const x = ['j', 'df', 'sdf'];
const y = ['w'];

y.push(...x);

const w = {
  name: 'sss',
  age: 22,
};

const copy_w = w; // This is just a reference!

const real_copy_w = { ...w };

const add = (...numbers: number[]) => {
  let res;
  return numbers.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
};

const shit_add = add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

abstract class Person {
  private readonly name: string;
  private hobbies: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  abstract describe(this: Person): void;

  addHobby(hob: string) {
    this.hobbies.push(hob);
  }
}

class Student extends Person {
  constructor(private id: string, public grade: number, private shit: string) {
    super(id);
  }

  describe(this: Student) {
    console.log('yohoW');
  }

  set theShit(value: string) {
    this.shit = value;
  }

  get theShit() {
    return this.shit;
  }
}

const st = new Student('1', 1, '1');

console.log(st.theShit);

st.theShit = 'as';
console.log(st.theShit);

// Singleton
class Manager extends Person {
  private static instance: Manager;

  private constructor(private id: string, private age: number) {
    super(id);
  }

  static getInstance() {
    if (Manager.instance) {
      return this.instance;
    }
    this.instance = new Manager('2', 44);
  }

  describe(this: Manager) {
    console.log('asdas');
  }
}

// Interface
interface IMaav {
  readonly favAnimal: string;
  readonly favColor: string;
  nickname?: string;

  greet(phrase: string): void;
}

let shaked: IMaav = {
  favAnimal: 'Lotra',
  favColor: 'Blue',
  greet(phrase: string) {
    console.log('ohh ohh');
  },
};

class Soldier extends Person implements IMaav {
  constructor(
    private id: string,
    private personal: number,
    readonly favAnimal: string,
    readonly favColor: string
  ) {
    super(id);
  }

  greet(phrase: string) {
    console.log('asdsd');
  }

  describe() {
    console.log('asdasd');
  }
}

interface AddFn {
  (a: number, b: number): number;
}
let addfunc: AddFn;

addfunc = (n1: number, n2: number) => {
  return n1 + n2;
};

add;
