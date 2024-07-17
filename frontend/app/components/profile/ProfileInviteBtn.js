import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { classNames } from '../../utils';

/*
    ProfileInviteBtn is a component that represents the invite button in the profile page.
    It displays a button to invite a friend, close the invite, or remove a friend.
    Typ: Component from profile

    @param isInvited:           boolean -> if the friend is invited
    @param isFriend:            boolean -> if the friend is a friend
    @param closeInviteHandler:  function -> the function to call when the invite is closed
    @param inviteFriendHandler: function -> the function to call when the friend is invited
    @param removeFriendHandler: function -> the function to call when the friend is removed
    @return:                   JSX -> returns the ProfileInviteBtn component
*/
export default function ProfileInviteBtn({ isInvited, isFriend, closeInviteHandler, inviteFriendHandler, removeFriendHandler }) {
    return isInvited ? (
        <TouchableOpacity onPress={closeInviteHandler}>
            <View className={classNames(
                'flex-row justify-center items-center', // position
                'h-10 px-2', // spacing
                'rounded-xl bg-yellow', // styling
            )}>
                <Text className={classNames(
                    'text-black text-xs font-bold', // styling
                    'px-2' // spacing
                )}>Close Invite</Text>
                <MaterialIcons name="schedule-send" size={24} color="black" />
            </View>
        </TouchableOpacity>
    ) : !isFriend ? (
        <TouchableOpacity onPress={inviteFriendHandler}>
            <View className={classNames(
                'flex-row justify-center items-center', // position
                'h-10 px-2', // spacing
                'rounded-xl bg-green-300', // styling
            )}>
                <Text className={classNames(
                    'text-white text-xs font-bold', // styling
                    'px-2' // spacing
                )}>Add Friend</Text>
                <AntDesign name="adduser" size={24} color="white" />
            </View>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity onPress={removeFriendHandler}>
            <View className={classNames(
                'flex-row justify-center items-center', // position
                'h-10 px-2', // spacing
                'rounded-xl bg-red-500', // styling
            )}>
                <Text className={classNames(
                    'text-white text-xs font-bold', // styling
                    'px-2' // spacing
                )}>Remove Friend</Text>
                <AntDesign name="deleteuser" size={24} color="white" />
            </View>
        </TouchableOpacity>
    );
}