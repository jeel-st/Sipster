import { useState } from 'react';
import axiosInstance from './axiosConfig';

/*
Database request to query user in database
Typ: utils from register

@ register
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
                console.log("The user was successfully created", response.data);
                setRegisterError('');
                if (onRegisterSuccess) {
                    onRegisterSuccess();
                }
            })
            .catch(error => {
                console.error("Error during registration:", error);
                console.log(error)
                if (error.response && error.response.status === "404") {
                    setRegisterError('This user already exists.');
                } else {
                    setRegisterError('Register failed. Please check your register information.');
                }
            });
    };

    return { register, registerError, setRegisterError };
}
