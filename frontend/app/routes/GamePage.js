import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { navigateToFriendsPage } from '../utils/navigator'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { GameActivity, GameFriendBtn } from '../components'
import { useGame } from '../utils/hooks/useGame'

export default function GamePage() {
    const { user, game, friends, taggedFriends, handleTaggedFriends, isTagged, isPressed, handlePress } = useGame()

    return (
        <View className={classNames(
            'flex-1',
            'bg-primary'
        )}>
            {isPressed && <GameActivity user={user} game={game} taggedFriends={taggedFriends}/>}
            <SafeAreaView className={classNames('flex-1')}>

                {/* Blurred Background with Gradient*/}
                <Image
                    source={{ uri: game.thumbnail }}
                    blurRadius={10}
                    className={classNames(
                        'absolute top-0 left-0',
                        'w-full h-[55%]'
                    )} />
                <LinearGradient
                    colors={['transparent', 'rgba(26,27,22,0.9)', 'rgba(26,27,22, 1)']}
                    start={{ x: 0.5, y: 0.2 }}
                    end={{ x: 0.5, y: 1 }}
                    className={classNames(
                        'absolute top-0 left-0',
                        'w-full h-[55%]'
                    )} />

                {/* Header Text and Info Button */}
                {Header()}

                <View className={classNames(
                    'flex-1 justify-between items-center',
                    'mt-28 mb-10',
                )}>

                    {GameInfo()}

                    <View className={classNames(
                        'flex-1 justify-center items-center',
                        'w-[90%]',
                    )}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            className={classNames(
                                'w-full'
                            )}>
                            {friends && friends.map((friend, index) => {
                                return <GameFriendBtn
                                    key={index}
                                    friend={friend}
                                    handleTaggedFriends={() => handleTaggedFriends(friend)}
                                    isTagged={isTagged(friend)} />
                            })}
                        </ScrollView>
                    </View>

                    <TouchableOpacity
                        onPress={handlePress}
                        className={classNames(
                            'justify-center items-center',
                            'mt-8',
                            'h-24 w-[80%]',
                            'bg-yellow rounded-2xl shadow-md shadow-black'
                        )}>
                        <Text className={classNames('text-black text-xl font-bold')}>Go</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )

    function GameInfo() {
        return <View className={classNames(
            'flex-1 justify-start items-center',
            'w-full'
        )}>
            {/* Gametitel Text */}
            <Text className={classNames(
                'text-white text-center text-3xl font-bold tracking-wider')}>
                {game.name}
            </Text>

            {/* Playtime Text */}
            <Text className={classNames(
                'text-neutral-400 text-center font-semibold',
                'mt-2 mb-4')}>
                Spielzeit • {game.playtime}
            </Text>

            <Text className={classNames(
                'text-neutral-400 mx-4 tracking-wide',
                'mt-2')}>
                {game.description}
            </Text>
        </View>
    }

    function Header() {
        return <>
            <View className={classNames(
                'flex-row justify-between',
                'mt-4 mx-6')}>

                {/* Back Button */}
                <TouchableOpacity onPress={() => router.back()}>
                    <View className={classNames(
                        'justify-center items-center', // position
                        'pr-1', // spacing
                        'w-10 h-10', // sizing
                        'rounded-xl bg-secondary'
                    )}>
                        <FontAwesome name="chevron-left" size={24} color="white" />
                    </View>
                </TouchableOpacity>

                {/* Info Button */}
                <TouchableOpacity
                    onPress={navigateToFriendsPage}
                    className={classNames(
                        'justify-center items-center')}>

                    <FontAwesome5 name="user-friends" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </>
    }
}