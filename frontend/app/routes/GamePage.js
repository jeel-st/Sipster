import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { navigateToFriendsPage } from '../utils/navigator'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { GameActivity, GameFriendBtn, GameGoBtn } from '../components'
import { useGame } from '../utils/hooks/useGame'
import { styles } from '../constants'
import { navBarColor } from '../utils/navBarColor'
import { gameLog } from '../utils/logger/config'

/*
    GamePage is a page that displays the landing page of a game and allows the user to tag friends and start the game.
    Typ: Page/route

    @return: JSX -> returns the GamePage component
*/
export default function GamePage() {
    const { user, game, friends, taggedFriends, handleTaggedFriends, isTagged, isPressed, handlePress } = useGame()

    navBarColor(styles.Colors.primary)

    return (
        <View className={classNames(
            'flex-1', // position
            'bg-primary' // styling
        )}>
            {isPressed && <GameActivity user={user} game={game} taggedFriends={taggedFriends} />}
            <SafeAreaView className={classNames('flex-1')}>

                {/* Blurred Background with Gradient*/}
                <Image
                    source={{ uri: game.thumbnail }}
                    blurRadius={10}
                    className={classNames(
                        'absolute top-0 left-0', // position
                        'w-full h-[55%]' // sizing
                    )} />
                <LinearGradient
                    colors={['transparent', 'rgba(26,27,22,0.9)', 'rgba(26,27,22, 1)']}
                    start={{ x: 0.5, y: 0.2 }}
                    end={{ x: 0.5, y: 1 }}
                    className={classNames(
                        'absolute top-0 left-0', // position
                        'w-full h-[55%]' // sizing
                    )} />

                {/* Header Text and Info Button */}
                {Header()}

                <View className={classNames(
                    'flex-1 justify-between items-center', // position
                    'mt-28 mb-10', // spacing
                )}>

                    {GameInfo()}

                    <View className={classNames(
                        'flex-1 justify-center items-center', // position
                        'w-[90%]', // sizing
                    )}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            className='w-full' >
                            {friends && friends.map((friend, index) => <GameFriendBtn
                                key={index}
                                friend={friend}
                                handleTaggedFriends={() => handleTaggedFriends(friend)}
                                isTagged={isTagged(friend)}
                            />
                            )}
                        </ScrollView>
                    </View>

                    {game.status === "available" && <GameGoBtn handlePress={handlePress} text="Go" color="bg-yellow"/> }
                    {game.status === "unavailable" && <GameGoBtn handlePress={() => gameLog.warn("Game unavailable")} text={game.status} color="bg-red-500"/> }
                </View>
            </SafeAreaView>
        </View>
    )

    function GameInfo() {
        return <View className={classNames(
            'flex-1 justify-start items-center', // position
            'w-full' // sizing
        )}>
            {/* Gametitel Text */}
            <Text className='text-white text-center text-3xl font-bold tracking-wider' > {game.name} </Text>

            {/* Playtime Text */}
            <Text className={classNames(
                'text-neutral-400 text-center font-semibold', // styling
                'mt-2 mb-4' // spacing
            )}>
                Spielzeit • {game.playtime}
            </Text>

            <Text className={classNames(
                'text-neutral-400 mx-4 tracking-wide', // styling
                'mt-2' // spacing
            )}>
                {game.description}
            </Text>
        </View>
    }

    function Header() {
        return <>
            <View className={classNames(
                'flex-row justify-between', // position
                'mt-4 mx-6' // spacing
            )}>

                {/* Back Button */}
                <TouchableOpacity onPress={() => router.back()}>
                    <View className={classNames(
                        'justify-center items-center', // position
                        'pr-1', // spacing
                        'w-10 h-10', // sizing
                        'rounded-xl bg-secondary' // styling
                    )}>
                        <FontAwesome name="chevron-left" size={24} color="white" />
                    </View>
                </TouchableOpacity>

                {/* Info Button */}
                <TouchableOpacity
                    onPress={navigateToFriendsPage}
                    className='justify-center items-center' >

                    <FontAwesome5 name="user-friends" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </>
    }
}