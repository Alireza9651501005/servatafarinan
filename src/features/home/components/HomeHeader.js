import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { CustomText, MediumButton, RatingStars, CustomeButton } from '../../../common/components';
import { theme } from '../../../common/constants';
import { iranSansLight } from '../../../utils/helper/commonVariables';
import { reportcatchToFireBase } from '../../../utils/helper/functions';
import { font16 } from '../../../utils/helper/responsiveSizes';
import { store } from '../../../store/store';
import { changePendingNotification } from '../../../store/globalActions';
import crashlytics from '@react-native-firebase/crashlytics';
const HomeHeader = (props) => {
    const [showView, setShowView] = useState(true)
    return (
        <View style={{ backgroundColor: 'transparent' }}>
            {showView ?
                <View style={styles.container}>
                    <View style={{ position: 'absolute', alignSelf: 'center', top: hp(3) }}>
                        <CustomText style={{ fontSize: font16, color: theme.colors.white }}>دوره های آموزشی</CustomText>
                    </View>

                    <View >
                        <Image
                            resizeMode={'contain'}
                            source={require('../../../assets/home-banner.png')}
                            style={{ width: wp(100), height: hp(37), resizeMode: 'contain' }}
                        />
                    </View>

                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: hp(3) }}>
                        <CustomeButton
                            onPress={()=>props.navigation.navigate('AuthenticationStepOne')}
                            // btnStyle={{ width: wp(30),height:hp(6) }} 
                            labelStyle={{ fontSize: font16, fontFamily: iranSansLight }}>ورود / ثبت نام</CustomeButton>

                    </View>
                </View>
                :
                <View style={[styles.container, { padding: wp(5) }]}>
                    <CustomText style={{ fontSize: font16, color: theme.colors.white }}>آکادمی ثروت آفرینان</CustomText>
                </View>
            }
            <Pressable
                onPress={() => { setShowView(!showView) }}
                style={{ zIndex: 5, position: 'absolute', alignSelf: 'center', bottom: 0 }}>
                <Image
                    style={[{ width: wp(8), height: wp(8) }, !showView && { transform: [{ rotate: '180deg' }] }]}
                    source={require('../../../assets/arrow-up.png')}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // padding: wp(5),
        backgroundColor: theme.colors.darkBlue,
        borderBottomEndRadius: wp(5),
        borderBottomStartRadius: wp(5),
        marginBottom: hp(2)
    },
})

export default HomeHeader;