import { View, Text, SafeAreaView } from 'react-native'
import { Colors } from '../constants/styles'
import React, { useState } from 'react'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { router } from 'expo-router';
import { styles } from '../constants';
import { useRegister } from '../utils/registerFetcher'


export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmedPassword] = useState('');
    const [registerError, setRegisterError] = useState('');
    const { register } = useRegister();

    const handleRegister = async () => {
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            setRegisterError('Please enter your username, email, and password.');
            return;
        } else if (password !== confirmPassword) {
            setRegisterError('The passwords do not match.');
            return;
        }

        await register(username, email, password, () => {
            console.log("Registration successful.");
            router.navigate('routes/LoginPage');
        });
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
                <TextField placeholder="  username" value={username} onChangeText={(text) => { setUsername(text); setRegisterError('') }} />

                <TextField placeholder="  email" value={email} onChangeText={(text) => { setEmail(text); setRegisterError('') }} />

                <TextField placeholder="  password" value={password} onChangeText={(text) => { setPassword(text); setRegisterError(''); }} hideText={true} />

                <TextField placeholder="  confirm password" value={confirmPassword} onChangeText={(text) => { setConfirmedPassword(text); setRegisterError(''); }} hideText={true} />

                {/* Button */}
                <Button title="welcome to sipster!" navigation={() => handleRegister()} />

                {/* Sign In */}
                <View className={styles.spaceText}>
                    <Text className={styles.H3Text} onPress={() => router.navigate('routes/LoginPage')}> {'>>'} Sign In</Text>
                </View>

                {/* Error Message */}
                <View className={styles.spaceText}>
                    {registerError ? (<Text className="text-red-500 text-center">{registerError}</Text>) : null}
                </View>

            </View>
        </SafeAreaView>
    )
}