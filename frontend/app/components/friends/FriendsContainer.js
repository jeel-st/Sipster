import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { classNames } from '../../utils'
import { AntDesign } from '@expo/vector-icons';
import { NativeBaseProvider } from "native-base";
import FriendsH2Skeleton from '../skeletons/FriendsH2Skeleton';
import FriendBtn2 from './FriendBtn2'
import { useFriendContainer } from '../../utils/hooks/useFriendsContainer';

export default function FriendsContainer({ friends, searchText, user, selectedTab, handleReloadFriends }) {
    if (!friends) return
    const { searchFriendsVisible, searchFriends, filteredFriends } = useFriendContainer({ friends, searchText, user, selectedTab })

    return (
        <NativeBaseProvider isSSR={true}>
            <View className={classNames('px-4 pt-4 space-y-3')}>

                {/*Friends Counter Text*/}
                <Text className={classNames('text-white font-thin')}>
                    {searchFriendsVisible ? `Found ${searchFriends.length} user` : `Found ${filteredFriends.length} user`}
                </Text>

                {/*Friend Invite Button*/}
                {searchFriendsVisible && (
                    <TouchableOpacity
                        className={classNames(
                            'flex-row items-center justify-between',
                            'px-4',
                            'h-16',
                            'rounded-xl bg-secondary border-[0.5px] border-slate-200',
                        )}>
                        <Text className={classNames('text-white font-semibold text-xl')}> Invite Friends to Sipster {':)'}</Text>
                        <AntDesign name="right" size={24} color="white" />
                    </TouchableOpacity>
                )}

                {/*Friend ScrollView Container*/}
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/*Show friendsskeleton if no friends found*/}
                    {(filteredFriends.length === 0 && searchFriends.length === 0) && FriendsH2Skeleton()}

                    {/*Show friends from friendlist*/}
                    {
                        filteredFriends.map((friend, index) =>
                            <FriendBtn2 friend={friend} key={index} selectedTab={selectedTab} user={user} handleReloadFriends={handleReloadFriends}/>
                        )
                    }

                    {/*Show friends from network*/}
                    {searchFriendsVisible &&
                        searchFriends.map((friend, index) => (
                            <FriendBtn2 friend={friend} key={index} selectedTab={selectedTab} user={user} handleReloadFriends={handleReloadFriends}/>
                        ))
                    }
                </ScrollView>
            </View>
        </NativeBaseProvider>
    );
}