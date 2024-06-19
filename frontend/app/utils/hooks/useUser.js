import UserManager from "../../entitys/UserManager"

export function useUser() {
    const userManager = UserManager.getInstance()
    return userManager.getUser();
}

export async function updateUser(user) {
    const userManager = UserManager.getInstance()
    await userManager.instantiateUser(user.username);
}