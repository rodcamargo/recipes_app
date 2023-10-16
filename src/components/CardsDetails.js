import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';
import Recipes from './Recipes';
import ShareAndFavorites from './ShareAndFavorites';
import '../CSS/CardDetails.css';

const breakPoints = [
  { width: 360, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
];

const CardsDetails = ({
  pathName, measures, listRecipes, recipeDetails, ingredients,
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
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {
                        `${ing} ${measures[index] ? measures[index] : ''}`
                      }
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

            <div className="card-video">
              <h3 id="card-video">Video</h3>
              <iframe
                className="recipe-video"
                data-testid="video"
                height="636"
                src={ String(recipeDetails.strYoutube).replace('watch?v=', 'embed/') }
                allowFullScreen
                title="Embedded youtube"
              />
            </div>

            <div className="carousel-wrapper">
              <Carousel breakPoints={ breakPoints }>
                {listRecipes === null ? ''
                  : listRecipes.map((drink, index) => (
                    <div key={ index }>
                      <Link
                        to={ `/drinks/${drink.idDrink}` }
                        data-testid={ `${index}-recomendation-card` }
                      >
                        <Recipes
                          recipe={ drink }
                          isFood={ false }
                          index={ index }
                        />
                      </Link>
                    </div>
                  ))}
              </Carousel>
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
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {
                        `${ingredient} ${measures[index] ? measures[index] : ''}`
                      }
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
            <div className="carousel-wrapper">
              <Carousel breakPoints={ breakPoints }>
                {listRecipes === null ? ''
                  : listRecipes.map((food, index) => (
                    <div key={ index }>
                      <Link
                        to={ `/foods/${food.idMeal}` }
                        data-testid={ `${index}-recomendation-card` }
                      >
                        <Recipes recipe={ food } isFood index={ index } />
                      </Link>
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>
        )
    }
  </div>
);

CardsDetails.propTypes = {
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
  listRecipes: PropTypes.arrayOf(Array).isRequired,
};

export default CardsDetails;
