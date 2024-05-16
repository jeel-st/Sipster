/* Imports  */
import { useState } from 'react';
import { useRegister } from '../database/registerFetcher';
import { router } from 'expo-router'

/* Logik für die RegisterPage um die Eingabe zu prüfen  */
export function useRegisterLogic() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmedPassword] = useState('');
    const [registerError, setRegisterError] = useState('');
    const { register } = useRegister();


    const handleRegister = async () => {
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            /* Es wird geprüft, ob Textfelder ausgefüllt sind */
            setRegisterError('Please enter your firstname, lastname, username, email, and password.');
            return;
        } else if (password !== confirmPassword) {
            /* Es wird geprüft, ob die Passwörter übereinstimmen */
            setRegisterError('The passwords do not match.');
            return;
        }

        /* Wenn Textfelder ausgefüllt, dann wird ein neuer User erstellt  */
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