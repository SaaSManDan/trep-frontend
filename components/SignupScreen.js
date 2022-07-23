import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, SafeAreaView, TextInput} from 'react-native';
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [reconfirmPassword, setReconfirmPassword] = useState("");
  const navigation = useNavigation();

  const executeRegistration = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, first_name: firstName, last_name: lastName, password: password, reconfirmPassword: reconfirmPassword })
    };

    return fetch("https://trep-backend-mf5ry.ondigitalocean.app/api/register/", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        if (json.success == true) {
          console.log("You have successfully signed up!");
          //navigation.navigate('UserHomepage')
          //AsyncStorage.setItem('user_token', json.token);
          //AsyncStorage.setItem('username', json.username);

          /*navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });*/
        } else {
          console.log(json.msg);
        }
      })
      .catch((error) => {
        console.error(error);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ paddingLeft: 20, color: '#36AFF6', fontSize: 20, fontWeight: 'bold', marginTop: 35, marginBottom: 10 }}>New adventures await...</Text>
      <View style={styles.inputsContainer}>
        <TextInput style={styles.textinputs} value={email} placeholder="Email Address"  onChangeText={email => setEmail(email)} />
        <TextInput style={styles.textinputs} value={firstName} placeholder="First Name" onChangeText={firstName => setFirstName(firstName)} />
          <TextInput style={styles.textinputs} value={lastName} placeholder="Last Name" onChangeText={lastName => setLastName(lastName)} />
        <TextInput style={styles.textinputs} value={password} placeholder="Password" onChangeText={password => setPassword(password)} secureTextEntry={true} />
        <TextInput style={styles.textinputs} value={reconfirmPassword} placeholder="Reconfirm Password" onChangeText={reconfirmPassword => setReconfirmPassword(reconfirmPassword)} secureTextEntry={true} />
        <Pressable style={ styles.createAcctBtn } onPress={executeRegistration}>
          <Text style={ styles.buttonText }>Create Account</Text>
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
  createAcctBtn: {
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
