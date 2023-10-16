import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot:  'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
];

Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
});

describe('Testando o componente App.js', () => {
    it('Testa se aparece todos componentes', async () => {
        localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
        const { history } = renderWithRouter(<App />)
        history.push('/done-recipes')

        const cardEls = await screen.findAllByTestId(/horizontal-image/i)
        expect(cardEls.length).toBe(2)
    });

    it('Testa se aparece todos botoes', async () => {
        localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
        const { history } = renderWithRouter(<App />)
        history.push('/done-recipes')

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

    it('Testa todos elementos dos componentes', async () => {
        localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
        const { history } = renderWithRouter(<App />)
        history.push('/done-recipes')

        const imgEls = await screen.findAllByTestId(/horizontal-image/i)
        const nameEls = await screen.findAllByTestId(/horizontal-name/i)
        const categoryEls = await screen.findAllByTestId(/horizontal-top-text/i)
        const dateEls = await screen.findAllByTestId(/horizontal-done-date/i)
        const shareEls = await screen.findAllByTestId(/horizontal-share-btn/i)
        const tagEls = await screen.findAllByTestId(/horizontal-tag/i)
        const alcoholicEl = await screen.findByText(/Alcoholic/)

        const btnEl2 = screen.getByTestId(/filter-by-food-btn/i)
        const btnEl3 = screen.getByTestId(/filter-by-drink-btn/i)

        expect(imgEls.length).toBe(2)
        expect(nameEls.length).toBe(2)
        expect(categoryEls.length).toBe(2)
        expect(dateEls.length).toBe(2)
        expect(shareEls.length).toBe(2)
        expect(tagEls.length).toBe(2)
        expect(alcoholicEl).toBeInTheDocument()

        fireEvent.click(btnEl3)
        const imgEls2 = await screen.findAllByTestId(/horizontal-image/i)
        expect(imgEls2.length).toBe(1)

        expect(alcoholicEl).not.toBeInTheDocument()

        
    });

    it('Testa o botão de compartilhar', async () => {
        localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
        const { history } = renderWithRouter(<App />)
        history.push('/done-recipes')
        const shareEls = await screen.findAllByTestId(/horizontal-share-btn/i)

        expect(shareEls[0]).toBeInTheDocument();
        userEvent.click(shareEls[0]);
        const copyEl = screen.getAllByText(/Link copied!/i)
        expect(copyEl[0]).toBeInTheDocument()
    });
})