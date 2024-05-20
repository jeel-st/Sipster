import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { classNames } from '../../utils';

export default function ProfileInviteBtn({ isInvited, isFriend, closeInviteHandler, inviteFriendHandler, removeFriendHandler }) {
    return isInvited ? (
        <TouchableOpacity onPress={closeInviteHandler}>
            <View className={classNames(
                'flex-row justify-center items-center',
                'h-10 px-2',
                'rounded-xl bg-yellow',
            )}>
                <Text className={classNames(
                    'text-black text-xs font-bold',
                    'px-2'
                )}>Close Invite</Text>
                <MaterialIcons name="schedule-send" size={24} color="black" />
            </View>
        </TouchableOpacity>
    ) : !isFriend ? (
        <TouchableOpacity onPress={inviteFriendHandler}>
            <View className={classNames(
                'flex-row justify-center items-center',
                'h-10 px-2',
                'rounded-xl bg-green-300',
            )}>
                <Text className={classNames(
                    'text-white text-xs font-bold',
                    'px-2'
                )}>Add Friend</Text>
                <AntDesign name="adduser" size={24} color="white" />
            </View>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity onPress={removeFriendHandler}>
            <View className={classNames(
                'flex-row justify-center items-center',
                'h-10 px-2',
                'rounded-xl bg-red-500',
            )}>
                <Text className={classNames(
                    'text-white text-xs font-bold',
                    'px-2'
                )}>Remove Friend</Text>
                <AntDesign name="deleteuser" size={24} color="white" />
            </View>
        </TouchableOpacity>
    );
}