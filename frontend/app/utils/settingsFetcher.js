/* Imports */
import { useState } from 'react'
import axios from 'axios';
import useUser from '../utils/userFetcher';

/* Datenbankrequest um neuen User anzulegen */
export function settingsFetcher() {

    user = useUser()
    const [settingsError, setSettingsError] = useState('');

    const changeUsername = (username) => {

        axios.post('http://85.215.71.124/user/changeUsername',
            {
                "username": user.username,
                "newUsername": username
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log("The new username has been successfully changed.", response.data);
                setSettingsError('');
            })
            .catch(error => {
                console.error("Error changing the username:", error);
                console.log(error)
                if (error.response && error.response.status === "404") {
                    setSettingsError('This username already exists.');
                } else {
                    setSettingsError('Changing username failed. Please check your username information.');
                }
            });
    };

    const changePassword = (password) => {

        axios.post('http://85.215.71.124/user/changePassword',
            {
                "username": user.username,
                "newPassword": password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log("The new password has been successfully changed.", response.data);
                setSettingsError('');
            })
            .catch(error => {
                console.error("Error changing the password:", error);
                console.log(error)
                if (error.response && error.response.status === "404") {
                    setSettingsError('This password already exists.'); // notwendig? 
                } else {
                    setSettingsError('Changing password failed. Please check your password information.');
                }
            });
    };

    const changeEmail = (email) => {

        axios.post('http://85.215.71.124/user/changeEmail',
            {
                "username": user.username,
                "newEmail": email
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log("The new email has been successfully changed.", response.data);
                setSettingsError('');
            })
            .catch(error => {
                console.error("Error changing the email:", error);
                console.log(error)
                if (error.response && error.response.status === "404") {
                    setSettingsError('This email already exists.');
                } else {
                    setSettingsError('Changing email failed. Please check your email.');
                }
            });
    };

    return { changeUsername, changePassword, changeEmail, settingsError, setSettingsError };
}