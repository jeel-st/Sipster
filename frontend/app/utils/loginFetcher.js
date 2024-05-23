// Imports
import { useState } from 'react'
import axios from 'axios';

/* 
Database request to query user in database
Typ: utils from login

@ login 
*/
export function useLogin() {

    // useState() -> Hook function of React to trade states
    const [loginError, setLoginError] = useState('');

    const login = (username, password, setLoginError, onLoginSuccess) => {
        axios.get(`http://85.215.71.124/login/${username}/${password}`)
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