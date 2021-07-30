import * as React from 'react';
import { Button, View, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabNav from './MainTabNav';
import ProfileScreen from '../profile/ProfileScreen';
import { MediumButton, MediumButtonWhite } from '../../common/components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { store } from '../../store/store';

function Profile({ navigation }) {
  let isToken = store.getState().globalReducer.accessToken;
  return (
    <ScrollView style={{ borderWidth: 0, width: "100%", }} contentContainerStyle={{ flex: isToken ? 0 : 1 }}>
      <ProfileScreen navigation={navigation} />
      <MediumButton
        btnStyle={{ width: '90%', marginTop: hp(2) }}

        onPress={
          () => {
            navigation.toggleDrawer()
            navigation.navigate('Leaderboard')
          }
        }
      >
        رتبه بندی و امتیازات
      </MediumButton>
      <MediumButtonWhite
        btnStyle={{ width: '90%', marginTop: hp(0) }}
        onPress={
          () => {
            navigation.toggleDrawer()
            navigation.navigate('AboutUsScreen')
          }
        }
      >
        درباره ما
      </MediumButtonWhite>
      <MediumButtonWhite btnStyle={{ width: '90%', marginTop: hp(0) }} onPress={() => { navigation.toggleDrawer(); navigation.navigate('SearchScreen') }}>جستجو</MediumButtonWhite>
    </ScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator drawerContent={Profile} drawerPosition={'right'} initialRouteName="Home">
      <Drawer.Screen name="Main" component={MainTabNav} />
      {/* <Drawer.Screen name="Profile" component={Profile} /> */}
    </Drawer.Navigator>
  );
}