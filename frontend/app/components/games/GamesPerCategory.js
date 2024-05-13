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


                <ScrollView className="mt-4 px-2 mb-6" horizontal showsHorizontalScrollIndicator={false}>
                    <View className="mt-4 px-2 pr-4 flex-row" >
                        {
                            games.filter(game => game.category === category).map((game, index) =>(
                            index % 2 === 0 && <GameCard game={game} key={index}/>
                        ))}
                    </View>
                    <View className="mt-4 px-2 pr-4 flex-row">
                        {
                            games.filter(game => game.category === category).map((game, index) =>(
                            index % 2 !== 0 && <GameCard game={game} key={index}/>
                        ))}
                    </View>
                </ScrollView>
                
            </View>
        ))
        }
    </View>
) 
}