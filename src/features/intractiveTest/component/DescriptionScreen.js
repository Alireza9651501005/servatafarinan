import React, { useEffect,useState,useRef } from "react";
import { connect } from "react-redux";
import { headerTxt, buyCourseTxt, descriptionTxt } from "../texts";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Dimensions
} from "react-native";
import { CustomText } from "../../../common/components";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";
import { ativeTopNavigation } from '../../../store/globalActions';
import { useDispatch, useSelector } from "react-redux";

export default function DescriptionScreen({ courseDescription }) {
  const nameRef = useRef(null);
  const dispatch = useDispatch();
  const [height2,setHight2] = useState(50);
  useFocusEffect(
    React.useCallback(() => {
      var windowSize = Dimensions.get("window");
      var myHeight = windowSize.height;
      var myWidth = windowSize.width;
      //console.log("myHeight", myHeight);
          dispatch(ativeTopNavigation(hp(height2)))
    }, [])
  );
 const onPageLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    setHight2(height/10000)
    //console.log("ON LAYOUT des",height);
    //console.log("nameRef des",height);
  };
  // let description = route.params.description;
  return (
    <View
    // ref={nameRef}
      onLayout={onPageLayout}
      style={{ alignItems: "center", borderWidth: 0, flex: 1,width:wp(90),alignSelf:"center" }}
    >
      <View style={{ borderWidth: 0 }}>
        <CustomText>{courseDescription}</CustomText>
      </View>
    </View>
  );
}
