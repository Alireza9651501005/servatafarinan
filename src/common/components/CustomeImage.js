import React from "react";
import { Image } from "react-native";
export default CustomeImage = ({source, style }) => {
    let randomeNumber = Math.floor((Math.random() * 100) + 1);
    // let add=`${source.uri}?${randomeNumber}`;
    let add=`${source.uri}`;

  return <Image source={{uri:add}} style={[style,{borderWidth:0,borderColor:'red'}]} />;
};
