import { StyleSheet, Text, View, Pressable, SafeAreaView, TextInput, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const executeLogout = () => {
    AsyncStorage.removeItem("user_token");
    AsyncStorage.removeItem("username");
    navigation.reset({
      index: 0,
      routes: [{ name: 'FirstScreen' }],
    });
  };

  return (
    <SafeAreaView>
      <Text>Change your settings here</Text>
      <Button title="Logout" onPress={executeLogout} />
    </SafeAreaView>
  )
}
