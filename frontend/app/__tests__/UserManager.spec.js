// Import
import React from "react";
import UserManager from '../entitys/UserManager'
import { fetchUser } from "../utils/database/userFetcher";
import { fetchFriends } from "../utils/database/friendsFetcher";
import { userLog } from "../utils/logger/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../entitys/user";
import Friend from "../entitys/friend";




describe('UserManager Singelton', () => {
    it('should return the same instance', () =>{

        const instance1 = UserManager.getInstance();
        const instance2 = UserManager.getInstance();

        expect(instance1).toBe(instance2);
    });
});


jest.mock("../utils/database/userFetcher");
jest.mock("../utils/database/friendsFetcher");
jest.mock("../utils/logger/config");
jest.mock('@react-native-async-storage/async-storage');

describe('instantiate a user', () => {
    let userManager;

    beforeEach(() => {
        userManager = UserManager.getInstance();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should instantiate user with friends correctly', async () => {
        const mockUser = { username: 'testuser' };
        const mockFriends = [{ name: 'friend1' }, { name: 'friend2' }];
        
        fetchUser.mockResolvedValue(mockUser);
        fetchFriends.mockResolvedValue(mockFriends);
        AsyncStorage.setItem.mockResolvedValue(true);

        await userManager.instantiateUser('testuser');

        expect(fetchUser).toHaveBeenCalledWith('testuser');
        expect(fetchFriends).toHaveBeenCalledWith(mockUser);
        expect(userLog.info).toHaveBeenCalledWith("Friends have been added to the user.");
        expect(AsyncStorage.setItem).toHaveBeenCalled();
        expect(userLog.info).toHaveBeenCalledWith("User has been initialized successfully.");
    });

    test('should log error if user could not be fetched', async () => {
        fetchUser.mockResolvedValue(null);

        await userManager.instantiateUser('invaliduser');

        expect(userLog.error).toHaveBeenCalledWith("User could not be initialized.");
    });

});
