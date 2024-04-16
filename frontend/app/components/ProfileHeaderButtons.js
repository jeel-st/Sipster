import { View, TouchableOpacity, Text } from 'react-native'
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { classNames } from '../utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import { removeFriend, sendFriendInvite } from '../utils/friendsFetcher'
import useUser from '../utils/userFetcher'

export default function ProfileHeaderButtons({ friend }) {
    const [isFriend, setIsFriend] = useState(false)
    const user = useUser();

    let buttonComponent;

    const handleRemoveFriend = async () => {
        try{
            await removeFriend(user.username, friend.username)
        }catch(error){
            console.log("[ProfileHeaderButtons.handleRemoveFriend] ", error)
            return
        }
        setIsFriend(false)
        user.friends.filter(item => item.username !== friend.username);
    }

    const handleInviteFriend = async () => {
        try{
            await sendFriendInvite(user.username, friend.username)
        }catch(error){
            console.log("[ProfileHeaderButtons.handleInviteFriend] ", error)
            return
        }
    }

    const handleIsFriend = () => {
        const isfriend = user.friends.find((elemenent) => elemenent.username == friend.username)
        if(isfriend){
            setIsFriend(true)
        }
    }

    useEffect(() => {
        if(user){
            handleIsFriend();
        }
    }, [user]);

    if (!isFriend) {
        buttonComponent = (
            <TouchableOpacity onPress={async () => handleInviteFriend()}>
                <View className={classNames(
                    'justify-center items-center',
                    'w-10 h-10',
                    'rounded-xl bg-green-300',
                )}>
                    <AntDesign name="adduser" size={24} color="white" />
                </View>
            </TouchableOpacity>
        );
    } else {
        buttonComponent = (
            <TouchableOpacity onPress={async () => handleRemoveFriend()}>
                <View className={classNames(
                    'justify-center items-center',
                    'w-10 h-10',
                    'rounded-xl bg-red-500',
                )}>
                    <AntDesign name="deleteuser" size={24} color="white" />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View>
            <SafeAreaView className={classNames(
                'absolute z-20 flex-row justify-between items-center',
                'px-4',
                'w-full mt-[-16px]',
            )}>
                {/* Back Button*/}
                <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
                    <View className={classNames(
                        'justify-center items-center', // position
                        'pr-1', // spacing
                        'w-10 h-10', // sizing
                        'rounded-xl bg-secondary', // styling
                    )}>
                        <FontAwesome name="chevron-left" size={24} color="white" />
                    </View>
                </TouchableOpacity>

                <View className={classNames(
                    'flex-row',
                    'space-x-4'
                )}>
                    {buttonComponent}

                    {/* Settings Button*/}
                    <TouchableOpacity onPress={() => console.log("Profile Settings Button")}>
                        <View className={classNames(
                            'justify-center items-center',
                            'w-10 h-10',
                            'rounded-xl bg-secondary',
                        )}>
                            <Entypo name="dots-three-horizontal" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
