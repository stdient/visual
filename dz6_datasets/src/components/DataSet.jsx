import './DataSet.css'
import { useEffect, useState } from 'react';

const DataSet = ({ title, table_titles, table_data }) => {
  if (table_titles === undefined) {
    table_titles = [...table_data[0]];
  }

  const [selectedItems, setSelectedItems] = useState([]);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [prevSelectAllLine, setPrevSelectAllLine] = useState(false);
  const [selectedLines, setSelectedLines] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Control') {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Control') {
        setIsCtrlPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, []);

  return (
    <div className="DataSet">
      <h3 className="table__title">{title}</h3>
      <table className="table">
        <thead>
          <tr>
            {table_titles.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table_data.map((row, row_idx) => (
            <tr key={row_idx}>
              {row.map((cell, col_idx) => (
                <td key={col_idx} onClick={() => {
                  if (isCtrlPressed) {
                    if (col_idx === 0) {
                      let all_items = [];
                      let all_lines = [...selectedLines];

                      if (!all_lines.includes(row_idx)) all_lines.push(row_idx);
                      else {
                        all_lines = all_lines.filter(line => line !== row_idx);
                      }

                      for (let j = 0; j < all_lines.length; j++) {
                        let cur_row_idx = all_lines[j];
                        for (let i = 0; i < table_data[cur_row_idx].length; ++i) {
                          all_items.push({
                            'row': cur_row_idx,
                            'col': i,
                          });
                        }
                      }

                      setSelectedItems(all_items);
                      setSelectedLines([...all_lines]);
                    }
                    else if (col_idx >= 1) {
                      let all_items = [...selectedItems];

                      let size = all_items.length;
                      all_items = all_items.filter(item =>
                        !(item.row === row_idx && item.col === col_idx));

                      if (size === all_items.length) {
                        all_items.push({
                          'row': row_idx,
                          'col': col_idx
                        });
                      }

                      setSelectedItems(all_items);
                      setPrevSelectAllLine(false);
                      setSelectedLines([]);
                    }
                  }
                  else {
                    if (col_idx === 0 && !selectedLines.some(it => it === row_idx)) {
                      let all_items = [];
                      for (let i = 0; i < table_data[row_idx].length; ++i) {
                        all_items.push({
                          'row': row_idx,
                          'col': i,
                        });
                      }
                      setPrevSelectAllLine(true);
                      setSelectedLines([row_idx]);
                      setSelectedItems(all_items);
                    }
                    else if (selectedItems.some(it => it.row === row_idx && it.col === col_idx)
                      && !prevSelectAllLine) {
                      setSelectedItems([]);
                    } else {
                      setSelectedItems([{
                        'row': row_idx,
                        'col': col_idx,
                      }]);
                      setPrevSelectAllLine(false);
                      setSelectedLines([]);
                    }
                  }
                }}
                  style={{
                    outline: (selectedItems.some(it => it.row === row_idx && it.col === col_idx)
                      && col_idx >= 1)
                      ? '2px solid blue' : 'none',
                    backgroundColor: (selectedItems.some(it => it.row === row_idx)) ? col_idx === 0 ?
                      'blue' : 'lightblue' : 'white',
                    color: (selectedItems.some(it => it.row === row_idx)) ? col_idx === 0 ?
                      'white' : 'black' : 'gray',
                  }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataSet;