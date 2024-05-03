import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { classNames } from '../utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../constants'
import ImageContainer from '../components/image/ImageContainer'
import { FontAwesome5 } from '@expo/vector-icons';

export default function ImagePage({ user, displayFriend, handleFriendSelection, handleScroll, scrollToFriend, navigateToFriendsPage }) {
  return (
    <SafeAreaView className={classNames(
      'flex-1',
      'bg-primary',
    )}>
      <View className={classNames(
        'flex-1',
      )}>
        {/* Header */}
        <View className={classNames(
          'flex-row justify-between',
          'mt-4 mx-6'
        )}>
          <Text className={styles.brandingText}>sipster</Text>

          {/* Friendsmenu Button */}
          <TouchableOpacity
            onPress={navigateToFriendsPage}
            className={classNames(
              'justify-center items-center'
            )}>
            <FontAwesome5 name="user-friends" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Image Container */}
        {user &&
          <ImageContainer
            user={user}
            displayFriend={displayFriend}
            handleFriendSelection={handleFriendSelection}
            handleScroll={handleScroll}
            scrollToFriend={scrollToFriend} />}
      </View>
    </SafeAreaView>
  )
}