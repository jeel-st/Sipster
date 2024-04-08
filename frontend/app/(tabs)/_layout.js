import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { styles } from '../constants';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: styles.Colors.yellow, headerShown: false,
                        tabBarStyle: {backgroundColor: styles.Colors.primary, flexDirection: 'row', justifyContent: 'space-around' },
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
          tabBarIcon: ({ color }) => <Entypo size={28} name="game-controller" color={color} />,
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