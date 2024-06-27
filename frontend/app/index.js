// Imports
import React, { useCallback, useEffect } from 'react'
import { SplashScreen } from 'expo-router'
import { classNames } from './utils'
import { View } from 'react-native'
import { Asset } from 'expo-asset'
import LoginPage from '../app/routes/LoginPage'
import { rootLog } from './utils/logger/config'

// Prevent the splash screen from automatically hiding (preventing White Screen)
SplashScreen.preventAutoHideAsync()

/*
    Main component of the app

    @return: object -> the main component of the app
*/
export default function index() {
  let [isLoaded, setIsLoaded] = React.useState(false)

  /*
      Method to cache the resources of the app

      @return: void
  */
  let cacheResourcesAsync = async () => {
    const images = [require('./assets/images/logo-small.png')]

    // Download images
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)
  }

  /*
      UseEffect to load the resources of the app

      @return: void
  */
  useEffect(() => {
    const loadResourcesAsync = async () => {
      await cacheResourcesAsync()
      rootLog.info("App loaded")
      setIsLoaded(true)
    }

    loadResourcesAsync()
  }, [])

  /*
      Method to hide the splash screen once we know the root view has already performed layout

      @return: void
  */
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