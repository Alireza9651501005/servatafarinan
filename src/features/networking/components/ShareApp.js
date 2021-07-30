import React, { Component } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
// import { AppTour, AppTourView } from 'react-native-app-tour'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomText, RippleEffect } from '../../../common/components';
import { colors } from '../../../common/constants/theme';
import { iranSansMedium } from '../../../utils/helper/commonVariables';
import Share from 'react-native-share';


export default class ShareApp extends Component {

    shareAppFunc() {
        const shareOptions = {
            title: 'Share App',
            failOnCancel: false,
            message: this.props.shareContent
        };
        Share.open(shareOptions)
    }
    render() {
        const { addAppTourTarget, key, tourProps } = this.props

        return (
            <Pressable
                key={key}
                ref={ref => {
                    if (!ref) return

                    this.button1 = ref

                    // this.props.addAppTourTarget &&
                    //     this.props.addAppTourTarget(AppTourView.for(ref, { ...tourProps }))
                }}
                onPress={() => this.shareAppFunc()}
                style={[styles.container]}>
                <Image
                    source={require('../../../assets/networking/share-app.png')}
                    style={{ width: wp(5.5), height: wp(5.5), resizeMode: 'contain', marginLeft: 3 }}
                />
                < CustomText bold style={
                    {
                        color: colors.textLightBlue,
                        fontFamily: iranSansMedium,
                    }
                } >معرفی اپلیکیشن به دیگران</CustomText>
            </Pressable>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        flexDirection: 'row-reverse',
    }
})