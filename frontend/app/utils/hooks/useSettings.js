// Imports
import React, { useState } from 'react';
import { settingsFetcher } from '../database/settingsFetcher'
import { userLog } from '../logger/config';
import UserManager from '../../entitys/UserManager';
import { router } from 'expo-router';

/*
The logic of the settingsPage is processed here and forwarded to the backend
Typ: utils from settings

@return     object -> An object containing the following properties and functions:
    - username: {string} -> The current value of the username input field.
    - lastName: {string} -> The current value of the lastname input field.
    - firstName: {string} -> The current value of the firstname input field.
    - newPassword: {string} -> The current value of the new password input field.
    - oldPassword: {string} -> The current value of the old password input field.
    - confirmPassword: {string} -> The current value of the confirm password input field.
    - email: {string} -> The current value of the email input field.
    - setUsername: {function} -> A function to update the value of the username input field.
    - setLastName: {function} -> A function to update the value of the lastname input field.
    - setFirstName: {function} -> A function to update the value of the firstname input field.
    - setNewPassword: {function} -> A function to update the value of the new password input field.
    - setOldPassword: {function} -> A function to update the value of the old password input field.
    - setConfirmPassword: {function} -> A function to update the value of the confirm password input field.
    - setEmail: {function} -> A function to update the value of the email input field.
    - settingsError: {string} -> The error message displayed during settings failure.
    - setSettingsError: {function} -> A function to update the settings error message.
    - handleChangeUsername: {function} -> A function to handle changing the username.
    - handleChangePassword: {function} -> A function to handle changing the password.
    - handleChangeEmail: {function} -> A function to handle changing the email.
    - handleChangeLastName: {function} -> A function to handle changing the lastname.
    - handleChangeFirstName: {function} -> A function to handle changing the firstname.
    - handleDeleteAccount: {function} -> A function to handle deleting the account.
    - handleLogout: {function} -> A function to handle logging out.
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
            userLog.debug("Username information is missing.")
            setSettingsError('Please enter your new username.')
            return;
        } else {
            /* If the text field is filled in, the new username is saved */
            userLog.debug("changeUsername details have been entered.")

            // removes blank
            trimmedUsername = username.trim()

            changeUsername(trimmedUsername)

        }
    }

    // Changing the firstname
    const handleChangeFirstName = async () => {
        if (firstName == '') {
            /* The system checks whether the text field has been filled in */
            userLog.debug("First name information is missing.")
            setSettingsError('Please enter your new firstname.')
            return;
        } else {
            /* If the text field is filled in, the new lastname is saved */
            userLog.debug("changeFirstName details have been entered.")

            // removes blank
            trimmedFirstname = firstName.trim()

            changeFirstName(trimmedFirstname)

        }
    }

    // Changing the lastname
    const handleChangeLastName = async () => {
        if (lastName == '') {
            /* The system checks whether the text field has been filled in */
            userLog.debug("Last name information is missing.")
            setSettingsError('Please enter your new lastname.')
            return;
        } else {
            /* If the text field is filled in, the new lastname is saved */
            userLog.debug("changeLastName details have been entered.")

            // removes blank
            trimmedLastname = lastName.trim()

            changeLastName(trimmedLastname)

        }
    }

    // Changing the password
    const handleChangePassword = async () => {
        if (oldPassword == '' && newPassword == '' && confirmPassword == '') {
            /* The system checks whether the text field has been filled in */
            userLog.error("OldPassword, newPassword or confirmPassword information are missing.")
            setSettingsError('Please enter your password informations.')
            return;
        } else if (newPassword !== confirmPassword) {
            /* The system checks whether the passwords match */
            userLog.error("The passwords do not match.")
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
            userLog.debug("Email information is missing.")
            setSettingsError('Please enter your new email.')
            return;
        } else {
            /* If the text field is filled in, the new email is saved */
            userLog.debug("changeEmail details have been entered.")

            // removes blank
            trimmedEmail = email.trim()

            changeEmail(trimmedEmail);
        }
    }

    const handleDeleteAccount = async (isChecked) => {
        if (isChecked) {
            /* If the Checkbox filled in, the account will be deleted. */
            userLog.debug("DeleteAccount details have been entered.")
            deleteAccount(() => router.navigate('routes/LoginPage'));

        } else {
            /* The system checks whether the Checkbox is filled. */
            userLog.error("The checkbox is unchecked.")
            setSettingsError('Please ckeck the box.')
            return;
        }
    }

    const handleLogout = () => {
        const userManager = UserManager.getInstance();
        if(userManager.deleteUser()) {
            userLog.debug("User has been logged out.")
            router.replace('routes/LoginPage')
            return
        }
        userLog.error("User could not be logged out.")
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
        handleDeleteAccount,
        handleLogout
    };
}