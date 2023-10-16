import React from 'react';
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { exact } from 'prop-types';

const doneRecipes = [{
  "id": "178319",
  "type": "drink",
  "nationality": "",
  "category": "Cocktail",
  "alcoholicOrNot": "Alcoholic",
  "name": "Aquamarine",
  "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
  "doneDate": 21,
  "tags": []
}];

const inProgressRecipes = {
  meals:{"52771":["penne rigate","olive oil","garlic"]},
  cocktails:{"178319":["Hpnotiq","Pineapple Juice","Banana Liqueur"]}
}; 

describe('Testes de cobertura no componente "RecipeDetails"', () => {
  beforeEach(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  })

  it('Testa a página de detalhes in progress da comida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52977/in-progress');

    const imageMeal = await screen.findByRole('img', {  name: /corba/i});
    expect(imageMeal).toBeInTheDocument();

    const ingredientList = screen.getAllByRole('list');
    expect(ingredientList).toHaveLength(1);

    const finishEl = screen.getByTestId(/finish-recipe-btn/i)
    expect(finishEl).toBeInTheDocument()
    expect(finishEl).toBeDisabled()
  });

  it('Testa a página de detalhes in progress da drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress');

    const imageMeal = await screen.findByRole('img', {  name: /Aquamarine/i});
    expect(imageMeal).toBeInTheDocument();

    const checkboxEls = await screen.findAllByRole('checkbox')
    fireEvent.click(checkboxEls[0])

    const ingredientList = screen.getAllByRole('list');
    expect(ingredientList).toHaveLength(1);

    const finishEl = screen.getByTestId(/finish-recipe-btn/i)
    expect(finishEl).toBeInTheDocument()
    expect(finishEl).toBeDisabled()
  });

  it('Testa a página de detalhes in progress de bebidas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/15997/in-progress');

    const imageDrink = await screen.findByRole('img', {  name: /gg/i});
    expect(imageDrink).toBeInTheDocument();

    const ingredientList = screen.getAllByRole('list');
    expect(ingredientList).toHaveLength(1);
  });

  it('Testa se o botão finalizar esta na tela', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52977/in-progress')

    const titleEL = await screen.findByTestId(/recipe-title/i)
    expect(titleEL).toBeInTheDocument()
    
    const btnEl = screen.getByRole('button', {name: /finalizar/i})
    expect(btnEl).toBeInTheDocument()
  });

  it('Testa se o botão finalizar esta na tela no drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress')

    const titleEL = await screen.findByTestId(/recipe-title/i)
    expect(titleEL).toBeInTheDocument()
    
    const btnEl = screen.getByRole('button', {name: /finalizar/i})
    expect(btnEl).toBeInTheDocument()
  });

  it('Testa os checkboxs da tela em food recipe', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771/in-progress')

    const titleEL = await screen.findByTestId(/recipe-title/i)
    expect(titleEL).toBeInTheDocument()
    
    const checkboxEls = await screen.findAllByRole('checkbox')
    expect(checkboxEls[0]).toBeChecked()
    expect(checkboxEls[1]).toBeChecked()
    expect(checkboxEls[2]).toBeChecked()
    expect(checkboxEls[3]).not.toBeChecked()
    expect(checkboxEls.length).toBe(8)

    fireEvent.click(checkboxEls[0])
    fireEvent.click(checkboxEls[3])

    expect(checkboxEls[3]).toBeChecked()
    expect(checkboxEls[0]).not.toBeChecked()

    const btnEl = screen.getByRole('button', {name: /finalizar/i})
    expect(btnEl).toBeInTheDocument()
    expect(btnEl).toBeDisabled()
  });

  it('Testa os checkboxs da tela em food recipe e se o botão é habilitado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771/in-progress')

    const titleEL = await screen.findByTestId(/recipe-title/i)
    expect(titleEL).toBeInTheDocument()
    
    const checkboxEls = await screen.findAllByRole('checkbox')
    expect(checkboxEls[0]).toBeChecked()
    expect(checkboxEls[1]).toBeChecked()
    expect(checkboxEls[2]).toBeChecked()

    fireEvent.click(checkboxEls[3])
    fireEvent.click(checkboxEls[4])
    fireEvent.click(checkboxEls[5])
    fireEvent.click(checkboxEls[6])
    fireEvent.click(checkboxEls[7])

    expect(checkboxEls[3]).toBeChecked()
    expect(checkboxEls[4]).toBeChecked()
    expect(checkboxEls[5]).toBeChecked()
    expect(checkboxEls[6]).toBeChecked()
    expect(checkboxEls[7]).toBeChecked()

    expect(checkboxEls.length).toBe(8)

    const btnEl = screen.getByRole('button', {name: /finalizar/i})
    expect(btnEl).toBeInTheDocument()
    expect(btnEl).not.toBeDisabled()
  });

  it('Testa os checkboxs da tela em drink recipe', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress')

    const titleEL = await screen.findByTestId(/recipe-title/i)
    expect(titleEL).toBeInTheDocument()
    
    const checkboxEls = await screen.findAllByRole('checkbox')
    expect(checkboxEls[0]).toBeChecked()
    expect(checkboxEls[1]).toBeChecked()
    expect(checkboxEls[2]).toBeChecked()
    expect(checkboxEls.length).toBe(3)

    const btnEl = screen.getByRole('button', {name: /finalizar/i})
    expect(btnEl).toBeInTheDocument()
    expect(btnEl).not.toBeDisabled()

    fireEvent.click(checkboxEls[0])
    fireEvent.click(checkboxEls[2])

    expect(checkboxEls[0]).not.toBeChecked()
    expect(checkboxEls[2]).not.toBeChecked()

    expect(btnEl).toBeDisabled()
  });

  it('Testa os checkboxs da tela em drink recipe e finaliza a receita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress')

    const titleEL = await screen.findByTestId(/recipe-title/i)
    expect(titleEL).toBeInTheDocument()
    
    const checkboxEls = await screen.findAllByRole('checkbox')
    expect(checkboxEls[0]).toBeChecked()
    expect(checkboxEls[1]).toBeChecked()
    expect(checkboxEls[2]).toBeChecked()
    expect(checkboxEls.length).toBe(3)

    const btnEl = screen.getByRole('button', {name: /finalizar/i})
    expect(btnEl).toBeInTheDocument()
    expect(btnEl).not.toBeDisabled()

    fireEvent.click(btnEl)
    expect(history.location.pathname).toBe('/done-recipes')


  });

  it('Testa os checkboxs da tela em food recipe e finaliza a receita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771/in-progress')

    const titleEL = await screen.findByTestId(/recipe-title/i)
    expect(titleEL).toBeInTheDocument()
    
    const checkboxEls = await screen.findAllByRole('checkbox')
    expect(checkboxEls[0]).toBeChecked()
    expect(checkboxEls[1]).toBeChecked()
    expect(checkboxEls[2]).toBeChecked()

    fireEvent.click(checkboxEls[3])
    fireEvent.click(checkboxEls[4])
    fireEvent.click(checkboxEls[5])
    fireEvent.click(checkboxEls[6])
    fireEvent.click(checkboxEls[7])

    expect(checkboxEls[3]).toBeChecked()
    expect(checkboxEls[4]).toBeChecked()
    expect(checkboxEls[5]).toBeChecked()
    expect(checkboxEls[6]).toBeChecked()
    expect(checkboxEls[7]).toBeChecked()

    expect(checkboxEls.length).toBe(8)

    const btnEl = screen.getByRole('button', {name: /finalizar/i})
    expect(btnEl).toBeInTheDocument()
    expect(btnEl).not.toBeDisabled()

    fireEvent.click(btnEl)
    expect(history.location.pathname).toBe('/done-recipes')

  });

  it('Testa o local storage vazio do foods', async () => {
    localStorage.clear()
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress')

    const titleEL = await screen.findByTestId(/recipe-title/i)
    expect(titleEL).toBeInTheDocument()
    
    const checkboxEls = await screen.findAllByRole('checkbox')
    expect(checkboxEls[0]).not.toBeChecked()
    expect(checkboxEls[1]).not.toBeChecked()
    expect(checkboxEls[2]).not.toBeChecked()
    expect(checkboxEls.length).toBe(3)

    const btnEl = screen.getByRole('button', {name: /finalizar/i})
    expect(btnEl).toBeInTheDocument()
    expect(btnEl).toBeDisabled()

  });

  it('Testa o local storage vazio do drinks', async () => {
    localStorage.clear()
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771/in-progress')

    const titleEL = await screen.findByTestId(/recipe-title/i)
    expect(titleEL).toBeInTheDocument()
    
    const checkboxEls = await screen.findAllByRole('checkbox')
    expect(checkboxEls[0]).not.toBeChecked()
    expect(checkboxEls[1]).not.toBeChecked()
    expect(checkboxEls[2]).not.toBeChecked()
    expect(checkboxEls[3]).not.toBeChecked()
    expect(checkboxEls[4]).not.toBeChecked()
    expect(checkboxEls[5]).not.toBeChecked()
    expect(checkboxEls[6]).not.toBeChecked()
    expect(checkboxEls[7]).not.toBeChecked()

    expect(checkboxEls.length).toBe(8)

    const btnEl = screen.getByRole('button', {name: /finalizar/i})
    expect(btnEl).toBeInTheDocument()
    expect(btnEl).toBeDisabled()

  });
});