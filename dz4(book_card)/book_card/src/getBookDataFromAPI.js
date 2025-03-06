async function getBookDataFromAPI() {
  let response = await fetch('https://fakeapi.extendsclass.com/books');
  if (response.ok) {
    let json = await response.json();
    return json;
  }
  else {
    console.log('Ошибка чтения данных');
    return;
  }
}

async function main() {
  let data = await getBookDataFromAPI();
  console.log(data);
}

main();