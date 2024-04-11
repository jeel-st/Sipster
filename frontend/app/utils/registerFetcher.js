import { useState } from 'react'
import axios from 'axios';


export function useRegister() {
    const [registerError, setRegisterError] = useState('');

    const register = (username, email, password, onRegisterSuccess) => {

        axios.post('http://85.215.71.124/register',
            {
                username: username,
                email: email,
                password: password
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
                if (error.response && error.response.status === 404) {
                    setRegisterError('This user already exists.');
                } else {
                    setRegisterError('Register failed. Please check your register information.');
                }
            });
    };

    return { register, registerError, setRegisterError };
}