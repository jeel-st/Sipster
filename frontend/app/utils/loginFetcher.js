import { useState } from 'react'
import axios from 'axios';

export function useLogin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [loginError, setLoginError] = useState('');

    const login = (username, password) => {
        axios.post('http://85.215.71.124/login', { username, password })
            .then(response => {
                setToken(response.data.token);
                setIsLoggedIn(true);
                setLoginError('');
                navigateToRegisterPage();
            })
            .catch(error => {
                console.log(error);
                setIsLoggedIn(false);
                setToken(null);
                setLoginError('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldeinformationen.');
            })
    }

    return { login, isLoggedIn, token, loginError };
}