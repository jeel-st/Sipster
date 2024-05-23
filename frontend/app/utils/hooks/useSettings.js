// Imports
import { useState } from 'react';
import { settingsFetcher } from '../settingsFetcher';

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
    const [settingsError, setSettingsError] = useState('');

    // Import of fetcher functions
    const { changeUsername, changePassword, changeEmail, changeLastname } = settingsFetcher();

    // Changing the username
    const handleChangeUsername = async () => {
        if (username == '') {
            /* The system checks whether the text field has been filled in */
            setSettingsError('Please enter your new username.')
            return;
        } else {
            /* If the text field is filled in, the new username is saved */
            console.log("changeUsername details have been entered.")

            changeUsername(username)

        }
    }

    // Changing the firstname

    // Changing the lastname
    const handleChangeLastname = async () => {
        if (lastName == '') {
            /* The system checks whether the text field has been filled in */
            setSettingsError('Please enter your new lastname.')
            return;
        } else {
            /* If the text field is filled in, the new lastname is saved */
            console.log("changeLastname details have been entered.")

            changeLastname(lastName)

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
            console.log("changePassword details have been entered.")

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
            console.log("changeEmail details have been entered.")

            changeEmail(email);
        }
    }

    return {
        username,
        lastName,
        newPassword,
        oldPassword,
        confirmPassword,
        email,
        setUsername,
        setLastName,
        setNewPassword,
        setOldPassword,
        setConfirmPassword,
        setEmail,
        settingsError,
        setSettingsError,
        handleChangeUsername,
        handleChangePassword,
        handleChangeEmail,
        handleChangeLastname
    };
}