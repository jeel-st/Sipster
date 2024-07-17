import { View, Image, Pressable } from 'react-native'
import React from 'react'
import { classNames } from '../../utils';
import { fetchProfilePictureCompressed } from '../../utils/database/imageFetcher';

/*
    HomeFriendBtn is a component that represents a single friend in the home activity tab list.
    It displays the profile picture of the friend.
    Typ: Component from home

    @param friend:                 object -> the friend to display
    @param displayFriend:          string -> the friend that is currently displayed
    @param handleFriendSelection:  function -> the function to call when the friend is selected
    @param friendId:               string -> the id of the friend
    @return:                       JSX -> returns the HomeFriendBtn component
*/
export default function HomeFriendBtn({ friend, displayFriend, handleFriendSelection, friendId }) {
    return (
        <Pressable
            className={classNames(
                'items-center', // position
                'pb-5', // spacing
                'w-20', // sizing
            )}
            onPress={() => handleFriendSelection(friendId)}
        >
            {/* Container for the friend image */}
            <View className={classNames(
                'justify-center items-center', // position
                'h-16 w-16', // sizing
                displayFriend === friendId ? 'bg-purple' : 'bg-gray-600', // styling
                'rounded-full shadow-md shadow-black' // styling
            )}>
                <View className={classNames(
                    'w-[93%] h-[93%]', // sizing
                    'bg-black rounded-full' // styling
                )}>
                    <Image
                        className={classNames(
                            'mt-[5%] ml-[5%]', // position
                            'w-[90%] h-[90%]', // sizing
                            'rounded-full' // styling
                        )}
                        source={{ uri: fetchProfilePictureCompressed(friend) }}
                    />
                </View>
            </View>
        </Pressable>
    )
}