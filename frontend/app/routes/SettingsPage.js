/* Imports */
import { SafeAreaView, Text, StatusBar, View, TouchableOpacity } from "react-native"
import { SettingsButton, SipsterButton, CheckButton, TextField, IconButton, AboutUs } from '../components/'
import { styles, settings } from '../constants'
import { router } from 'expo-router'
import { useSettings } from '../utils/hooks/useSettings';
import React, { useState } from 'react';
import { ScrollView, NativeBaseProvider } from "native-base"
import { Ionicons } from '@expo/vector-icons';
import { setBackgroundColorAsync } from "expo-navigation-bar";

/* Frontend der LoginPage */
export default function SettingsPage() {
    setBackgroundColorAsync(styles.Colors.primary);

    // useState() -> Hook-Funktion von React um Zustände zu handeln
    const [isChangeUsernameVisible, setChangeUsernameVisible] = useState(false);
    const [isChangePasswordVisible, setChangePasswordVisible] = useState(false);
    const [isChangeFirstnameVisible, setChangeFirstnameVisible] = useState(false);
    const [isChangeLastnameVisible, setChangeLastnameVisible] = useState(false);
    const [isHelpVisible, setHelpVisible] = useState(false);
    const [isChangeEmailVisible, setChangeEmailVisible] = useState(false);

    /* Import der Logik für die changeUsername-Komponente aus changeSettingsLogic.js */
    const { username, lastName, newPassword, oldPassword, confirmPassword, email, setLastName, setUsername, setNewPassword, setOldPassword, setConfirmPassword, setEmail, settingsError, setSettingsError, handleChangeUsername, handleChangePassword, handleChangeEmail, handleChangeLastname } = useSettings();

    return (
        <NativeBaseProvider>
            <SafeAreaView className="flex-1 bg-primary" contentContainerStyle={{ flexGrow: 1 }} >

                <View className={styles.spaceText}>
                    {/* Header */}
                    <View style={{ height: StatusBar.currentHeight }} />

                    {/* Back Button */}
                    <IconButton icon="chevron-left" navigation={() => router.back()} />

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
                                <TextField placeholder="new username" value={username} onChangeText={(text) => { setUsername(text); setSettingsError('') }} />
                                <CheckButton change={() => handleChangeUsername().then(() => setChangeUsernameVisible(!isChangeUsernameVisible))} />
                            </View>
                        )}

                        {/* Change Password */}
                        <SettingsButton title="change password" onPress={() => setChangePasswordVisible(!isChangePasswordVisible)} />
                        {/* Aufklappbares Element für die Änderung des Passwortes */}
                        {isChangePasswordVisible && (
                            <View className="flex-row mt-6 mb-6 ml-3 items-center">
                                <View>
                                    <TextField placeholder="old password" value={oldPassword} onChangeText={(text) => { setOldPassword(text); setSettingsError('') }} />
                                    <TextField placeholder="new password" value={newPassword} onChangeText={(text) => { setNewPassword(text); setSettingsError('') }} />
                                    <TextField placeholder="confirm new password" value={confirmPassword} onChangeText={(text) => { setConfirmPassword(text); setSettingsError('') }} />
                                </View>
                                <CheckButton change={() => handleChangePassword().then(() => setChangePasswordVisible(!isChangePasswordVisible))} />
                            </View>
                        )}

                        {/* Change Firstname*/}
                        <SettingsButton title="change firstname" onPress={() => setChangeFirstnameVisible(!isChangeFirstnameVisible)} />
                        {/* Aufklappbares Element für die Änderung des Vornamens */}
                        {isChangeFirstnameVisible && (
                            <View className="flex-row mt-6 mb-6 ml-3 items-center">
                                <TextField placeholder="new firstname" value={firstname} onChangeText={(text) => { setFirstname(text); setSettingsError('') }} />
                                <CheckButton change={() => handleChangeFirstname()} />
                            </View>
                        )}

                        {/* Change Lastname*/}
                        <SettingsButton title="change lastname" onPress={() => setChangeLastnameVisible(!isChangeLastnameVisible)} />
                        {/* Aufklappbares Element für die Änderung des Nachnamens */}
                        {isChangeLastnameVisible && (
                            <View className="flex-row mt-6 mb-6 ml-3 items-center">
                                <TextField placeholder="new lastname" value={lastName} onChangeText={(text) => { setLastName(text); setSettingsError('') }} />
                                <CheckButton change={() => handleChangeLastname()} />
                            </View>
                        )}

                        {/* Change Email*/}
                        <SettingsButton title="change email" onPress={() => setChangeEmailVisible(!isChangeEmailVisible)} />
                        {/* Aufklappbares Element für die Änderung der Email */}
                        {isChangeEmailVisible && (
                            <View className="flex-row mt-6 mb-6 ml-3 items-center">
                                <TextField placeholder="new email" value={email} onChangeText={(text) => { setEmail(text); setSettingsError('') }} />
                                <CheckButton change={() => handleChangeEmail().then(() => setChangeEmailVisible(!isChangeEmailVisible))} />
                            </View>
                        )}

                        {/* Change ProfilPicture*/}
                        <SettingsButton title="change profile picture" />


                        {/*Help*/}
                        <View className="flex-row items-center mt-10">
                            <Ionicons name="help-circle-outline" size={25} color="white" style={{ marginRight: 10 }} />
                            <TouchableOpacity onPress={() => setHelpVisible(!isHelpVisible)}>
                                <Text className={styles.H3Text}>Help & FAQs</Text>
                            </TouchableOpacity>
                        </View>
                        {isHelpVisible && (
                            <View className="mt-6 mb-6 ml-3">
                                <Text className="text-yellow font-bold text-l">How do I log in to the application?</Text>
                                <Text className="text-white text-l">{settings.questions1}</Text>

                                <Text className="text-yellow font-bold text-l mt-4">How can I collect sips?</Text>
                                <Text className="text-white text-l">{settings.questions2}</Text>

                                <Text className="text-yellow font-bold text-l mt-4">How can I get help or support if I encounter an issue?</Text>
                                <Text className="text-white text-l">{settings.questions3}</Text>
                            </View>
                        )}

                        {/*About us*/}
                        <AboutUs />

                        {/*Delete Account*/}
                        <View className="flex-row mt-2 items-center">
                            <Ionicons name="warning-outline" size={25} color="red" style={{ marginRight: 10 }} />
                            <TouchableOpacity>
                                <Text className="text-red-500 font-bold text-l">Delete account</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Logout Button*/}
                        <View className="items-center">
                            <SipsterButton title="Logout" navigation={() => router.navigate('routes/LoginPage')} />
                        </View>

                        {/* Error Message */}
                        <View className={styles.spaceText}>
                            {settingsError ? (<Text className="text-red-500 text-center">{settingsError}</Text>) : null}
                        </View>

                        {/* Distance */}
                        <View className="h-20 mt-16" />

                    </ScrollView>

                </View>

            </SafeAreaView >
        </NativeBaseProvider>
    )
}