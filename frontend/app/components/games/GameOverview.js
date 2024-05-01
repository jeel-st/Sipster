import { Pressable, Image, Text, View } from "react-native"
import { classNames } from '../../utils'
import { router } from 'expo-router'
import { useState, useEffect } from 'react';

export default function GameOverview({game}){

const category = game.category;
const title = game.name;

const [categoryWidth, setCategoryWidth] = useState(0);

useEffect(() => {
    const categoryTextWidth = category.length * 16; 
    setCategoryWidth(categoryTextWidth);
  }, [category]);


    return(
        <Pressable className={classNames('flex-row')}onPress={() => router.navigate({ pathname: "/routes/GamePage", params: { name: game.name, profile: game.profile, desc: game.desc, playtime: game.playtime } })}>
            <Image className="m-4 w-24 h-24 rounded-3xl" source={{ uri: game.profile }} />
            <View className="mt-6">
                <Text className="px-2 text-white font-bold text-xl tracking-widest">{title}</Text>
                <View style={{width : categoryWidth}} className=" mt-4 px-2 rounded-full bg-yellow flex items-center">
                    <Text className="text-black font-bold text-l ">{category}</Text> 
                </View>
            </View>
        </Pressable>
    )
}