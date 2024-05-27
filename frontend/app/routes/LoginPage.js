// Imports
import { View, Text, SafeAreaView, Image } from 'react-native';
import { Colors } from '../constants/styles';
import React from 'react';
import { router } from 'expo-router';
import { styles } from '../constants';
import { TextField, SipsterButton } from '../components/';
import { useLoginLogic } from '../utils/hooks/useLogin';

/* 
Front end of the LoginPage. 
Typ: Page/route
*/
export default function LoginPage() {

    // Import the logic for the LoginPage from useLogin.js
    const {
        username,
        setUsername,
        password,
        setPassword,
        loginError,
        setLoginError,
        handleLogin
    } = useLoginLogic();


    return (
        <SafeAreaView className="flex-1 items-center" style={{ backgroundColor: Colors.primary }}>
            <View className="mx-6 items-center">

                {/* Distance */}
                <View className="h-20 mt-16" />

                {/* Branding */}
                <View className="mt-20 mb-5">
                    <Image source={require('../assets/images/logo.png')} />
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