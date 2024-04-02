import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../constants/styles'

export default function GameCard({game}) {
    return (
        <Pressable className="mx-4 mb-4 w-40 h-40 rounded-3xl shadow-xl shadow-black" style={{backgroundColor: Colors.secondary}}>
        </Pressable>
    )
}