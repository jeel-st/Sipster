import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from "../entitys/user";
import { fetchFriendsData } from "./friendsFetcher";
import { useEffect, useState } from "react";

export async function storeUser(username){
    try {
        const response = await axios.get(`http://85.215.71.124/user/${username}`)
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
            const value = JSON.parse(jsonValue)
            console.log("[getUser] loading user successfully")

            const friendsData = await fetchFriendsData(value.username)

            const user = createUser(value, friendsData)

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
            console.log("[getUser] loading user successfully")

            return(value.username)
        }else{
            console.log("[getUser] User is Null")
        }
    } catch (error){
        console.log("[getUser Error] ",error)
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

function createUser(userData, friends) {
    const user = new User(userData.firstName, userData.lastName, userData.registerDate, userData.username, userData.email, friends)
    return user
}