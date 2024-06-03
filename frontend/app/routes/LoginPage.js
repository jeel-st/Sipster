// Imports
import { View, Text, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { styles } from '../constants';
import { TextField, SipsterButton, ErrorMessage } from '../components/';
import { useLoginLogic } from '../utils/hooks/useLogin';
import { classNames } from '../utils';
import { useNavBarColor } from '../utils/hooks/useNavBarColor';

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

    // Background is set depending on the operating system
    useNavBarColor(styles.Colors.primary)

    return (
        <SafeAreaView className={classNames(
            'flex-1 items-center justify-center', // position
            'bg-primary' // styling
            )}>
            <View className={classNames('items-center')}>

                {/* Branding */}
                <View className={classNames("mb-6")}>
                    <Image style={{ width: 300, height: 90, resizeMode: 'contain' }} source={require('../assets/images/logo.png')} />
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
                <ErrorMessage error={loginError}/>

            </View>
        </SafeAreaView>
    )
}