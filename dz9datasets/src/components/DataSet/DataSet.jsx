import React, { useState } from 'react';
import './DataSet.css';

const DataSet = ({
  data = [],
  headers = [],
  renderHeader = (header) => header,
  renderCell = (cell) => cell,
  onRowSelect,
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  const handleRowClick = (id, event) => {
    const newSelectedRows = new Set(selectedRows);

    if (event.ctrlKey) {
      if (newSelectedRows.has(id)) {
        newSelectedRows.delete(id);
      } else {
        newSelectedRows.add(id);
      }
    } else {
      if (newSelectedRows.has(id)) {
        newSelectedRows.clear();
      } else {
        newSelectedRows.clear();
        newSelectedRows.add(id);
      }
    }

    setSelectedRows(newSelectedRows);
    onRowSelect && onRowSelect(Array.from(newSelectedRows));
  };

  const effectiveHeaders = headers.length > 0
    ? headers
    : data.length > 0
      ? Object.keys(data[0]).map(key => ({ key, title: key }))
      : [];

  return (
    <div className="data-set-container">
      <table className="data-set-table">
        <thead>
          <tr>
            <th className="selection-column"></th>
            {effectiveHeaders.map((header, index) => (
              <th key={index}>{renderHeader(header)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className={selectedRows.has(row.id) ? 'selected' : ''}
            >
              <td
                className="selection-cell"
                onClick={(e) => handleRowClick(row.id, e)}
              ></td>
              {effectiveHeaders.map((header, index) => (
                <td key={index}>
                  {renderCell(row[header.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataSet;