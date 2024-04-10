import { View, Text, SafeAreaView } from 'react-native'
import { Colors } from '../constants/styles'
import React, { useState } from 'react'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { router } from 'expo-router'
import { styles } from '../constants'
import { useLogin } from '../utils/loginFetcher';

export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoggedIn, token, loginError } = useLogin();

    const handleLogin = () => {
        login(username, password, () => navigation.navigate('RegisterPage'));
    };


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
                <TextField placeholder="  username" value={username} onChangeText={setUsername} />

                <TextField placeholder="  password" value={password} onChangeText={setPassword} secureTextEntry={true} />

                {/* Button */}
                <Button title="let's party" navigation={() => router.navigate('(tabs)')} />

                {/* Sign Up */}
                <View className={styles.spaceText}>
                    <Text className={styles.H3Text} onPress={handleLogin}> {'>>'} Sign Up</Text>
                    {loginError ? <Text>{loginError}</Text> : null}
                </View>

            </View>
        </SafeAreaView>
    )
}