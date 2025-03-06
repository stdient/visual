import './App.css';
import BookCard from './BookCard';
import { useState, useEffect } from 'react'
import getBookDataFromAPI from './getBookDataFromAPI';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => { setData(await getBookDataFromAPI()) })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {data.map((item) => {
          return <BookCard title={item.title} author={item.author}></BookCard>
        })}
      </header>
    </div>
  );
}

export default App;
