import React from 'react';
import PropTypes from 'prop-types';
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

DataSet.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string
  })),
  renderHeader: PropTypes.func,
  renderCell: PropTypes.func,
  rowKey: PropTypes.string,
  selectedRows: PropTypes.instanceOf(Set).isRequired,
  onRowSelect: PropTypes.func.isRequired
};

export default DataSet;