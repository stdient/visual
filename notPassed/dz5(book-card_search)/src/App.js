import './App.css';
import BookCard from './BookCard';
import { useState, useEffect } from 'react'
import Search from './Search'

function App() {
  const [books, setBooks] = useState([]);
  let [loading, setLoading] = useState(true);

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [searchingNow, setSearchingNow] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      const response = await fetch('https://fakeapi.extendsclass.com/books');
      const data = await response.json();

      const booksWithCovers = await Promise.all(
        data.map(async (book) => {
          const coverResponse = await fetch(
            `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
          );
          const coverBlob = await coverResponse.blob();
          const coverUrl = URL.createObjectURL(coverBlob);
          return { ...book, coverImage: coverUrl };
        })
      );

      setBooks(booksWithCovers);
      setLoading(false);
    };

    loadBooks();
  }, []);

  if (loading) {
    return (
      <div className='App'>
        <div className='App-header'>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }


  const searchBooks = (searchValue) => {
    setSearchValue(searchValue);
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.authors.join(" ").toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredBooks(filtered);
    setSearchingNow(true)
  };

  const sortBooks = (key, order) => {
    let sortedBooks;
    sortedBooks = [...filteredBooks].sort((a, b) => {
      if (key === "title") {
        return order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else {
        return order === "asc"
          ? a.authors[0].localeCompare(b.authors[0])
          : b.authors[0].localeCompare(a.authors[0]);
      }
    });

    setFilteredBooks(sortedBooks);
    setSearchingNow(true);
  };


  return (
    <div className='App'>
      <div className='App-header'>
        <Search
          onSearch={searchBooks}
          onSort={sortBooks}
        />
        {
          !searchingNow &&
          books.map((book) => (
            <BookCard
              img={book.coverImage}
              title={book.title}
              authors={book.authors}
            />
          ))
        }
        {
          searchingNow &&
          filteredBooks.map((book) => (
            <BookCard
              img={book.coverImage}
              title={book.title}
              authors={book.authors}
            />
          ))
        }
      </div>
    </div>
  );
};

export default App;
