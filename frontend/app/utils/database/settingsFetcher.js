// Imports
import { useState } from 'react';
import useUser from '../database/userFetcher';
import axiosInstance from './axiosConfig';

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

    const user = useUser();

    // useState() -> Hook function of React to trade states
    const [settingsError, setSettingsError] = useState('');

    const changeUsername = (newUsername) => {

        axiosInstance.post('/user/changeUsername',
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

        axiosInstance.post('/user/changeFirstName',
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

        axiosInstance.post('/user/changeLastName',
            {
                "userID": user.userID,
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

        axiosInstance.post('/user/changePassword',
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

        axiosInstance.post('/user/changeEmail',
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

    const deleteAccount = () => {

        axiosInstance.delete(`/register/${user.username}/${user.password} HTTP/1.1`)
            .then(response => {
                console.log("The user has been successfully deleted.", response.data);
                setSettingsError('');
                () => router.navigate('routes/LoginPage');

            })
            .catch(error => {
                console.error("Error deleting the user:", error);
                console.log(error)
            });
    };

    return { changeUsername, changePassword, changeEmail, changeLastName, changeFirstName, settingsError, setSettingsError, deleteAccount };
}
