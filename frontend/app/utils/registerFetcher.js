import { useState } from 'react'
import axios from 'axios';


export function useRegister() {
    const [registerError, setRegisterError] = useState('');

    const register = (username, email, password, onRegisterSuccess) => {
        // Senden eines POST-Requests mit axios
        axios.post('http://85.215.71.124/register', {
            username,
            email,
            password
        })
            .then(response => {
                console.log("The user was successfully created", response.data);
                setRegisterError('');
                if (onRegisterSuccess) {
                    onRegisterSuccess();
                }
            })
            .catch(error => {
                // Fehlerbehandlung hier innerhalb des catch-Blocks
                if (error.response && error.response.status === 400) {
                    setRegisterError('This user already exists.');
                } else {
                    // Dies fängt auch Netzwerkfehler oder andere Statuscodes
                    setRegisterError('Register failed. Please check your register information.');
                }
            });
    };

    return { register, registerError, setRegisterError };
}