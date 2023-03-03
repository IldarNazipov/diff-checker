import makePlain from '../src/formatters/plain.js';

const diff = [
  {
    key: 'age', state: 'something', value1: 30, value2: 45,
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
];

test('plain formatter', () => {
  expect(() => makePlain(diff)).toThrow();
});
