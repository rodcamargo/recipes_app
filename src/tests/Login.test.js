import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';
import App from '../App';

describe('Testando o componente App.js', () => {

    it('Verifica a ordem dos links de navegação no topo da aplicação', () => {
        renderWithRouter(<Login />)
        const emailEl = screen.getByTestId(/email-input/i)
        const passEl = screen.getByTestId(/password-input/i)
        const btnLogin = screen.getByTestId(/login-submit-btn/i)
        expect(emailEl).toBeInTheDocument()
        expect(passEl).toBeInTheDocument()
        expect(btnLogin).toBeInTheDocument()
    })

    it('Verifica a ordem dos links de navegação no topo da aplicação', () => {
        renderWithRouter(<Login />)
        const emailEl = screen.getByTestId(/email-input/i)
        const passEl = screen.getByTestId(/password-input/i)
        const btnLogin = screen.getByTestId(/login-submit-btn/i)
        expect(btnLogin).toBeDisabled()

        userEvent.type(emailEl, "rharan@gmail.com")
        expect(btnLogin).toBeDisabled()
        
        userEvent.type(passEl, "123456789")
        expect(btnLogin).toBeEnabled()
    })

    it('Verifica a ordem dos links de navegação no topo da aplicação', () => {
        const { history } = renderWithRouter(<App />)
        history.push('/')
        const emailEl = screen.getByTestId(/email-input/i)
        const passEl = screen.getByTestId(/password-input/i)
        const btnLogin = screen.getByTestId(/login-submit-btn/i)
        expect(btnLogin).toBeDisabled()

        userEvent.type(emailEl, "rharan@gmail.com")
        expect(btnLogin).toBeDisabled()

        userEvent.type(passEl, "123456789")
        expect(btnLogin).toBeEnabled()
        
        fireEvent.click(btnLogin);
        expect(history.location.pathname).toBe('/foods');
    })
})