import { View, Image, Text, ScrollView } from 'react-native';
import { categorys, games } from '../../constants';
import GameCard from './GameCard';
import { classNames } from '../../utils';
import Game from '../../entitys/game';

export default function GamesPerCategory() {
    const gameList = games.map((game) => new Game(game))
    return (

        <View>
            {
                categorys.map(category => (
                    <View key={category} className='mt-4'>
                        <Text className='text-white font-bold text-xl tracking-widest'> {category} </Text>


                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View className="flex-column">
                                <View className="mt-4 flex-row" >
                                    {
                                        gameList.filter(game => game.category === category).map((game, index) => (
                                            index % 2 === 0 && <GameCard game={game} key={index} />
                                        ))}
                                </View>
                                <View className="mt-4 flex-row">
                                    {
                                        gameList.filter(game => game.category === category).map((game, index) => (
                                            index % 2 !== 0 && <GameCard game={game} key={index} />
                                        ))}
                                </View>
                            </View>
                        </ScrollView>

                    </View>
                ))
            }
        </View>
    )
}