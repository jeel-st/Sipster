import { View, Text, Image, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { useNavBarColor } from '../utils/hooks/useNavBarColor'
import { categorys, games, styles } from '../constants'
import Game from '../entitys/game'
import GameCard from '../components/games/GameCard'
import useGameSearch from '../utils/hooks/useGameSearch'


/*
    GameLibraryPage is a page that displays all games in the library.
    Typ: Page/route

    @return: JSX -> returns the GameLibraryPage component
*/
export default function GameLibraryPage() {
      const {handleSearch, filteredGames, searchInput} = useGameSearch(games);

      const gameList = filteredGames === undefined ? games.map((game) => new Game(game)) : filteredGames.map((game) => new Game(game));



  useNavBarColor(styles.Colors.secondary)



  return (
    <SafeAreaView className={classNames(
      'flex-1', // sizing
      'bg-primary' // styling
    )}>
      {/* Header Text and Friendsmenu Button */}
      <View className={classNames(
        'flex-row justify-between', // position
        'mt-4 mx-6 ' // spacing
      )}>

      <View className={classNames(
          'flex-col items-start justify-center', // position
          )}>

        {/* Sipster Logo */}
        <Image style={{ width: 100, height: 50, resizeMode: 'contain', marginRight: 10, }} source={require('../assets/images/logo-small.png')} />
      </View>


      </View>


      <View className={classNames(
          'flex justify-center', // position
          'mt-3 mx-4 mb-4', // spacing
          'h-40', // sizing
        )}>
          {/* Sip-Counter */}
          <View className={classNames(
            'flex items-end justify-center', // position
            'h-20 ', // sizing
            'bg-yellow shadow-md shadow-black rounded-3xl', // styling
          )}>
              <Text className="text-center text-2xl font-bold px-4">1000 sips</Text>
          </View>
          <TextInput className={classNames(
                    'pl-2 mt-4', // spacing
                    'h-10', // sizing
                    'rounded-xl shadow-md shadow-black text-white bg-secondary' // styling
                )}
              placeholder={'search'}
              value={searchInput}
              onChangeText={handleSearch}
       />
      </View>



      {/* Separation line */}
      <View className={classNames(
                    'w-full h-[2px]',
                    'bg-secondary')} />

      {/* games */}
      <ScrollView showsVerticalScrollIndicator={false} className='mx-4'>
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
      </ScrollView>
    </SafeAreaView>
  )
}