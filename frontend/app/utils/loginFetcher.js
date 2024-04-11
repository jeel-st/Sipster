import { useState } from 'react'
import axios from 'axios';


export function useLogin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [loginError, setLoginError] = useState('');

    const login = (username, password, setLoginError, onLoginSuccess) => {
        axios.get(`http://85.215.71.124/login/${username}/${password}/2010`)
            .then(response => {
                console.log("A suitable user has been found.")
                setToken(response.data.token);
                setIsLoggedIn(true);
                setLoginError('');
                if (onLoginSuccess) { onLoginSuccess() };
            })
            .catch(error => {
                console.log(error);
                setIsLoggedIn(false);
                setToken(null);
                setLoginError('Login failed. Please check your login information.');
            })
    }

    return { login, isLoggedIn, token, loginError, setLoginError };
}