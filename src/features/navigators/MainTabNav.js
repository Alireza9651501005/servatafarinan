import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../home/HomeScreen';
import MainTabBar from './components/MainTabBar';
import ProfileScreen from '../profile/profileScreen';
import MyCourses from '../myCourses/MyCourses';
import UserInboxScreen from '../userInbox/UserInboxScreen';
import Credit from '../credit/CreditScreen';
import CourseDetailScreen from '../courseDetail/CourseDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ScoresPage from '../scoresPage/ScoresPage';
import NetworkingScreen from '../networking/NetworkingScreen';
import FullMessageScreen from '../userInbox/FullMessageScreen';
import userGainHistoryScreen from '../userGainHistory/userGainHistoryScreen';
import SettingPageScreen from '../profile/SettingPageScreen';
import GeneralListScreen from '../generalList/GeneralListScreen';
import PublicProfileScreen from '../publicProfile/PublicProfile';
import { useDispatch, useSelector } from 'react-redux';
import LessonScreen from '../lesson/LessonScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function HomeStack() {
  const states = useSelector(state => state);
  let showTab = states.commentsReducer.showReply;
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={({ route, navigation }) => ({
        headerShown: false
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MyCourses" component={MyCourses} />
      <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
      <Stack.Screen name="ScoresPage" component={ScoresPage} />
      <Stack.Screen name="NetworkingScreen" component={NetworkingScreen} />
      <Stack.Screen name="userGainHistoryScreen" component={userGainHistoryScreen} />
      <Stack.Screen name="GeneralList" component={GeneralListScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="PublicProfileScreen" component={PublicProfileScreen} />
      <Stack.Screen name="SettingPageScreen" component={SettingPageScreen} />
      <Stack.Screen name="Message" component={UserInboxScreen} />
      {/* <Stack.Screen name="LessonScreen" component={LessonScreen} /> */}
    </Stack.Navigator>
  );
};
function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName={'ProfileScreen'}
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        unmountInactiveRoutes: true,
      })}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen} />
      <Stack.Screen name="SettingPageScreen" component={SettingPageScreen} />
      <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
      <Stack.Screen name="NetworkingScreen" component={NetworkingScreen} />
      <Stack.Screen name="userGainHistoryScreen" component={userGainHistoryScreen} />
    </Stack.Navigator>
  );
};
function UserInboxScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Message'}
      screenOptions={({ route, navigation }) => ({
        headerShown: false
      })}
    >
      <Stack.Screen name="Message" component={UserInboxScreen} />
      <Stack.Screen name="FullMessageScreen" component={FullMessageScreen} />
      <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
    </Stack.Navigator>
  );
};
function MyCoursesStack() {
  return (
    <Stack.Navigator
      initialRouteName={'MyCourse'}
      screenOptions={({ route, navigation }) => ({
        headerShown: false
      })}
    >
      <Stack.Screen name="MyCourse" component={MyCourses} />
      <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
      {/* <Stack.Screen name="userGainHistoryScreen" component={userGainHistoryScreen} /> */}
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      {/* <Stack.Screen name="LessonScreen" component={LessonScreen} /> */}
    </Stack.Navigator>
  );
};
function CreditStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Credit'}
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="Credit" component={Credit} />
      <Stack.Screen name="SettingPageScreen" component={SettingPageScreen} />
      <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
};
export default function TabNav() {
  return (
    <Tab.Navigator
      // tabBarOptions={{
      //   style: {
      //     backgroundColor: 'transparent',
      //     position: 'absolute',
      //     left: 0,
      //     right: 0,
      //     bottom: 0,
      //     elevation: 0, 
      //   }
      // }} 
      tabb initialRouteName={'Home'}
      tabBar={props => <MainTabBar {...props} />}>
      <Tab.Screen options={{ title: 'پروفایل', unmountOnBlur: true }} name="ProfileScreen" component={ProfileStack} />
      <Tab.Screen options={{ title: 'اعتبار' }} name="Credit" component={CreditStack} />
      <Tab.Screen options={{ title: 'خانه' ,unmountOnBlur: true}} name="Home" component={HomeStack} />
      <Tab.Screen options={{ title: 'دوره های من',unmountOnBlur: true }} name="MyCoursesTab" component={MyCoursesStack} />
      <Tab.Screen options={{ title: 'پیام ها' ,unmountOnBlur: true}} name="Message" component={UserInboxScreenStack} />
    </Tab.Navigator>
  );
} 
