import getBookDataFromAPI from "./getBookDataFromAPI.mjs";
import fetchLinksToCovers from "./fetchLinksToCovers.mjs";

export default async function getLinksToCovers() {
  let book_data = await getBookDataFromAPI();
  let books = book_data;
  let isbns = [];
  books.forEach(book => {
    if (book.isbn !== null)
      isbns.push(book.isbn);
  });

  let links = await fetchLinksToCovers(isbns)
  return links;
}
