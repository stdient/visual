import { deleteWhere } from "./main.js"

test('корректные данные', () => {
  const input = [
    { name: 'Vitia', age: 55 },
    { name: 'Vitia', age: 23 },
    { name: 'Alisa', age: 0 },
    { name: 'Alex', age: 15 },
  ];
  const output = [
    { name: 'Vitia', age: 55 },
    { name: 'Vitia', age: 23 },
    { name: 'Alex', age: 15 },
  ];

  const arr_with_deleted_field = deleteWhere(input, "age", 0);
  expect(arr_with_deleted_field).toEqual(output);
});

test('элемент массива не объект', () => {
  const input = [
    { name: 'Vitia', age: 55 },
    { name: 'Vitia', age: 23 },
    123,
    { name: 'Alex', age: 15 },
  ];

  expect(() => { deleteWhere(input, "age", 0).toThrow("objs должен содержать только объекты") });
});

test('', () => {
  const input = [
    { name: 'Vitia', age: 55 },
    { name: 'Vitia', id: 16 },
    { name: 'Alex', age: 15 },
  ];

  expect(() => { deleteWhere(input, "age", 0).toThrow("у объекта должно быть поле field") });
});