import React from 'react';
import { AntDesign, Entypo, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { styles } from '../constants';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: styles.Colors.tertiary,
        tabBarActiveTintColor: styles.Colors.yellow, headerShown: false,
        tabBarStyle: {
          backgroundColor: styles.Colors.secondary,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'top',
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
      }}
      sceneContainerStyle={{ backgroundColor: styles.Colors.primary }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <AntDesign size={24} name="home" color={color} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <SimpleLineIcons size={24} name="event" color={color} />
            </TabIcon>
          ),
          href: '/events',
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <AntDesign name="plus" size={24} color={color} />
            </TabIcon>
          ),
          href: '/post',
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Games',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <SimpleLineIcons size={24} name="game-controller" color={color} />
            </TabIcon>
          ),
          href: '/games',
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <AntDesign size={24} name="user" color={color} />
            </TabIcon>
          ),
          href: '/account',
        }}
      />
    </Tabs>
  );
}

const TabIcon = ({ children, focused }) => (
  <View style={[styling.tabIconContainer, focused && styling.activeTabIcon]}>
    {children}
  </View>
);

export const styling = {
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: 'transparent',
  },
  activeTabIcon: {
    backgroundColor: 'rgba(223,250,84,0.2)',
  },
};