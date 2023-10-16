import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testando o componente App.js', () => {
    it('Testa se aparece todos botoes', async () => {
        const { history } = renderWithRouter(<App />)
        history.push('/foods')

        const allButtonEl = screen.getByTestId(/All-category-filter/i)
        const buttonsEl1 = await screen.findByTestId(/Beef-category-filter/i)
        const buttonsEl2 = await screen.findByTestId(/Breakfast-category-filter/i)
        const buttonsEl3 = await screen.findByTestId(/Chicken-category-filter/i)
        const buttonsEl4 = await screen.findByTestId(/Dessert-category-filter/i)
        const buttonsEl5 = await screen.findByTestId(/Goat-category-filter/i)

        expect(allButtonEl).toBeInTheDocument()
        expect(buttonsEl1).toBeInTheDocument()
        expect(buttonsEl2).toBeInTheDocument()
        expect(buttonsEl3).toBeInTheDocument()
        expect(buttonsEl4).toBeInTheDocument()
        expect(buttonsEl5).toBeInTheDocument()

        fireEvent.click(buttonsEl1)
        const recipeEl1 = await screen.findByTestId('0-card-name')
        expect(recipeEl1).toBeInTheDocument()

        fireEvent.click(buttonsEl2)
        const recipeEl2 = await screen.findByTestId('0-card-name')
        expect(recipeEl2).toBeInTheDocument()

        fireEvent.click(buttonsEl3)
        const recipeEl3 = await screen.findByTestId('0-card-name')
        expect(recipeEl3).toBeInTheDocument()

        fireEvent.click(buttonsEl5)
        const recipeEl4 = await screen.findByTestId('0-card-name')
        expect(recipeEl4).toBeInTheDocument()

        fireEvent.click(allButtonEl)
        const recipeEl5 = await screen.findByTestId('0-card-name')
        expect(recipeEl5).toBeInTheDocument()

    });

    it('Testa se aparece todos botoes na page drinks', async () => {
      const { history } = renderWithRouter(<App />)
      history.push('/drinks')

      const allButtonEl = screen.getByTestId(/All-category-filter/i)
      const buttonsEl1 = await screen.findByTestId(/Ordinary Drink-category-filter/i)
      const buttonsEl2 = await screen.findByTestId(/Cocktail-category-filter/i)
      const buttonsEl3 = await screen.findByTestId(/Shake-category-filter/i)
      const buttonsEl4 = await screen
        .findByTestId('Other/Unknown-category-filter')
      const buttonsEl5 = await screen.findByTestId(/Cocoa-category-filter/i)

      expect(allButtonEl).toBeInTheDocument()
      expect(buttonsEl1).toBeInTheDocument()
      expect(buttonsEl2).toBeInTheDocument()
      expect(buttonsEl3).toBeInTheDocument()
      expect(buttonsEl4).toBeInTheDocument()
      expect(buttonsEl5).toBeInTheDocument()

      fireEvent.click(buttonsEl1)
      const recipeEl1 = await screen.findByTestId('0-card-name')
      expect(recipeEl1).toBeInTheDocument()

      fireEvent.click(buttonsEl2)
      const recipeEl2 = await screen.findByTestId('0-card-name')
      expect(recipeEl2).toBeInTheDocument()

      fireEvent.click(buttonsEl3)
      const recipeEl3 = await screen.findByTestId('0-card-name')
      expect(recipeEl3).toBeInTheDocument()

      fireEvent.click(buttonsEl5)
      const recipeEl4 = await screen.findByTestId('0-card-name')
      expect(recipeEl4).toBeInTheDocument()

      fireEvent.click(allButtonEl)
      const recipeEl5 = await screen.findByTestId('0-card-name')
      expect(recipeEl5).toBeInTheDocument()
    })

    it('Testa o clique de um botão', async () => {
      const { history } = renderWithRouter(<App />)
      history.push('/foods')

      const buttonsEl1 = await screen.findByTestId(/Goat-category-filter/i)
      expect(buttonsEl1).toBeInTheDocument()
      
      fireEvent.click(buttonsEl1)
      await waitFor(() => {
        const cardEls = screen.queryAllByTestId(/recipe-card/i)
        expect(cardEls.length).toBe(1)
      })
      fireEvent.click(buttonsEl1)
      await waitFor(() => {
        const cardEls = screen.queryAllByTestId(/recipe-card/i)
        expect(cardEls.length).toBe(12)
      })
    });

    it('Testa o clique de um botão', async () => {
      const { history } = renderWithRouter(<App />)
      history.push('/drinks')

      const buttonsEl1 = await screen.findByTestId(/Ordinary Drink-category-filter/i)
      expect(buttonsEl1).toBeInTheDocument()
      
      fireEvent.click(buttonsEl1)
      await waitFor(() => {
        const cardEls = screen.queryAllByText(/3-Mile Long Island Iced Tea/i)
        expect(cardEls.length).toBe(2)
      })
      fireEvent.click(buttonsEl1)
      await waitFor(() => {
        const cardEls = screen.queryAllByText(/GG/i)
        expect(cardEls.length).toBe(2)
      })
    });
})