import { SafeAreaView, Pressable, Text, StatusBar } from "react-native"
import FriendsSkeleton from '../components/skeletons/FriendsSkeleton';
import { styles } from '../constants';
import React from 'react';
import { router } from 'expo-router'
import useUser from '../utils/userFetcher';
import { NativeBaseProvider, View } from "native-base";
import { FriendsScrollView } from "../components";
import { AntDesign } from '@expo/vector-icons';

export default function AccountPage() {

    const user = useUser();
    console.log("user: " + user)

    return (
        <NativeBaseProvider>
            <SafeAreaView className="flex-1 bg-primary">

                <View>

                    {/* Header */}
                    <View style={{ height: StatusBar.currentHeight }} />

                    {/* Branding & Settings */}
                    <View className="flex-row mt-4 mx-6 items-center justify-between" >
                        <Text className={styles.brandingText}>sipster</Text>

                        <Pressable onPress={() => router.navigate('routes/SettingsPage')}>
                            <AntDesign name="setting" size={24} color={styles.Colors.yellow}/>
                        </Pressable>
                    </View>

                    {/* Hello User */}
                    <View className={styles.spaceText}>
                        <Text className={styles.categoryText}>Hello {user.firstName}!</Text>
                    </View>

                    {/* Informations */}
                    <View className="flex-row mx-6">

                        {/* Sip-Counter */}
                        <View className="h-40 w-40 flex items-center justify-center rounded-3xl shadow-md shadow-black mt-3 bg-yellow" >
                            <Text className="text-center text-2xl font-bold">1000 sips</Text>
                        </View>

                        {/* Profile Picture */}
                        <View className="h-40 w-40 mx-5 rounded-3xl shadow-md shadow-black mt-3 bg-secondary" >

                        </View>
                    </View>

                    <View className="h-40 m-1 mx-6 flex items-center justify-center rounded-3xl shadow-md shadow-black mt-5 bg-purple">
                        <Text className="text-center text-4xl font-bold">Map</Text>
                    </View>

                    {/* Events */}
                    <View className={styles.spaceText}>
                        <Text className={styles.categoryText}>saved events</Text>
                    </View>


                    {/* Friends */}
                    <Pressable className={styles.spaceText}
                        onPress={() => router.navigate({
                            pathname: "/routes/FriendsPage"
                        })}>
                        <Text className={styles.categoryText}>friends</Text>
                    </Pressable>

                    {
                        user && user.friends.length > 0 && (<FriendsScrollView friends={user.friends} user={user} />)
                    }
                    {
                        user && user.friends.length == 0 && FriendsSkeleton()
                    }
                </View>
            </SafeAreaView>
        </NativeBaseProvider >
    )
}