import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, SafeAreaView, TextInput} from 'react-native';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserHomepage() {
  const [userToken, setUserToken] = useState("");
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  const executeLogout = () => {
    AsyncStorage.removeItem("user_token");
    AsyncStorage.removeItem("username");
    navigation.reset({
      index: 0,
      routes: [{ name: 'FirstScreen' }],
    });
  }

  AsyncStorage.multiGet(['user_token', 'username']).then(items => {
    console.log("Token from multiGet function: " + items[0][0]);
    console.log("Username from multiGet function: " + items[0][0]);
    setUserToken(items[0][1]);
    setUsername(items[1][1]);
  });

  /*
  AsyncStorage.getItem("user_token")
    .then((token) => {
    setUserToken(token);
    console.log("Your username token is: " + token);
  });
  */

  return (
    <SafeAreaView>
      <Text>Hello, { username }. The user's token is { userToken }</Text>
        <Pressable onPress={executeLogout}>
          <Text>Log Out</Text>
        </Pressable>
    </SafeAreaView>
  )
}
