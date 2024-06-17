import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { classNames } from '../../utils'
import { AntDesign } from '@expo/vector-icons';
import { NativeBaseProvider } from "native-base";
import FriendsH2Skeleton from '../skeletons/FriendsH2Skeleton';
import FriendBtn2 from './FriendBtn2'
import { useFriendContainer } from '../../utils/hooks/friends/useFriendsContainer';

/*
    FriendsContainer is a component that is listing all friends in the friends list based on the tab selected.
    It displays the friends list and a counter for the number of friends found.
    Typ: Component from friends

    @param friends:             array -> the list of friends
    @param searchText:          string -> the search text
    @param selectedTab:         number -> the selected tab in the friends page
    @param handleReloadFriends: function -> the function to call when the friends list should be reloaded
    @return:                    JSX -> returns the FriendsContainer component
*/
export default function FriendsContainer({ friends, searchText, selectedTab, handleReloadFriends }) {
    if (!friends) return
    const { searchFriendsVisible, searchFriends, filteredFriends } = useFriendContainer({ friends, searchText })

    return (
        <NativeBaseProvider>
            <View className={classNames('flex-1 px-4 pt-4 space-y-3')}>

                {/*Friends Counter Text*/}
                <Text className='text-white font-thin'>
                    {searchFriendsVisible ? `Found ${searchFriends.length} user` : `Found ${filteredFriends.length} user`}
                </Text>

                {/*Friend Invite Button*/}
                {searchFriendsVisible && (
                    <TouchableOpacity
                        className={classNames(
                            'flex-row items-center justify-between', // position
                            'px-4', // spacing
                            'h-16', // sizing
                            'rounded-xl bg-secondary border-[0.5px] border-slate-200', // styling
                        )}>
                        <Text className={classNames('text-white font-semibold text-xl')}> Invite Friends to Sipster {':)'}</Text>
                        <AntDesign name="right" size={24} color="white" />
                    </TouchableOpacity>
                )}

                {/*Friend ScrollView Container*/}
                <ScrollView showsVerticalScrollIndicator={false} >

                    {/*Show friendsskeleton if no friends found*/}
                    {(filteredFriends.length === 0 && searchFriends.length === 0) && FriendsH2Skeleton()}

                    {/*Show friends from friendlist*/}
                    {
                        filteredFriends.map((friend, index) =>
                            <FriendBtn2
                                friend={friend}
                                key={index}
                                selectedTab={selectedTab}
                                handleReloadFriends={handleReloadFriends}
                            />
                        )
                    }

                    {/*Show friends from network*/}
                    {searchFriendsVisible &&
                        searchFriends.map((friend, index) => (
                            <FriendBtn2
                                friend={friend}
                                key={index}
                                selectedTab={selectedTab}
                                handleReloadFriends={handleReloadFriends}
                            />
                        ))
                    }
                </ScrollView>
            </View>
        </NativeBaseProvider>
    );
}