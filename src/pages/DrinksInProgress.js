import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipeInProgress from '../components/RecipeInProgress';

function DrinksInProgress() {
  const location = useLocation();
  const pathName = location.pathname.split('/')[1];

  return (
    <main>
      <RecipeInProgress
        pathName={ pathName }
      />
    </main>
  );
}

export default DrinksInProgress;
