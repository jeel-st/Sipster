import { View, TouchableOpacity, Text } from 'react-native'
import { Entypo, FontAwesome, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { classNames } from '../../utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import { declineFriendInvite, fetchFriendsInvitations, removeFriend, sendFriendInvite } from '../../utils/friendsFetcher'
import useUser from '../../utils/userFetcher'
import { Box, Center, HStack, Icon, IconButton, Stagger, useDisclose } from 'native-base'

export default function ProfileHeaderButtons({ friend }) {
    const [isFriend, setIsFriend] = useState(false)
    const [isInvited, setIsInvited] = useState(false)
    const user = useUser();

    let buttonComponent;

    const handleRemoveFriend = async () => {
        try {
            await removeFriend(user.username, friend.username)
            await handleIsFriend()
        } catch (error) {
            console.log("[ProfileHeaderButtons.handleRemoveFriend] ", error)
            return
        }
        setIsFriend(false)
        user.friends.filter(item => item.username !== friend.username);
    }

    const handleInviteFriend = async () => {
        try {
            await sendFriendInvite(user.username, friend.username)
            await handleIsFriend()
        } catch (error) {
            console.log("[ProfileHeaderButtons.handleInviteFriend] ", error)
            return
        }
    }

    const handleCloseInvite = async () => {
        try {
            await declineFriendInvite(user.username, friend.username)
            await handleIsFriend()
        } catch (error) {
            console.log("[ProfileHeaderButtons.handleCloseInvite] ", error)
            return
        }
    }

    const handleIsFriend = async () => {
        const isfriend = user.friends.find((elemenent) => elemenent.username == friend.username)
        const invites = await fetchFriendsInvitations(user.username)
        inviteReceived = invites[0].find((elemenent) => elemenent.username == friend.username)
        sentReceived = invites[1].find((elemenent) => elemenent.username == friend.username)
        if (isfriend) {
            setIsFriend(true)
        } else if (inviteReceived || sentReceived) {
            setIsInvited(true)
        } else {
            setIsFriend(false)
            setIsInvited(false)
        }
    }

    useEffect(() => {
        if (user) {
            handleIsFriend();
        }
    }, [user]);

    if (isInvited) {
        buttonComponent = (
            <TouchableOpacity onPress={async () => handleCloseInvite()}>
                <View className={classNames(
                    'justify-center items-center mt-4',
                    'w-10 h-10',
                    'rounded-xl bg-yellow',
                )}>
                    <MaterialIcons name="schedule-send" size={24} color="black" />
                </View>
            </TouchableOpacity>
        );
    }
    else if (!isFriend) {
        buttonComponent = (
            <TouchableOpacity onPress={async () => handleInviteFriend()}>
                <View className={classNames(
                    'justify-center items-center mt-4',
                    'w-10 h-10',
                    'rounded-xl bg-green-300',
                )}>
                    <AntDesign name="adduser" size={24} color="white" />
                </View>
            </TouchableOpacity>
        );
    }
    else {
        buttonComponent = (
            <TouchableOpacity onPress={async () => handleRemoveFriend()}>
                <View className={classNames(
                    'justify-center items-center mt-4',
                    'w-10 h-10',
                    'rounded-xl bg-red-500',
                )}>
                    <AntDesign name="deleteuser" size={24} color="white" />
                </View>
            </TouchableOpacity>
        );
    }
    const {
        isOpen,
        onToggle
    } = useDisclose();

    const Example = () => {
        return <Center position="absolute">
            <Box alignItems="center" minH="220">
                <HStack alignItems="center">
                    <IconButton variant="solid" borderRadius="xl" size="10" onPress={onToggle} bg="#242424" icon={<Icon as={MaterialCommunityIcons} size="6" name="dots-horizontal" />} />
                </HStack>

                <Stagger visible={isOpen} initial={{
                    opacity: 0,
                    scale: 0,
                    translateY: 34
                }} animate={{
                    translateY: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                        type: "spring",
                        mass: 0.8,
                        stagger: {
                            offset: 30
                        }
                    }
                }} exit={{
                    translateY: 34,
                    scale: 0.5,
                    opacity: 0,
                    transition: {
                        duration: 100,
                        stagger: {
                            offset: 30
                        }
                    }
                }}>
                    {buttonComponent}
                    <IconButton mt="4" variant="solid" bg="#DFFA54" borderRadius="xl" icon={<Icon as={MaterialCommunityIcons} size="5" name="microphone" color="black" />} />
                    <IconButton mt="4" variant="solid" bg="#DFFA54" borderRadius="xl" icon={<Icon as={MaterialCommunityIcons} size="5" name="video" color="black" />} />
                    <IconButton mt="4" variant="solid" bg="#DFFA54" borderRadius="xl" icon={<Icon as={MaterialIcons} size="5" name="photo-library" color="black" />} />
                </Stagger>
            </Box>
        </Center>
    };

    return (
        <View className={classNames('z-20')}>
            <SafeAreaView className={classNames(
                'absolute flex-row justify-between items-center',
                'px-4',
                'w-full mt-[-16px]',
            )}>
                {/* Back Button*/}
                <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
                    <View className={classNames(
                        'justify-center items-center', // position
                        'pr-1', // spacing
                        'w-10 h-10', // sizing
                        'rounded-xl bg-secondary', // styling
                    )}>
                        <FontAwesome name="chevron-left" size={24} color="white" />
                    </View>
                </TouchableOpacity>

                {/* Settings Button*/}
                <TouchableOpacity onPress={() => console.log("Profile Settings Button")} className="w-10 h-10">
                    {Example()}
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}
