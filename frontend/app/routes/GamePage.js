import { View, Text, ScrollView, SafeAreaView, Pressable, Image, Dimensions } from 'react-native'
import { styles } from '../constants'
import { FontAwesome } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import User from '../entitys/user'

const { width, height } = Dimensions.get('window');

export default function GamePage() {
    const game = useLocalSearchParams();

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1"
            style={{ backgroundColor: styles.Colors.primary }}>

            <View className="w-full">
                <SafeAreaView className="absolute z-20 flex-row justify-between items-center px-4 mt-10">
                    <Pressable onPress={() => router.back()} className="w-10 h-10 rounded-xl justify-center items-center" style={{ backgroundColor: styles.Colors.primary }}>
                        <View className="rounded-xl mr-1">
                            <FontAwesome name="chevron-left" size={24} color="white" />
                        </View>
                    </Pressable>
                </SafeAreaView>
                <View>
                    <Image
                        source={{ uri: game.profile }}
                        style={{ width, height: height * 0.55 }} />
                    <LinearGradient
                        colors={['transparent', 'rgba(36,36,36,0.9)', 'rgba(36,36,36, 1)']}
                        style={{ width, height: height * 0.40 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0" />
                </View>
            </View>

            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {game.name}
                </Text>
                <Text className="text-neutral-400 text-center font-semibold">
                    Spielzeit • {game.playtime}
                </Text>
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {game.desc}
                </Text>
            </View>
        </ScrollView>
    )
}