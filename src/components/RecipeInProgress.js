import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import CardProgress from './CardProgress';
import '../CSS/RecipeInProgress.css';

function RecipeInProgress({ pathName }) {
  const {
    searchRecipeDetails,
    recipeDetails,
    ingredients,
    setIngredients,
    measures,
    setMeasures,
  } = useContext(Context);

  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  let doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : [];

  let inProgressRecipes = localStorage.getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes'))
    : {
      meals: [],
      cocktails: [],
    };

  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const saveInProgress = () => {
    if (pathName === 'foods') {
      if (!Object.keys(inProgressRecipes.meals).includes(id)) {
        inProgressRecipes = {
          ...inProgressRecipes,
          meals: { ...inProgressRecipes.meals, [id]: [] },
        };
      }
    } else if (!Object.keys(inProgressRecipes.cocktails).includes(id)) {
      inProgressRecipes = {
        ...inProgressRecipes,
        cocktails: { ...inProgressRecipes.cocktails, [id]: [] },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  useEffect(() => {
    saveInProgress();
    if (pathName === 'foods') {
      setCheckedIngredients(inProgressRecipes.meals[id]);
    } else { setCheckedIngredients(inProgressRecipes.cocktails[id]); }
  }, []);

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

  const saveMealsIngredients = (ing) => {
    const nNum = -1;
    inProgressRecipes.meals[id] = inProgressRecipes
      .meals[id].indexOf(ing) === nNum
      ? inProgressRecipes.meals[id] = [...inProgressRecipes.meals[id], ing]
      : inProgressRecipes.meals[id]
        .filter((item) => item !== ing);
  };

  const saveDrinkIngredients = (ing) => {
    const nNum = -1;
    inProgressRecipes.cocktails[id] = inProgressRecipes
      .cocktails[id].indexOf(ing) === nNum
      ? inProgressRecipes.cocktails[id] = [...inProgressRecipes.cocktails[id], ing]
      : inProgressRecipes.cocktails[id]
        .filter((item) => item !== ing);
  };

  const saveIngredients = (ing) => {
    if (pathName === 'foods') {
      saveMealsIngredients(ing);
      setCheckedIngredients(inProgressRecipes.meals[id]);
    } else {
      saveDrinkIngredients(ing);
      setCheckedIngredients(inProgressRecipes.cocktails[id]);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  const goToDoneRecipes = () => {
    const today = new Date();

    if (pathName === 'foods') {
      const objectFood = {
        id,
        type: 'food',
        nationality: recipeDetails.strArea,
        category: recipeDetails.strCategory,
        alcoholicOrNot: '',
        name: recipeDetails.strMeal,
        image: recipeDetails.strMealThumb,
        doneDate: today.getDate(),
        tags: recipeDetails.strTags ? recipeDetails.strTags.split(', ') : [],
      };
      doneRecipes = [...doneRecipes, objectFood];
    } else {
      const objectDrink = {
        id,
        type: 'drink',
        nationality: '',
        category: recipeDetails.strCategory,
        alcoholicOrNot: recipeDetails.strAlcoholic,
        name: recipeDetails.strDrink,
        image: recipeDetails.strDrinkThumb,
        doneDate: today.getDate(),
        tags: [],
      };
      doneRecipes = [...doneRecipes, objectDrink];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
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

  return (
    <div>
      <CardProgress
        pathName={ pathName }
        measures={ measures }
        recipeDetails={ recipeDetails }
        ingredients={ ingredients }
        saveIngredients={ saveIngredients }
        checkedIngredients={ checkedIngredients }
      />

      <button
        className="finish-recipe-btn"
        data-testid="finish-recipe-btn"
        type="button"
        disabled={
          checkedIngredients.length !== ingredients.length
        }
        onClick={ goToDoneRecipes }
      >
        Finalizar
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  pathName: PropTypes.string.isRequired,
};

export default RecipeInProgress;
