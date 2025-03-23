import './App.css';
import { useState, useEffect } from 'react'
import Card from './components/Card';

function App() {
  let [data, setData] = useState(null);

  useEffect(() => {
    async function getDataFromAPI() {
      let res = await fetch('https://jsonplaceholder.typicode.com/albums');
      if (res.ok) {
        let data = await res.json();
        setData(data);
      } else {
        console.log('API error');
      }
    }

    (async () => { await getDataFromAPI(); })();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {
          data.map((item) => {
            return <Card userId={item.userId} id={item.id} title={item.title}></Card>;
          })
        }
      </header>
    </div>
  );
}

export default App;
