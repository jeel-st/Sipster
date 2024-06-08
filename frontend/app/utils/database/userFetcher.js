import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from "../../entitys/user";
import axiosInstance from "./axiosConfig";
import { userLog } from "../logger/config";

export async function storeUser(username){
    try {
        const response = await axiosInstance.get(`/user/${username}`)
        userLog.debug("User has been stored successfully.")
        try{
            const jsonValue = JSON.stringify(response.data);
            await AsyncStorage.setItem('user', jsonValue)
        } catch (error){
            userLog.error("User could not be stored.", error)
        }
    } catch (error) {
        userLog.error("User could not be stored.", error)
    }
}

export async function getUser(){
    try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue !== null) {
            const userData = JSON.parse(jsonValue)
            userLog.debug("User has been loaded successfully.")

            const user = new User(userData)
            await user.initializeFriends()

            return(user)
        }else{
            userLog.error("User could not be loaded.")
        }
    } catch (error){
        userLog.error("User could not be loaded.", error)
    }
}

export async function getUsername(){
    try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue !== null) {
            const value = JSON.parse(jsonValue)
            userLog.debug("Username has been loaded successfully.")

            return(value.username)
        }else{
            userLog.error("Username could not be loaded.")
        }
    } catch (error){
        userLog.error("Username could not be loaded.", error)
    }
}

export default function useUser() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchUser() {
            const userData = await getUser()
            setUser(userData);
        }
        fetchUser();
    }, []);

    return user;
}

export async function clearUser() {
    await AsyncStorage.removeItem('user');
    userLog.debug("User data cleared successfully.");
}
