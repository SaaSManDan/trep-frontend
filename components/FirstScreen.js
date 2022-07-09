import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FirstScreen({navigation}) {
  AsyncStorage.getItem('user_token')
    .then((item) => {
       if (item) {
         navigation.reset({
           index: 0,
           routes: [{ name: 'UserHomepage' }],
         });
       } else {
         console.log("User is not signed in.")
       }
     });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center', top: 150}}>
        <Text style={{ fontSize: 75, fontWeight: 'bold', color: '#36AFF6' }}>Trep</Text>
      </View>
      <View style={styles.bottom}>
        <Pressable style={ styles.loginBtn }
          onPress={()=> navigation.navigate('SignupScreen')}>
          <Text style={ styles.buttonText }>Create an Account</Text>
        </Pressable>
        <Pressable style={ styles.loginBtn }
          onPress={()=> navigation.navigate('LoginScreen')}>
          <Text style={ styles.buttonText }>Log In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 150,
    bottom: 50,
    position: 'absolute',
  },
  loginBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#36AFF6',
    height: 60,
    width: '90%',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.25,
  }
});
