import React from 'react';
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const doneRecipes = [{
  "id": "178319",
  "type": "drink",
  "nationality": "",
  "category": "Cocktail",
  "alcoholicOrNot": "Alcoholic",
  "name": "Aquamarine",
  "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
  "doneDate": "23/6/2020",
  "tags": []
}];

const inProgressRecipes = {
  meals: {
    52771: [],
  },
  cocktails: {
    178319: [],
  }
}; 

describe('Testes de cobertura no componente "RecipeDetails"', () => {
  beforeEach(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  })

  it('Testa a página de detalhes da comida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const firstImageFood = await screen.findByTestId('0-card-img');
    fireEvent.click(firstImageFood);

    const imageMeal = await screen.findByRole('img', {  name: /corba/i});
    expect(imageMeal).toBeInTheDocument();

    const ingredientList = screen.getAllByRole('list');
    expect(ingredientList).toHaveLength(1);

    const video = screen.getByTitle(/embedded youtube/i);
    expect(video).toBeInTheDocument();

    const imgCarousel = await screen.findByTestId('0-card-img');
    expect(imgCarousel).toBeInTheDocument();
    const imgCarousel1 = await screen.findByTestId('1-card-img');
    expect(imgCarousel1).toBeInTheDocument();
    const imgCarousel2 = await screen.findByTestId('2-card-img');
    expect(imgCarousel2).toBeInTheDocument();
    const imgCarousel3 = await screen.findByTestId('3-card-img');
    expect(imgCarousel3).toBeInTheDocument();
    const imgCarousel4 = await screen.findByTestId('4-card-img');
    expect(imgCarousel4).toBeInTheDocument();
    const imgCarousel5 = await screen.findByTestId('5-card-img');
    expect(imgCarousel5).toBeInTheDocument();
  });
  
  it('Testa a página de detalhes de bebidas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const firstImageDrink = await screen.findByTestId('0-card-img');
    fireEvent.click(firstImageDrink);

    const imageDrink = await screen.findByRole('img', {  name: /gg/i});
    expect(imageDrink).toBeInTheDocument();

    const ingredientList = screen.getAllByRole('list');
    expect(ingredientList).toHaveLength(1);

    const video = screen.queryByTitle(/embedded youtube/i);
    expect(video).not.toBeInTheDocument();

    const imgCarousel = await screen.findByTestId('0-card-img');
    expect(imgCarousel).toBeInTheDocument();
    const imgCarousel1 = await screen.findByTestId('1-card-img');
    expect(imgCarousel1).toBeInTheDocument();
    const imgCarousel2 = await screen.findByTestId('2-card-img');
    expect(imgCarousel2).toBeInTheDocument();
    const imgCarousel3 = await screen.findByTestId('3-card-img');
    expect(imgCarousel3).toBeInTheDocument();
    const imgCarousel4 = await screen.findByTestId('4-card-img');
    expect(imgCarousel4).toBeInTheDocument();
    const imgCarousel5 = await screen.findByTestId('5-card-img');
    expect(imgCarousel5).toBeInTheDocument();
  });

  it('Testa a se o botão desaparece se a receita estiver feita', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319')

    const titleEL = await screen.findByTestId(/recipe-title/i)
    expect(titleEL).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryByText(/Start Recipe/i))
  });

  it('Testa o botão se a receita estiver sendo feita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771')

    const titleEL = await screen.findByTestId(/recipe-title/i)
    expect(titleEL).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByRole('button', {name: /Continue Recipe/i})).toBeInTheDocument()
    })
    
  });

  it('Testa o botão se a receita não estiver sendo feita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52977')

    const titleEL = await screen.findByTestId(/recipe-title/i)
    expect(titleEL).toBeInTheDocument()
    
    const btnEl = screen.getByRole('button', {name: /Start Recipe/i})
    expect(btnEl).toBeInTheDocument()
  });
});