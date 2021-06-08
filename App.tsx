import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { HTTP } from '@metall/common1';
import { Platform } from 'react-native';

export default function App() {

  let apiUrl;

  if(__DEV__) {
    apiUrl = Platform.OS === 'web' ? 'http://localhost:4000/api' : 'http://192.168.241.57:4000/api';
  }else {
    apiUrl = 'https://messenger-web-api.herokuapp.com/api';
  }

  HTTP.createClient(apiUrl);

  console.log('dev: ',__DEV__);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }
}
