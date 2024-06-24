// Imports
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchFriends } from "../utils/database/friendsFetcher";
import { fetchUser } from "../utils/database/userFetcher";
import { userLog } from "../utils/logger/config";
import User from "./user";
import Friend from "./friend";

export default class UserManager {
    // Singleton instance of UserManager
    static myInstance = null;

    _user = null;

    /*
        Method to get the singleton instance of UserManager

        @return: UserManager -> the singleton instance of UserManager
    */
    static getInstance() {
        if (UserManager.myInstance == null) {
            UserManager.myInstance = new UserManager();
        }

        return this.myInstance;
    }

    /*
        Method to instantiate a user based on the given username

        @param username: string -> the username of the user to instantiate
    */
    async instantiateUser(username) {
        const userData = await fetchUser(username)

        // Check if userData or friendsData is missing
        if (!userData) {
            userLog.error("User could not be initialized.")
            return
        }

        // Fetch friends data based on user data
        const friendsData = await fetchFriends(userData)

        // Initialize friends array with Friend instances for each friend data
        let friends = []
        if (friendsData.length > 0) {
            friends = friendsData.map(friend => new Friend(friend));
        }

        // Add friends to userData
        userData.friends = friends
        userLog.info("Friends have been added to the user.")

        // Store user data in AsyncStorage
        if (!await this.storeUser(userData)) {
            userLog.error("User could not be initialized.")
            return
        }

        // Create User instance and safe in singleton instance
        this.setUser(new User(userData))
        userLog.info("User has been initialized successfully.")
        userLog.debug(this._user.present())
    }

    /*
        Method to update the friends of the user

        @param user: object -> the user object to update
    */
    async updateFriends(user) {
        // Fetch friends data based on user data
        const friendsData = await fetchFriends(user)

        // Check if friendsData is missing
        if (!friendsData) {
            userLog.error("User could not be updated.")
            return
        }

        // Initialize friends array with Friend instances for each friend data
        let friends = []
        if (friendsData.length > 0) {
            friends = friendsData.map(friend => new Friend(friend));
        }

        // Add friends to user singleton instance
        this._user.friends = friends
        userLog.info("Friends have been added to the user.")

        return friends
    }

    /*
        Method to store the user data in AsyncStorage

        @param userData: object -> the user data to store
    */
    async storeUser(userData) {
        try {
            // Convert user data to JSON string and store in AsyncStorage
            const userJsonValue = JSON.stringify(userData);
            await AsyncStorage.setItem('user', userJsonValue)

            userLog.info("User has been stored successfully.")
            return true

        } catch (error) {
            userLog.error("User could not be stored.", error)
            return false
        }
    }

    /*
        Method to load the user data from AsyncStorage to avoid login on every app start

        @return: User -> the user object loaded from AsyncStorage
    */
    async loadUser() {
        try {
            // Get user data from AsyncStorage
            const userJsonValue = await AsyncStorage.getItem('user');
            if (userJsonValue !== null) {
                // Parse user data to create User instance
                const userData = JSON.parse(userJsonValue)
                this.setUser(new User(userData))

                // Update friends list based on loaded user data
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

    /*
        Method to delete the user data from AsyncStorage

        @return: boolean -> true if user has been deleted successfully, false otherwise
    */
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

    /*
        Method to get the user object

        @return: User -> the user object
    */
    getUser() {
        // Update last login for user and friends to ensure data is current
        const user = this._user
        user.lastLogin = new Date()
        user.friends.forEach(friend => friend.lastLogin = user.lastLogin);

        return user;
    }

    /*
        Method to set the user object

        @param user: User -> the user object to set
    */
    setUser(user) {
        this._user = user;
    }
}