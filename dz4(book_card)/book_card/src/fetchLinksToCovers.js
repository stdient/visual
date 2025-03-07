async function fetchLinksToCovers(isbns) {
  let links = [];
  for (let isbn of isbns) {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    if (response.ok) {
      let data = await response.json();
      if (data.totalItems > 0)
        links.push(data.items[0]?.volumeInfo?.imageLinks?.thumbnail);
    }
  }
  return links;
}

export default fetchLinksToCovers;
