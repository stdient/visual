import getBookDataFromAPI from "./getBookDataFromAPI";
import fetchLinksToCovers from "./fetchLinksToCovers";

async function getLinksToCovers() {
  let book_data = await getBookDataFromAPI();
  let books = book_data;
  let isbns = [];
  books.forEach(book => {
    if (book.isbn !== null)
      isbns.push(book.isbn);
  });

  return await fetchLinksToCovers(isbns);
}

export default getLinksToCovers;