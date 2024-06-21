// Import
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchFriends } from "../utils/database/friendsFetcher";
import { fetchUser } from "../utils/database/userFetcher";
import { userLog } from "../utils/logger/config";
import User from "./user";
import Friend from "./friend";

export default class UserManager {
    static myInstance = null;

    _user = null;

    static getInstance() {
        if (UserManager.myInstance == null) {
            UserManager.myInstance = new UserManager();
        }

        return this.myInstance;
    }

    async instantiateUser(username) {
        const userData = await fetchUser(username)
        const friendsData = await fetchFriends(userData)

        if (!userData || !friendsData) {
            userLog.error("User could not be initialized.")
            return
        }

        let friends = []
        if (friendsData.length > 0) {
            friends = friendsData.map(friend => new Friend(friend));
        }

        userData.friends = friends
        userLog.info("Friends have been added to the user.")

        if (!await this.storeUser(userData)) {
            userLog.error("User could not be initialized.")
            return
        }

        this._user = new User(userData)
        userLog.info("User has been initialized successfully.")
        userLog.debug(this._user.present())
    }

    async updateFriends(user) {
        const friendsData = await fetchFriends(user)

        if (!friendsData) {
            userLog.error("User could not be updated.")
            return
        }

        let friends = []
        if (friendsData.length > 0) {
            friends = friendsData.map(friend => new Friend(friend));
        }

        this._user.friends = friends
        userLog.info("Friends have been added to the user.")

        return friends
    }

    async storeUser(userData) {
        try {
            const userJsonValue = JSON.stringify(userData);
            await AsyncStorage.setItem('user', userJsonValue)

            userLog.info("User has been stored successfully.")
            return true

        } catch (error) {
            userLog.error("User could not be stored.", error)
            return false
        }
    }

    async loadUser() {
        try {
            const userJsonValue = await AsyncStorage.getItem('user');
            if (userJsonValue !== null) {
                const userData = JSON.parse(userJsonValue)
                this._user = new User(userData)

                await this.updateFriends(userData)

                userLog.info("User has been loaded successfully.")
                return this._user
            } else {
                userLog.error("User could not be loaded.")
            }
        } catch (error) {
            userLog.error("User could not be loaded.", error)
        }
    }

    async deleteUser() {
        try {
            await AsyncStorage.removeItem('user');
            userLog.info("User has been deleted successfully.")
            return true
        } catch (error) {
            userLog.error("User could not be deleted.", error)
            return false
        }
    }

    getUser() {
        // update last login for user and friends to make sure images are up to date
        const user = this._user
        user.lastLogin = new Date()
        user.friends.forEach(friend => friend.lastLogin = user.lastLogin);

        return user;
    }

    setUser(user) {
        this._user = user;
    }
}