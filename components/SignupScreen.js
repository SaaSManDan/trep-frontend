import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, SafeAreaView, TextInput} from 'react-native';

export default function SignupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ paddingLeft: 20, color: '#36AFF6', fontSize: 20, fontWeight: 'bold', marginTop: 35, marginBottom: 10 }}>New adventures await...</Text>
      <View style={styles.inputsContainer}>
        <TextInput style={styles.textinputs} placeholder="Email Address" />
        <TextInput style={styles.textinputs} placeholder="Username" />
        <TextInput style={styles.textinputs} placeholder="Password" />
        <TextInput style={styles.textinputs} placeholder="Reconfirm Password" />
        <Pressable style={ styles.createAcctBtn }>
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
