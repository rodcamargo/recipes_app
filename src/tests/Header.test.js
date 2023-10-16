import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testes no componente "Header"', () => {
  it('Verifica se exitem os ícones de perfil e pesquisa', () => {
    const { history } = renderWithRouter(<App />)
    history.push('/foods')

    const imgProfile = screen.getByRole('img', {  name: /profile/i});
    expect(imgProfile).toBeInTheDocument();
    const imgSearch = screen.getByRole('img', {  name: /search/i});
    expect(imgSearch).toBeInTheDocument();
    const title = screen.getAllByRole('heading', { name: /foods/i});
    expect(title[0]).toBeInTheDocument();
  });

  it('Verifica se exite só um ícone na página', () => {
    const { history } = renderWithRouter(<App />)
    history.push('/profile')

    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(3);
 
  })

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
  
})