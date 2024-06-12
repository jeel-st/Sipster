// Imports
import { useState } from 'react';
import axiosInstance from './axiosConfig';
import { userLog } from '../logger/config';
import { updateUser, useUser } from '../hooks/useUser';

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
                userLog.debug("The new username has been successfully changed.", response.data)
                setSettingsError('');
                updateUser(user.username)
            })
            .catch(error => {
                userLog.error("Error changing the username:", error)
                if (error.response && error.response.status === "404") {
                    setSettingsError('This username already exists.');
                } else {
                    setSettingsError('Changing username failed. Please check your username information.');
                }
            });
    };

    const changeFirstName = (firstName) => {

        axiosInstance.put('/user/changeFirstName',
            {
                "userID": user.userID,
                "newName": firstName
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                userLog.debug("The new firstname has been successfully changed.", response.data)
                setSettingsError('');
                updateUser(user.username)
            })
            .catch(error => {
                userLog.error("Error changing the firstname:", error)
                if (error.response && error.response.status === "404") {
                    setSettingsError('This firstname already exists.');
                } else {
                    setSettingsError('Changing firstname failed. Please check your firstname information.');
                }
            });
    };

    const changeLastName = (lastName) => {

        axiosInstance.put('/user/changeLastName',
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
                userLog.debug("The new lastname has been successfully changed.", response.data)
                setSettingsError('');
                updateUser(user.username)
            })
            .catch(error => {
                userLog.error("Error changing the lastname:", error)
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
                userLog.debug("The new password has been successfully changed.", response.data)
                setSettingsError('');
                updateUser(user.username)
            })
            .catch(error => {
                userLog.error("Error changing the password:", error)
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
                userLog.debug("The new email has been successfully changed.", response.data)
                setSettingsError('');
                updateUser(user.username)
            })
            .catch(error => {
                userLog.error("Error changing the email:", error)
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
                userLog.debug("The user has been successfully deleted.", response.data)
                setSettingsError('');
                () => router.navigate('routes/LoginPage');

            })
            .catch(error => {
                userLog.error("Error deleting the user:", error)
            });
    };

    return { changeUsername, changePassword, changeEmail, changeLastName, changeFirstName, settingsError, setSettingsError, deleteAccount };
}
