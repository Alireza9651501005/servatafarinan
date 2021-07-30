import React,{useState,useRef} from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopCustomeTab from "./components/TopCustomeTab";
import { descriptionTxt } from "../courseDetail/texts";
import DescriptionScreen from "../courseDetail/component/DescriptionScreen";
import Fasl from "../courseDetail/component/Fasl";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ativeTopNavigation } from "../../store/globalActions";
import ChaptersScreen from '../courseDetail/component/ChaptersScreen';
import DownloadsScreen from '../courseDetail/component/DownloadsScreen';


function SettingsScreen() {
  const nameRef = useRef(null);
  const [height2,setHight2]=useState(50);
  const onPageLayout = event => {
    const { width, viewHeight } = event.nativeEvent.layout;
    setHight2(viewHeight/10000)
    //console.log("ON LAYOUT SettingsScreen",viewHeight);
  };
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      //console.log("nameRef",nameRef.current);
      dispatch(ativeTopNavigation(hp(height2)))
    }, [])
  );
  return (
    <View
    // ref={e=>nameRef}
    // ref={nameRef}
      // onLayout={onPageLayout}
      style={{ flex: 1, backgroundColor: "white", flex: 1 }}
    >
      <Text>{descriptionTxt}</Text>
      <Text>{descriptionTxt}</Text>
      <Text>{descriptionTxt}</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TopNavigator({ description, chaptersData, courseId }) {
  // //console.log('description',description)
  return (
    <Tab.Navigator swipeEnabled={false} tabBar={props => <TopCustomeTab {...props} />}>
      <Tab.Screen name="فصل" children={() => <ChaptersScreen courseChaptersData={chaptersData} />} />
      <Tab.Screen name="گالری" children={() => <DownloadsScreen courseId={courseId} />} />
      <Tab.Screen
        name="معرفی"
        component={DescriptionScreen}
        initialParams={{ description: description }}
      />
    </Tab.Navigator>
  );
}
