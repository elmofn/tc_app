import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes'
import {
  AccountContextProvider,
  BottomNavigationContextProvider,
  TranslationProvider,
} from './src/contexts'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from './src/hooks'
import { Host } from 'react-native-portalize'
import { StatusBar } from 'expo-status-bar';

//Storage
import { StorageAdapter } from './src/utils'
const storage = new StorageAdapter()

const queryClient = new QueryClient()

export default function App() {
  const { areFontsLoaded } = useFonts()

  if (!areFontsLoaded) {
    return null
  }

  return (
    <>
      <TranslationProvider>
        <QueryClientProvider client={queryClient}>
          <BottomNavigationContextProvider>
            <NavigationContainer>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <AccountContextProvider storage={storage}>
                  <Host>
                    <Routes />
                  </Host>
                </AccountContextProvider>
              </GestureHandlerRootView>
            </NavigationContainer>
          </BottomNavigationContextProvider>
        </QueryClientProvider>
      </TranslationProvider>
      <StatusBar style="auto"/>
    </>
  );
}
