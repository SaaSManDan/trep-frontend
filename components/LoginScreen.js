import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, SafeAreaView, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { StackActions, NavigationActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [username, setUsername] = useState("daniel@gmail.com");
  const [password, setPassword] = useState("DCr102404$");
  const [userTokenValue, setUserTokenValue] = useState("");
  const navigation = useNavigation();

  const executeLoginCheck = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail: username, password: password })
    };

    return fetch("https://trep-backend-mf5ry.ondigitalocean.app/api/login/", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        if (json.success == true) {
          console.log("Successfully logged in. ");
          console.log("Your username is: " + json.username)
          //navigation.navigate('UserHomepage')
          AsyncStorage.setItem('user_token', json.token);
          AsyncStorage.setItem('username', json.username);

          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } else {
          console.log("Incorrect credentials.")
        }
      })
      .catch((error) => {
        console.error(error);
    });
  }

  const checkInputs = () => {
    return console.log("Username: " + username + " Password: " + password)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ paddingLeft: 20, color: '#36AFF6', fontSize: 30, fontWeight: 'bold', marginTop: 35, marginBottom: 10 }}>Welcome Back!</Text>
      <View style={styles.inputsContainer}>
        <TextInput style={styles.textinputs} placeholder="Username or Email" value={username} onChangeText={username => setUsername(username)} />
        <TextInput style={styles.textinputs} placeholder="Password" value={password} onChangeText={password => setPassword(password)} secureTextEntry={true} />
        <Pressable style={ styles.loginBtn } onPress={executeLoginCheck}>
          <Text style={ styles.buttonText }>Log In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E8EA',
  },
  inputsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  textinputs: {
    width: '90%',
    height: 50,
    fontSize: 20,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#FFFFFF',
  },
  loginBtn: {
    backgroundColor: '#36AFF6',
    width: '90%',
    height: 50,
    borderRadius: 10,
    paddingTop: 10,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.25,
    textAlign: 'center'
  }
});
