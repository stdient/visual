import './App.css'
import { useState, useEffect } from 'react'

import DataSet from './comps/DataSet'

function App() {
  // добавил сюда, потому что хук не может быть раньше return
  const [selectedRows, setSelected] = useState(new Set());

  // загрузка данных с сайта
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const comments_url = 'https://jsonplaceholder.typicode.com/comments';

  useEffect(() => {
    fetch(comments_url)
      .then(response => response.json())
      .then(data => {
        setTableData(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);
  if (loading) return <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh'
    }}>Loading...</div>;

  const displayHeaders = (headers) => {
    const cell = {
      backgroundColor: 'white',
      color: 'black',
      minWidth: '5em',
      border: '1px solid black',
    }

    return (
      <thead>
        <tr>
          <th style={cell}></th>
          {
            headers.map((header, idx) => {
              return <th
                key={idx}
                style={cell}
              >{header}</th>
            })
          }
        </tr>
      </thead>
    );
  }


  const displayData = (data) => {
    const cell = {
      textAlign: 'center',
      border: '1px solid white',
    }
    const selectedCell = {
      backgroundColor: 'lightblue',
      color: 'black',
      textAlign: 'center',
      border: '1px solid black',
    }
    const selectedCellIndicator = {
      backgroundColor: 'green',
    }

    const updateSelectedRows = (event, rowId) => {
      setSelected(prevSelectedRows => {
        const newSelected = new Set(prevSelectedRows);

        if (event.ctrlKey) {
          if (newSelected.has(rowId)) newSelected.delete(rowId);
          else newSelected.add(rowId);
        }
        else {
          let add = true;
          if (newSelected.has(rowId)) add = false;
          newSelected.clear();
          if (add) newSelected.add(rowId);
        }

        return newSelected;
      })
    }

    return (
      <tbody>
        {
          data.map((rowValue, rowId) => {
            return (
              <tr key={rowId}>
                <td
                  onClick={(event) => { updateSelectedRows(event, rowId) }}
                  style={selectedRows.has(rowId) ? selectedCellIndicator : cell}></td>
                {
                  Object.keys(data[0]).map((key, idx) => {
                    return (
                      <td
                        key={idx}
                        style={selectedRows.has(rowId) ? selectedCell : cell}
                      >{rowValue[key]}</td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody >
    )
  }

  const main_container = {
  };

  return (
    <div style={main_container}>
      <DataSet data={tableData} renderHeaders={displayHeaders} renderData={displayData} />
    </div>
  )
}

export default App
