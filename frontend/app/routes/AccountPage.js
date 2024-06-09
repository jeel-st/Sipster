// Imports
import { SafeAreaView, Pressable, Text, StatusBar, Image } from "react-native";
import { styles } from '../constants';
import { React } from "react";
import { router } from 'expo-router'
import useUser from '../utils/database/userFetcher';
import { NativeBaseProvider, View } from "native-base";
import { FriendsScrollView, FriendsSkeleton, IconButton } from "../components";
import { classNames } from "../utils";
import { fetchProfilePictureCompressed } from '../utils/database/imageFetcher';
import { navBarColor } from "../utils/navBarColor";
import { useAccount } from "../utils/hooks/useAccount";

/*
Front end of the AccountPage.
All user information is displayed and managed here.
Typ: Page/route
*/

// Background is set depending on the operating system
export default function AccountPage() {

    navBarColor(styles.Colors.secondary)

    // logged in user is called
    const user = useUser();
    const { level, levelInfo } = useAccount();

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
                            <Text className='text-center text-xl font-bold'>Level {level}</Text>
                            <Text className='text-center'>______</Text>
                            <View className="flex-row items-center">
                                <Text className='text-center text-3xl font-bold mt-2 mr-2'>{user && user.sips}</Text>
                                <Text className='text-center text-xl mt-2'>sips</Text>
                            </View>
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
                        <View className='flex-row items-center'>
                            <Image style={{ width: 100, height: 80, resizeMode: 'contain' }} source={levelInfo.image} />
                            <View className='ml-4'>
                            <Text className='text-2xl font-bold'>{levelInfo.header}</Text>
                            <Text className='text-xl'>{levelInfo.text}</Text>
                            </View>
                        </View>
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