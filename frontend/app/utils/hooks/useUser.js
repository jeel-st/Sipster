// Imports
import UserManager from "../../entitys/UserManager"

/*
useUser Hook
This hook returns the current user instance.
*/
export function useUser() {
    const userManager = UserManager.getInstance()
    return userManager.getUser();
}

/*
updateUser Function
This function updates the user information by instantiating the user with the given username.
*/
export async function updateUser(user) {
    const userManager = UserManager.getInstance()
    await userManager.instantiateUser(user.username);
}