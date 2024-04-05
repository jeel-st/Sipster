import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: '#DFFA54', headerShown: false,
                        tabBarStyle: {backgroundColor: '#343434', flexDirection: 'row', justifyContent: 'space-around' },
                        tabBarLabelStyle: {fontSize: 0}
                    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Entypo size={28}  name="calendar" color={color} />,
          href: '/events',
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="chess-knight" color={color} />,
          href: '/games',
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          href: '/account',
        }}
      />
    </Tabs>
  );
}