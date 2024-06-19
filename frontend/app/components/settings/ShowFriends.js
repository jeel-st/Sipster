import { ScrollView, Dimensions, View, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { classNames } from '../../utils';
import { fetchProfilePictureCompressed } from '../../utils/database/imageFetcher';
import { useUser } from '../../utils/hooks/useUser';

/*
    HomeFriends is a component that represents the list of friends as a tablist.
    It displays a list of friends in a horizontal scroll view.
    Typ: Component from settings

    @return: JSX -> returns the HomeFriends component
*/
export default function ShowFriends() {
    const user = useUser();

    const [scrollEnable, setScrollEnable] = useState(false);

    // Getting the width of the screen
    const screenWidth = Dimensions.get('window').width;

    // useEffect to update scrollEnable based on the number of friends
    useEffect(() => {
        if (user && user.friends) {
            setScrollEnable(user.friends.length > 5);
        }
    }, [user]);

    // Constants for calculating content width
    const FRIEND_CARD_WIDTH = 91;
    const contentWidth = user && user.friends ? Math.max(screenWidth, user.friends.length * FRIEND_CARD_WIDTH) : screenWidth;

    // Debugging log
    console.log('User:', user);
    if (user && user.friends) {
        console.log('Friends:', user.friends);
    }

    return (
        <ScrollView
            className={classNames(
                'mt-4 px-2'
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: contentWidth }}
            scrollEnabled={scrollEnable}>
            {
                user && user.friends && user.friends.map((friend, index) => {
                    const profilePictureUri = fetchProfilePictureCompressed(friend);
                    console.log(`Friend ${index} profile picture URI:`, profilePictureUri);

                    return (
                        <View
                            key={index}
                            className={classNames(
                                'items-center', // position
                                'pb-5', // spacing
                                'w-20', // sizing
                            )}>
                            {/* Container for the friend image */}
                            <View className={classNames(
                                'justify-center items-center', // position
                                'h-16 w-16', // sizing
                                'bg-purple', // styling
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
                                        source={{ uri: profilePictureUri }}
                                    />
                                </View>
                            </View>
                        </View>
                    );
                })
            }
        </ScrollView>
    );
}
