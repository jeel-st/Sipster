import React, { useState } from 'react';

export function changeUsernameLogic() {

    const [username, setUsername] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleChangeUsername = () => {
        if (username == '') {
            /* Es wird geprüft, ob das Textfeld ausgefüllt sind */
            setLoginError('Please enter your new username.')
            return;
        } else {
            /* Wenn das Textfeld ausgefüllt ist, dann wird der neue Username gespeichert */
            console.log("changeUsername details have been entered.")
        }
    }

    return {
        username,
        setUsername,
        loginError,
        setLoginError,
        handleChangeUsername
    };
}