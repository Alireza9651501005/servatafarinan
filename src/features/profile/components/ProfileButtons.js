import React from 'react';
import { Image, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as NavigationService from '../../../utils/NavigationService'
import { CustomText, RippleEffect } from '../../../common/components';
import { colors, sizes } from '../../../common/constants/theme';
import { fontSize16 } from '../../../utils/helper/responsiveSizes';


export default function ProfileButtons (props){
    return(
        < View style = {
            {
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: sizes.globalMargin,
                paddingBottom: heightPercentageToDP(12)
            }
        } >
            < RippleEffect 
            onPress={()=>{NavigationService.navigate('EditeProfile')}}
            style = {
                {
                    width: wp(40),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center',
                    overflow: 'hidden',
                    backgroundColor: colors.componentWhite2,
                    paddingTop: heightPercentageToDP(1),
                    paddingBottom: heightPercentageToDP(1),
                    borderRadius: sizes.globalRadius
                }
            } >
               
                <CustomText style={{top:0}}>ویرایش پروفایل</CustomText>
                <Image 
                    style={{width:wp(5),height:wp(5),resizeMode:'contain',marginLeft:5}}
                    source={require('../../../assets/profile/edit_profile.png')}
                />
            </RippleEffect>

            < RippleEffect 
            onPress={()=>{NavigationService.navigate('SettingPageScreen')}}
            
            style = {
                {
                    width: wp(40),
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.componentWhite2,
                    paddingTop: heightPercentageToDP(1),
                    paddingBottom: heightPercentageToDP(1),
                    borderRadius: sizes.globalRadius,
                    justifyContent:'center'
                }
            } >
               
                <CustomText style={{top:0}}>تنظیمات حساب</CustomText>
                <Image 
                    style={{width:wp(5),height:wp(5),resizeMode:'contain',marginLeft:5}}
                    source={require('../../../assets/profile/setting.png')}
                />
            </RippleEffect>
        </View>
    )
}