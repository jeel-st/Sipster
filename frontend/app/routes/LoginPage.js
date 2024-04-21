import { View, Text, SafeAreaView } from 'react-native'
import { Colors } from '../constants/styles'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { styles } from '../constants'
import { useLogin } from '../utils/loginFetcher';
import { storeUser } from '../utils/userFetcher'
import { TextField, SipsterButton } from '../components/'

export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const { login, isLoggedIn, token } = useLogin();

    const handleLogin = () => {

        if (username === '' || password === '') {
            setLoginError('Please enter your username and password.')
            return;
        } else {
            console.log("Login details have been entered.")
            login(username, password, setLoginError, async () => {
                await storeUser(username)
                router.navigate('(tabs)')
                console.log("Login successful.")
                setLoginError('')
            });
        }
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
                <TextField placeholder="username" value={username} onChangeText={(text) => { setUsername(text); setLoginError('') }} />

                <TextField placeholder="password" value={password} onChangeText={(text) => { setPassword(text); setLoginError(''); }} hideText={true} />

                {/* Button */}
                <SipsterButton title="let's party" navigation={() => handleLogin()} />

                {/* Sign Up */}
                <View className={styles.spaceText}>
                    <Text className={styles.H3Text} onPress={() => router.navigate('routes/RegisterPage')}> {'>>'} Sign Up</Text>
                </View>

                {/* Error Message */}
                <View className={styles.spaceText}>
                    {loginError ? (<Text className="text-red-500 text-center">{loginError}</Text>) : null}
                </View>

            </View>
        </SafeAreaView>
    )
}