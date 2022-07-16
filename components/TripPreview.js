import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, SafeAreaView, TextInput, Image } from 'react-native';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function TripPreview(props) {

  function convertDate(date){
    return moment(date, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('MMM DD YYYY');
  }

  return (
    <View style={styles.container}>
        <View style={styles.leftBox}>
          <View style={{ height: '90%', width: '90%', borderRadius: 10, backgroundColor: '#cbc7c6' }}></View>
          {/* <Image style={{ height: '90%', width: '90%', borderRadius: 10 }} source={{uri: "https://placehold.jp/150x150.png"}} /> */}
        </View>
        <View style={styles.rightBox}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{props.nameOfPlans}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{convertDate(props.tripStartDate)} - {convertDate(props.tripEndDate)}</Text>
          <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 1 }}>
            <View style={{flex: 2}}></View>
            <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Image
                style={{ width: 22, height: 22, marginRight: 5 }}
                source={require('.././assets/flat-create-new-plan.png')}
              />
            <Text style={{fontWeight: '600', fontSize: 12, marginTop: 1}}>{props.location}</Text>
            </View>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 120,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10
  },
  leftBox: {
    flex: 3.5,
    backgroundColor: "white",
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightBox: {
    flex: 6.5,
    backgroundColor: "white",
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 10,
    paddingTop: 8
  }
});
