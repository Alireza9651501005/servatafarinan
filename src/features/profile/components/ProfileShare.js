import React, { Component } from 'react';
import { Image, Pressable, View } from 'react-native';
// import { AppTour, AppTourView } from 'react-native-app-tour'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Share from 'react-native-share';
import { CustomText, RippleEffect } from '../../../common/components';
import { colors, sizes } from '../../../common/constants/theme';
import { fontSize16 } from '../../../utils/helper/responsiveSizes';


export default class ProfileShare extends Component {

    render() {
        const { addAppTourTarget, key, tourProps, shareContent } = this.props

        const shareProfile = () => {
            const shareOptions = {
                title: 'Share Profile',
                failOnCancel: false,
                message: shareContent
            };
            Share.open(shareOptions)
        }
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: sizes.globalMargin }}>
                <Pressable
                    key={key}
                    ref={ref => {
                        if (!ref) return

                        this.button1 = ref

                        // this.props.addAppTourTarget &&
                        //     this.props.addAppTourTarget(AppTourView.for(ref, { ...tourProps }))
                    }}
                    onPress={() => shareProfile()}
                >
                    <Image
                        style={{ width: wp(6), height: wp(6), resizeMode: 'contain' }}
                        source={require('../../../assets/share/share-blue.png')}
                    />
                </Pressable>

                <CustomText bold style={{ color: colors.textWhite, fontSize: fontSize16 }}>آکادمی ثروت آفرینان</CustomText>
            </View>
        )
    }

}