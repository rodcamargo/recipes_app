import React from 'react';
import PropTypes from 'prop-types';
import ShareAndFavorites from './ShareAndFavorites';
import '../CSS/CardDetails.css';

const CardProgress = ({
  pathName,
  measures,
  recipeDetails,
  ingredients,
  saveIngredients,
  checkedIngredients,
}) => (
  <div>
    {
      pathName === 'foods'
        ? (
          <div>
            <img
              className="recipe-photo"
              data-testid="recipe-photo"
              src={ recipeDetails.strMealThumb }
              alt={ recipeDetails.strMeal }
            />
            <div className="title-buttons">
              <h1
                id="recipe-title"
                data-testid="recipe-title"
              >
                { recipeDetails.strMeal }
              </h1>
              <ShareAndFavorites recipeDetails={ recipeDetails } pathName={ pathName } />
            </div>
            <p
              className="recipe-category"
              data-testid="recipe-category"
            >
              { recipeDetails.strCategory}
            </p>
            <div className="card-backg">
              <h3 className="subtitle-card">Ingredients</h3>
              <ul>
                {
                  ingredients.map((ing, index) => (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        className="ingredient-step"
                        type="checkbox"
                        id={ `${index}-ingredient-step` }
                        name="ingredients"
                        onChange={ () => saveIngredients(ing) }
                        checked={
                          checkedIngredients.includes(ing)
                        }
                      />
                      <label
                        htmlFor={ `${index}-ingredient-step` }
                        className="ingredient-step"
                      >
                        {
                          ` ${ing} ${measures[index] ? measures[index] : ''}`
                        }
                      </label>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="card-backg">
              <h3 className="subtitle-card">Instructions</h3>
              <p
                className="instructions"
                data-testid="instructions"
              >
                { recipeDetails.strInstructions}
              </p>
            </div>
          </div>
        )
        : (
          <div>
            <img
              className="recipe-photo"
              data-testid="recipe-photo"
              src={ recipeDetails.strDrinkThumb }
              alt={ recipeDetails.strDrink }
              width={ 150 }
            />
            <div className="title-buttons">
              <h1
                id="recipe-title"
                data-testid="recipe-title"
              >
                { recipeDetails.strDrink }
              </h1>
              <ShareAndFavorites recipeDetails={ recipeDetails } pathName={ pathName } />
            </div>
            <p
              className="recipe-category"
              data-testid="recipe-category"
            >
              { recipeDetails.strCategory}
            </p>
            <p
              className="recipe-category"
              data-testid="recipe-category"
            >
              {recipeDetails.strAlcoholic}
            </p>

            <div className="card-backg">
              <h3 className="subtitle-card">Ingredients</h3>
              <ul>
                {
                  ingredients.map((ingredient, index) => (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        id={ `${index}-ingredient-step` }
                        name="ingredients"
                        onChange={ () => saveIngredients(ingredient) }
                        checked={
                          checkedIngredients.includes(ingredient)
                        }
                      />
                      <label htmlFor={ `${index}-ingredient-step` }>
                        {
                          ` ${ingredient} ${measures[index] ? measures[index] : ''}`
                        }
                      </label>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="card-backg">
              <h3 className="subtitle-card">Instructions</h3>
              <p
                className="instructions"
                data-testid="instructions"
              >
                { recipeDetails.strInstructions}
              </p>
            </div>
          </div>
        )
    }
  </div>
);

CardProgress.propTypes = {
  recipeDetails: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  pathName: PropTypes.string.isRequired,
  measures: PropTypes.arrayOf(Array).isRequired,
  ingredients: PropTypes.arrayOf(Array).isRequired,
  saveIngredients: PropTypes.func.isRequired,
  checkedIngredients: PropTypes.arrayOf(Array).isRequired,
};

export default CardProgress;
