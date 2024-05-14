/* Imports */
import { View, Text, SafeAreaView, Pressable, Image } from 'react-native'
import { Colors } from '../constants/styles'
import React from 'react'
import { router } from 'expo-router';
import { styles } from '../constants';
import { Popover, NativeBaseProvider } from "native-base";
import { SipsterButton, SmallTextField, TextField } from '../components';
import { useRegisterLogic } from '../utils/hooks/useRegister/'

/* Frontend der RegisterPage */
export default function RegisterPage() {

    /* Import der Logik für die RegisterPage aus useRegister.js */
    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmedPassword,
        registerError,
        setRegisterError,
        handleRegister
    } = useRegisterLogic();

    return (
        <NativeBaseProvider>
            <SafeAreaView className="flex-1 items-center" style={{ backgroundColor: Colors.primary }}>
                <View className="mx-6 items-center">

                    {/* Distance */}
                    <View className="h-4 mt-10" />

                    {/* Branding */}
                    <View className="mt-20 mb-5">
                        <Image source={require('../assets/images/logo.png')} />
                    </View>

                    {/* input fields */}
                    <View className="flex-row">
                        <SmallTextField
                            className="w-28"
                            placeholder="first name"
                            value={firstName}
                            onChangeText={(text) => { setFirstName(text); setRegisterError(''); }}
                        />
                        <SmallTextField
                            placeholder="last name"
                            value={lastName}
                            onChangeText={(text) => { setLastName(text); setRegisterError(''); }}
                        />
                    </View>

                    <TextField placeholder="username" value={username} onChangeText={(text) => { setUsername(text); setRegisterError('') }} />

                    <TextField placeholder="email" value={email} onChangeText={(text) => { setEmail(text); setRegisterError('') }} />

                    {/*InfoButton*/}
                    <View className="items-end w-64">

                        <Popover trigger={triggerProps => {
                            return <Pressable {...triggerProps} className="w-5 h-5 rounded-full border-2 border-yellow justify-center items-center bg-secondary text-yellow">
                                <Text className="text-yellow text-ls font-bold">i</Text>
                            </Pressable>;
                        }}>
                            <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                                <Popover.Arrow />
                                <Popover.CloseButton />
                                <Popover.Header>password  requirements:</Popover.Header>
                                <Popover.Body>
                                    8-20 characters;
                                    at least one uppercase letter, one lowercase letter, one special character, one number
                                </Popover.Body>
                            </Popover.Content>
                        </Popover>
                    </View>

                    <TextField placeholder="password" value={password} onChangeText={(text) => { setPassword(text); setRegisterError(''); }} hideText={true} />

                    <TextField placeholder="confirm password" value={confirmPassword} onChangeText={(text) => { setConfirmedPassword(text); setRegisterError(''); }} hideText={true} />

                    {/* Button */}
                    <SipsterButton title="welcome to sipster!" navigation={() => handleRegister()} />

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
        </NativeBaseProvider>
    )
}
