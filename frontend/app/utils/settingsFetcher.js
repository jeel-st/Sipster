/* Imports */
import { useState } from 'react'
import axios from 'axios';

/* Datenbankrequest um neuen User anzulegen */
export function settingsFetcher() {
    const [settingsError, setSettingsError] = useState('');

    const changeUsername = (username) => {

        axios.post('http://85.215.71.124/changeUsername',
            {
                "username": username
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

    const changePassword = (newPassword) => {

        axios.post('http://85.215.71.124/changePassword',
            {
                "password": newPassword
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

    return { changeUsername, changePassword, settingsError, setSettingsError };
}