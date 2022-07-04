import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstScreen from './components/FirstScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import UserHomepage from './components/UserHomepage';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="UserHomepage" component={UserHomepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
