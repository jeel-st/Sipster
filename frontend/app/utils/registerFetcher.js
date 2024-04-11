import { useState } from 'react'
import axios from 'axios';


export function useRegister() {
    const [registerError, setRegisterError] = useState('');

    const register = async (username, email, password, onRegisterSuccess) => {
        try {
            const response = await axios.post(`http://85.215.71.124/register/${username}/${password}/${email}`);
            console.log("The user was successfully created");
            setRegisterError('');
            if (onRegisterSuccess) onRegisterSuccess();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setRegisterError('This user already exists.');
            } else {
                setRegisterError('Register failed. Please check your register information.');
            }
        }
    };

    return { register, registerError, setRegisterError };
}