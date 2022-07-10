import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, SafeAreaView, TextInput} from 'react-native';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TripPreview from './TripPreview';
import { getAllThisUsersPlans } from '../services/getAllThisUsersPlans';
import { getLocallyStoredUserData } from '../services/getUserLocallyStoredData';

export default function UserHomepage() {
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

  useEffect(() => {
    let mounted = true;
    console.log("useEffect executed")
    getLocallyStoredUserData().then((locallyStoredUserData) => {
      setUsername(locallyStoredUserData[1][1]); //setUsername
      getAllThisUsersPlans(locallyStoredUserData[0][1]) //use user's token to fetch their plans
        .then(thisUsersPlans => {
          if(mounted){
            setListOfPlans(thisUsersPlans)
          }
        })
    }).catch((error) => {
      console.log(error)
    });
    return () => mounted = false
  }, [])



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greetingText}>Hello, { username } 👋 .</Text>
      <Text style={{ fontWeight: 'bold', fontSize: '10', marginLeft: 20, color: '#36AFF6', fontSize: 25, marginBottom: 20 }}>Upcoming Plans</Text>
      <View style={{ height: 50, width: '100%', alignItems: 'center'}}>
        {listofPlans.map((planObj)=>(
          <TripPreview key={planObj.plan_id} nameOfPlans={planObj.name_of_plan} tripStartDate={planObj.trip_start_date} tripEndDate={planObj.trip_end_date} />
        ))}
      </View>
      <View>
        <Pressable onPress={executeLogout}>
          <Text>Log Out</Text>
        </Pressable>
      </View>
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
    marginLeft: 20,
    marginBottom: 12
  }
});
