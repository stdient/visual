import React from "react";

const SearchSort = ({ searchQuery, setSearchQuery, sortBy, setSortBy, sortOrder, setSortOrder }) => {
  return (
    <div className="search-sort">
      <input
        type="text"
        placeholder="Поиск по названию альбома..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="id">По ID</option>
        <option value="userId">По User ID</option>
      </select>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
    </div>
  );
};

export default SearchSort;