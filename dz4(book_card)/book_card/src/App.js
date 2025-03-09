import './App.css';
import BookCard from './BookCard';
import { useState, useEffect } from 'react'

function App() {
  const [books, setBooks] = useState([]);

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
    };

    loadBooks();
  }, []);

  return (
    <div className='App'>
      <div className='App-header'>
        {books.map((book) => (
          <BookCard
            img={book.coverImage}
            title={book.title}
            authors={book.authors}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
