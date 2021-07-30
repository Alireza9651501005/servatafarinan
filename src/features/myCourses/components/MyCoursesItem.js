import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import * as Progress from 'react-native-progress'
import { theme } from '../../../common/constants'
import * as NavigationService from "../../../utils/NavigationService";
import { changeCurrentCourse } from '../../../store/globalActions';
import { useDispatch, useSelector } from "react-redux";
import { fontSize12, fontSize14, largeFont } from '../../../utils/helper/responsiveSizes'
import { CustomText } from '../../../common/components';
import { colors, sizes } from '../../../common/constants/theme';
import { actionsTypes } from '../../../common/constants/variables'
const MyCoursesItem = ({ item, actions, itemLayout }) => {
    let fontSize = largeFont, finishCourseIcon;
    finishCourseIcon = require('../../../assets/finishCourseTick/finishCourse.png');
    const [currentFont, setCurrentFont] = useState(fontSize);
    const dispatch = useDispatch();
    // let style = actions.type == 'user-view' ? styles.imageUserMode : styles.image
    return (
        <View style={{ width: wp(100), paddingRight: sizes.globalMargin, paddingLeft: sizes.globalMargin }}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => onPress(actions, dispatch)} style={[styles.container]}>
                < View style={[styles.imageWrapper, { backgroundColor: item.color }]} >
                    <Image
                        style={styles.image}
                        source={{ uri: item.image }} />
                </View>
                <View style={{ marginRight: wp(5), flex: 1, marginLeft: wp(5) }}>
                    <View style={{ flexDirection: 'row-reverse', borderWidth: 0, width: wp(52), height: wp(6), alignItems: 'center' }}>
                        {item.progress_percentage == 100 ?
                            < View style={{ width: wp(5), height: hp(3), justifyContent: 'center' }} >
                                <Image
                                    style={{}}
                                    source={finishCourseIcon} />
                            </View>
                            : null}
                        <CustomText bold numberOfLines={1} style={{ fontSize: item.title.length > 14 ? fontSize12 : fontSize14, marginRight: wp(1.5) }}>{item.title}</CustomText>
                    </View>

                    <View>

                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginTop: hp(1) }}>
                            <CustomText style={{ fontSize: fontSize12 }}>پیشرفت دوره</CustomText>
                            <CustomText style={{ fontSize: fontSize12 }}>{item.progress_percentage + ' %'} </CustomText>
                        </View>
                        <Progress.Bar
                            width={wp(49)}
                            height={wp(3)}
                            borderRadius={8}
                            color={colors.progressInvert}
                            unfilledColor={colors.progress}
                            borderWidth={0}
                            // fill={white}
                            // progress={1 - (props.percent/100)}
                            progress={1 - (item.progress_percentage / 100)}

                        />
                    </View>
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginTop: hp(1.5) }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/basket/basket.png')}
                                style={{ width: wp(4), height: wp(4), resizeMode: 'contain', marginLeft: 2 }}
                            />
                            <CustomText style={{ fontSize: fontSize12 }}>{item.course_start_time}</CustomText>
                        </View>

                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/view/view-black.png')}
                                style={{ width: wp(4), height: wp(4), resizeMode: 'contain', marginLeft: 0 }}
                            />
                            <CustomText style={{ fontSize: fontSize12 }}>{item.course_last_activity_time} </CustomText>

                        </View>

                    </View>

                </View>

            </TouchableOpacity>
        </View>


    )

}
const navigation = actionsTypes
const testFunc = () => {
    return null;
};
const onPress = (actions, dispatch) => {
    //console.log('actions', actions)
    let courseActionData = actions;
    // dispatch(changeCurrentCourse(actions,testFunc,testFunc))
    dispatch(
        changeCurrentCourse({
            courseActionData,
            testFunc,
        })
    );
    NavigationService.push(navigation[actions.type], actions)
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        // minHeight: wp(47),
        borderRadius: sizes.globalRadius,
        backgroundColor: theme.colors.componentWhite,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        // borderWidth: 1,
        overflow: 'hidden'
    },
    image: {
        width: wp(25),
        height: wp(20),
        resizeMode: 'contain'
    },
    imageUserMode: {
        width: wp(26.3),
        height: wp(26.3),
        borderRadius: wp(26.3)
    },
    text: {

        color: theme.colors.white,
        textAlign: 'right',
        // marginRight:wp(5)
        // alignSelf: 'center',
        // fontSize: largeFont
    },
    imageWrapper: {
        alignItems: 'center',
        padding: wp(3),
        // borderBottomWidth: 0.5,
        // borderColor: theme.colors.white,
        alignSelf: 'center'
    }
})

export { MyCoursesItem }