// Imports
import { userLog } from '../logger/config';
import useUser from '../database/userFetcher';

/*
The logic of the settingsPage is processed here and forwarded to the backend
Typ: utils from settings

@ handleChangeUsername
@ handleChangeFirstname
@ handleChangeLastname
@ handleChangePassword
@ handleChangeEmail
*/
export function useAccount() {

    // logged in user is called
    const user = useUser();
    
    // Handling the different levels
    const handleLevels = async () => {
        if (user.sips < 1000) {
            return '1';
        } else {
            /* If the text field is filled in, the new username is saved */
            userLog.debug("changeUsername details have been entered.")

            changeUsername(username)

        }
    }
}