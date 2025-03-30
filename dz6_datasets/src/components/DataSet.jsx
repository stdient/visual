import './DataSet.css'
import {useEffect, useState} from 'react';

const DataSet = (props) => {
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
            <h3 className="table__title">{props.title}</h3>
            <table className="table">
                <thead>
                <tr>
                    {props.table_titles.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {props.table_data.map((row, row_idx) => (
                    <tr key={row_idx}>
                        {row.map((cell, col_idx) => (
                            <td key={col_idx} onClick={() => {
                                if (isCtrlPressed) {
                                    if (col_idx === 0) {
                                        let all_items = [];
                                        for (let i = 0; i < props.table_data[row_idx].length; ++i) {
                                            all_items.push({
                                                'row': row_idx,
                                                'col': i,
                                            });
                                        }
                                        setPrevSelectAllLine(true);
                                        setSelectedItems(all_items);
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
                                        for (let i = 0; i < props.table_data[row_idx].length; ++i) {
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