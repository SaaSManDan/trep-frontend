import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getLocallyStoredUserData (){
  console.log("getUserData function executed")
  try {
    const locallyStoredUserData = await AsyncStorage.multiGet(['user_token', 'username'])
    if(locallyStoredUserData !== null){
      //console.log("Token from multiGet function: " + values[0][1]);
      //console.log("Username from multiGet function: " + values[1][1]);
      return locallyStoredUserData; //return user's token and username
    }
  } catch (error){
    console.log("Error fetch using data from AsyncStorage: " + error)
    throw error
  }
}
