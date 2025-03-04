import { getDataFromAPI } from "./getDataFromAPI.js";

export async function getStats() {
  let data_array = await getDataFromAPI();

  let result_obj = {};
  data_array.forEach(obj => {
    if (!result_obj.hasOwnProperty(obj.category)) {
      result_obj[obj.category] = 1;
    }
    else {
      result_obj[obj.category]++;
    }
  });

  return result_obj;
}
