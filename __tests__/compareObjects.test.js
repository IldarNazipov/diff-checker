import { expect } from '@jest/globals';
import compareObjects from '../src/compareObjects.js';

const obj1 = {
  name: 'John',
  surname: 'Smith',
  age: 30,
  children: {
    name: 'Anna',
    age: 10,
  },
};

const obj2 = {
  name: 'John',
  surname: 'Cena',
  age: 45,
  cars: {
    model: 'Tesla',
    maxspeed: 300,
  },
  children: '',
};

test('compare objects', () => {
  expect(compareObjects(obj1, obj2)).toEqual([
    {
      key: 'age', state: 'changed', value1: 30, value2: 45,
    },
    {
      key: 'cars',
      state: 'added',
      value: { model: 'Tesla', maxspeed: 300 },
    },
    {
      key: 'children',
      state: 'changed',
      value1: { name: 'Anna', age: 10 },
      value2: '',
    },
    { key: 'name', state: 'notChanged', value: 'John' },
    {
      key: 'surname', state: 'changed', value1: 'Smith', value2: 'Cena',
    },
  ]);
});
