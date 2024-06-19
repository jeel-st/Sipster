// Imports
import { useState } from 'react';
import axiosInstance from './axiosConfig';
import { userLog } from '../logger/config';
import { updateUser, useUser } from '../hooks/useUser';

/*
Database request to change user information in database
Typ: utils from settings

@return: object ->  An object containing functions for changing username, password, email,
last name, and first name, as well as functions for managing settings errors and deleting the account.
*/
export function settingsFetcher() {

    const user = useUser();

    // useState() -> Hook function of React to trade states
    const [settingsError, setSettingsError] = useState('');

    // function to change the username
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
                updateUser(user)
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

    // function to change the first name
    const changeFirstName = (firstName) => {

        axiosInstance.put('/user/changeFirstName',
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
                userLog.debug("The new firstname has been successfully changed.", response.data)
                setSettingsError('');
                updateUser(user)
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

    // function to change the last name
    const changeLastName = (lastName) => {

        axiosInstance.put('/user/changeLastName',
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
                userLog.debug("The new lastname has been successfully changed.", response.data)
                setSettingsError('');
                updateUser(user)
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

    // function to change the password
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
                updateUser(user)
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

    // function to change the email
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
                updateUser(user)
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

    // function to delete the account 
    const deleteAccount = (onDeleteSuccess) => {
        userLog.debug(user.userID, user.password)
        axiosInstance.delete(`/user/${user.userID}`)
            .then(response => {
                userLog.debug("The user has been successfully deleted.", response.data)
                setSettingsError('');
                if (onDeleteSuccess) { onDeleteSuccess() };

            })
            .catch(error => {
                userLog.error("Error deleting the user:", error)
            });
    };

    // function with which the user can save an event
    const saveEvent = (event) => {

        axiosInstance.post('/user/addEvent',
            {
                "userID": user._id,
                "eventID": event.eventID
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                userLog.debug("The event has been successfully added.", response.data)
                setSettingsError('');
            })
            .catch(error => {
                userLog.error("Error adding the event:", error)
                setSettingsError('Save Event failed.');
            });
    }

    return { changeUsername, changePassword, changeEmail, changeLastName, changeFirstName, settingsError, setSettingsError, deleteAccount, saveEvent };
}
