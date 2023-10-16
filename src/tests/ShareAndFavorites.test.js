import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

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

describe('Testes de cobertura no componente "ShareAndFavorites"', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  })

  it('Testa a página de detalhes da comida o componente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771');

    
    await waitFor(() => {
        expect(screen.queryByTestId(/favorite-btn/i)).toBeInTheDocument()
        expect(screen.queryByTestId(/favorite-btn/i).alt).toBe('blackHeartIcon')

        const favEl = screen.queryByTestId(/favorite-btn/i)
        fireEvent.click(favEl)
        expect(screen.queryByTestId(/favorite-btn/i).alt).toBe('whiteHeartIcon')

        fireEvent.click(favEl)
        expect(screen.queryByTestId(/favorite-btn/i).alt).toBe('blackHeartIcon')
    })
  });

  it('Testa a página de detalhes da bebida o componente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319');

    await waitFor(() => {
        expect(screen.queryByTestId(/favorite-btn/i)).toBeInTheDocument()
        expect(screen.queryByTestId(/favorite-btn/i).alt).toBe('blackHeartIcon')

        const favEl = screen.queryByTestId(/favorite-btn/i)
        fireEvent.click(favEl)
        expect(screen.queryByTestId(/favorite-btn/i).alt).toBe('whiteHeartIcon')

        fireEvent.click(favEl)
        expect(screen.queryByTestId(/favorite-btn/i).alt).toBe('blackHeartIcon')
    })
  });

  it('Testa o botão de compartilhar', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319');

    const shareEl = await screen.findByTestId(/share-btn/i)

    expect(shareEl).toBeInTheDocument();
    userEvent.click(shareEl);

    const copyEl = screen.getByText(/Link copied!/i)
    expect(copyEl).toBeInTheDocument()
  });

  it('Testa a página de detalhes da comida o componente sem localStorage', async () => {
    localStorage.clear()
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771');

    expect(screen.queryByTestId(/favorite-btn/i)).toBeInTheDocument()
    expect(screen.queryByTestId(/favorite-btn/i).alt).toBe('whiteHeartIcon')

    const favEl = screen.queryByTestId(/favorite-btn/i)
    fireEvent.click(favEl)
    expect(screen.queryByTestId(/favorite-btn/i).alt).toBe('blackHeartIcon')

    fireEvent.click(favEl)
    expect(screen.queryByTestId(/favorite-btn/i).alt).toBe('whiteHeartIcon')
  });

  it('Testa a página de detalhes da bebida o componente sem localStorage', async () => {
    localStorage.clear()
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319');

    expect(screen.queryByTestId(/favorite-btn/i)).toBeInTheDocument()
    expect(screen.queryByTestId(/favorite-btn/i).alt).toBe('whiteHeartIcon')

    const favEl = screen.queryByTestId(/favorite-btn/i)
    fireEvent.click(favEl)
    expect(screen.queryByTestId(/favorite-btn/i).alt).toBe('blackHeartIcon')

    fireEvent.click(favEl)
    expect(screen.queryByTestId(/favorite-btn/i).alt).toBe('whiteHeartIcon')
  });
});