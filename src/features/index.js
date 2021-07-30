import "react-native-gesture-handler";
import MainTabNav from './navigators/MainTabNav';
import analytics from '@react-native-firebase/analytics';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./splash/splashScreen";
import AuthenticationStepOne from "./authentication/AuthenticationStepOne";
import AuthenticationStepTwo from "./authentication/AuthenticationStepTwo";
import VerifyScreen from "./authentication/VerifyScreen";
import Register from "./authentication/register";
import RegisterStepTwo from "./authentication/RegisterStepTwo";
import { navigationRef } from "../utils/NavigationService";
import GeneralListScreen from "./generalList/GeneralListScreen";
import Fasl from "./courseDetail/component/Fasl";
import LessonScreen from './lesson/LessonScreen'
import IntractiveScreen from './intractiveTest/IntractiveScreen'
import VideoScreen from './video/VideoScreen';
import AboutUsScreen from './profile/AboutUsScreen';
import EditeProfile from './profile/EditeProfile';
import PublicProfile from './publicProfile/PublicProfile';
import ChangePasswordScreen from './changePassword/changePasswordScreen';
import LeaderBoardScreen from './leaderboard/LeaderBoardScreen';
import LeaderboardDetailScreen from "./leaderboardDetail/LeaderboardDetailScreen";
import SearchScreen from './search/SearchScreen';
import ChangePhoneNumberScreen from './changePhoneNumber/ChangePhoneNumberScreen';
import changePhoneNumberVerifyCode from './changePhoneNumber/changePhoneNumberVerifyCode';
import ForgetPasswordScreen from './forgetPassword/ForgetPasswordScreen';
import ForgetPasswordScreenVerifyCode from './forgetPassword/ForgetPasswordScreenVerifyCode';
import VerifyCodeTwo from './changePhoneNumber/VerifyCodeTwo';
import LiveWebView from './webView/LiveWebView';
import userGainHistoryScreen from './userGainHistory/userGainHistoryScreen';
import UserInboxScreen from './userInbox/UserInboxScreen';
import UserLeaderBoardScreen from './userLeaderBoard/UserLeaderBoardScreen';
import NetworkingScreen from './networking/NetworkingScreen'
import ScoresPage from './scoresPage/ScoresPage'
import MyCourses from './myCourses/MyCourses';
import { changeAppHeaderColor, saveCurrentRoute } from '../store/globalActions';
import { connect } from 'react-redux'
import { theme } from "../common/constants";
import CourseDetailScreen from "./courseDetail/CourseDetailScreen";
import { store } from "../store/store";
import { getMyCourses } from "./myCourses/actions/myCoursesAction";
import { myCoursesApi } from "../utils/api/Url";
const Stack = createStackNavigator();
class Nav extends React.Component {
  render() {
    const routeNameRef = React.createRef();
    let url, filter;
    url = myCoursesApi;
    filter = '&filter=' + '0';
    // refreshMycourses = store.getState().myCoursesReducer.refreshMycourses;
    return (
      <NavigationContainer
        onStateChange={async() => {
          const previousRouteName = routeNameRef.current
          const currentRouteName = navigationRef.current.getCurrentRoute().name
          this.props.saveCurrentRoute(currentRouteName)
          currentRouteName == 'MyCourse' ? this.props.refreshMycourses ? store.dispatch(getMyCourses('get', url, 1, [], filter)) : null : null;
          if (previousRouteName !== currentRouteName) {
            
            if (currentRouteName != 'LessonScreen' || currentRouteName != 'CourseDetailScreen') {
              this.props.changeAppHeaderColor(theme.colors.darkBlue)
            }
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            })
            //console.log('currentRouteName', currentRouteName)
          }

        }}
        ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={({ route, navigation }) => ({
            headerShown: false
          })}
        >
          <Stack.Screen name="Home" component={MainTabNav} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="AuthenticationStepOne" component={AuthenticationStepOne} />
          <Stack.Screen name="AuthenticationStepTwo" component={AuthenticationStepTwo} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RegisterStepTwo" component={RegisterStepTwo} />
          <Stack.Screen name="GeneralList" component={GeneralListScreen} />
          <Stack.Screen name="Fasl" component={Fasl} />
          <Stack.Screen name="LessonScreen" component={LessonScreen} />
          <Stack.Screen name="IntractiveScreen" component={IntractiveScreen} />
          <Stack.Screen name="VideoScreen" component={VideoScreen} />
          <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
          {/* <Stack.Screen name="LeaderboardScreen" component={LeaderBoardScreen} /> */}
          {/* <Stack.Screen name="LeaderboardDetailScreen" component={LeaderboardDetailScreen} /> */}
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="ChangePhoneNumberScreen" component={ChangePhoneNumberScreen} />
          <Stack.Screen name="LiveWebView" component={LiveWebView} />
          <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
          <Stack.Screen name="VerifyCodeTwo" component={VerifyCodeTwo} />
          <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
          <Stack.Screen name="ForgetPasswordScreenVerifyCode" component={ForgetPasswordScreenVerifyCode} />
          <Stack.Screen name="EditeProfile" component={EditeProfile} />
          <Stack.Screen name="changePhoneNumberVerifyCode" component={changePhoneNumberVerifyCode} />
          {/* <Stack.Screen name="userGainHistoryScreen" component={userGainHistoryScreen} /> */}
          <Stack.Screen name="UserInboxScreen" component={UserInboxScreen} />
          <Stack.Screen name="UserLeaderBoardScreen" component={UserLeaderBoardScreen} />
          <Stack.Screen name="NetworkingScreen" component={NetworkingScreen} />
          <Stack.Screen name="ScoresPage" component={ScoresPage} />
          <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
          <Stack.Screen name="userGainHistoryScreen" component={userGainHistoryScreen} />
          <Stack.Screen name="PublicProfileScreen" component={PublicProfile} />
          {/* <Stack.Screen name="MyCourses" component={MyCourses} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  showReply: state.commentsReducer.showReply,
  refreshMycourses: state.myCoursesReducer.refreshMycourses,

})
const mapDispatchToProps = {
  changeAppHeaderColor,
  saveCurrentRoute
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)
