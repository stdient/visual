import React from 'react';
import '../App.css'

const DataSet = ({
  data,
  columns,
  renderHeader,
  renderCell,
  rowKey = 'id',
  selectedRows,
  onRowSelect
}) => {
  const actualColumns = columns || (data.length > 0
    ? Object.keys(data[0]).map(key => ({ key, title: key }))
    : []);

  const handleRowSelect = (rowKeyValue, event) => {
    if (event.button !== 0) return;
    onRowSelect(rowKeyValue, event.ctrlKey || event.metaKey);
  };

  return (
    <div className="data-set">
      <table>
        <thead>
          <tr>
            <th className="selection-column"></th>
            {actualColumns.map((column, index) => (
              <th key={column.key || index}>
                {renderHeader ? renderHeader(column) : column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const isSelected = selectedRows.has(row[rowKey]);

            return (
              <tr
                key={row[rowKey] || rowIndex}
                className={isSelected ? 'selected' : ''}
              >
                <td
                  className="selection-cell"
                  onMouseDown={(e) => handleRowSelect(row[rowKey], e)}
                >
                  {isSelected && '✓'}
                </td>
                {actualColumns.map((column, colIndex) => (
                  <td key={column.key || colIndex}>
                    {renderCell
                      ? renderCell(row, column)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataSet;