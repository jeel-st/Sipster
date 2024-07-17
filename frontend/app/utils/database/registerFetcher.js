// Import
import { useState } from 'react';
import axiosInstance from './axiosConfig';
import { userLog } from '../logger/config';

/*
Database request to query user in database
Typ: utils from register

@return     object -> An object containing the register function, a string representing register errors, and a function to set register errors.
*/
export function useRegister() {

    // useState() -> Hook function of React to trade states
    const [registerError, setRegisterError] = useState('');

    const register = (firstName, lastName, username, email, password, onRegisterSuccess) => {

        axiosInstance.post('/register',
            {
                "username": username,
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                userLog.info("The user was successfully created", response.data);
                setRegisterError('');
                if (onRegisterSuccess) {
                    onRegisterSuccess();
                }
            })
            .catch(error => {
                userLog.error("Error during registration:", error)
                setRegisterError('Register failed. Please check your email or username information.');
            });
    };

    return { register, registerError, setRegisterError };
}
