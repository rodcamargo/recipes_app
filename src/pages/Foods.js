import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import '../CSS/FoodsDrinks.css';

const Foods = () => {
  const { foodList, searchAPIFood, isRedirect } = useContext(Context);
  const maxNumber = 12;
  const newFoodList = foodList.slice(0, maxNumber);
  useEffect(() => {
    searchAPIFood('', 'default');
  }, []);

  return (
    <main className="fd-page">
      <Header name="Foods" />
      <SearchBar namePath="Foods" />
      <Categories namePath="Foods" />
      {
        foodList.length === 1 && isRedirect
          ? <Redirect to={ `/foods/${foodList[0].idMeal}` } />
          : null
      }
      <section className="recipes-container">
        {
          newFoodList === null ? ''
            : newFoodList.map((food, index) => (
              <Link key={ index } to={ `/foods/${food.idMeal}` }>
                <Recipes recipe={ food } isFood index={ index } />
              </Link>
            ))
        }
      </section>
      <Footer />
    </main>
  );
};

export default Foods;
