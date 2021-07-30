import React,{useState,useRef} from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ativeTopNavigation } from "../../../store/globalActions";
export default function Fasl() {
    const [height2,setHight2]=useState(50);
    const onPageLayout = event => {
      const { width, height } = event.nativeEvent.layout;
      setHight2(height/10000)
      //console.log("ON LAYOUT Fasl",height);
    };
    const dispatch = useDispatch();
    useFocusEffect(
      React.useCallback(() => {
        var windowSize = Dimensions.get("window");
        var myHeight = windowSize.height;
        var myWidth = windowSize.width;
        //console.log("myHeight Fasl", myHeight);
        dispatch(ativeTopNavigation(hp(height2)))
      }, [])
    );
    return (
      <View
      
        onLayout={onPageLayout}
        style={{ flex: 1, backgroundColor: "white", height: 100 }}
      >
        <Text>{'descriptionTxt'}</Text>
      </View>
    );
  }