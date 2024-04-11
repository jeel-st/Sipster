import { useState } from 'react'
import axios from 'axios';
import router, { useNavigation } from 'expo-router'


export function useLogin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [loginError, setLoginError] = useState('');

    const login = (username, password, onLoginSuccess) => {
        axios.get(`http://85.215.71.124/login/${username}/${password}/2010`)
            .then(response => {
                console.log("Es wurde ein passender Benutzer gefunden")
                setToken(response.data.token);
                setIsLoggedIn(true);
                setLoginError('');
                if (onLoginSuccess) { onLoginSuccess() };
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