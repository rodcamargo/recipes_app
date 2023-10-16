import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../CSS/PageLogin.css';
import logo from '../images/logo.png';

const Login = (props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const validateInfo = () => {
    const { email, password } = state;
    const emailRules = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const passwordRules = 6;

    if (email.match(emailRules) && password.length > passwordRules) {
      return setBtnIsDisabled(false);
    }
    return setBtnIsDisabled(true);
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    validateInfo();
  }, [state]);

  const saveToken = (e) => {
    e.preventDefault();
    const { history } = props;
    localStorage.setItem('user', JSON.stringify({ email: state.email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    history.push('/foods');
  };

  return (
    <section className="main-page">
      <div className="login">
        <img src={ logo } alt="My recipes RodCamargo" className="" />
        <form id="login-form">
          <input
            type="text"
            name="email"
            data-testid="email-input"
            placeholder="email"
            onChange={ handleChange }
            value={ state.email }
            className="input-login"
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="password"
            onChange={ handleChange }
            value={ state.password }
            className="input-login"
          />
        </form>
        <button
          disabled={ btnIsDisabled }
          type="submit"
          data-testid="login-submit-btn"
          onClick={ saveToken }
          id="btn-login"
        >
          Enter
        </button>
      </div>
    </section>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
