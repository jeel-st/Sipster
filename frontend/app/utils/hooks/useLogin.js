// Imports
import { useEffect, useState } from 'react';
import { useLogin } from '../database/loginFetcher';
import { SplashScreen, router } from 'expo-router'
import { userLog } from '../logger/config';
import UserManager from '../../entitys/UserManager';

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