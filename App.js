import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './screens/LoginScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SignupScreen from './screens/SignupScreen'
import HomeScreen from './screens/HomeScreen'
import AddPostScreen from './screens/AddPostScreen'
import ChatsListScreen from './screens/ChatsListScreen'
import ChatScreen from './screens/ChatScreen'

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
          initialRouteName="ChatScreen"
          screenOptions={screenOption}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AddPostScreen" component={AddPostScreen} />
          <Stack.Screen name="ChatsListScreen" component={ChatsListScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
