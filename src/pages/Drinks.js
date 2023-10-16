import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import '../CSS/FoodsDrinks.css';

const Drinks = () => {
  const { drinksList, searchAPIDrinks, isRedirect } = useContext(Context);
  const maxNumber = 12;
  const newDrinkList = drinksList.slice(0, maxNumber);
  useEffect(() => {
    searchAPIDrinks('', 'default');
  }, []);

  return (
    <main className="fd-page">
      <Header name="Drinks" />
      <SearchBar namePath="Drinks" />
      <Categories namePath="Drinks" />
      {
        drinksList.length === 1 && isRedirect
          ? <Redirect to={ `/drinks/${drinksList[0].idDrink}` } />
          : null
      }
      <section className="recipes-container">
        {
          newDrinkList === null ? ''
            : newDrinkList.map((drink, index) => (
              <Link key={ index } to={ `/drinks/${drink.idDrink}` }>
                <Recipes recipe={ drink } isFood={ false } index={ index } />
              </Link>
            ))
        }
      </section>
      <Footer />
    </main>
  );
};

export default Drinks;
