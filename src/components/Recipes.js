import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/Recipes.css';

const Recipes = ({ recipe, isFood, index }) => {
  const { strMeal, strMealThumb } = recipe;
  const { strDrink, strDrinkThumb } = recipe;
  return (
    isFood ? (
      <div
        key={ index }
        data-testid={ `${index}-recipe-card` }
        className="card"
      >
        <img
          alt="recipe-img"
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
        />
        <p data-testid={ `${index}-card-name` } className="card-name">
          {strMeal}
        </p>
      </div>
    )
      : (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
          className="card"
        >
          <img
            alt="recipe-img"
            data-testid={ `${index}-card-img` }
            src={ strDrinkThumb }
          />
          <p data-testid={ `${index}-card-name` } className="card-name">
            {strDrink}
          </p>
        </div>
      )
  );
};

Recipes.propTypes = {
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  isFood: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default Recipes;
