import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../constants'
import { CustomText } from '.'
import * as NavigationService from '../../utils/NavigationService'
import { useSelector, useDispatch } from "react-redux";
import { RippleEffect } from './RippleEffect'
import { whiteSecond, priceColor, iranSans } from '../../utils/helper/commonVariables'
import { font14, font10, font12, font16, fontSize16, fontSize12, fontSize20, fontSize8, fontSize10, largeFont, normalize, fontSize14 } from '../../utils/helper/responsiveSizes'
import { priceSeparator } from '../../utils/helper/functions'
import { changeCurrentCourse } from '../../store/globalActions'

const CourseRowItem = (props) => {
    const [fontSize, setFontSize] = useState(fontSize16);
    let data = props.item;
    let itemLayout = props.itemLayout;
    // //console.log('CourseRowItem', data)
    // //console.log('itemLayout CourseRowItem', itemLayout)
    const states = useSelector(state => state);

    return (
        renderPageContetn(states, props, itemLayout)
    )
}
const renderPageContetn = (states, props, itemLayout) => {
    const dispatch = useDispatch();
    let data = props.item, chapterTitle;
    let conditaion = states.globalReducer.currentCourseAction.item_layout == 'user';
    let imageStyle = conditaion ? styles.userImageMode : styles.image;
    chapterTitle = data ? `${data.total_chapters}‌فصل` : null;
    if (itemLayout == 'course') {
        return (
            <RippleEffect activeOpacity={0.6} onPress={() => onPress(props, conditaion, itemLayout, dispatch)} style={styles.container}>
                <View style={[styles.courseImageContainer, { backgroundColor: data.color }]}>
                    <Image style={styles.image} source={{ uri: data.image }} />
                </View>
                <View >
                    <View style={styles.courseDataA}>
                        <View style={{ borderWidth: 0, width: wp(32.5), height: hp(8.4), alignItems: 'flex-start', paddingLeft: wp(5.5), paddingTop: hp(1), paddingBottom: hp(1), }}>
                            {/* <CustomText style={styles.lastPrice} numberOfLines={1}> {2000}</CustomText> */}
                            <CustomText style={[styles.lastPrice, { textDecorationLine: data.last_price ? 'line-through' : null }]} numberOfLines={1}> {rendrPrice(data.last_price)}</CustomText>

                            {data.owned ?
                                <CustomText style={styles.owned} numberOfLines={1}>
                                    {'خریداری شده'}
                                </CustomText>
                                :

                                <CustomText style={styles.price} numberOfLines={1}>
                                    {data ? data.price ? priceSeparator(data.price) : 'رایگان' : null}
                                </CustomText>
                            }
                            {data.owned ?
                                null

                                :

                                <CustomText style={styles.currency} numberOfLines={1}>{data ? data.price ? 'تومان' : null : null}</CustomText>

                            }

                            {/* <CustomText style={styles.price} numberOfLines={1}> {rendrPrice(data.price)}</CustomText> */}
                        </View>
                        <View style={{ borderWidth: 0, width: wp(33), height: hp(6.4), justifyContent: 'flex-end' }}>
                            <CustomText
                                bold
                                style={[styles.courseTitle, { fontSize: fontSize16 }]}
                                numberOfLines={1}
                                onTextLayout={(e) => {
                                    const { lines } = e.nativeEvent;
                                    // if (lines.length > 1) {
                                    //     // alert()
                                    //     setFontSize(font12);
                                    // }
                                }}
                            >
                                {data.title}
                            </CustomText>
                        </View>
                    </View>
                    <View style={styles.courseDataB}>
                        {renderCourseDetail(require('../../assets/chart/chart.png'), data.level, 1, 'level')}
                        {renderCourseDetail(require('../../assets/clock/clock.png'), data.total_hours, 4, 'hour')}
                        {renderCourseDetail(require('../../assets/document/document.png'), chapterTitle, 4, 'chapters')}
                    </View>
                </View>

            </RippleEffect>
        )
    } else if (itemLayout == 'live') {
        //console.log('love layout more', data)
        return (
            <RippleEffect activeOpacity={0.6} onPress={() => onPress(props, conditaion, itemLayout, dispatch)} style={styles.container}>
                {/* <View style={[styles.LiveImageContainer, { backgroundColor: data.color }]}> */}
                <Image style={styles.LiveImage} source={{ uri: data.image }} />
                {/* </View> */}
                <View >
                    <View style={styles.courseDataA}>
                        {/* <View style={{ borderWidth: 1, width: wp(32.5), height: hp(8.4), alignItems: 'flex-start', paddingLeft: wp(2),paddingTop:hp(1), paddingBottom:hp(1),}}>
                        </View> */}
                        <View style={{ borderWidth: 0, width: wp(65.6), height: hp(6.4) }}>
                            <CustomText
                                bold
                                style={[styles.liveTitle, { fontSize: fontSize16 }]}
                                numberOfLines={1}
                                onTextLayout={(e) => {
                                    const { lines } = e.nativeEvent;
                                    // if (lines.length > 1) {
                                    //     // alert()
                                    //     setFontSize(font12);
                                    // }
                                }}
                            >
                                {data.title}
                            </CustomText>
                        </View>
                    </View>
                    <View style={styles.courseDataLiveB}>
                        {/* {renderLiveDetail(require('../../assets/clock/clock.png'), data.duration,null)} */}
                        <View style={{ borderWidth: 0, height: hp(4.4), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: wp(65.6), marginRight: wp(3.6) }}>
                            <CustomText style={{ fontSize: fontSize12, fontFamily: iranSans, borderWidth: 0, height: hp(3.4), right: wp(.5), top: hp(.4) }} numberOfLines={1}> {data.duration}</CustomText>
                            <Image style={styles.chartAndClockAndSessionImageStyle} source={require('../../assets/clock/clock.png')} />
                        </View>
                    </View>
                </View>

            </RippleEffect>
        )
    } else if (itemLayout == 'user') {
        return (
            <RippleEffect activeOpacity={0.6} onPress={() => onPress(props, conditaion, itemLayout, dispatch)} style={styles.container}>
                <View style={[styles.courseImageContainer, { backgroundColor: data.color }]}>
                    <Image style={styles.userImageMode} source={{ uri: data.image }} />
                </View>
                <View >
                    <View style={styles.courseDataA}>
                        <View style={{ borderWidth: 0, width: wp(32.5), height: hp(8.4), alignItems: 'flex-start', paddingLeft: wp(2), paddingTop: hp(1), paddingBottom: hp(1), }}>
                            {/* <CustomText style={styles.lastPrice} numberOfLines={1}> {2000}</CustomText> */}
                            <CustomText style={[styles.lastPrice, { textDecorationLine: data.last_price ? 'line-through' : null }]} numberOfLines={1}> {rendrPrice(data.last_price)}</CustomText>
                            <CustomText style={styles.price} numberOfLines={1}> {rendrPrice(data.price)}</CustomText>
                            <CustomText style={styles.currency} numberOfLines={1}>تومان</CustomText>
                        </View>
                        <View style={{ borderWidth: 0, width: wp(40), height: hp(6.4), right: wp(7) }}>
                            <CustomText
                                bold
                                style={[styles.courseTitle, { fontSize: fontSize16 }]}
                                numberOfLines={1}
                                onTextLayout={(e) => {
                                    const { lines } = e.nativeEvent;
                                    // if (lines.length > 1) {
                                    //     // alert()
                                    //     setFontSize(font12);
                                    // }
                                }}
                            >
                                {data.title}
                            </CustomText>
                        </View>
                    </View>
                    <View style={styles.courseDataB}>
                        {renderCourseDetail(require('../../assets/chart/chart.png'), data.level, 1, 'level')}
                        {renderCourseDetail(require('../../assets/clock/clock.png'), data.total_hours, 4, 'hour')}
                        {renderCourseDetail(require('../../assets/document/document.png'), chapterTitle, 4, 'chapters')}
                    </View>
                </View>

            </RippleEffect>
        )
    } else if (itemLayout == 'my_courses') {
        return (
            <RippleEffect activeOpacity={0.6} onPress={() => onPress(props, conditaion, itemLayout, dispatch)} style={styles.container}>
                <View style={[styles.courseImageContainer, { backgroundColor: data ? data.color : null }]}>
                    <Image style={styles.image} source={{ uri: data ? data.image : null }} />
                </View>
                <View >
                    <View style={styles.courseDataA}>
                        <View style={{ borderWidth: 0, width: wp(32.5), height: hp(8.4), alignItems: 'flex-start', paddingLeft: wp(5.5), paddingTop: hp(1), paddingBottom: hp(1), }}>
                            {/* <CustomText style={styles.lastPrice} numberOfLines={1}> {2000}</CustomText> */}
                            <CustomText style={[styles.lastPrice, { textDecorationLine: data ? data.last_price ? 'line-through' : null : null }]} numberOfLines={1}> {rendrPrice(data ? data.last_price : null)}</CustomText>
                            <CustomText style={styles.price} numberOfLines={1}>{data ? data.price ? priceSeparator(data.price) : 'رایگان' : null}</CustomText>
                            {/* <CustomText style={styles.price} numberOfLines={1}> {rendrPrice(data.price)}</CustomText> */}
                            <CustomText style={styles.currency} numberOfLines={1}>{data ? data.price ? 'تومان' : null : null}</CustomText>
                        </View>
                        <View style={{ borderWidth: 0, width: wp(33), height: hp(6.4), justifyContent: 'flex-end' }}>
                            <CustomText
                                bold
                                style={[styles.courseTitle, { fontSize: fontSize16 }]}
                                numberOfLines={1}
                                onTextLayout={(e) => {
                                    const { lines } = e.nativeEvent;
                                    // if (lines.length > 1) {
                                    //     // alert()
                                    //     setFontSize(font12);
                                    // }
                                }}
                            >
                                {data ? data.title : null}
                            </CustomText>
                        </View>
                    </View>
                    <View style={styles.courseDataB}>
                        {renderCourseDetail(require('../../assets/chart/chart.png'), data ? data.level : null, 1, 'level')}
                        {renderCourseDetail(require('../../assets/clock/clock.png'), data ? data.total_hours : null, 4, 'hour')}
                        {renderCourseDetail(require('../../assets/document/document.png'), chapterTitle, 4, 'chapters')}
                    </View>
                </View>

            </RippleEffect>
        )
    }

}
const navigation = {
    'course-view': 'CourseDetailScreen',
    'user-view': 'PublicProfileScreen',
    'browse': 'LiveWebView',
}
const testFunc = () => {
    return null;
};
const onPress = (props, conditaion, itemLayout, dispatch) => {
    let courseActionData = props.item.action;
    dispatch(
        changeCurrentCourse({
            courseActionData,
            testFunc,
            testFunc
        })
    );
    NavigationService.push(navigation[courseActionData.type], courseActionData)

    // if (conditaion) {
    //     let id = props.item.item.id;  
    //     NavigationService.push('PublicProfileScreen', id)

    // }
    // NavigationService.push('issueDetails', actions)
}
const getLength = (value) => {
    return value ? value.toString().length : null;
}
const rendrPrice = (value) => {
    return value ? priceSeparator(value) : null;
}
const renderCourseDetail = (image, title, marginRight, type) => {
    if (type == 'hour') {
        return (
            <View style={[styles.renderCourseDetailContainerStyle, { marginRight: hp(marginRight), borderWidth: 0 }]}>
                <CustomText style={[styles.renderCourseDetailTxtStyle, { top: hp(.2), right: wp(.5), borderWidth: 0 }]} numberOfLines={1}> {title}</CustomText>
                <Image style={styles.chartAndClockAndSessionImageStyle} source={image} />
            </View>
        )
    } else if (type == 'chapters') {
        let length = getLength(title);
        // alert(length)
        return (
            <View style={[styles.renderCourseDetailContainerStyle, { marginRight: length == 6 ? hp(2.2) : hp(3), borderWidth: 0 }]}>
                <CustomText style={[styles.renderCourseDetailTxtStyle, { right: length == 6 ? wp(-.7) : wp(-.6), top: hp(.2), borderWidth: 0 }]} numberOfLines={1}> {title}</CustomText>
                <Image style={styles.chartAndClockAndSessionImageStyle} source={image} />
            </View>
        )
    } else {
        return (
            <View style={[styles.renderCourseDetailContainerStyle, { marginRight: hp(2), borderWidth: 0 }]}>
                <CustomText style={[styles.renderCourseDetailTxtStyle, { right: wp(-.6), top: hp(.2), borderWidth: 0 }]} numberOfLines={1}> {title}</CustomText>
                <Image style={styles.chartAndClockAndSessionImageStyle} source={image} />
            </View>
        )
    }

}
const renderLiveDetail = (image, title, marginRight) => {
    return (
        <View style={[styles.renderLiveContainerStyle, { marginRight: hp(marginRight) }]}>
            <CustomText style={[styles.renderCourseDetailTxtStyle, { right: marginRight == 6 ? wp(.5) : wp(-1.5), top: hp(.2), width: marginRight == 5 ? wp(12) : null }]} numberOfLines={1}> {title}</CustomText>
            <Image style={styles.chartAndClockAndSessionImageStyle} source={image} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: wp(90),
        alignSelf: 'center',
        borderRadius: theme.sizes.globalRadius,
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        marginBottom: hp(2.4),
        backgroundColor: whiteSecond,
    },
    image: {
        width: hp(8),
        height: hp(8),
        // borderRadius: wp(2),
    },
    userImageMode: {
        width: hp(8),
        height: hp(8),
        borderRadius: hp(4),
    },
    courseTitle: {
        textAlign: 'right',
        marginRight: wp(3.6),
        marginTop: hp(2.5),
        fontFamily: iranSans,
        fontSize: fontSize16,
    },
    liveTitle: {
        textAlign: 'right',
        marginRight: wp(3.6),
        marginTop: hp(2.4),
        fontFamily: iranSans,
        fontSize: fontSize16,
        borderWidth: 0,
    },
    lastPrice: {
        textAlign: 'right',
        fontSize: fontSize12,
        textDecorationStyle: 'solid',
        color: priceColor,
        borderWidth: 0,
        marginTop: hp(0),
        marginBottom: hp(0),
        height: hp(3)
    },
    price: {
        textAlign: 'right',
        // fontFamily: iranSansLight,
        fontSize: normalize(18),
        marginTop: hp(0),
        marginBottom: hp(0),
        borderWidth: 0,
        color: priceColor,
        height: hp(5),
        bottom: hp(1.5),
        left: hp(-1),
    },
    owned: {
        textAlign: 'right',
        // fontFamily: iranSansLight,
        fontSize: fontSize14,
        marginTop: hp(0),
        marginBottom: hp(0),
        borderWidth: 0,
        color: priceColor,
        height: hp(5),
        bottom: hp(1.5),
        left: hp(-1),
    },
    currency: {
        textAlign: 'right',
        // fontFamily: iranSans,
        fontSize: fontSize8,
        marginTop: hp(0),
        borderWidth: 0,
        color: priceColor,
        marginTop: hp(0),
        marginBottom: hp(0),
        height: hp(2),
        bottom: hp(2.5)
    },
    courseImageContainer: {
        width: wp(24.5),
        height: hp(13),
        borderWidth: 0,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: wp(2),
        borderBottomRightRadius: wp(2)
    },
    LiveImageContainer: {
        width: wp(24.5),
        height: hp(13),
        borderWidth: 1,
        // justifyContent: "center",
        // alignItems: "center",
        borderTopRightRadius: hp(2),
        borderBottomRightRadius: hp(2),
    },
    LiveImage: {
        width: wp(24.5),
        borderTopRightRadius: hp(1),
        borderBottomRightRadius: hp(1),
        // marginTop: hp(.5),
        // borderRadius:hp(10),
        // resizeMode: 'center',
    },
    courseDataA: {
        width: wp(65.5),
        height: hp(8.4),
        // justifyContent: "center",
        // alignItems: "center",
        borderWidth: 0,
        flexDirection: "row",
    },
    courseDataB: {
        width: wp(65.5),
        height: hp(4.4),
        borderWidth: 0,
        flexDirection: 'row-reverse',
    },
    courseDataLiveB: {
        width: wp(65.5),
        // height: hp(4.4),
        borderWidth: 0,
        bottom: hp(1.4),
        flexDirection: 'row-reverse',
    },
    chartAndClockAndSessionImageStyle: {
        width: wp(3.6),
        // height: hp(1.6),
        height: wp(3.6),
        // height: wp(3.2),
        resizeMode: 'contain',
        borderWidth: 0,
    },
    renderCourseDetailTxtStyle: {
        fontSize: fontSize12,
        fontFamily: iranSans,
        borderWidth: 0,
        flex: 1,
        textAlign: 'right',
    },
    renderCourseDetailContainerStyle: {
        borderWidth: 1,
        height: hp(4.4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: wp(16.8),
        justifyContent: 'space-between',
    },
    renderLiveContainerStyle: {
        borderWidth: 1,
        height: hp(4.4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: wp(16.8),
        justifyContent: 'space-between',
    },
})

export { CourseRowItem }