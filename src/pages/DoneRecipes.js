import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import RecipesFilter from '../components/RecipesFilter';
import '../CSS/DoneRecipes.css';

const DoneRecipes = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [copiedList, setCopiedList] = useState([]);

  useEffect(() => {
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    return doneRecipesList !== null ? setRecipeList(doneRecipesList) : null;
  }, []);

  const linkSaved = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopiedList((prevList) => [...prevList, id]);
  };

  const getAllRecipes = () => {
    const allRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipeList(allRecipesList);
  };

  const getFoodRecipes = () => {
    let allRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    allRecipesList = allRecipesList.filter((recipe) => recipe.type === 'food');
    setRecipeList(allRecipesList);
  };

  const getDrinkRecipes = () => {
    let allRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    allRecipesList = allRecipesList.filter((recipe) => recipe.type === 'drink');
    setRecipeList(allRecipesList);
  };

  return (
    <main>
      <Header name="Done Recipes" />
      <RecipesFilter
        getAllRecipes={ getAllRecipes }
        getFoodRecipes={ getFoodRecipes }
        getDrinkRecipes={ getDrinkRecipes }
      />
      <section className="recipes-container-done">
        {
          recipeList.map((recipe, index) => (
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
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  Feito no dia
                  {' '}
                  {recipe.doneDate}
                </p>
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
                </div>
                { copiedList.includes(recipe.id)
                  ? <p style={ { color: 'purple' } }>Link copied!</p>
                  : null }
                <div />
              </div>
            </div>
          ))
        }
      </section>
    </main>
  );
};

export default DoneRecipes;
