import DataSet from './comps/DataSet'
import './App.css'
import { useState } from 'react'

function App() {
  const data = [
    {
      "postId": 1,
      "id": 1,
      "name": "id labore ex et quam laborum",
      "email": "Eliseo@gardner.biz",
      "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
      "postId": 1,
      "id": 2,
      "name": "quo vero reiciendis velit similique earum",
      "email": "Jayne_Kuhic@sydney.com",
      "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
    },
    {
      "postId": 1,
      "id": 3,
      "name": "odio adipisci rerum aut animi",
      "email": "Nikita@garfield.biz",
      "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
    },
    {
      "postId": 1,
      "id": 4,
      "name": "alias odio sit",
      "email": "Lew@alysha.tv",
      "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
    },
    {
      "postId": 1,
      "id": 5,
      "name": "vero eaque aliquid doloribus et culpa",
      "email": "Hayden@althea.biz",
      "body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
    },
  ]

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

  const [selectedRows, setSelected] = useState(new Set());

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
          newSelected.clear();
          if (!newSelected.has(rowId)) newSelected.add(rowId);
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  }

  return (
    <div style={main_container}>
      <DataSet data={data} renderHeaders={displayHeaders} renderData={displayData} />
    </div>
  )
}

export default App
