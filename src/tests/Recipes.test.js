import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente App.js', () => {
    it('Testa se aparece todos componentes', async () => {
        const { history } = renderWithRouter(<App />)
        history.push('/foods')

        const cardEls = await screen.findAllByTestId(/recipe-card/i)
        expect(cardEls.length).toBe(12)
    });

    it('Testa se aparece todos componentes', async () => {
        const { history } = renderWithRouter(<App />)
        history.push('/drinks')

        const cardEls = await screen.findAllByTestId(/recipe-card/i)
        expect(cardEls.length).toBe(12)
    });

    it('Testa se aparece todos componentes com os data-test-id', async () => {
      const { history } = renderWithRouter(<App />)
      history.push('/foods')

      const cardEls = await screen.findAllByTestId(/recipe-card/i)
      const cardImgEls = await screen.findAllByTestId(/card-img/i)
      const cardStrEls = await screen.findAllByTestId(/card-name/i)

      expect(cardEls.length).toBe(12)
      expect(cardImgEls.length).toBe(12)
      expect(cardStrEls.length).toBe(12)
  });

  it('Testa se aparece todos componentes na page drinks', async () => {
    const { history } = renderWithRouter(<App />)
    history.push('/drinks')

    const cardEls = await screen.findAllByTestId(/recipe-card/i)
    const cardImgEls = await screen.findAllByTestId(/card-img/i)
    const cardStrEls = await screen.findAllByTestId(/card-name/i)

    expect(cardEls.length).toBe(12)
    expect(cardImgEls.length).toBe(12)
    expect(cardStrEls.length).toBe(12)
  });
})