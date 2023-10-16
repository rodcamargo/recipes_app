import React from 'react';
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { exact } from 'prop-types';

const userEmail = {
  email: 'tryber@teste.com',
};

describe('Testando a página de Profile', () => {
  it('Testa se aparece todos botoes', async () => {
      const { history } = renderWithRouter(<App />)
      history.push('/profile')

      const btnDone = screen.getByTestId(/profile-done-btn/i)
      const btnFavorite = screen.getByTestId(/profile-favorite-btn/i)
      const btnLogout = screen.getByTestId(/profile-logout-btn/i)
      const imgProfile = screen.getByRole('img', {  name: /profile/i});
      
      expect(btnDone).toBeInTheDocument();
      expect(btnFavorite).toBeInTheDocument();
      expect(btnLogout).toBeInTheDocument();
      expect(imgProfile).toBeInTheDocument();

  });

  it('Testa o botão Logout e Redirecionamento', async () => {
      const { history } = renderWithRouter(<App />)
      history.push('/profile')

      const btnLogout = screen.getByTestId(/profile-logout-btn/i)
      expect(btnLogout).toBeInTheDocument();
      
      localStorage.clear();
      const emailUser = screen.getByTestId(/profile-email/i);
      expect(emailUser.innerHTML).toBe('');

      fireEvent.click(btnLogout);
      expect(history.location.pathname).toBe('/');

});

  it('Testa o botão Logout e Redirecionamento', async () => {
   
    localStorage.setItem('user', JSON.stringify(userEmail));
    const email = JSON.parse(localStorage.getItem('user'));
    const { history } = renderWithRouter(<App />)
    history.push('/profile')

    const emailUser = screen.getByTestId(/profile-email/i);
    expect(emailUser).toBeInTheDocument();
    expect(emailUser.innerHTML).toBe('tryber@teste.com');

    const btnLogout = screen.getByTestId(/profile-logout-btn/i)
    expect(btnLogout).toBeInTheDocument();

    fireEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');
  });

});
