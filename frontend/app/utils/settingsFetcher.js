// Imports 
import { useState } from 'react'
import axios from 'axios';
import useUser from '../utils/userFetcher';

/* 
Database request to query user in database
Typ: utils from settings

@ changeUsername
@ changeFirstname
@ changeLastname
@ changePassword
@ changeEmail
*/
export function settingsFetcher() {

    user = useUser()

    // useState() -> Hook function of React to trade states
    const [settingsError, setSettingsError] = useState('');

    const changeUsername = (newUsername) => {

        axios.post('http://85.215.71.124/user/changeUsername',
            {
                "username": user.username,
                "newUsername": newUsername
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log("The new username has been successfully changed.", response.data);
                setSettingsError('');
                user.username = newUsername;
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

    const changeFirstName = (firstName) => {

        axios.post('http://85.215.71.124/user/changeFirstName',
            {
                "userID": user._id,
                "newName": firstName
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log("The new firstname has been successfully changed.", response.data);
                setSettingsError('');
                user.firstName = firstName;
            })
            .catch(error => {
                console.error("Error changing the firstname:", error);
                console.log(error)
                if (error.response && error.response.status === "404") {
                    setSettingsError('This firstname already exists.');
                } else {
                    setSettingsError('Changing firstname failed. Please check your firstname information.');
                }
            });
    };

    const changeLastName = (lastName) => {

        axios.post('http://85.215.71.124/user/changeLastName',
            {
                "userID": user._id,
                "newName": lastName
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log("The new lastname has been successfully changed.", response.data);
                setSettingsError('');
                user.lastName = lastName;
            })
            .catch(error => {
                console.error("Error changing the lastname:", error);
                console.log(error)
                if (error.response && error.response.status === "404") {
                    setSettingsError('This lastname already exists.');
                } else {
                    setSettingsError('Changing lastname failed. Please check your lastname information.');
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
                user.email = email;
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

    return { changeUsername, changePassword, changeEmail, changeLastName, changeFirstName, settingsError, setSettingsError };
}