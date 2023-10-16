import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../CSS/Footer.css';

const Footer = () => (
  <footer
    data-testid="footer"
    style={ { position: 'fixed', bottom: 0 } }
    id="footer"
  >
    <a href="/drinks">
      <img src={ drinkIcon } alt="Drink" data-testid="drinks-bottom-btn" />
    </a>
    <a href="/foods">
      <img src={ mealIcon } alt="Foods" data-testid="food-bottom-btn" />
    </a>
  </footer>

);

export default Footer;
