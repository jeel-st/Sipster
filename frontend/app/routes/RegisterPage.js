// Imports
import { View, Text, SafeAreaView, Pressable, Image } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { styles } from '../constants';
import { Popover, NativeBaseProvider } from "native-base";
import { ErrorMessage, SipsterButton, SmallTextField, TextField } from '../components';
import { useRegisterLogic } from '../utils/hooks/useRegister/';
import { classNames } from '../utils';
import { useNavBarColor } from '../utils/hooks/useNavBarColor';

/*
Front end of the RegisterPage.
Typ: Page/route
*/
export default function RegisterPage() {

    // Background is set depending on the operating system
    useNavBarColor(styles.Colors.primary)

    // Import the logic for the RegisterPage from useRegister.js
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
            <SafeAreaView className={classNames(
                'flex-1 items-center justify-center', // position
                'bg-primary' // styling
            )}>
                <View className={classNames(
                    'items-center', // position
                    'mx-6 mb-12' // spacing
                )}>

                    {/* Branding */}
                    <View className={classNames("mb-4")}>
                        <Image style={{ width: 300, height: 90, resizeMode: 'contain' }} source={require('../assets/images/logo.png')} />
                    </View>

                    {/* input fields */}
                    <View className={("flex-row")}>
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
                            return <Pressable {...triggerProps} className={classNames(
                                'justify-center items-center', // position
                                'w-5 h-5', // sizing
                                'bg-secondary text-yellow rounded-full border-2 border-yellow' // styling
                            )}>
                                <Text className={classNames("text-yellow text-ls font-bold")}>i</Text>
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
                    <ErrorMessage error={registerError} />

                </View>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}
