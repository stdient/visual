import React, { useState } from "react";
import "./DataSet.css";

const DataSet = ({
  data = [],
  header = [],
  renderHeader = (item) => item.toString(),
  renderCell = (item) => item.toString(),
  onDeleteSelected,
  onUpdateItem,
  setShowAddModal,
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  let generatedHeaderValue = [];
  if (header.length > 0) {
    generatedHeaderValue = header;
  } else {
    if (data.length > 0) {
      generatedHeaderValue = Object.keys(data[0]).map((key) => ({
        key,
        title: key,
      }));
    }
  }

  const selectRow = (index, event) => {
    const selectedRowsCurrent = new Set(selectedRows);

    if (event.ctrlKey) {
      if (selectedRowsCurrent.has(index)) {
        selectedRowsCurrent.delete(index);
      } else {
        selectedRowsCurrent.add(index);
      }
    } else {
      if (selectedRowsCurrent.has(index)) {
        selectedRowsCurrent.clear();
      } else {
        selectedRowsCurrent.clear();
        selectedRowsCurrent.add(index);
      }
    }

    setSelectedRows(selectedRowsCurrent);
  };

  const handleDelete = () => {
    if (selectedRows.size > 0 && onDeleteSelected) {
      onDeleteSelected(selectedRows);
      setSelectedRows(new Set());
    }
  };

  const handleUpdate = (index) => {
    if (!onUpdateItem) return;

    const currentItem = data[index];
    const newName = prompt("Name:", currentItem.name);
    if (newName === null) return;

    const newEmail = prompt("Email:", currentItem.email);
    if (newEmail === null) return;

    const newBody = prompt("Comment:", currentItem.body);
    if (newBody === null) return;

    onUpdateItem(index, {
      name: newName,
      email: newEmail,
      body: newBody,
    });
  };

  const active_delete_style = {
    marginBottom: "10px",
    padding: "8px 16px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
  }
  const inactive_delete_style = {
    marginBottom: "10px",
    padding: "8px 16px",
    backgroundColor: "grey",
    color: "white",
    border: "none",
    borderRadius: "4px",
  }
  const btnsStyle = {
  }

  return (
    <div >
      <div style={btnsStyle}>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Create
        </button>

        {
          <button
            onClick={handleDelete}
            style={selectedRows.size > 0 ? active_delete_style : inactive_delete_style}
          >
            Delete Selected ({selectedRows.size})
          </button>
        }
      </div>



      < table className="dataSetTable" >
        <thead>
          <tr>
            <th className="dataSetSelectorCell"></th>
            {generatedHeaderValue.map((col, colIndex) => (
              <th key={colIndex}>{renderHeader(col.title || col.key)}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => {
            const isSelected = selectedRows.has(rowIndex);
            let rowClassName = "dataSetRow";
            let selectorCellClassName = "dataSetSelectorCell";

            if (isSelected) {
              rowClassName += " dataSetRowSelected";
              selectorCellClassName += " dataSetRowSelected";
            }

            return (
              <tr key={rowIndex} className={rowClassName}>
                <td
                  className={selectorCellClassName}
                  onMouseDown={(event) => selectRow(rowIndex, event)}
                ></td>
                {generatedHeaderValue.map((col, colIndex) => (
                  <td key={colIndex}>{renderCell(item[col.key])}</td>
                ))}
                <td>
                  <button
                    onClick={() => handleUpdate(rowIndex)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table >
    </div >
  );
};

export default DataSet;