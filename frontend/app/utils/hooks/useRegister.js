// Imports
import { useState } from 'react';
import { useRegister } from '../database/registerFetcher';
import { router } from 'expo-router'
import { userLog } from '../logger/config';

/*
The logic of the registerPage is processed here and forwarded to the backend
Typ: utils from register

@return:    object -> An object containing the following properties:
    - firstName: {string} -> The current value of the first name input field.
    - setFirstName: {function} -> A function to update the value of the first name input field.
    - lastName: {string} -> The current value of the last name input field.
    - setLastName: {function} -> A function to update the value of the last name input field.
    - username: {string} -> The current value of the username input field.
    - setUsername: {function} -> A function to update the value of the username input field.
    - email: {string} -> The current value of the email input field.
    - setEmail: {function} -> A function to update the value of the email input field.
    - password: {string} -> The current value of the password input field.
    - setPassword: {function} -> A function to update the value of the password input field.
    - confirmPassword: {string} -> The current value of the confirm password input field.
    - setConfirmedPassword: {function} -> A function to update the value of the confirm password input field.
    - registerError: {string} -> The error message displayed during registration failure.
    - setRegisterError: {function} -> A function to update the registration error message.
    - handleRegister: {function} -> A function to handle the registration process.
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
            userLog.error("Username, email or password information are missing.")
            setRegisterError('Please enter your firstname, lastname, username, email, and password.');
            return;
        } else if (password !== confirmPassword) {
            /* The system checks whether the passwords match */
            userLog.error("The passwords do not match.")
            setRegisterError('The passwords do not match.');
            return;
        }

        /* If text fields are filled in, a new user is created */
        register(firstName, lastName, username, email, password, () => {
            userLog.debug("Registration successful.")
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