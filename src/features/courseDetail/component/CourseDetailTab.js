import React, { Component } from 'react'
import { Image, Pressable, View, StyleSheet } from 'react-native'
// import { AppTour, AppTourView } from 'react-native-app-tour'

import Ripple from 'react-native-material-ripple'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { CustomText } from '../../../common/components'
import { store } from '../../../store/store'
import { appBAckgroundColor, courseDetailHeaderColor, iranSans } from '../../../utils/helper/commonVariables'
import { fontSize10 } from '../../../utils/helper/responsiveSizes'
import { changeActiveTab } from '../action/courseDetailAction'

export default class CourseDetailTab extends Component {

    render() {
        const { image, title, activeTab, onPress, addAppTourTarget, key, tourProps,activeTabId } = this.props
        return (
            <Pressable
                key={key}
                ref={ref => {
                    if (!ref) return

                    this.button1 = ref

                    // this.props.addAppTourTarget &&
                    //     this.props.addAppTourTarget(AppTourView.for(ref, { ...tourProps }))
                }}
                rippleCentered

                onPress={() => store.dispatch(changeActiveTab(activeTabId, null))}
                // onPress={onPress}
                style={{ borderWidth: 0, alignItems: 'center', justifyContent: 'center', width: wp(15), marginRight: title == 'درس ها' ? wp(4) : wp(10) }}>
                <CustomText style={{ fontSize: fontSize10, fontFamily: iranSans }} numberOfLines={1}> {title}</CustomText>
                <Image style={styles.chartAndClockAndSessionImageStyle} source={image} />
                {/* left: wp(1) */}
                <View style={{ backgroundColor: activeTab ? courseDetailHeaderColor : appBAckgroundColor, width: wp(10), height: hp(0.7), borderRadius: hp(2), marginTop: hp(.7), }} />
            </Pressable >

        )
    }
}
const styles = StyleSheet.create({
    chartAndClockAndSessionImageStyle: {
        width: wp(6.9),
        height: hp(3.5),
        marginTop: hp(.3),
        resizeMode: 'contain',
        borderWidth: 0
    },
})