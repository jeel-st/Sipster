import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import useBombParty from './utils/useBombParty'
import { FontAwesome5 } from '@expo/vector-icons';

export default function BombPartyGame() {
    const { isPlaying, category, handleStartGame } = useBombParty()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome5 name="bomb" size={24} color="white" />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Bomb Party Game</Text>
                <Text style={styles.status}>
                    {isPlaying ? `Nenne: ${category}` : "Game not started"}
                </Text>
                <TouchableOpacity onPress={handleStartGame} disabled={isPlaying} style={styles.startButton}>
                    <FontAwesome5 name="bomb" size={50} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fcff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    status: {
        fontSize: 18,
        marginBottom: 20,
    },
    startButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 50,
        padding: 20,
    },
});
