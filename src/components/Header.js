import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import '../CSS/Header.css';

const Header = (props) => {
  const { name } = props;

  return (
    <header id="header-container">
      <Link to="/foods">
        <h1 data-testid="page-title" id="header-title">{ name }</h1>
      </Link>
      <a href="/profile" className="icon-container">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </a>
    </header>

  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
