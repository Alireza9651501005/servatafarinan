import React from "react";
import { View, ScrollView, Linking } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import HTML from 'react-native-render-html';
import { fontSize14 } from "../../../utils/helper/responsiveSizes";
import { iranSans } from "../../../utils/helper/commonVariables";
import { baseUrlReal } from "../../../utils/api/Url";
export default function DescriptionScreen({ courseDescription }) {
  return (
    <View style={{ borderWidth: 0, flex: 1, width: wp(100), alignSelf: "center", }}>
      <ScrollView style={{ flex: 1 }}>
        <HTML
          imagesMaxWidth={wp(90)}
          containerStyle={{ width: wp(90), alignSelf: 'center'}}
          uri={baseUrlReal}
          allowFontScaling={false}
          baseFontStyle={{ fontSize: fontSize14, fontFamily: iranSans,textAlign:'right' }}
          onLinkPress={(href, attribs) => { Linking.openURL(attribs) }}
          html={courseDescription} />
      </ScrollView>
    </View>
  );
}