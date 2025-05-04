import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li className="navigation-item">
          <Link to="/comments" className="navigation-link">Comments</Link>
        </li>
        <li className="navigation-item">
          <Link to="/posts" className="navigation-link">Posts</Link>
        </li>
        <li className="navigation-item">
          <Link to="/albums" className="navigation-link">Albums</Link>
        </li>
        <li className="navigation-item">
          <Link to="/todos" className="navigation-link">Todos</Link>
        </li>
        <li className="navigation-item">
          <Link to="/users" className="navigation-link">Users</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;