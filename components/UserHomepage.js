import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, SafeAreaView, TextInput, FlatList} from 'react-native';
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
  };

  useEffect(() => {
    let mounted = true;
    console.log("useEffect executed")
    getLocallyStoredUserData().then((locallyStoredUserData) => {
      setUsername(locallyStoredUserData[1][1]); //setUsername
      getAllThisUsersPlans(locallyStoredUserData[0][1]) //use user's token to fetch their plans
        .then(thisUsersPlans => {
          if(mounted){
            setListOfPlans(thisUsersPlans)
            console.log(listofPlans)
          }
        })
    }).catch((error) => {
      console.log(error)
    });
    return () => mounted = false
  }, []);

  const flatListHeader = () => {
    return (
      <React.Fragment>
        <Text style={styles.greetingText}>Hello, { username } 👋 .</Text>
        <Text style={{ fontWeight: 'bold', fontSize: '10', marginLeft: 10, color: '#36AFF6', fontSize: 25, marginBottom: 20 }}>Upcoming Plans</Text>
      </React.Fragment>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
          <FlatList
             style={{ width: '95%', height: '100%' }}
             contentContainerStyle={styles.scrollContainer}
             data={listofPlans}
             ListHeaderComponent={flatListHeader}
             showsVerticalScrollIndicator={false}
             showsHorizontalScrollIndicator={false}
             renderItem={({item}) => {
                return (
                  <TripPreview key={item.plan_id} nameOfPlans={item.name_of_plan} tripStartDate={item.trip_start_date} tripEndDate={item.trip_end_date} />
                )
             }}
             keyExtractor={(item) => item.plan_id}
            />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E8EA',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 12
  },
  scrollContainer: {

  }
});
