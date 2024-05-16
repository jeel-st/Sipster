import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from "../../entitys/user";
import axiosInstance from "./axiosConfig";

export async function storeUser(username){
    try {
        const response = await axiosInstance.get(`/user/${username}`)
        console.log("[storeUser] store user successfully")
        try{
            const jsonValue = JSON.stringify(response.data);
            await AsyncStorage.setItem('user', jsonValue)
        } catch (error){
            console.log("[storeUser Error] ",error)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getUser(){
    try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue !== null) {
            const userData = JSON.parse(jsonValue)
            console.log("[getUser] loading user successfully")

            const user = new User(userData)
            await user.initializeFriends()

            return(user)
        }else{
            console.log("[getUser] User is Null")
        }
    } catch (error){
        console.log("[getUser Error] ",error)
    }
}

export async function getUsername(){
    try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue !== null) {
            const value = JSON.parse(jsonValue)
            console.log("[getUsername] loading user successfully")

            return(value.username)
        }else{
            console.log("[getUsername] User is Null")
        }
    } catch (error){
        console.log("[getUsername Error] ",error)
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