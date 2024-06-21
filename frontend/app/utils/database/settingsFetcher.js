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

        axiosInstance.put('/user/changeUsername',
            {
                "userID": `${user._id}`,
                "newUsername": newUsername
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                userLog.info("The new username has been successfully changed.", response.data)
                setSettingsError('');
                updateUser(user)
            })
            .catch(error => {
                userLog.error("Error changing the username:", error)
                setSettingsError('Changing username failed. Please check your username information.');
            });
    };

    // function to change the first name
    const changeFirstName = (firstName) => {

        axiosInstance.put('/user/changeFirstName',
            {
                "userID": `${user._id}`,
                "newName": firstName
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                userLog.info("The new firstname has been successfully changed.", response.data)
                setSettingsError('');
                updateUser(user)
            })
            .catch(error => {
                userLog.error("Error changing the firstname:", error)
                setSettingsError('Changing firstname failed. Please check your firstname information.');
            });
    };

    // function to change the last name
    const changeLastName = (lastName) => {

        axiosInstance.put('/user/changeLastName',
            {
                "userID": `${user._id}`,
                "newName": lastName
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                userLog.info("The new lastname has been successfully changed.", response.data)
                setSettingsError('');
                updateUser(user)
            })
            .catch(error => {
                userLog.error("Error changing the lastname:", error)
                setSettingsError('Changing lastname failed. Please check your lastname information.');
            });
    };

    // function to change the password
    const changePassword = (password) => {

        axiosInstance.put('/user/changePassword',
            {
                "userID": `${user._id}`,
                "newPassword": password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                userLog.info("The new password has been successfully changed.", response.data)
                setSettingsError('');
                updateUser(user)
            })
            .catch(error => {
                userLog.error("Error changing the password:", error)
                setSettingsError('Changing password failed. Please check your password information.');
            });
    };

    // function to change the email
    const changeEmail = (email) => {

        axiosInstance.put('/user/changeEmail',
            {
                "userID": `${user._id}`,
                "newEmail": email
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                userLog.info("The new email has been successfully changed.", response.data)
                setSettingsError('');
                updateUser(user)
            })
            .catch(error => {
                userLog.error("Error changing the email:", error)
                setSettingsError('Changing email failed. Please check your email.');
            });
    };

    // function to delete the account 
    const deleteAccount = (onDeleteSuccess) => {
        axiosInstance.delete(`/user/${user._id}`)
            .then(response => {
                userLog.info("The user has been successfully deleted.", response.data)
                setSettingsError('');
                if (onDeleteSuccess) { onDeleteSuccess() };

            })
            .catch(error => {
                userLog.error("Error deleting the user:", error)
            });
    };

    // function with which the user can save an event
    const saveEvent = (event) => {

        axiosInstance.put('/user/addEvent',
            {
                "userID": `${user._id}`,
                "eventID": event._id
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                userLog.info("The event has been successfully added.", response.data)
                setSettingsError('');
            })
            .catch(error => {
                userLog.error("Error adding the event:", error)
                setSettingsError('Save Event failed.');
            });
    }

    return { changeUsername, changePassword, changeEmail, changeLastName, changeFirstName, settingsError, setSettingsError, deleteAccount, saveEvent };
}
