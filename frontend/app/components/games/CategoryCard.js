import {View, Text, Pressable} from 'react-native';
import { styles } from '../../constants';
import { useState, useEffect } from 'react';

export default function CategoryCard({game}){
    const category = game.category;



    const [categoryWidth, setCategoryWidth] = useState(0);

    useEffect(() => {
        const categoryTextWidth = category.length * 16; 
        setCategoryWidth(categoryTextWidth);
    }, [category]);


    return(
        <Pressable>
            <View style={{width : categoryWidth}} className=" mt-4 px-2 mr-2 rounded-full bg-yellow flex items-center">
                <Text className="text-black font-bold text-l">{category}</Text>
            </View>
        </Pressable>
    )
}