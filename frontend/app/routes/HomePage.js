import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { classNames } from '../utils';
import { styles } from '../constants';
import { HomeActivityCard, HomeActivityFactory, HomeFooter, HomeHeader, RefreshContext } from '../components';
import useHome from '../utils/hooks/useHome';
import { useNavBarColor } from '../utils/hooks/useNavBarColor';
import { rootLog } from '../utils/logger/config';

/*
    HomePage is a page that displays the user's friends and their activities.
    Typ: Page/route

    @return: JSX -> returns the HomePage component
*/
export default function HomePage() {
    const { user, displayFriend, handleFriendSelection, onRefresh, refreshing, refreshDate, activities, displayFriendActivities } = useHome();

    useNavBarColor(styles.Colors.secondary)

    return (
        <SafeAreaView className={classNames(
            'flex-1', // sizing
            'bg-primary' // styling
        )}>
            <HomeHeader
                displayFriend={displayFriend}
                handleFriendSelection={handleFriendSelection}
            />
            {activities && displayFriend === 0 &&
                <RefreshContext.Provider value={refreshDate}>
                    <FlatList
                        data={activities}
                        renderItem={({ item, index }) => <HomeActivityFactory item={item} index={index}/>}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                progressBackgroundColor={'#DFFA54'}
                            />}
                        ListFooterComponent={<HomeFooter />}
                        onEndReachedThreshold={0.1}
                        onEndReached={loadMoreData}
                    />
                </RefreshContext.Provider>
            }
            {displayFriendActivities && displayFriend !== 0 &&
                <RefreshContext.Provider value={refreshDate}>
                    <FlatList
                        data={displayFriendActivities}
                        renderItem={({ item, index }) => <HomeActivityCard activity={item} />}
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
            }
        </SafeAreaView>
    );

    function loadMoreData(){
        rootLog.debug('Load more data');
    };
}