import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../CSS/Profile.css';

const Profile = (props) => {
  const email = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {};

  const logout = (e) => {
    e.preventDefault();
    const { history } = props;
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="page-profile">
      <Header name="Profile" />
      <div id="profile">
        { email.email
          ? <p data-testid="profile-email">{ email.email }</p>
          : <p data-testid="profile-email" />}
        <Link to="done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ (e) => logout(e) }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
};

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
