import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/RecipesFilter.css';

const RecipesFilter = ({ getAllRecipes, getFoodRecipes, getDrinkRecipes }) => (
  <div className="recipes-filter">
    <button
      type="button"
      data-testid="filter-by-all-btn"
      className="btn-fav"
      onClick={ getAllRecipes }
    >
      All
    </button>
    <button
      type="button"
      data-testid="filter-by-food-btn"
      className="btn-fav"
      onClick={ getFoodRecipes }
    >
      Food
    </button>
    <button
      type="button"
      data-testid="filter-by-drink-btn"
      className="btn-fav"
      onClick={ getDrinkRecipes }
    >
      Drinks
    </button>
  </div>
);

RecipesFilter.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  getFoodRecipes: PropTypes.func.isRequired,
  getDrinkRecipes: PropTypes.func.isRequired,

};

export default RecipesFilter;
