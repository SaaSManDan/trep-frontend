import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, SafeAreaView, TextInput} from 'react-native';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TripPreview from './TripPreview';

export default function UserHomepage() {
  const [userToken, setUserToken] = useState("");
  const [username, setUsername] = useState("");
  const [listofPlans, setListOfPlans] = useState([]);
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

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Basic ' + userToken, 'Content-Type': 'application/json' }
    };

    fetch("https://trep-backend-mf5ry.ondigitalocean.app/api/show-all-plans", requestOptions)
      .then((response) => response.json())
      .then((results) => {
        if (results.length > 0) {
          console.log(results.length + " travel plans were found.")
          console.log(results)
          setListOfPlans(results);
          //console.log("V Below is the second obj from the 'ListOfPlans' hook V")
          //console.log(listofPlans[1]["plan_id"])
        } else {
          console.log("No travel plans were found.")
        }
      })
      .catch((error) => {
        console.error(error);
    });
  }, [])

  /*useEffect(() => {
    getPlans();
  }, [])*/


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greetingText}>Hello, { username } 👋 .</Text>
      <View style={{ height: 50, width: '100%', alignItems: 'center'}}>
        {listofPlans.map((planObj)=>(
          <TripPreview key={planObj.plan_id} nameOfPlans={planObj.name_of_plan} tripStartDate={planObj.trip_start_date} tripEndDate={planObj.trip_end_date} />
        ))}
      </View>
      <Pressable onPress={executeLogout}>
        <Text>Log Out</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E8EA',
  },
  greetingText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20
  }
});
