import React from 'react';
import { View } from 'react-native'
import { classNames } from '../../utils'
import FriendsTabButton from './FriendsTabButton'
import { tabTitles } from '../../constants/friends';

/*
    FriendsCategorys is a component that represents the tabs in the friends page.
    It displays the tabs for "my friends", "received", and "sent" friend requests.
    Typ: Component from friends

    @param selectedTab:     number -> the selected tab
    @param onTabChange:     function -> the function to call when the tab is changed
    @return:                JSX -> returns the FriendsCategorys component
*/
export default function FriendsCategorys({ selectedTab, onTabChange }) {

  return (
    <View className={classNames(
      'flex-row justify-start items-center', // position
      'px-4 pt-4', // spacing
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