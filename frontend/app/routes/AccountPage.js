// Imports
import { SafeAreaView, Pressable, Text, StatusBar, Image } from "react-native";
import { styles } from '../constants';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router'
import useUser, { getUser } from '../utils/database/userFetcher';
import { NativeBaseProvider, View } from "native-base";
import { FriendsScrollView, FriendsSkeleton, IconButton } from "../components";

import { classNames } from "../utils";
import { fetchProfilePictureCompressed } from '../utils/database/imageFetcher';
import { navBarColor } from "../utils/navBarColor";
import { usePathname } from "expo-router";

/*
Front end of the AccountPage.
All user information is displayed and managed here.
Typ: Page/route
*/

// Background is set depending on the operating system
export default function AccountPage() {
    navBarColor(styles.Colors.secondary)
    const [user, setUser] = useState(null)

    const path = usePathname()
    useEffect(() => {
        async function fetchUser() {
            const userData = await getUser()
            // Set user data in state
            setUser(userData);
        }
        if(path !== "/account") return
        fetchUser()
    }, [path]);

    // Styling: Tailwind rendering as a constant because we use it more then one.
    const text = classNames(
        'text-center text-2xl font-bold' // styling
    );

    return (
        <NativeBaseProvider>
            <SafeAreaView className="flex-1 bg-primary">

                <View>

                    {/* Header */}
                    <View style={{ height: StatusBar.currentHeight }} />

                    {/* Branding & Settings */}
                    <View className={classNames(
                        'flex-row items-center justify-between', // position
                        'mt-4 mx-6' // spacing
                    )}>
                        <Image style={{ width: 100, height: 50, resizeMode: 'contain' }} source={require('../assets/images/logo-small.png')} />
                        <IconButton icon="gear" navigation={() => router.navigate('routes/SettingsPage')} />
                    </View>

                    {/* Hello User */}
                    <View className={styles.spaceText}>
                        <Text className={styles.categoryText}>Hello {user && user.firstName}!</Text>
                    </View>

                    {/* Informations */}
                    <View className={classNames(
                        'flex-row justify-between', // position
                        'mx-6' // spacing
                    )}>
                        {/* Sip-Counter */}
                        <View className={classNames(
                            'flex items-center justify-center', // position
                            'mt-3', // spacing
                            'h-40 w-40', // sizing
                            'rounded-3xl shadow-md shadow-black bg-yellow' // styling
                        )}>
                            <Text className={text}>1000 sips</Text>
                        </View>

                        {/* Profile Picture */}
                        <View className={classNames(
                            'flex items-center justify-center', // position
                            'mt-3', // spacing
                            'h-40 w-40', // sizing
                            'rounded-3xl shadow-md shadow-black bg-secondary' // styling
                        )}>
                            {user && user.profilePicture ? (
                                <Image className="w-40 h-40 rounded-3xl" source={{ uri: fetchProfilePictureCompressed(user) }} />
                            ) : (
                                <Text className={classNames('text-white')}>No Profile Picture</Text>
                            )}
                        </View>
                    </View>

                    {/* Map */}
                    <View className={classNames(
                        'flex items-center justify-center', // position
                        'mt-6 mx-6', // spacing
                        'h-40', // sizing
                        'rounded-3xl shadow-md shadow-black bg-purple' // styling
                    )}>
                        <Text className={text}>Map</Text>
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