import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Context from '../context/Context';
import CardsDetails from './CardsDetails';
import '../CSS/RecipeDetails.css';

const RecipeDetails = () => {
  const {
    searchRecipeDetails,
    recipeDetails,
    foodList,
    searchAPIFood,
    drinksList,
    searchAPIDrinks,
    ingredients,
    setIngredients,
    measures,
    setMeasures,
  } = useContext(Context);

  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : [];

  let inProgressRecipes = localStorage.getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes'))
    : {};

  const [isDone, setIsDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const pathName = location.pathname.split('/')[1];
  const maxNumber = 6;
  const listRecipes = pathName === 'foods'
    ? drinksList.slice(0, maxNumber)
    : foodList.slice(0, maxNumber);

  const getIngredients = () => {
    const data = recipeDetails;
    const data2 = Object.values(Object.entries(data));
    data2.forEach((dataValue) => {
      const ingredientKey = Object.values(dataValue)[0]
        .includes('strIngredient');
      if (ingredientKey && Boolean(Object.values(dataValue)[0])) {
        const ingredientValue = Object.values(dataValue)[1];
        if (ingredientValue !== null && ingredientValue.length !== 0) {
          setIngredients((prevArray) => [...prevArray, ingredientValue]);
        }
      }
    });
  };

  const getMeasures = () => {
    const data2 = Object.values(Object.entries(recipeDetails));
    data2.forEach((dataValue) => {
      const mesKey = Object.values(dataValue)[0]
        .includes('strMeasure');
      if (mesKey && Boolean(Object.values(dataValue)[0])) {
        const mesValue = Object.values(dataValue)[1];
        if (mesValue !== null && mesValue.length !== 0 && mesValue !== undefined) {
          setMeasures((prevArray) => [...prevArray, mesValue]);
        }
      }
    });
  };

  const saveInProgress = () => {
    if (pathName === 'foods') {
      inProgressRecipes = {
        ...inProgressRecipes,
        meals: { ...inProgressRecipes.meals, [id]: [] },
      };
    } else {
      inProgressRecipes = {
        ...inProgressRecipes,
        cocktails: { ...inProgressRecipes.cocktails, [id]: [] },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  useEffect(() => {
    searchRecipeDetails(id, pathName);
  }, []);

  useEffect(() => {
    setIngredients([]);
    setMeasures([]);
    getIngredients();
    getMeasures();
  }, [recipeDetails]);

  useEffect(() => {
    const idRecipe = pathName === 'foods'
      ? 'idMeal'
      : 'idDrink';

    doneRecipes.forEach((recipe) => {
      if (recipe.id === recipeDetails[idRecipe]) {
        setIsDone(true);
      }
    });

    if (pathName === 'foods'
    && Object.keys(inProgressRecipes).length !== 0
    && Object.keys(inProgressRecipes).includes('meals')) {
      Object.keys(inProgressRecipes.meals).forEach((idMeal) => {
        if (idMeal === recipeDetails[idRecipe]) {
          setInProgress(true);
        }
      });
    } else if (pathName === 'drinks'
    && Object.keys(inProgressRecipes).length !== 0
    && Object.keys(inProgressRecipes).includes('cocktails')) {
      Object.keys(inProgressRecipes.cocktails).forEach((idDrink) => {
        if (idDrink === recipeDetails[idRecipe]) {
          setInProgress(true);
        }
      });
    }
  }, [ingredients]);

  useEffect(() => (
    pathName === 'foods'
      ? searchAPIDrinks('', 'default')
      : searchAPIFood('', 'default')),
  []);

  return (
    <div>
      <CardsDetails
        pathName={ pathName }
        measures={ measures }
        listRecipes={ listRecipes }
        recipeDetails={ recipeDetails }
        ingredients={ ingredients }
      />
      {
        isDone
          ? ''
          : (
            <Link
              to={ pathName === 'foods'
                ? `/foods/${recipeDetails.idMeal}/in-progress`
                : `/drinks/${recipeDetails.idDrink}/in-progress` }
              onClick={ inProgress ? null : saveInProgress }
            >
              <button
                type="button"
                className="start-recipe-btn"
                data-testid="start-recipe-btn"
              >
                { inProgress ? 'Continue Recipe' : 'Start Recipe' }
              </button>
            </Link>
          )
      }

    </div>
  );
};

export default RecipeDetails;
