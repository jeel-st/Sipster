/* Imports*/
import { useState } from 'react'
import axiosInstance from './axiosConfig';

/* Datenbankrequest um User in Datenbank abzufragen */
export function useLogin() {
    const [loginError, setLoginError] = useState('');

    const login = (username, password, setLoginError, onLoginSuccess) => {
        axiosInstance.get(`/login/${username}/${password}`)
            .then(response => {
                console.log("A suitable user has been found.")
                setLoginError('');
                if (onLoginSuccess) { onLoginSuccess() };
            })
            .catch(error => {
                console.log(error);
                setLoginError('Login failed. Please check your login information.');
            })
    }

    return { login, loginError, setLoginError };
}