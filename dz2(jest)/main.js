import { orderBy } from './functions.js'

// создание массива случайных объектов
function gen_rand_obj() {
  let names = ['alex', 'igor', 'vitia', 'oleg', 'vitalik', 'nursultan', 'matue', 'yevettea', 'hikaruvi', 'ellerywi', 'esherosw'];
  let obj = {
    "name": names[Math.floor(Math.random() * names.length)],
    "age": Math.floor(Math.random() * 100),
  };

  return obj;
}

// демострационный пример работы orderBy
let obj_arr = [];
for (let i = 0; i < 10; ++i) {
  obj_arr.push(gen_rand_obj());
}
let sorted_arr = orderBy(obj_arr, "name", "age");
console.log(obj_arr); // исходный массив не изменяется
console.log(sorted_arr);