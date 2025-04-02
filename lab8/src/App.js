import './App.css';
import {useState} from 'react';

const Selector = ({children, renderHeader}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="Selector" onClick={() => setIsOpen(!isOpen)}>
            {renderHeader(isOpen)}
            {isOpen && <span>{children}</span>}
        </div>
    );
}

function App() {
    const children = ['Apple', 'Banana', 'Orange'];

    return (
        <div className="App">
            <Selector
                children={children}
                renderHeader={(isOpen) =>
                    <h2 style={{cursor: "pointer"}}> Fruits {isOpen ? "🠷" : "🠴"}</h2>
                }
            >
                <ul className="List">
                    <li className="List__element"> Apple </li>
                    <li className="List__element"> Banana </li>
                    <li className="List__element"> Orange </li>
                </ul>
            </Selector>
        </div>
    );
}

export default App;
