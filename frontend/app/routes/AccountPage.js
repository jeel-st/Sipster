import { SafeAreaView, Pressable, Text, StatusBar } from "react-native"
import { Friends } from "../components"
import { styles } from '../constants';
import React from 'react';
import { router } from 'expo-router'
import useUser from '../utils/userFetcher';
import { NativeBaseProvider, View } from "native-base";


export default function AccountPage() {

    const user = useUser();
    console.log(user)

    return (
        <NativeBaseProvider>
            <SafeAreaView className="flex-1 bg-primary">

                <View>

                    {/* Header */}
                    <View style={{ height: StatusBar.currentHeight }} />

                    {/* Branding */}
                    <View className={styles.spaceText}>
                        <Text className={styles.brandingText}>sipster</Text>
                    </View>

                    {/* Hello User */}
                    <View className={styles.spaceText}>
                        <Text className={styles.categoryText}>Hello {user.firstName} !</Text>
                    </View>

                    {/* Informations */}
                    <View className="h-40 m-1 mx-6 rounded-3xl shadow-md shadow-black mt-5 bg-yellow">
                        <Text className="text-center text-4xl font-bold">1000 sips!</Text>
                    </View>

                    <View className="flex-row mx-6">
                        <View className="h-40 w-40 rounded-3xl shadow-md shadow-black mt-3 bg-purple" >

                        </View>

                        <View className="h-40 w-40 mx-5 rounded-3xl shadow-md shadow-black mt-3 bg-secondary" >

                        </View>
                    </View>


                    {/* Friends */}
                    <Pressable className={styles.spaceText}
                        onPress={() => router.navigate({
                            pathname: "/routes/FriendsPage"
                        })}>
                        <Text className={styles.categoryText}>friends</Text>
                    </Pressable>
                    {
                        user && (<Friends friends={user.friends} />)
                    }
                </View>
            </SafeAreaView>
        </NativeBaseProvider >
    )
}