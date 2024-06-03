// Imports
import { useState } from 'react';
import { useRegister } from '../database/registerFetcher';
import { router } from 'expo-router'

/*
The logic of the registerPage is processed here and forwarded to the backend
Typ: utils from register

@ handleRegister
*/
export function useRegisterLogic() {

    // useState() -> Hook function of React to trade states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmedPassword] = useState('');
    const [registerError, setRegisterError] = useState('');

    // Import of fetcher functions
    const { register } = useRegister();


    const handleRegister = async () => {
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            /* The system checks whether text fields have been filled in */
            setRegisterError('Please enter your firstname, lastname, username, email, and password.');
            return;
        } else if (password !== confirmPassword) {
            /* The system checks whether the passwords match */
            setRegisterError('The passwords do not match.');
            return;
        }

        /* If text fields are filled in, a new user is created */
        register(firstName, lastName, username, email, password, () => {
            console.log("Registration successful.");
            router.navigate('routes/LoginPage');
        });
    };

    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmedPassword,
        registerError,
        setRegisterError,
        handleRegister
    };

}