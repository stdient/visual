export async function loadData() {
  let data_arr = [];

  let response = await fetch('https://catfact.ninja/breeds');
  let json_obj;
  do {
    if (response.ok) {
      let json = await response.json();
      let json_string = JSON.stringify(json);
      json_obj = JSON.parse(json_string);
      json_obj.data.forEach(obj => {
        data_arr.push(obj);
      });

      if (json_obj.next_page_url == null) break;
      response = await fetch(json_obj.next_page_url);
    } else {
      console.log("Ошибка HTTP: " + response.status);
      break;
    }
  } while (json_obj.next_page_url != null);

  return data_arr;
}
