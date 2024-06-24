import { ScrollView, View, Image } from 'react-native';
import React from 'react';
import { classNames } from '../../utils';
import { fetchProfilePictureCompressed } from '../../utils/database/imageFetcher';
import { useUser } from '../../utils/hooks/useUser';

/*
    HomeFriends is a component that represents the list of friends as a tablist.
    It displays a list of friends in a horizontal scroll view.
    Typ: Component from settings

    @return: JSX -> returns the ShowFriends component
*/
export default function ShowFriends() {

    // User information is loaded
    const user = useUser();

    return (
        <ScrollView
            className={classNames(
                'mt-4 px-2'
            )}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {
                user && user.friends && user.friends.map((friend, index) => {
                    const profilePictureUri = fetchProfilePictureCompressed(friend);

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
