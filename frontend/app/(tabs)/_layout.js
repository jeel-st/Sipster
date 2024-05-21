import React from 'react';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { styles } from '../constants';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: styles.Colors.tertiary,
        tabBarActiveTintColor: styles.Colors.yellow, headerShown: false,
        tabBarStyle: { backgroundColor: styles.Colors.secondary, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 5, paddingTop: 5, height: 55, borderTopWidth: 0},
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <Entypo size={24} name="calendar" color={color} />,
          href: '/events',
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Games',
          tabBarIcon: ({ color }) => <Entypo size={24} name="game-controller" color={color} />,
          href: '/games',
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="user" color={color} />,
          href: '/account',
        }}
      />
    </Tabs>
  );
}