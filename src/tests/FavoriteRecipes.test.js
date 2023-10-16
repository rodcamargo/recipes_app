import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const favoriteRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot:  'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
];

Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
});

describe('Testando o componente FavoriteRecipes.js', () => {
    it('Testa se aparece todos componentes', async () => {
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        const { history } = renderWithRouter(<App />)
        history.push('/favorite-recipes')

        const cardEls = await screen.findAllByTestId(/horizontal-image/i)
        expect(cardEls.length).toBe(2)
    });

    it('Testa se aparece todos botoes', async () => {
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        const { history } = renderWithRouter(<App />)
        history.push('/favorite-recipes')

        const btnEl1 = screen.getByTestId(/filter-by-all-btn/i)
        const btnEl2 = screen.getByTestId(/filter-by-food-btn/i)
        const btnEl3 = screen.getByTestId(/filter-by-drink-btn/i)

        expect(btnEl1).toBeInTheDocument();
        expect(btnEl2).toBeInTheDocument();
        expect(btnEl3).toBeInTheDocument();

    });

    it('Testa o botão de compartilhar parte 1', async () => {
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        const { history } = renderWithRouter(<App />)
        history.push('/favorite-recipes')
        const shareEls = await screen.findAllByTestId(/horizontal-share-btn/i)

        expect(shareEls[0]).toBeInTheDocument();
        userEvent.click(shareEls[0]);
        const copyEl = screen.getAllByText(/Link copied!/i)
        expect(copyEl[0]).toBeInTheDocument()
    });

    it('Testa todos elementos dos componentes', async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      const { history } = renderWithRouter(<App />)
      history.push('/favorite-recipes')

      const imgEls = await screen.findAllByTestId(/horizontal-image/i)
      const nameEls = await screen.findAllByTestId(/horizontal-name/i)
      const categoryEls = await screen.findAllByTestId(/horizontal-top-text/i)
      const shareEls = await screen.findAllByTestId(/horizontal-share-btn/i)

      const alcoholicEl = await screen.findByText(/Alcoholic/)

      expect(imgEls.length).toBe(2)
      expect(nameEls.length).toBe(2)
      expect(categoryEls.length).toBe(2)
      expect(shareEls.length).toBe(2)
      expect(alcoholicEl).toBeInTheDocument()      
  });

  it('Testa se aparece todos botoes de filtro', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithRouter(<App />)
    history.push('/favorite-recipes')

    const btnEl1 = screen.getByTestId(/filter-by-all-btn/i)
    const btnEl2 = screen.getByTestId(/filter-by-food-btn/i)
    const btnEl3 = screen.getByTestId(/filter-by-drink-btn/i)

    expect(btnEl1).toBeInTheDocument();
    expect(btnEl2).toBeInTheDocument();
    expect(btnEl3).toBeInTheDocument();

    fireEvent.click(btnEl2)
    const imgEls1 = await screen.findAllByTestId(/horizontal-image/i)
    expect(imgEls1.length).toBe(2)

    fireEvent.click(btnEl3)
    const imgEls2 = await screen.findAllByTestId(/horizontal-image/i)
    expect(imgEls2.length).toBe(1)

    fireEvent.click(btnEl1)
    const imgEls3 = await screen.findAllByTestId(/horizontal-image/i)
    expect(imgEls3.length).toBe(2)
  });

  it('Testa se o elemento desaparece ao desfavoritar', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithRouter(<App />)
    history.push('/favorite-recipes')

    const btnEls = await screen.findAllByTestId(/horizontal-favorite-btn/i)
    const nameEls = await screen.findAllByTestId(/horizontal-name/i)

    expect(btnEls.length).toBe(2)
    expect(nameEls.length).toBe(2)

    fireEvent.click(btnEls[0])

    const btnEls2 = await screen.findAllByTestId(/horizontal-favorite-btn/i)
    const nameEls2 = await screen.findAllByTestId(/horizontal-name/i)

    expect(btnEls2.length).toBe(1)
    expect(nameEls2.length).toBe(1)
    
  });
})