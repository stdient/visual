export function orderBy(obj_arr, ...properties) {
  // проверка входных значений
  for (let i = 0; i < properties.length; ++i) {
    if (typeof (properties[i]) !== 'string') {
      throw new Error("свойства должны быть строками");
    }
    for (let j = 0; j < obj_arr.length; ++j) {
      if (!(properties[i] in obj_arr[j])) {
        throw new Error("свойства должны соответсвовать передаваемому объекту");
      }
      if (i == 0) {
        if (typeof (obj_arr[j]) !== 'object')
          throw new Error("массив должен состоять из объектов");
      }
    }
  }

  // копирование массива объектов
  let result = obj_arr.slice();

  // сортировка
  for (let i = properties.length; i >= 0; --i) {
    result.sort((a, b) => {
      if (typeof a[properties[i]] === 'string') { return a[properties[i]].localeCompare(b[properties[i]]); }
      else return a[properties[i]] - b[properties[i]];
    });
  }

  return result;
}