import './App.css';
import DataSet from './DataSet'
import { useState } from 'react'

function App() {
  // data
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
  ]

  // vars
  const [selectedRows, setSelectedRows] = useState(new Set(null));

  // functions
  const renderHeaders = (headers) => {
    return (
      headers.map((header, idx) => {
        return (
          <th
            key={idx}
          >
            {header}
          </th>
        )
      })
    )
  }
  const renderDataRow = (object, idx) => {
    const activeStyle = {
      backgroundColor: 'lightblue',
      color: 'black',
    }
    return (
      <tr key={idx}>
        <td></td>
        {
          Object.keys(object).map((key, idx) => {
            return (
              <td key={idx}
                style={selectedRows.has(idx) ? activeStyle : undefined}
              >
                {object[key]}
              </td>
            );
          })
        }
      </tr>
    )
  }

  return (
    <div className='main-page'>
      <DataSet data={data}
        renderHeaders={renderHeaders}
        renderDataRow={renderDataRow}
      />
    </div>
  );
}

export default App;