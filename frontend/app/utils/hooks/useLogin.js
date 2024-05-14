/* Imports  */
import { useState } from 'react';
import { useLogin } from '../database/loginFetcher';
import { storeUser } from '../database/userFetcher';
import { router } from 'expo-router'

/* Logik für die LoginPage um die Eingabe zu prüfen  */
export function useLoginLogic() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const { login } = useLogin();

    const handleLogin = () => {

        if (username === '' || password === '') {
            /* Es wird geprüft, ob Textfelder ausgefüllt sind */
            setLoginError('Please enter your username and password.')
            return;

        } else {
            /* Wenn Textfelder ausgefüllt, dann wird geprüft ob es einen passenden User gibt  */
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