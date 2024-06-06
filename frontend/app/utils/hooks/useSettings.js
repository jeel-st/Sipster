// Imports
import React, { useState } from 'react';
import { settingsFetcher } from '../database/settingsFetcher'
import { userLog } from '../logger/config';

/*
The logic of the settingsPage is processed here and forwarded to the backend
Typ: utils from settings

@ handleChangeUsername
@ handleChangeFirstname
@ handleChangeLastname
@ handleChangePassword
@ handleChangeEmail
*/
export function useSettings() {

    // useState() -> Hook function of React to trade states
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [settingsError, setSettingsError] = useState('');

    // Import of fetcher functions
    const { changeUsername, changePassword, changeEmail, changeLastName, changeFirstName, deleteAccount } = settingsFetcher();

    // Changing the username
    const handleChangeUsername = async () => {
        if (username == '') {
            /* The system checks whether the text field has been filled in */
            setSettingsError('Please enter your new username.')
            return;
        } else {
            /* If the text field is filled in, the new username is saved */
            userLog.debug("changeUsername details have been entered.")

            changeUsername(username)

        }
    }

    // Changing the firstname
    const handleChangeFirstName = async () => {
        if (firstName == '') {
            /* The system checks whether the text field has been filled in */
            setSettingsError('Please enter your new firstname.')
            return;
        } else {
            /* If the text field is filled in, the new lastname is saved */
            userLog.debug("changeFirstName details have been entered.")

            changeFirstName(firstName)

        }
    }

    // Changing the lastname
    const handleChangeLastName = async () => {
        if (lastName == '') {
            /* The system checks whether the text field has been filled in */
            setSettingsError('Please enter your new lastname.')
            return;
        } else {
            /* If the text field is filled in, the new lastname is saved */
            userLog.debug("changeLastName details have been entered.")

            changeLastName(lastName)

        }
    }

    // Changing the password
    const handleChangePassword = async () => {
        if (oldPassword == '' && newPassword == '' && confirmPassword == '') {
            /* The system checks whether the text field has been filled in */
            setSettingsError('Please enter your password informations.')
            return;
        } else if (newPassword !== confirmPassword) {
            /* The system checks whether the passwords match */
            setSettingsError('The passwords do not match.');
            return;
        } else {
            /* If the text field is filled in, the new password is saved */
            userLog.debug("changePassword details have been entered.")

            changePassword(newPassword)
        }
    }

    // Changing email
    const handleChangeEmail = async () => {
        if (email == '') {
            /* The system checks whether the text field has been filled in */
            setSettingsError('Please enter your new email.')
            return;
        } else {
            /* If the text field is filled in, the new email is saved */
            userLog.debug("changeEmail details have been entered.")

            changeEmail(email);
        }
    }

    const handleDeleteAccount = async (isChecked) => {
        if (isChecked) {
            /* If the Checkbox filled in, the account will be deleted. */
            userLog.debug("DeleteAccount details have been entered.")

            deleteAccount();

        } else {
            /* The system checks whether the Checkbox is filled. */
            setSettingsError('Please ckeck the box.')
            return;
        }
    }

    return {
        username,
        lastName,
        firstName,
        newPassword,
        oldPassword,
        confirmPassword,
        email,
        setUsername,
        setLastName,
        setFirstName,
        setNewPassword,
        setOldPassword,
        setConfirmPassword,
        setEmail,
        settingsError,
        setSettingsError,
        handleChangeUsername,
        handleChangePassword,
        handleChangeEmail,
        handleChangeLastName,
        handleChangeFirstName,
        handleDeleteAccount
    };
}