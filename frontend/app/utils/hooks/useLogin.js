// Imports
import { useEffect, useState } from 'react';
import { useLogin } from '../database/loginFetcher';
import { SplashScreen, router } from 'expo-router'
import { userLog } from '../logger/config';
import UserManager from '../../entitys/UserManager';

/*
The logic of the loginPage is processed here and forwarded to the backend
Typ: utils from login

@return     object -> An object containing the following properties:
    - username: {string} -> The current value of the username input field.
    - setUsername: {function} -> A function to update the value of the username input field.
    - password: {string} -> The current value of the password input field.
    - setPassword: {function} -> A function to update the value of the password input field.
    - loginError: {string} -> The error message displayed during login failure.
    - setLoginError: {function} -> A function to update the login error message.
    - handleLogin: {function} -> A function to handle the login process.
*/
export function useLoginLogic() {

    // useState() -> Hook function of React to trade states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const userManager = UserManager.getInstance();
            const user = await userManager.loadUser();
            if(!user) return;

            userManager.setUser(user)
            await SplashScreen.hideAsync()
            router.replace('(tabs)')
        };
        fetchUser();
    }, []);

    // Import of fetcher functions
    const { login } = useLogin();

    const handleLogin = () => {

        if (username === '' || password === '') {
            /* The system checks whether text fields have been filled in */
            userLog.error("Username or password information are missing.")
            setLoginError('Please enter your username and password.')
            return;

        } else {
            /* If text fields are filled in, the system checks whether there is a matching user */
            userLog.debug("Login details have been entered.")
            login(username, password, setLoginError, async () => {
                const userManager = UserManager.getInstance()
                await userManager.instantiateUser(username)
                router.replace('(tabs)')
                userLog.debug("Login successful.")
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