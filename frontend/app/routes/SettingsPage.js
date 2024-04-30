import { SafeAreaView, Text, StatusBar, View, TouchableOpacity } from "react-native"
import { RedButton } from '../components/'
import { styles } from '../constants'
import { router } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

export default function SettingsPage() {

    return (
        <SafeAreaView className="flex-1 bg-primary">


            <View className={styles.spaceText}>
                {/* Header */}
                <View style={{ height: StatusBar.currentHeight }} />

                {/* Back Button*/}
                <TouchableOpacity onPress={() => router.back()}>
                    <View className="justify-center items-center pr-1 w-10 h-10 rounded-xl bg-secondary">
                        <FontAwesome name="chevron-left" size={24} color="white" />
                    </View>
                </TouchableOpacity>

                {/* Titel */}
                <View className="mt-6">
                    <Text className={styles.brandingText}>your settings</Text>
                </View>
            </View>

            {/* Logout Button*/}
            <View className="mt-5 mx-6 items-center">
                <RedButton title="Logout" navigation={() => router.navigate('routes/LoginPage')} />
            </View>

        </SafeAreaView >
    )
}