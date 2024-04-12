import { View, Text } from 'react-native'
import { classNames } from '../../utils'
import FriendsTabButton from './FriendsTabButton'
import React from 'react';

export default function FriendsCategorys({ selectedTab, onTabChange }) {
  const tabTitles = ["my friends", "received", "sent"];

  return (
    <View className={classNames(
      'flex-row justify-start items-center',
      'px-4 pt-4',
    )}>
      {
        tabTitles.map((title, index) => (
          <FriendsTabButton
            key={title}
            title={title}
            onClick={() => onTabChange(index)}
            isSelected={selectedTab === index}
          />
        ))
      }
    </View>
  )
}