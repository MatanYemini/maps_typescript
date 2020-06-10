console.log('Your code goes here...');

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person: {
  name: string;
  age: number;
  role: [number, string];
} = {
  name: 'Razi',
  age: 30,
  role: [2, 'a'],
};

// Union

function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
}

// Literal

function combine_lit(
  input1: number | string,
  input2: number | string,
  resultConverstion: string
) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  if (resultConverstion === 'as-number') {
    return +result;
  } else {
    return result.toString();
  }

  return result;
}

function combine_lit_uni(
  input1: number | string,
  input2: number | string,
  resultConverstion: 'as-number' | 'as-text'
) {
  let result;
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConverstion === 'as-number'
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  if (resultConverstion === 'as-number') {
    return +result;
  } else {
    return result.toString();
  }

  return result;
}

console.log(person.age);

// alias
type Combinable = number | string;
type ConverstionRes = 'as-number' | 'as-text';
