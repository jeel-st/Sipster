import { Pressable, Image, Text, View } from "react-native"
import { classNames } from '../../utils'
import { router } from 'expo-router'

export default function GameOverview({game}){

const category = game.category;
const title = game.name;

    return(
        <Pressable className={classNames('flex-row')}onPress={() => router.navigate({ pathname: "/routes/GamePage", params: { name: game.name, profile: game.profile, desc: game.desc, playtime: game.playtime } })}>
            <Image className="m-4 w-24 h-24 rounded-3xl" source={{ uri: game.profile }} />
            <View className="mt-6">
                <Text className="px-2 text-white font-bold text-xl tracking-widest">{title}</Text>
                <Text className="mt-2 px-2 text-white font-bold text-l ">{category}</Text> 
            </View>
        </Pressable>
    )
}