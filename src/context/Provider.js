import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
    btnIsDisabled: true,
  });

  const [foodList, setFoodList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [isRedirect, setIsRedirect] = useState(true);
  const [actualCategory, setActualCategory] = useState('');
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const searchAPIFood = (op, value) => {
    const search = {
      ingrediente: `filter.php?i=${value}`,
      'primeira-letra': `search.php?f=${value}`,
      nome: `search.php?s=${value}`,
    };
    const base = value === 'default'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : `https://www.themealdb.com/api/json/v1/1/${search[op]}`;
    fetch(base)
      .then((res) => res.json())
      .then((res) => {
        if (res.meals === null) {
          return global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
        setFoodList(res.meals);
      });
  };

  const searchAPIDrinks = (op, value) => {
    const search = {
      ingrediente: `filter.php?i=${value}`,
      'primeira-letra': `search.php?f=${value}`,
      nome: `search.php?s=${value}`,
    };
    const base = value === 'default'
      ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
      : `https://www.thecocktaildb.com/api/json/v1/1/${search[op]}`;
    fetch(base)
      .then((res) => res.json())
      .then((res) => {
        if (res.drinks === null) {
          return global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
        setDrinksList(res.drinks);
      });
  };

  const searchFood = (e, namePage) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const foodSelect = formProps['food-select'];
    const searchInput = formProps['search-input'];
    if (foodSelect === 'primeira-letra' && searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (namePage === 'Foods') {
      setIsRedirect(true);
      searchAPIFood(foodSelect, searchInput);
    } else if (namePage === 'Drinks') {
      setIsRedirect(true);
      searchAPIDrinks(foodSelect, searchInput);
    }
  };

  const filterCategory = (namePath, category) => {
    setIsRedirect(false);
    if (category !== actualCategory) {
      setActualCategory(category);
      const base = namePath === 'Foods'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      fetch(base)
        .then((res) => res.json())
        .then((res) => (
          namePath === 'Foods'
            ? setFoodList(res.meals)
            : setDrinksList(res.drinks)
        ));
    } else {
      setActualCategory('');
      return namePath === 'Foods'
        ? searchAPIFood('', 'default')
        : searchAPIDrinks('', 'default');
    }
  };

  const searchRecipeDetails = (id, pathName) => {
    const base = pathName === 'foods'
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(base)
      .then((res) => res.json())
      .then((res) => (
        pathName === 'foods'
          ? setRecipeDetails(res.meals[0])
          : setRecipeDetails(res.drinks[0])
      ));
  };

  const state = {
    login,
    setLogin,
    searchFood,
    isRedirect,
    foodList,
    drinksList,
    recipeDetails,
    searchAPIDrinks,
    searchAPIFood,
    filterCategory,
    searchRecipeDetails,
    ingredients,
    setIngredients,
    measures,
    setMeasures,
  };
  return (
    <Context.Provider value={ state }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
