// Imports
import { SafeAreaView, Text, StatusBar, View, Platform } from "react-native";
import { SettingsButton, SipsterButton, CheckButton, TextField, IconButton, AboutUs, Help, Picker, DeleteAccount, ErrorMessage } from '../components/';
import { styles } from '../constants';
import { router } from 'expo-router';
import { useSettings } from '../utils/hooks/useSettings';
import React, { useState } from 'react';
import { ScrollView, NativeBaseProvider } from "native-base"
import { classNames } from '../utils';
import { setBackgroundColorAsync } from "expo-navigation-bar";

/*
Front end of the SettingsPage.
Typ: Page/route
*/

// Background is set depending on the operating system
export default function SettingsPage() {
    if (Platform.OS === 'android') {
        setBackgroundColorAsync(styles.Colors.primary);
    }

    // CSS properties of the ChangeButtons
    const design = classNames(
        'flex-row items-center',
        'mt-6 mb-6 ml-3');

    // useState() -> Hook function of React to trade states
    const [isChangeUsernameVisible, setChangeUsernameVisible] = useState(false);
    const [isChangePasswordVisible, setChangePasswordVisible] = useState(false);
    const [isChangeFirstNameVisible, setChangeFirstNameVisible] = useState(false);
    const [isChangeLastNameVisible, setChangeLastNameVisible] = useState(false);
    const [isChangeEmailVisible, setChangeEmailVisible] = useState(false);
    const [isChangePictureVisible, setChangePictureVisible] = useState(false);

    // Import the logic for the changeUsername component from changeSettingsLogic.js
    const {
        username,
        firstName,
        lastName,
        newPassword,
        oldPassword,
        confirmPassword,
        email,
        setLastName,
        setUsername,
        setNewPassword,
        setOldPassword,
        setConfirmPassword,
        setEmail,
        setFirstName,
        settingsError,
        setSettingsError,
        handleChangeUsername,
        handleChangePassword,
        handleChangeEmail,
        handleChangeLastName,
        handleChangeFirstName
    } = useSettings();

    return (
        <NativeBaseProvider>
            <SafeAreaView className={classNames('flex-1 bg-primary')} contentContainerStyle={{ flexGrow: 1 }} >

                <View className={styles.spaceText}>
                    {/* Header */}
                    <View style={{ height: StatusBar.currentHeight }} />

                    {/* Back Button */}
                    <IconButton icon="chevron-left" navigation={() => router.back()} />

                    {/* Title */}
                    <View className={classNames('mt-6')}>
                        <Text className={styles.brandingText}>your settings</Text>
                    </View>

                    {/* Change Buttons */}
                    <ScrollView className={classNames('mt-6 pb-10')}>

                        {/* Change Username */}
                        <SettingsButton title="change username" onPress={() => setChangeUsernameVisible(!isChangeUsernameVisible)} />
                        {/* Expandable element for changing the username */}
                        {isChangeUsernameVisible && (
                            <View className={design}>
                                <TextField placeholder="new username" value={username} onChangeText={(text) => { setUsername(text); setSettingsError('') }} />
                                <CheckButton change={() => handleChangeUsername().then(() => setChangeUsernameVisible(!isChangeUsernameVisible))} />
                            </View>
                        )}

                        {/* Change Password */}
                        <SettingsButton title="change password" onPress={() => setChangePasswordVisible(!isChangePasswordVisible)} />
                        {/* Expandable element for changing the password */}
                        {isChangePasswordVisible && (
                            <View className={design}>
                                <View>
                                    <TextField placeholder="old password" value={oldPassword} onChangeText={(text) => { setOldPassword(text); setSettingsError('') }} hideText={true}/>
                                    <TextField placeholder="new password" value={newPassword} onChangeText={(text) => { setNewPassword(text); setSettingsError('') }} hideText={true}/>
                                    <TextField placeholder="confirm new password" value={confirmPassword} onChangeText={(text) => { setConfirmPassword(text); setSettingsError('') }} hideText={true}/>
                                </View>
                                <CheckButton change={() => handleChangePassword().then(() => setChangePasswordVisible(!isChangePasswordVisible))} />
                            </View>
                        )}

                        {/* Change Firstname*/}
                        <SettingsButton title="change firstname" onPress={() => setChangeFirstNameVisible(!isChangeFirstNameVisible)} />
                        {/* Expandable element for changing the firstname */}
                        {isChangeFirstNameVisible && (
                            <View className={design}>
                                <TextField placeholder="new firstname" value={firstName} onChangeText={(text) => { setFirstName(text); setSettingsError('') }} />
                                <CheckButton change={() => handleChangeFirstName().then(() => setChangeFirstNameVisible(!isChangeFirstNameVisible))} />
                            </View>
                        )}

                        {/* Change Lastname*/}
                        <SettingsButton title="change lastname" onPress={() => setChangeLastNameVisible(!isChangeLastNameVisible)} />
                        {/* Expandable element for changing the lastname */}
                        {isChangeLastNameVisible && (
                            <View className={design}>
                                <TextField placeholder="new lastname" value={lastName} onChangeText={(text) => { setLastName(text); setSettingsError('') }} />
                                <CheckButton change={() => handleChangeLastName().then(() => setChangeLastNameVisible(!isChangeLastNameVisible))} />
                            </View>
                        )}

                        {/* Change Email*/}
                        <SettingsButton title="change email" onPress={() => setChangeEmailVisible(!isChangeEmailVisible)} />
                        {/* Expandable element for changing the email */}
                        {isChangeEmailVisible && (
                            <View className={design}>
                                <TextField placeholder="new email" value={email} onChangeText={(text) => { setEmail(text); setSettingsError('') }} />
                                <CheckButton change={() => handleChangeEmail().then(() => setChangeEmailVisible(!isChangeEmailVisible))} />
                            </View>
                        )}

                        {/* Change ProfilPicture*/}
                        <SettingsButton title="change profile picture" onPress={() => setChangePictureVisible(!isChangePictureVisible)} />
                        {/* Expandable element for changing the profile picture */}
                        {isChangePictureVisible && (
                            <View className={design}>
                                <Picker change={() => setChangePictureVisible(!isChangePictureVisible)} />
                            </View>
                        )}

                        <View className={classNames('mt-6')}>
                            {/*Help*/}
                            <Help />

                            {/*About us*/}
                            <AboutUs />

                            {/*Delete Account*/}
                            <DeleteAccount />
                        </View>

                        {/* Logout Button*/}
                        <View className={classNames('items-center')}>
                            <SipsterButton title="Logout" navigation={() => router.navigate('routes/LoginPage')} />
                        </View>

                        {/* Error Message */}
                        <ErrorMessage error={settingsError} />

                        {/* Distance */}
                        <View className={classNames('h-20 mt-16')} />

                    </ScrollView>

                </View>

            </SafeAreaView >
        </NativeBaseProvider>
    )
}