// Imports
import UserManager from "../../entitys/UserManager"

/*
    Method to get the user

    @return: object -> the user object
*/
export function useUser() {
    const userManager = UserManager.getInstance()
    return userManager.getUser();
}

/*
    Method to update the user

    @param user: object -> the user to update
    @return: void
*/
export async function updateUser(user) {
    const userManager = UserManager.getInstance()
    await userManager.instantiateUser(user.username);
}