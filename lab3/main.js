export function deleteWhere(objs, field, value) {
  objs.forEach(obj => {
    if (typeof (obj) != 'object') throw new Error("objs должен содержать только объекты");
    if (!(field in obj)) throw new Error("у объекта должно быть поле field");
  });

  let result_arr = objs.filter(obj => obj[field] !== value);

  return result_arr;
}