// Imports
import { useState } from 'react';
import { useLogin } from '../database/loginFetcher';
import { storeUser } from '../database/userFetcher';
import { router } from 'expo-router'

/*
The logic of the loginPage is processed here and forwarded to the backend
Typ: utils from login

@ handleLogin
*/
export function useLoginLogic() {

    // useState() -> Hook function of React to trade states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Import of fetcher functions
    const { login } = useLogin();

    const handleLogin = () => {

        if (username === '' || password === '') {
            /* The system checks whether text fields have been filled in */
            setLoginError('Please enter your username and password.')
            return;

        } else {
            /* If text fields are filled in, the system checks whether there is a matching user */
            console.log("Login details have been entered.")
            login(username, password, setLoginError, async () => {
                await storeUser(username)
                router.navigate('(tabs)')
                console.log("Login successful.")
                setLoginError('')
            });
        }
    }

    return {
        username,
        setUsername,
        password,
        setPassword,
        loginError,
        setLoginError,
        handleLogin
    };
}