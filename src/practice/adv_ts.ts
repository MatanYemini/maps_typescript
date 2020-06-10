type Admin = {
  name: string;
  privilages: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// Now have both
type BestEmployee = Admin & Employee;

// Can be also
// interface bestEmployee extends Employee, Admin {}

const e1: BestEmployee = {
  name: 'yemini',
  privilages: ['build'],
  startDate: new Date(),
};

type Numeric = CoolNum | BadNum;

class CoolNum {
  who() {
    console.log('Cool numbers');
  }
}

class BadNum {
  why() {
    console.log('Shit number');
  }
}

const yeahNumber: (num: Numeric) => boolean = function (num: Numeric): boolean {
  return num instanceof CoolNum;
};

interface Bird {
  type: 'Bird';
  flySpeed: number;
}

interface Insect {
  type: 'Insect';
  walkingSpeed: number;
}

type Animal = Insect | Bird;

function moveAnimal(animal: Animal) {
  switch (animal.type) {
    case 'Bird':
      console.log(animal.flySpeed);
      break;
    case 'Insect':
      console.log(animal.walkingSpeed);
      break;
  }
}

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'adasd',
  asd: 'asdasd',
};

type Competible = string | number;

function adding(a: string, b: string): string;
function adding(a: Competible, b: Competible) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }

  return a + b;
}
