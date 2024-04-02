import { View, Text } from 'react-native'
import React from 'react'
import WelcomePage from './routes/WelcomePage'
import TestPage from './routes/TestPage'
import { Redirect } from 'expo-router'

export default function index() {
  return (
    <Redirect href={"/(tabs)"}/>
  )
}