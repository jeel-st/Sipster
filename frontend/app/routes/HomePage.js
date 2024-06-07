import React, { useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Image, RefreshControl, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { classNames } from '../utils';
import { events, styles } from '../constants';
import { navigateToFriendsPage } from '../utils/navigator';
import { FontAwesome5 } from '@expo/vector-icons';
import { EventInfoCard, Events, HomeActivityCard, HomeFriends, RefreshContext } from '../components';
import useHome from '../utils/hooks/useHome';
import { useNavBarColor } from '../utils/hooks/useNavBarColor';
import { rootLog } from '../utils/logger/config';

/*
    HomePage is a page that displays the user's friends and their activities.
    Typ: Page/route

    @return: JSX -> returns the HomePage component
*/
export default function HomePage() {
    const { user, displayFriend, handleFriendSelection, onRefresh, refreshing, refreshDate } = useHome();

    useNavBarColor(styles.Colors.secondary)

    const Header = () => {
        return (
            <View>
                {/* Header Text and Friendsmenu Button */}
                <View className={classNames(
                    'flex-row justify-between', // position
                    'mt-4 mx-6' // spacing
                )}>

                    {/* Sipster Logo */}
                    <Image style={{ width: 100, height: 50, resizeMode: 'contain' }} source={require('../assets/images/logo-small.png')} />

                    {/* Friendsmenu Button */}
                    <TouchableOpacity
                        onPress={navigateToFriendsPage}
                        className='justify-center items-center' >

                        <FontAwesome5 name="user-friends" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Friend controller tab bar */}
                <HomeFriends
                    user={user}
                    displayFriend={displayFriend}
                    handleFriendSelection={handleFriendSelection}
                />

                {/* Separation line */}
                <View className={classNames(
                    'w-full h-[2px]', // sizing
                    'bg-secondary' // styling
                )} />
            </View>
        );
    };

    const Content = () => {
        if (displayFriend === 0) {
            return (
                <RefreshContext.Provider value={refreshDate}>
                    <FlatList
                        data={user.friends}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                progressBackgroundColor={'#DFFA54'}
                            />}
                        ListFooterComponent={renderFooter}
                        onEndReachedThreshold={0.1}
                        onEndReached={loadMoreData}
                    />
                </RefreshContext.Provider>
            );
        } else {
            return (
                <RefreshContext.Provider value={refreshDate}>
                    <FlatList
                        data={[user.friends[displayFriend]]}
                        renderItem={({ item }) => <HomeActivityCard friend={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                progressBackgroundColor={'#DFFA54'}
                            />}
                        ListFooterComponent={<View className={classNames('pb-6')} />}
                    />
                </RefreshContext.Provider>
            );
        }
    };

    const renderItem = ({ item, index }) => {
        return (
            <View key={index}>
                <HomeActivityCard friend={item} />

                {/* Separation line */}
                <View className={classNames(
                    'mt-4', // spacing
                    'w-full h-[2px]', // sizing
                    'bg-secondary' // styling
                )} />

                {/* Füge die EventInfoCard und Events abwechselnd ein */}
                {index % 2 ?
                    <Events onSelectEvent={() => { }} selectedEvent={events[index]} />
                    : <EventInfoCard event={events[index]} />}

                {/* Füge die Separation Line hinzu, außer beim letzten Element */}
                {index !== user.friends.length - 1 &&
                    <View className={classNames(
                        'mt-4', // spacing
                        'w-full h-[2px]', // sizing
                        'bg-secondary' // styling
                    )} />
                }
            </View>
        );
    };

    const renderFooter = () => {
        return (
            <View className={classNames(
                'h-20', // sizing
                'justify-center items-center', // position
            )}>
                <ActivityIndicator size={'large'} color={'#DFFA54'} />
            </View>
        );
    }

    const loadMoreData = () => {
        rootLog.debug('Load more data');
    };

    return (
        <SafeAreaView className={classNames(
            'flex-1', // sizing
            'bg-primary' // styling
        )}>

            <Header />
            <Content />
        </SafeAreaView>
    );
}