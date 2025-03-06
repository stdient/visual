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

(async () => {
  console.log(await getBookDataFromAPI());
})();