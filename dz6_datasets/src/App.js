import './App.css';
import DataSet from './components/DataSet';

function App() {
    const table_data = [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
    ]

    return (
        <div className="App">
            <DataSet title={"Main table"} table_data={table_data} />
        </div>
    );
}

export default App;
