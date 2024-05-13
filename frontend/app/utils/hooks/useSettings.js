import React, { useState } from 'react';
import { settingsFetcher } from '../settingsFetcher'

export function useSettings() {

    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [settingsError, setSettingsError] = useState('');
    const { changeUsername, changePassword } = settingsFetcher();

    const handleChangeUsername = async () => {
        if (username == '') {
            /* Es wird geprüft, ob das Textfeld ausgefüllt sind */
            setSettingsError('Please enter your new username.')
            return;
        } else {
            /* Wenn das Textfeld ausgefüllt ist, dann wird der neue Username gespeichert */
            console.log("changeUsername details have been entered.")

            changeUsername(username);
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
            /* Wenn das Textfeld ausgefüllt ist, dann wird der neue Username gespeichert */
            console.log("changePassword details have been entered.")

            changePassword(newPassword);
        }
    }

    return {
        username,
        newPassword,
        oldPassword,
        confirmPassword,
        setUsername,
        setNewPassword,
        setOldPassword,
        setConfirmPassword,
        settingsError,
        setSettingsError,
        handleChangeUsername,
        handleChangePassword
    };
}