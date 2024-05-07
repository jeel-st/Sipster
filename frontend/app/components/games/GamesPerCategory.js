import { View, Image, Text,ScrollView } from 'react-native';
import { categorys,games } from '../../constants';
import GameCard from './GameCard';



export default function GamesPerCategory(){

return(

    <View>
        {
        categorys.map(category => (
            <View key={category}> 
            <Text className='text-white font-bold text-xl tracking-widest'> {category} </Text>
            <ScrollView horizontal>
                {
                    games.filter(game => game.category === category).map((game, index) =>(
                    <GameCard game={game} key={index}/>
                ))}
            </ScrollView>
        </View>
        ))
        }
    </View>
) 
}