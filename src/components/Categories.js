import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import '../CSS/Categories.css';

const Categories = ({ namePath }) => {
  const { filterCategory, searchAPIFood, searchAPIDrinks } = useContext(Context);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const base = namePath === 'Foods'
      ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    fetch(base)
      .then((res) => res.json())
      .then((res) => (
        namePath === 'Foods'
          ? setCategories(res.meals)
          : setCategories(res.drinks)
      ));
  }, []);

  const maxNumber = 11;
  return (
    <div id="categories-container">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={
          namePath === 'Foods'
            ? () => searchAPIFood('', 'default')
            : () => searchAPIDrinks('', 'default')
        }
      >
        All
      </button>
      {
        categories.slice(0, maxNumber).map((categorie, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${categorie.strCategory}-category-filter` }
            onClick={ () => filterCategory(namePath, categorie.strCategory) }
          >
            {categorie.strCategory}

          </button>
        ))
      }
    </div>
  );
};

Categories.propTypes = {
  namePath: PropTypes.string.isRequired,
};

export default Categories;
