import './App.css';
import DataSet from './components/DataSet';

function App() {
  const table_titles = ['d', '1', '2', '3', '4', '5', '6', '7', '8', '9',];
  const table_data = [
      ['1', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
      ['2', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
      ['3', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
      ['4', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
      ['5', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
      ['6', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
      ['7', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
      ['8', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
      ['9', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
  ];

  return (
      <div className="App">
          <DataSet title={"Main table"}  table_titles={table_titles} table_data={table_data} />

          {/*демонстрация обработки не переданного пропса*/}
          {/*<DataSet title={"Main table"} table_data={table_data} />*/}
      </div>
  );
}

export default App;
