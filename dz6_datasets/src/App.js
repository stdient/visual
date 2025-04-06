import './App.css';
import DataSet from './components/DataSet';
import {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then((res) => res.json())
        .then(data => setData(data)).catch(err => console.log(err));
    }, [])

    const table_data = data.map(data => data.body);

    return (
        <div className="App">
          <DataSet title={"Main table"} table_data={table_data} />
        </div>
    );
}

export default App;
