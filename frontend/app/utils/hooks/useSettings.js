import React, { useState } from 'react';
import { settingsFetcher } from '../database/settingsFetcher'

export function useSettings() {

    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [settingsError, setSettingsError] = useState('');
    const { changeUsername, changePassword, changeEmail, changeLastname } = settingsFetcher();


    const handleChangeUsername = async () => {
        if (username == '') {
            /* Es wird geprüft, ob das Textfeld ausgefüllt sind */
            setSettingsError('Please enter your new username.')
            return;
        } else {
            /* Wenn das Textfeld ausgefüllt ist, dann wird der neue Username gespeichert */
            console.log("changeUsername details have been entered.")

            changeUsername(username)

        }
    }

    const handleChangeLastname = async () => {
        if (lastName == '') {
            /* Es wird geprüft, ob das Textfeld ausgefüllt sind */
            setSettingsError('Please enter your new lastname.')
            return;
        } else {
            /* Wenn das Textfeld ausgefüllt ist, dann wird der neue Username gespeichert */
            console.log("changeLastname details have been entered.")

            changeLastname(lastName)

        }
    }

    const handleChangePassword = async () => {
        if (oldPassword == '' && newPassword == '' && confirmPassword == '') {
            /* Es wird geprüft, ob das Textfeld ausgefüllt sind */
            setSettingsError('Please enter your password informations.')
            return;
        } else if (newPassword !== confirmPassword) {
            /* Es wird geprüft, ob die Passwörter übereinstimmen */
            setSettingsError('The passwords do not match.');
            return;
        } else {
            /* Wenn das Textfeld ausgefüllt ist, dann wird das neue Passwort gespeichert */
            console.log("changePassword details have been entered.")

            changePassword(newPassword)
        }
    }

    const handleChangeEmail = async () => {
        if (email == '') {
            /* Es wird geprüft, ob das Textfeld ausgefüllt sind */
            setSettingsError('Please enter your new email.')
            return;
        } else {
            /* Wenn das Textfeld ausgefüllt ist, dann wird der neue Email gespeichert */
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