import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../constants'
import * as NavigationService from '../../utils/NavigationService'
import { CustomText } from '.'
import CustomeImage from "./CustomeImage";
import { RippleEffect } from './RippleEffect'
import { ceil } from 'react-native-reanimated'
import { lightBlueModeA, lightBlueModeB, iranSans, whiteFour } from '../../utils/helper/commonVariables'
import { fontSize16, fontSize12 } from '../../utils/helper/responsiveSizes'
import { colors } from '../constants/theme'

const LessonItem = ({ item, actions }) => {
    let clockIcon, commentIcon, heartIcon, statusIcon;
    clockIcon = require('../../assets/clock/clock.png');
    commentIcon = require('../../assets/comment/comment.png');
    heartIcon = require('../../assets/heart/heart.png');
    statusIcon = require('../../assets/statusLesson/statusLesson2.png');
    // //console.log('LessonItem', item)
    const onPress = () => () => {
        NavigationService.navigate('LessonScreen', { item: item })
    }
    const renderLessonInFormation = (image, title, titleColor) => {
        return (
            // , height: hp(4.4)
            <View style={{ borderWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: wp(16.8), width: wp(22) }}>
                <CustomText light style={{ fontSize: fontSize12, fontFamily: iranSans, borderWidth: 0, height: hp(2.8), right: wp(.5), color: titleColor ,marginTop:2}} numberOfLines={1}>{title}</CustomText>
                <Image style={styles.chartAndClockAndSessionImageStyle} source={image} />
            </View>
        )
    }

    const calculateColor=()=>{
        let color = colors.chapterNoScore
        if(item.user_score==0){
             color = colors.chapterNoScore
        }else{
            if(item.user_score==item.lesson_score){
                color= colors.greenTypeC
            }else{
                color=colors.chapterScore
            }
        }
        return color
    }
    return (
        <RippleEffect activeOpacity={0.6} onPress={onPress()} style={styles.container}>
            {/* <CustomeImage 
                style={styles.image} 
                source={{uri : item.image}} />  */}
            <View>
                <View style={styles.text}>
                    <CustomText style={{ fontSize: fontSize16 }} numberOfLines={1} >
                        {item.title}
                    </CustomText>
                </View>
                <View style={styles.lessontInformation}>
                    {renderLessonInFormation(clockIcon, item.total_hours)}
                    {renderLessonInFormation(commentIcon, item.total_comments)}
                    {renderLessonInFormation(heartIcon, item.likes)}
                    <View style={{ borderWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: wp(16.8) }}>
                        <CustomText light style={{ fontSize: fontSize12, fontFamily: iranSans, borderWidth: 0, height: hp(2.8), right: wp(.5), color: calculateColor(),top:1 }} numberOfLines={1}> {item.user_score}/{item.lesson_score}</CustomText>
                        {/* <Image style={styles.chartAndClockAndSessionImageStyle} source={statusIcon} /> */}
                        <View style={{width:wp(3),height:wp(3.2),borderRadius:4,backgroundColor:calculateColor()}}/>
                    </View>
                    {/* {renderLessonInFormation(statusIcon, '22:22:00')} */}
                </View>
            </View>


            <View style={styles.rightShape} />
        </RippleEffect>
    )
}
const styles = StyleSheet.create({
    container: {
        width: wp(86.6),
        height: hp(10),
        borderRadius: hp(2),
        // marginBottom:  hp(0),
        backgroundColor: whiteFour,
        // elevation: 2,
        borderWidth: 1,
        borderColor: lightBlueModeB,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    image: {
        width: wp(24.7),
        height: hp(12.3),
        borderRadius: wp(3),
    },
    text: {
        // padding: hp(0.5),
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        // margin: hp(2),
        borderWidth: 0,
        width: wp(82),
        height: hp(2.5),
        marginTop: hp(1.8),
        // marginTop: hp(2),
        marginRight: wp(2),
        bottom: hp(1),
    },
    lessontInformation: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        borderWidth: 0,
        width: wp(82),
        height: hp(2),
        // marginTop: hp(1.2),
        marginRight: wp(.6),
        bottom: hp(.4),
    },
    chartAndClockAndSessionImageStyle: {
        width: wp(4.3),
        // height: hp(4),
        resizeMode: 'contain',
        borderWidth: 0,
    },
    rightShape: {
        width: wp(3.2),
        height: hp(8),
        borderWidth: 1,
        borderTopRightRadius: hp(1.4),
        borderBottomRightRadius: hp(1.4),
        marginRight: wp(1),
        alignSelf: "center",
        backgroundColor: lightBlueModeA,
        borderColor: lightBlueModeB
    },
})

export { LessonItem }