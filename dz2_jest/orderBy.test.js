import { orderBy } from './functions.js'

test('default', () => {
  const input = [
    { name: 'Vitia', age: 55 },
    { name: 'Vitia', age: 23 },
    { name: 'Alex', age: 15 },
    { name: 'Alisa', age: 0 },
  ];
  const output = [
    { name: 'Alex', age: 15 },
    { name: 'Alisa', age: 0 },
    { name: 'Vitia', age: 23 },
    { name: 'Vitia', age: 55 },
  ];

  const properties = ["name", "age"];
  const sorted_arr = orderBy(input, properties);
  expect(sorted_arr).toEqual(output);
});

test('not object', () => {
  const input = [
    { name: 'Vitia', age: 55 },
    { name: 'Vitia', age: 23 },
    134,
    { name: 'Alisa', age: 0 },
  ];

  const properties = ["name", "age"];
  expect(() => { orderBy(input, properties).toThrow("массив должен состоять из объектов") });
});

test('not enough property', () => {
  const input = [
    { name: 'Vitia', age: 55 },
    { name: 'Vitia', age: 23 },
    { name: 'Alex' },
    { name: 'Alisa', age: 0 },
  ];

  const properties = ["name", "age"];
  expect(() => { orderBy(input, properties).toThrow("свойства должны соответсвовать передаваемому объекту") });
});

test('property is not string', () => {
  const input = [
    { name: 'Vitia', age: 55 },
    { name: 'Vitia', age: 23 },
    { name: 'Alex', age: 72 },
    { name: 'Alisa', age: 0 },
  ];

  const properties = ["name", 234, "age"];
  expect(() => { orderBy(input, properties).toThrow("свойства должны быть строками") });
});
