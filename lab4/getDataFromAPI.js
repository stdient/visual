export async function getDataFromAPI() {
  let data_arr = [];

  let response = await fetch('https://dummyjson.com/products');
  let json_obj;
  if (response.ok) {
    let json = await response.json();
    let json_string = JSON.stringify(json);
    json_obj = JSON.parse(json_string);
    json_obj.products.forEach(obj => {
      data_arr.push(obj);
    });
  } else {
    console.log("Ошибка HTTP: " + response.status);
  }

  return data_arr;
}
