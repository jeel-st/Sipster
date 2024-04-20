import { SafeAreaView, Pressable, Text, StatusBar } from "react-native"
import { Friends } from "../components"
import { styles } from '../constants';
import React from 'react';
import { router } from 'expo-router'
import useUser from '../utils/userFetcher';
import { NativeBaseProvider, View } from "native-base";


export default function AccountPage() {

    const user = useUser();

    return (
        <NativeBaseProvider>
            <SafeAreaView className="flex-1 bg-primary">

                <View>

                    {/* Header */}
                    <View style={{ height: StatusBar.currentHeight }} />

                    {/* Hello User */}
                    <View className={styles.spaceText}>
                        <Text className={styles.brandingText}>Hello {user.firstName}</Text>
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
        </NativeBaseProvider>
    )
}