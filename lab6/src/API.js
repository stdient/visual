async function getDataFromAPI() {
  let res = await fetch('https://jsonplaceholder.typicode.com/albums');
  if (res.ok) {
    let data = await res.json();
    return data;
  } else {
    console.log('API error');
  }
}

(async () => {
  console.log(await getDataFromAPI());
})();