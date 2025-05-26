import { useState } from 'react'

export default
  function Search({ data, onSearch, onSort }) {
  const [searchTerm, setSearchTerm] = useState('');

  const [sortKey, setSortKey] = useState("none");
  const [sortOrder, setSortOrder] = useState("asc");

  const div = {
    margin: '10px',
    height: '24px',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
  }

  const changeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const changeSortKey = (event) => {
    setSortKey(event.target.value);
    onSort(event.target.value, sortOrder);
  };

  const changeSortDirection = (event) => {
    setSortOrder(event.target.value);
    onSort(sortKey, event.target.value);
  };

  return (
    <div style={div}>
      {/* по названию книги и автору */}
      <input
        type="text"
        value={searchTerm}
        onChange={changeSearchTerm}>
      </input>
      <select onChange={changeSortKey}>
        <option value="title">Название</option>
        <option value="authors">Автор</option>
      </select>
      <select onChange={changeSortDirection}>
        <option value="asc">Возрастание</option>
        <option value="desc">Убывание</option>
      </select>
    </div>
  )
}