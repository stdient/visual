import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Comments from './pages/Comments/Comments';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="content">
          <Routes>
            {/* <Route path="/posts" element={<Posts />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/users" element={<Users />} /> */}
            <Route path="/" element={<Comments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;