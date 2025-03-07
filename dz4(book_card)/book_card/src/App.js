import './App.css';
import BookCard from './BookCard';
import { useState, useEffect } from 'react'
import getBookDataFromAPI from './getBookDataFromAPI';
import { getCovers } from './getBookCovers';

function App() {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let data = await getBookDataFromAPI();
      setData(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return (
    <div className="App">
      <p>Загрузка...</p>
    </div>
  );
  return (
    <div className="App">
      <header className="App-header">
        {
          data.map((book, index) => {
            return <BookCard title={book.title} authors={book.authors}></BookCard>
          })
        }
      </header>
    </div >
  );
}

export default App;
