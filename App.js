import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen, QrScreen, FoodScreen, CardScreen  } from './components';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Qr'>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Qr" component={QrScreen} />
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
