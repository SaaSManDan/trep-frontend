import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHomepage from './UserHomepage';
import CreatePlanScreen from './CreatePlanScreen';
import SettingsScreen from './SettingsScreen';
import FriendsScreen from './FriendsScreen';
const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={UserHomepage}
        options={{
          headerShown: false,
          tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: 25, height: 25 }}
                source={require('.././assets/distance.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: 30, height: 30 }}
                source={require('.././assets/friends.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Create New Plan"
        component={CreatePlanScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: 25, height: 25 }}
                source={require('.././assets/pencil-2.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: 25, height: 25 }}
                source={require('.././assets/profile.png')}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  )
}
