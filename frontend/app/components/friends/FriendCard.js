import { View, Text, Image, Pressable } from 'react-native'
import { styles } from '../../constants';
import { router } from 'expo-router'
import React from 'react'
import getProfilePicture from '../../utils/accountFetcher';

export default function FriendCard({ friend, user }) {
    return ( friend &&
        <Pressable className="mx-1 w-20 items-center"
            onPress={() => router.navigate({ pathname: "/routes/ProfilePage", params: friend})}>
            <View className="h-20 w-20 rounded-full shadow-md shadow-black justify-center items-center" style={{ backgroundColor: styles.Colors.yellow }}>
                <Image className="w-5/6 h-5/6 rounded-full" source={{ uri: `http://85.215.71.124/static/${getProfilePicture(friend)}`}} />
            </View>
            <Text className="mt-1 text-white font-bold text-xs">{friend.username}</Text>
        </Pressable>
    )
}