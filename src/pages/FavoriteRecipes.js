import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesFilter from '../components/RecipesFilter';
import '../CSS/FavoriteRecipes.css';

const FavoriteRecipes = () => {
  const [favList, setFavList] = useState([]);
  const [copiedList, setCopiedList] = useState([]);

  useEffect(() => {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favoriteList !== null ? setFavList(favoriteList) : null;
  }, []);

  const linkSaved = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopiedList((prevList) => [...prevList, id]);
  };

  const getAllRecipes = () => {
    const allRecipesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavList(allRecipesList);
  };

  const getFoodRecipes = () => {
    let allRecipesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    allRecipesList = allRecipesList.filter((recipe) => recipe.type === 'food');
    setFavList(allRecipesList);
  };

  const getDrinkRecipes = () => {
    let allRecipesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    allRecipesList = allRecipesList.filter((recipe) => recipe.type === 'drink');
    setFavList(allRecipesList);
  };

  const removeFavoriteRecipe = (id) => {
    const list = favList.filter((recipe) => (
      recipe.id !== id
    ));
    localStorage.setItem('favoriteRecipes', JSON.stringify(list));
    setFavList(list);
  };

  return (
    <main>
      <Header name="Favorite Recipes" />
      <RecipesFilter
        getAllRecipes={ getAllRecipes }
        getFoodRecipes={ getFoodRecipes }
        getDrinkRecipes={ getDrinkRecipes }
      />
      <section className="recipes-container-fav">
        {
          favList.map((recipe, index) => (
            <div
              key={ index }
              className="collumn"
            >
              <div className="card">
                <Link
                  to={
                    recipe.type === 'food'
                      ? `foods/${recipe.id}`
                      : `drinks/${recipe.id}`
                  }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                  <p
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { recipe.name }
                  </p>
                </Link>
                {
                  recipe.type === 'food'
                    ? (
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        {recipe.nationality}
                        {' '}
                        -
                        {' '}
                        {recipe.category}
                      </p>
                    )
                    : (
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        {recipe.category}
                        {' '}
                        -
                        {' '}
                        {
                          recipe.alcoholicOrNot
                        }
                      </p>
                    )
                }
                <div className="wrap-buttons">
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    onClick={ () => linkSaved(recipe.type, recipe.id) }
                  >
                    <img
                      src={ shareIcon }
                      alt="shareIcon"
                      data-testid="share-btn"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={ () => removeFavoriteRecipe(recipe.id) }
                  >
                    <img
                      src={ blackHeartIcon }
                      alt=""
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>
                </div>
                { copiedList.includes(recipe.id)
                  ? <p style={ { color: 'purple' } }>Link copied!</p>
                  : null}
                <div />
              </div>
            </div>
          ))
        }
      </section>
    </main>
  );
};

export default FavoriteRecipes;
