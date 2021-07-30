import React from 'react';
import { Image, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Share from 'react-native-share';
import { CustomText, RippleEffect } from '../../../common/components';
import { colors, sizes } from '../../../common/constants/theme';
import { fontSize16, fontSize20,fontSize18 } from '../../../utils/helper/responsiveSizes';


export default function PublicProfileShare (props){

    const shareProfile = () => {
        const shareOptions = {
          title: 'Share Profile',
          failOnCancel: false,
          message: props.shareContent
        };
        Share.open(shareOptions)
      }

    return(
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:sizes.globalMargin}}>
            {/* <RippleEffect
                onPress={()=>shareProfile()}
            >
                <Image 
                    style={{width:wp(6),height:wp(6),resizeMode:'contain'}}
                    source={require('../../../assets/share/share-blue.png')}
                />
            </RippleEffect> */}

            <CustomText bold style={{color:colors.textWhite,fontSize:fontSize18}}>آکادمی ثروت آفرینان</CustomText>
        </View>
    )
}