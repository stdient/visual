export function calcStats(catsInfo) {
  let result_obj = {};
  catsInfo.forEach(obj => {
    if (!result_obj.hasOwnProperty(obj.country)) {
      result_obj[obj.country] = 1;
    }
    else {
      result_obj[obj.country]++;
    }
  });

  return result_obj
}
