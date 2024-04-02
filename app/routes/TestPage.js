import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { setBackgroundColorAsync } from 'expo-system-ui';

export default function TestPage() {
  return (
    <><View>
          <Text>TestPage</Text>
      </View>
      <Pressable onPress={console.log("Hello Biatch!")}>
            <Text>Hello Biatch!</Text>
        </Pressable></>
  );
}