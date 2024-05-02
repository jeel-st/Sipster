import { View, Text, Image, Pressable } from 'react-native'
import { styles } from '../../constants';
import { router } from 'expo-router'
import React from 'react'
import getProfilePicture from '../../utils/accountFetcher';
import { classNames } from '../../utils';

export default function ImageFriendBtn({ friend }) {
    return (friend &&
        <Pressable
            className={classNames(
                'items-center',
                'mx-1 pb-8',
                'w-20',
            )}
            onPress={() => console.log(friend.username + " Button was pressed")}
        >
            <View className={classNames(
                'justify-center items-center',
                'h-20 w-20',
                'bg-yellow rounded-full shadow-md shadow-black'
            )}>
                <View className={classNames(
                    'w-[95%] h-[95%]',
                    'bg-black rounded-full'
                )}>
                    <Image
                        className={classNames(
                            'mt-[5%] ml-[5%]',
                            'w-[90%] h-[90%]',
                            'rounded-full'
                        )}
                        source={{ uri: `http://85.215.71.124/static/${getProfilePicture(friend)}`, key: new Date() }}
                    />
                </View>
            </View>
        </Pressable>
    )
}