import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';


describe('Testando o componente App.js', () => {
  it('Testa a API de Ingredientes em Foods', async () => {
    const { history } = renderWithRouter(<App />)
    history.push('/foods')

    const btnSearchEl = screen.getByTestId(/btn-search/i)
    expect(btnSearchEl).toBeInTheDocument()

    fireEvent.click(btnSearchEl)
    const inputEl = screen.getByTestId(/search-input/i)
    expect(inputEl).toBeInTheDocument()

    userEvent.type(inputEl, 'chicken')
    const ingredientEl = screen.getByTestId(/ingredient-search-radio/i)
    expect(ingredientEl).toBeInTheDocument()
    fireEvent.click(ingredientEl)

    const btnSearch = screen.getByTestId(/exec-search-btn/i)
    fireEvent.click(btnSearch)

    const cardEls = await screen.findAllByTestId(/recipe-card$/i)
    expect(cardEls.length).toBe(11)
  });

  it('Testa a API de Ingredientes em Drinks', async () => {
    const { history } = renderWithRouter(<App />)
    history.push('/drinks')

    const btnSearchEl = screen.getByTestId(/btn-search/i)
    expect(btnSearchEl).toBeInTheDocument()

    fireEvent.click(btnSearchEl)
    const inputEl = screen.getByTestId(/search-input/i)
    expect(inputEl).toBeInTheDocument()

    userEvent.type(inputEl, 'chocolate')
    const ingredientEl = screen.getByTestId(/ingredient-search-radio/i)
    expect(ingredientEl).toBeInTheDocument()
    fireEvent.click(ingredientEl)

    const btnSearch = screen.getByTestId(/exec-search-btn/i)
    fireEvent.click(btnSearch)

    const cardEls = await screen.findAllByTestId(/recipe-card$/i)
    expect(cardEls.length).toBe(5)
  });

  it('Verifica se o campo de pesquisa aparece ao clicar no botão aparecer', () => {
    const { history } = renderWithRouter(<App />)
    history.push('/foods')

    const btnSearch = screen.getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();
    fireEvent.click(btnSearch)

    const inputSearch = screen.getByTestId('search-input')
    expect(inputSearch).toBeInTheDocument();

    fireEvent.click(btnSearch)
    expect(inputSearch).not.toBeInTheDocument();
  });

  it('Verifica se exitem os ícones de perfil e pesquisa', () => {
    const { history } = renderWithRouter(<App />)
    history.push('/foods')

    let btnSearch = screen.getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();

    history.push('/profile')
    btnSearch = screen.queryByTestId('search-top-btn');

    const btnSearchEl = screen.queryByTestId(/btn-search/i)
    expect(btnSearchEl).not.toBeInTheDocument();

  });

  it('Testa global alert em foods', async () => {
    const { history } = renderWithRouter(<App />)
    history.push('/foods')

    const btnSearchEl = screen.getByTestId(/btn-search/i)
    expect(btnSearchEl).toBeInTheDocument()
    fireEvent.click(btnSearchEl)

    const inputEl = screen.getByTestId(/search-input/i)
    expect(inputEl).toBeInTheDocument()

    userEvent.type(inputEl, 'chocolate')
    const ingredientEl = screen.getByTestId(/first-letter-search-radio/i)
    expect(ingredientEl).toBeInTheDocument()
    fireEvent.click(ingredientEl)

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const btnSearch = screen.getByTestId(/exec-search-btn/i)
    fireEvent.click(btnSearch)

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(1)
    })
  });

  it('Testa global alert em drinks', async () => {
    const { history } = renderWithRouter(<App />)
    history.push('/drinks')

    const btnSearchEl = screen.getByTestId(/btn-search/i)
    expect(btnSearchEl).toBeInTheDocument()
    fireEvent.click(btnSearchEl)

    const inputEl = screen.getByTestId(/search-input/i)
    expect(inputEl).toBeInTheDocument()

    userEvent.type(inputEl, 'asddd')
    const ingredientEl = screen.getByTestId(/first-letter-search-radio/i)
    expect(ingredientEl).toBeInTheDocument()
    fireEvent.click(ingredientEl)

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const btnSearch = screen.getByTestId(/exec-search-btn/i)
    fireEvent.click(btnSearch)

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(1)
    })
  });

  it('Testa global alert em foods name', async () => {
    const { history } = renderWithRouter(<App />)
    history.push('/foods')

    const btnSearchEl = screen.getByTestId(/btn-search/i)
    expect(btnSearchEl).toBeInTheDocument()
    fireEvent.click(btnSearchEl)

    const inputEl = screen.getByTestId(/search-input/i)
    expect(inputEl).toBeInTheDocument()

    userEvent.type(inputEl, 'asddd')
    const ingredientEl = screen.getByTestId(/name-search-radio/i)
    expect(ingredientEl).toBeInTheDocument()
    fireEvent.click(ingredientEl)

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const btnSearch = screen.getByTestId(/exec-search-btn/i)
    fireEvent.click(btnSearch)

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(1)
    })
  });

  it('Testa global alert em drinks name', async () => {
    const { history } = renderWithRouter(<App />)
    history.push('/drinks')

    const btnSearchEl = screen.getByTestId(/btn-search/i)
    expect(btnSearchEl).toBeInTheDocument()
    fireEvent.click(btnSearchEl)

    const inputEl = screen.getByTestId(/search-input/i)
    expect(inputEl).toBeInTheDocument()

    userEvent.type(inputEl, 'asddd')
    const ingredientEl = screen.getByTestId(/name-search-radio/i)
    expect(ingredientEl).toBeInTheDocument()
    fireEvent.click(ingredientEl)

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const btnSearch = screen.getByTestId(/exec-search-btn/i)
    fireEvent.click(btnSearch)

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(1)
    })
  });

  it('Testa redirect', async () => {
    const { history } = renderWithRouter(<App />)
    history.push('/foods')

    const btnSearchEl = screen.getByTestId(/btn-search/i)
    expect(btnSearchEl).toBeInTheDocument()
    fireEvent.click(btnSearchEl)

    const inputEl = screen.getByTestId(/search-input/i)
    expect(inputEl).toBeInTheDocument()

    userEvent.type(inputEl, 'Arrabiata')
    const ingredientEl = screen.getByTestId(/name-search-radio/i)
    fireEvent.click(ingredientEl)
    
    const btnSearch = screen.getByTestId(/exec-search-btn/i)
    fireEvent.click(btnSearch)

    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52771')
    })
  });
})