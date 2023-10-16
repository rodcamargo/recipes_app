import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Provider from './context/Provider';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodsId from './pages/FoodsId';
import FoodsInProgress from './pages/FoodsInProgress';
import DrinksId from './pages/DrinksId';
import DrinksInProgress from './pages/DrinksInProgress';

function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods/:id" component={ FoodsId } />
          <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />
          <Route path="/foods" component={ Foods } />
          <Route exact path="/drinks/:id" component={ DrinksId } />
          <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
