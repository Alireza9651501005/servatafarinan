import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Keyboard, TextInput, Image, TouchableOpacity, Text } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { CustomText, CustomeButton } from '../../../common/components';
import { fontSize16, fontSize14 } from '../../../utils/helper/responsiveSizes';
import { changeCommentVisible } from '../actions/commentsAction';
import { useDispatch, useSelector } from "react-redux";
export default function ListEmptyComponent({ setReply, sendComment }) {
    const dispatch = useDispatch()
    const setShowReply = (value) => {
        dispatch(changeCommentVisible(value))
    }
    let guide1, guide2, sendCommentBtnTxt;
    guide1 = 'تاکنون نظری ثبت نشده است ';
    guide2 = 'اولین نظر را شما ثبت کنید و امتیاز دریافت کنید!';
    sendCommentBtnTxt = 'ثبت نظر';
    return (
        <View style={{ width: wp(100), height: hp(40)}}>
            <Image source={require("../../../assets/commentIsEmpty/commentIsEmpty.png")} style={{ width: wp(50), height: hp(20), resizeMode: 'contain', alignSelf: 'center' }} />
            <View style={{ alignItems: 'center', marginBottom: hp(2) }}>
                <CustomText
                    style={{}}
                >{guide1}</CustomText>
                <CustomText
                    style={{}}
                >{guide2}</CustomText>
            </View>
            <CustomeButton
                onPress={() => setShowReply(true)}
                btnStyle={{ minWidth: wp(30), marginBottom: hp(0) }}
                labelStyle={{ fontSize: fontSize14, }}>{sendCommentBtnTxt}</CustomeButton>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // bottom: 0,
        width: wp(100),
    },

})
