import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import VehicleListScreen from './screens/VehicleListScree';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <VehicleListScreen />
    </SafeAreaProvider>
  );
};

export default App;
