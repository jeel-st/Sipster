import { View, Text, Pressable, ScrollView, StatusBar, TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { styles } from '../constants'
import { FriendsTab } from '../components'
import { router } from 'expo-router'
import Animated, {
    useSharedValue,
    withTiming,
    withDelay,
  } from 'react-native-reanimated';
import React, { useRef, useState } from 'react'

export default function FriendsPage() {
    const width = useSharedValue(40)
    const opacity = useSharedValue(0)
    const isActive = useSharedValue(false)
    const inputRef = useRef(null);
    const [searchText, setSearchText] = useState('');

    const startAnimation = () => {
        if(isActive.value){
            opacity.value = withTiming(0)
            width.value = withTiming(40)
            isActive.value = false
        }
        else{
            opacity.value = withDelay(100, withTiming(1));
            width.value = withTiming(300)
            isActive.value = true
        }
    }

    return (
        <View className="flex-1" style={{ backgroundColor: styles.Colors.primary }} >
            <View className="flex-initial mx-6">
                {/* Handy Header */}
                <View style={{ height: StatusBar.currentHeight }} />

                <View className="flex-1 flex-row mt-4 justify-between">
                    {/* Back Button */}
                    <Pressable onPress={() => router.back()}
                        className="w-10 h-10 rounded-xl justify-center items-center"
                        style={{ backgroundColor: styles.Colors.primary }}>
                        <View className="rounded-xl">
                            <FontAwesome name="chevron-left" size={24} color="white" />
                        </View>
                    </Pressable>

                    {/* Search Button */}
                    <Pressable onPress={startAnimation}
                        className="z-20 w-10 h-10 rounded-full justify-center items-center"
                        style={{ backgroundColor: styles.Colors.secondary }}>
                        <View className="rounded-xl">
                            <FontAwesome name="search" size={24} color="white" />
                        </View>
                    </Pressable>
                    <Animated.View
                        className="absolute h-10 rounded-full justify-center items-center top-0 right-0 w-80"
                        style={{ backgroundColor: styles.Colors.secondary, width: width, opacity: opacity }}>
                        <TextInput
                            ref={inputRef}
                            placeholder="Search Friends"
                            placeholderTextColor={styles.Colors.white}
                            clearButtonMode="always"
                            onChangeText={(value) => {setSearchText(value) }}
                            className="flex-1 h-10 text-white self-start ml-4 w-80" />
                    </Animated.View>
                </View>

                {/* Branding */}
                <View className="mt-12">
                    <Text className={styles.brandingText}>Friends</Text>
                </View>

                {/* Friends Tab */}
                <FriendsTab searchText={searchText}/>
            </View>
        </View>

    )
}