// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
// import css
import './Navigation.css';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/practice">Practice</Link>
        </li>
        <li>
          <Link to="/personal-info">Personal Info</Link>
        </li>
        {/* Add more links if needed */}
      </ul>
    </nav>
  );
};

export default Navigation;
