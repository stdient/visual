import { getBookDataFromAPI } from "./getBookDataFromAPI.js";

async function fetchCoverLinks(isbns) {
  let links = [];
  for (let isbn of isbns) {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    if (response.ok) {
      let data = await response.json();
      if (data.totalItems > 0)
        links.push(data.items[0].volumeInfo.imageLinks.thumbnail);
    }
  }
  return links;
}

async function getBookCovers() {
  let book_data = await getBookDataFromAPI();
  let books = book_data;
  let isbns = [];
  books.forEach(book => {
    if (book.isbn !== null)
      isbns.push(book.isbn);
  });

  return await fetchCoverLinks(isbns);
}
