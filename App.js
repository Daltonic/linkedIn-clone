import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './screens/LoginScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SignupScreen from './screens/SignupScreen'

const Stack = createStackNavigator()
const screenOption = {
  headerShown: false,
  cardStyle: { backgroundColor: '#fff' },
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignupScreen"
          screenOptions={screenOption}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
