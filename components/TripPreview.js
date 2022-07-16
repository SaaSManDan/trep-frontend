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
          <Image style={{ height: '90%', width: '90%', borderRadius: 10 }} source={{uri: "https://placehold.jp/150x150.png"}} />
        </View>
        <View style={styles.rightBox}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{props.nameOfPlans}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{convertDate(props.tripStartDate)} - {convertDate(props.tripEndDate)}</Text>
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
