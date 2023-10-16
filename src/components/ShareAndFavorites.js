import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../CSS/ShareAndFavorites.css';

function ShareAndFavorites({ recipeDetails, pathName }) {
  const location = useLocation();
  const [isLinkSaved, setIsLinkSaved] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const linkSaved = () => {
    const maxNumber = 3;
    copy(`http://localhost:3000${location.pathname
      .split('/').slice(0, maxNumber).join('/')}`);
    setIsLinkSaved(true);
  };

  const searchFavorite = () => {
    const favoriteList = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes'))
      : [];

    return pathName === 'foods'
      ? favoriteList.forEach((recipe) => {
        if (recipe.id === recipeDetails.idMeal) {
          setIsFavorited(true);
        }
      })
      : favoriteList.forEach((recipe) => {
        if (recipe.id === recipeDetails.idDrink) {
          setIsFavorited(true);
        }
      });
  };

  const removeFavoriteRecipe = () => {
    let favoriteList = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes'))
      : [];
    if (pathName === 'foods') {
      favoriteList = favoriteList.filter((recipe) => (
        recipe.id !== recipeDetails.idMeal
      ));
    } else {
      favoriteList = favoriteList.filter((recipe) => (
        recipe.id !== recipeDetails.idDrink
      ));
    }
    setIsFavorited(false);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteList));
  };

  const favoriteRecipe = () => {
    const favoriteList = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes'))
      : [];
    if (pathName === 'foods') {
      favoriteList.push({
        id: recipeDetails.idMeal,
        type: 'food',
        nationality: recipeDetails.strArea,
        category: recipeDetails.strCategory,
        alcoholicOrNot: '',
        name: recipeDetails.strMeal,
        image: recipeDetails.strMealThumb,
      });
    } else {
      favoriteList.push({
        id: recipeDetails.idDrink,
        type: 'drink',
        nationality: '',
        category: recipeDetails.strCategory,
        alcoholicOrNot: recipeDetails.strAlcoholic,
        name: recipeDetails.strDrink,
        image: recipeDetails.strDrinkThumb,
      });
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteList));
    searchFavorite();
  };

  useEffect(() => {
    searchFavorite();
  }, [recipeDetails]);

  return (
    <div id="main">
      <button
        type="button"
        onClick={ () => linkSaved() }
      >
        <img
          src={ shareIcon }
          alt="shareIcon"
          data-testid="share-btn"
        />
      </button>
      { isLinkSaved ? <p>Link copied!</p> : null}
      <button
        type="button"
        onClick={
          isFavorited
            ? () => removeFavoriteRecipe()
            : () => favoriteRecipe()
        }
      >
        <img
          src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
          alt={ isFavorited ? 'blackHeartIcon' : 'whiteHeartIcon' }
          data-testid="favorite-btn"
        />
      </button>
    </div>
  );
}

ShareAndFavorites.propTypes = {
  recipeDetails: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    idMeal: PropTypes.string,
    strArea: PropTypes.string,
    strAlcoholic: PropTypes.string,
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  pathName: PropTypes.string.isRequired,
};

export default ShareAndFavorites;
