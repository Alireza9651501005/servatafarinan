import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors, sizes } from '../constants/theme';
import { RippleEffect } from './RippleEffect';
import * as NavigationService from '../../utils/NavigationService';
import { CustomText } from './CustomText';
import { fontSize14, fontSize16 } from '../../utils/helper/responsiveSizes';
import { ProfilePageForGuestUserText } from './texts';
import { CustomeButton } from './CustomeButton';
import { iranSans, iranSansLight } from '../../utils/helper/commonVariables';
import { ParentViewActionBar } from './ParentViewActionBar';

function ProfilePageForGuestUser(props) {

  let imageProfilePageForGuestUserSource = require('../../assets/imageProfilePageForGuestUser/imageProfilePageForGuestUser.png')
  return (
    <ParentViewActionBar followHeaderShape style={{ borderWidth: 0, flex: 1 }}>
      <View style={styles.imageProfilePageForGuestUserContainerStyle}>
        <Image style={{ resizeMode: 'center' }} source={imageProfilePageForGuestUserSource} />
        <CustomText style={{ marginTop: hp(1.5), borderWidth: 0 }}>{ProfilePageForGuestUserText}</CustomText>
      </View>
      <CustomeButton
        onPress={() => props.navigation.navigate('AuthenticationStepOne')}
        btnStyle={{ marginTop: hp(3) }}
        labelStyle={{ fontSize: fontSize16, fontFamily: iranSans }}>ورود / ثبت نام</CustomeButton>
    </ParentViewActionBar>
  )
}
const styles = StyleSheet.create({
  imageProfilePageForGuestUserContainerStyle: {
    width: wp(77),
    borderWidth: 0,
    alignSelf: 'center',
    marginTop: hp(6),
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export { ProfilePageForGuestUser };