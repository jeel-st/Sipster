import React, { useCallback, useEffect } from 'react'
import { Redirect, SplashScreen } from 'expo-router'
import { classNames } from './utils'
import { Text, View } from 'react-native'
import { Asset } from 'expo-asset'
import LoginPage from '../app/routes/LoginPage'

// Prevent the splash screen from automatically hiding (preventing White Screen)
SplashScreen.preventAutoHideAsync()

export default function index() {
  let [isLoaded, setIsLoaded] = React.useState(false)

  // Function to cache image resources
  let cacheResourcesAsync = async () => {
    const images = [require('./assets/images/logo-small.png')]

    // Download images
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)
  }

  // useEffect to load resources when the component mounts
  useEffect(() => {
    const loadResourcesAsync = async () => {
      await cacheResourcesAsync()
      console.log("App loaded")
      setIsLoaded(true)
    }

    loadResourcesAsync()
  }, [])

  // Function to hide the splash screen once we know the root view has already performed layout.
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [isLoaded])

  // If resources are not loaded, render nothing
  if (!isLoaded) {
    return null
  }

  // Once resources are loaded, render the main view
  return (
    <View onLayout={onLayoutRootView} className={classNames('flex-1 bg-primary')}>
      <LoginPage />
    </View>
  )
}