// Imports
import { useState } from 'react'
import axiosInstance from './axiosConfig';
import { userLog } from '../logger/config';

/*
Database request to query user in database
Typ: utils from login

@return:    object -> An object containing the login function, a string representing login errors, and a function to set login errors.
*/
export function useLogin() {

    // useState() -> Hook function of React to trade states
    const [loginError, setLoginError] = useState('');

    const login = (username, password, setLoginError, onLoginSuccess) => {
        axiosInstance.post(`/login`,
            {
                "username": username,
                "password": password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                userLog.info("A suitable user has been found.")
                setLoginError('');
                if (onLoginSuccess) { onLoginSuccess() };
            })
            .catch(error => {
                userLog.error("Login failed. Please check your login information.", error)
                setLoginError('Login failed. Please check your login information.');
            })
    }

    return { login, loginError, setLoginError };
}