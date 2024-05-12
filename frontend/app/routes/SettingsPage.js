/* Imports */
import { SafeAreaView, Text, StatusBar, View, TouchableOpacity } from "react-native"
import { SettingsButton, SipsterButton, CheckButton, TextField } from '../components/'
import { styles } from '../constants'
import { router } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { changeUsernameLogic } from '../utils/hooks/changeSettingsLogic';
import React, { useState } from 'react';
import { ScrollView, NativeBaseProvider } from "native-base"

/* Frontend der LoginPage */
export default function SettingsPage() {

    // useState() -> Hook-Funktion von React um Zustände zu handeln
    const [isChangeUsernameVisible, setChangeUsernameVisible] = useState(false);
    const [isChangePasswordVisible, setChangePasswordVisible] = useState(false);
    const [isChangeFirstnameVisible, setChangeFirstnameVisible] = useState(false);
    const [isChangeLastnameVisible, setChangeLastnameVisible] = useState(false);
    const [isChangeEmailVisible, setChangeEmailVisible] = useState(false);

    /* Import der Logik für die changeUsername-Komponente aus changeSettingsLogic.js */
    const { username, setUsername, loginError, setLoginError, handleChangeUsername } = changeUsernameLogic();

    return (
        <NativeBaseProvider>
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

                    {/* Title */}
                    <View className="mt-6">
                        <Text className={styles.brandingText}>your settings</Text>
                    </View>

                    {/* Change Buttons */}
                    <ScrollView className="mt-6 pb-10" >

                        {/* Change Username */}
                        <SettingsButton title="change username" onPress={() => setChangeUsernameVisible(!isChangeUsernameVisible)} />
                        {/* Aufklappbares Element für die Änderung des Benutzernamens */}
                        {isChangeUsernameVisible && (
                            <View className="flex-row mt-6 mb-6 ml-3 items-center">
                                <TextField placeholder="new username" value={username} onChangeText={(text) => { setUsername(text); setLoginError('') }} />
                                <CheckButton change={() => handleChangeUsername()} />
                            </View>
                        )}

                        {/* Change Password */}
                        <SettingsButton title="change password" onPress={() => setChangePasswordVisible(!isChangePasswordVisible)} />
                        {/* Aufklappbares Element für die Änderung des Passwortes */}
                        {isChangePasswordVisible && (
                            <View className="flex-row mt-6 mb-6 ml-3 items-center">
                                <View>
                                    <TextField placeholder="old password" value={username} onChangeText={(text) => { setUsername(text); setLoginError('') }} />
                                    <TextField placeholder="new password" value={username} onChangeText={(text) => { setUsername(text); setLoginError('') }} />
                                </View>
                                <CheckButton change={() => handleChangeUsername()} />
                            </View>
                        )}

                        {/* Change Firstname*/}
                        <SettingsButton title="change firstname" onPress={() => setChangeFirstnameVisible(!isChangeFirstnameVisible)} />
                        {/* Aufklappbares Element für die Änderung des Vornamens */}
                        {isChangeFirstnameVisible && (
                            <View className="flex-row mt-6 mb-6 ml-3 items-center">
                                <TextField placeholder="new firstname" value={username} onChangeText={(text) => { setUsername(text); setLoginError('') }} />
                                <CheckButton change={() => handleChangeUsername()} />
                            </View>
                        )}

                        {/* Change Lastname*/}
                        <SettingsButton title="change lastname" onPress={() => setChangeLastnameVisible(!isChangeLastnameVisible)} />
                        {/* Aufklappbares Element für die Änderung des Vornamens */}
                        {isChangeLastnameVisible && (
                            <View className="flex-row mt-6 mb-6 ml-3 items-center">
                                <TextField placeholder="new lastname" value={username} onChangeText={(text) => { setUsername(text); setLoginError('') }} />
                                <CheckButton change={() => handleChangeUsername()} />
                            </View>
                        )}

                        {/* Change Email*/}
                        <SettingsButton title="change email" onPress={() => setChangeEmailVisible(!isChangeEmailVisible)} />
                        {/* Aufklappbares Element für die Änderung des Vornamens */}
                        {isChangeEmailVisible && (
                            <View className="flex-row mt-6 mb-6 ml-3 items-center">
                                <TextField placeholder="new email" value={username} onChangeText={(text) => { setUsername(text); setLoginError('') }} />
                                <CheckButton change={() => handleChangeUsername()} />
                            </View>
                        )}

                        {/* Change ProfilPicture*/}
                        <SettingsButton title="change profile picture" />


                    </ScrollView>

                    {/* Logout Button*/}
                    <View className="items-center">
                        <SipsterButton title="Logout" navigation={() => router.navigate('routes/LoginPage')} />
                    </View>

                </View>



            </SafeAreaView >
        </NativeBaseProvider>
    )
}