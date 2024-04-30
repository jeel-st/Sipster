import {View, Text, Pressable} from 'react-native';
import { styles } from '../../constants';

export default function CategoryCard({game}){
    const category = game.category;

    return(
        <Pressable >
            <Text>{category}</Text>
        </Pressable>
    )
}