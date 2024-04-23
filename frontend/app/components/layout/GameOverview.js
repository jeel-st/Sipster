import { View, Text } from 'react-native'
import React from 'react'
import GameCard from '../games/GameCard'
import { games, styles } from '../../constants'
import { classNames } from '../../utils'
import GameInfo from '../games/GameInfo'

export default function GameOverview() {
    return (
      <View style={{ backgroundColor: 'primary', flexDirection: 'row', justifyContent: 'space-between' }}>

        <View>
            {games.map((game, index) => (
            <View key={index} style={{ marginTop: 5, marginBottom: 5 }}>
                <GameCard game={game} />
            </View>
            ))}
      </View>

        <View >
           {games.map((game, index) => (
            <View key={index} style={{ marginTop: 5, marginBottom: 5 }}>
                <GameInfo game={game} />
            </View>
           ))}
        </View>

      </View>
    );
  }
