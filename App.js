import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QrScreen, FoodScreen, CardScreen, AccountScreen  } from './components';



export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {/* Set header null */}
      <Stack.Navigator initialRouteName='Card' headerMode="null" >
        <Stack.Screen name="Qr" component={QrScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Food" component={FoodScreen} />
        <Stack.Screen name="Card" component={CardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
