import { View, Image, Pressable } from 'react-native'
import React from 'react'
import { classNames } from '../../utils';
import { fetchProfilePictureCompressed } from '../../utils/database/imageFetcher';

export default function HomeFriendBtn({ friend, displayFriend, handleFriendSelection, friendId }) {
    return (
        <Pressable
            className={classNames(
                'items-center',
                'pb-5',
                'w-20',
            )}
            onPress={() => handleFriendSelection(friendId)}
        >
            {/* Container for the friend image */}
            <View className={classNames(
                'justify-center items-center',
                'h-16 w-16',
                displayFriend === friendId ? 'bg-purple' : 'bg-gray-600',
                'rounded-full shadow-md shadow-black'
            )}>
                <View className={classNames(
                    'w-[93%] h-[93%]',
                    'bg-black rounded-full'
                )}>
                    <Image
                        className={classNames(
                            'mt-[5%] ml-[5%]',
                            'w-[90%] h-[90%]',
                            'rounded-full'
                        )}
                        source={{ uri: fetchProfilePictureCompressed(friend) }}
                    />
                </View>
            </View>
        </Pressable>
    )
}