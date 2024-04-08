import { View, Text, SafeAreaView } from 'react-native'
import { Colors } from '../constants/styles'
import React from 'react'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { router } from 'expo-router';


export default function RegisterPage() {
    return (
        <SafeAreaView className="flex-1 items-center" style={{ backgroundColor: Colors.primary }}>
            <View className="mx-6 items-center">

                {/* Distance */}
                <View className="h-20 mt-20" />

                {/* Branding */}
                <View className="mt-20 mb-5">
                    <Text className="text-white font-bold text-4xl tracking-widest text-center">sipster</Text>
                </View>

                {/* input fields */}
                <TextField placeholder="  username" />

                <TextField placeholder="  email" />

                <TextField placeholder="  password" />

                <TextField placeholder="  confirm password" />

                {/* Button */}
                <Button title="welcome to sipster!" navigation={() => router.navigate('routes/LoginPage')} />


            </View>
        </SafeAreaView>
    )
}