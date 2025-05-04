import { useState } from 'react'

export default
  function Search({ data }) {
  const [searchTerm, setSearchTerm] = useState('');

  const div = {
    margin: '10px',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
  }

  const btn = {
    width: '1.6em',
    height: '1.6em',
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // const filteredResult = 
  }

  return (
    <div style={div}>
      {/* по названию книги и автору */}
      <input
        type="text"
        onChange={handleSearch}></input>
      <select>
        <option>Название</option>
        <option>Автор</option>
      </select>
      <select>
        <option>Убывание</option>
        <option>Возрастание</option>
      </select>
      <button style={btn}></button>
    </div>
  )
}