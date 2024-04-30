import { SafeAreaView, Pressable, Text, StatusBar, Image } from "react-native"
import { styles } from '../constants';
import React from 'react';
import { router } from 'expo-router'
import useUser from '../utils/userFetcher';
import { NativeBaseProvider, View } from "native-base";
import { FriendsScrollView,  FriendsSkeleton} from "../components";
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
                            <View className="justify-center items-center w-10 h-10 rounded-xl bg-secondary">
                                <AntDesign name="setting" size={24} color="white" />
                            </View>
                        </Pressable>
                    </View>

                    {/* Hello User */}
                    <View className={styles.spaceText}>
                        <Text className={styles.categoryText}>Hello {user && user.firstName}!</Text>
                    </View>

                    {/* Informations */}
                    <View className="flex-row mx-6">

                        {/* Sip-Counter */}
                        <View className="h-40 w-40 flex items-center justify-center rounded-3xl shadow-md shadow-black mt-3 bg-yellow" >
                            <Text className="text-center text-2xl font-bold">1000 sips</Text>
                        </View>

                        {/* Profile Picture */}
                        <View className="h-40 w-40 mx-5 rounded-3xl shadow-md shadow-black mt-3 bg-secondary" >
                            <Image source={{ uri: user && user.profilePicture }} className="w-40 h-40" />
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