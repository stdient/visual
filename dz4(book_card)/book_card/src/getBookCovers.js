import { getBookDataFromAPI } from "./getBookDataFromAPI.js";

export async function fetchLinksToCovers(isbns) {
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

export async function getLinksToCovers() {
  let book_data = await getBookDataFromAPI();
  let books = book_data;
  let isbns = [];
  books.forEach(book => {
    if (book.isbn !== null)
      isbns.push(book.isbn);
  });

  return await fetchLinksToCovers(isbns);
}

export async function getCovers() {
  let links_to_covers = await getLinksToCovers();
  let covers = [];
  for (let link of links_to_covers) {
    let response = await fetch(link);
    if (response.ok) {
      let cover = await response.blob();
      covers.push(cover);
    }
  }
  return covers;
}