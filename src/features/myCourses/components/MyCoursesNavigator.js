import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { colors, sizes } from '../../../common/constants/theme';
import { CustomText, RippleEffect } from '../../../common/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fontSize12 } from '../../../utils/helper/responsiveSizes';
import { myCoursesActiveTab ,getMyCourses ,changeMyCoursesPageNum} from '../actions/myCoursesAction';
import { myCoursesApi } from '../../../utils/api/Url';

export default function MyCoursesNavigator(props) {
    const dispatch = useDispatch()
    const states = useSelector(state => state)
    let activeTab = states.myCoursesReducer.activeTab

    const getListData = (sort) => {
        dispatch(changeMyCoursesPageNum(1))
        const url = myCoursesApi 
        //console.log('=====', url)
        let filter = '&filter=' + sort
        dispatch(getMyCourses('get', url, 1, [],filter))
    }

    return (
        <View style={styles.container}>
            <RippleEffect
                onPress={() => { 
                    dispatch(myCoursesActiveTab('0'))
                    getListData(0)
                }}
                style={activeTab==='0'?styles.active:{}} >
                <CustomText style={{ color:activeTab==='0'?colors.textWhite:colors.textBlack,fontSize: fontSize12 }}>آخرین مراجعه</CustomText>
            </RippleEffect>

            <RippleEffect
                onPress={() => {
                    dispatch(myCoursesActiveTab('1'))
                    getListData(1)
                }}
                style={activeTab==='1'?styles.active:{}} >
                <CustomText style={{ color:activeTab==='1'?colors.textWhite:colors.textBlack,fontSize: fontSize12 }}>درصد پیشرفت</CustomText>
            </RippleEffect>

            <RippleEffect
                onPress={() => {
                    dispatch(myCoursesActiveTab('2'))
                    getListData(2)
                }}
                style={activeTab==='2'?styles.active:{}} >
                <CustomText style={{ color:activeTab==='2'?colors.textWhite:colors.textBlack, fontSize: fontSize12 }}>الفبا</CustomText>
            </RippleEffect>

            <RippleEffect
                onPress={() => {
                    dispatch(myCoursesActiveTab('3'))
                    getListData(3)
                }}
                style={activeTab==='3'?styles.active:{}} >
                <CustomText style={{color:activeTab==='3'?colors.textWhite:colors.textBlack, fontSize: fontSize12 }}>تاریخ خرید</CustomText>
            </RippleEffect>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        paddingRight: sizes.globalMargin,
        paddingLeft: sizes.globalMargin,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(2)
    },
    active: {
        paddingRight: wp(3),
        paddingLeft: wp(3),
        paddingTop: hp(1.5),
        paddingBottom: hp(1.5),
        borderRadius: sizes.globalRadius,
        backgroundColor: colors.buttons
    }
})