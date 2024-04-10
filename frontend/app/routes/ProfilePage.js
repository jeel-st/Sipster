import { View, Text, ScrollView, SafeAreaView, StatusBar, Pressable, Image, Dimensions } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router'
import { styles } from '../constants'
import { Friends, TagCard } from '../components'
import React from 'react'

const { width, height } = Dimensions.get('window');

export default function ProfilePage2() {
    const friend = useLocalSearchParams();
    const tags = [friend.date, friend.sips + " sips"]

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: styles.Colors.primary }}>
            <SafeAreaView className="absolute z-20 flex-row px-4 mt-10">
                <Pressable onPress={() => router.back()}
                    className="w-10 h-10 rounded-xl justify-center items-center"
                    style={{ backgroundColor: styles.Colors.primary }}>
                    <View className="rounded-xl mr-1">
                        <FontAwesome name="chevron-left" size={24} color="white" />
                    </View>
                </Pressable>
            </SafeAreaView>
            <SafeAreaView className="absolute z-20 flex-row px-4 mt-10 self-end space-x-2">
                <Pressable onPress={() => { console.log("share", friend.sipsterid) }}
                    className="w-10 h-10 rounded-xl justify-center items-center"
                    style={{ backgroundColor: styles.Colors.primary }}>
                    <View className="rounded-xl">
                        <Entypo name="share" size={24} color="white" />
                    </View>
                </Pressable>
                <Pressable onPress={() => { console.log("settings", friend.sipsterid) }}
                    className="w-10 h-10 rounded-xl justify-center items-center"
                    style={{ backgroundColor: styles.Colors.primary }}>
                    <View className="rounded-xl">
                        <Entypo name="dots-three-horizontal" size={24} color="white" />
                    </View>
                </Pressable>
            </SafeAreaView>

            {/* Blurred Background */}
            <Image
                source={{ uri: friend.profile }}
                style={{ width, height: height * 0.55 }}
                blurRadius={10} />

            {/* Profile Card */}
            <View className="flex-1 mt-[-60%] items-center justify-top">
                <Image
                    source={{ uri: friend.profile }}
                    className="w-44 h-44 rounded-full z-20" />
                <Text className="text-white font-bold text-l tracking-widest">same friends</Text>
                <View className="flex-1 rounded-t-[40px] mt-[-20%] items-center justify-top "
                    style={{ backgroundColor: styles.Colors.secondary }}>
                    <Text className="text-white font-bold text-2xl mt-16">{friend.fullname}</Text>
                    <Text className="text-neutral-400 font-semibold">@{friend.sipsterid}</Text>
                    <View className="flex-1 flex-row">
                        {
                            tags.map((tag, index) => <TagCard tag={tag} key={index} />)
                        }
                    </View>
                    <View className="mx-6 mt-[-25%] self-start">
                        <Text className="text-white font-bold text-l tracking-widest">same friends</Text>
                    </View>
                    <Friends />
                </View>
            </View>
        </View>
    )
}