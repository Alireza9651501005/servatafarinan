import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import * as Progress from 'react-native-progress'
import { theme } from '../../../common/constants'
import * as NavigationService from "../../../utils/NavigationService";
import { changeCurrentCourse } from '../../../store/globalActions';
import { useDispatch, useSelector } from "react-redux";
import { fontSize12, fontSize14, fontSize16, largeFont } from '../../../utils/helper/responsiveSizes'
import { CustomText } from '../../../common/components';
import { colors, sizes } from '../../../common/constants/theme';
import { actionsTypes } from '../../../common/constants/variables'
const PublicCoursesProfileItem = ({ item, actions, itemLayout }) => {
    let fontSize = largeFont
    const [currentFont, setCurrentFont] = useState(fontSize);
    const dispatch = useDispatch();
    // let style = actions.type == 'user-view' ? styles.imageUserMode : styles.image;
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => onPress(actions, dispatch)} style={
            {
                width: wp(37),
                height: wp(37),
                borderWidth: 0,
                padding: wp(3),
                backgroundColor: colors.componentWhite, borderRadius: sizes.globalRadius
            }
        } >
            <View style={{}}>
                <CustomText numberOfLines={1} style={{ fontSize: fontSize12 }}>دوره {item.level}</CustomText>
                <CustomText bold numberOfLines={1} style={{ fontSize: item.title.length > 14 ? fontSize12 : fontSize14 }}>{item.title}</CustomText>
            </View>

            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', top: 3 }}>
                <View style={{ borderRadius: wp(10), backgroundColor: colors.componentWhite }}>
                    <Progress.Circle
                        
                        size={wp(20)}
                        thickness={wp(1)}
                        color={colors.progress}
                        unfilledColor={colors.componentWhite}
                        borderWidth={0}
                        // fill={white}
                        progress={item.progress_percentage ? item.progress_percentage / 100 : 0}
                        // progress={0.0} 
                        />
                </View>

                < View style = {
                    {
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: wp(17),
                        height: wp(17),
                        borderRadius:wp(8.5),
                        backgroundColor:colors.componentsDarkBlue
                    }
                } >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CustomText bold style={{ fontSize: fontSize16,color:colors.textWhite }}>{item.progress_percentage}</CustomText>
                            <CustomText style={{ fontSize: fontSize16, top: 4,color:colors.textWhite }}>{' '}%</CustomText>
                        </View>

                    </View>
                </View>

            </View>

            {/* 
                <View>
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginTop: hp(1) }}>
                        <CustomText style={{ fontSize: fontSize12 }}>{item.progress_percentage + ' %'} </CustomText>
                    </View>
                    <Progress.Bar
                        width={wp(22)}
                        height={wp(3)}
                        borderRadius={8}
                        color={colors.progressInvert}
                        unfilledColor={colors.progress}
                        borderWidth={0}
                        // fill={white}
                        // progress={1 - (item.progress_percentage/100)}
                        progress={1 - (item.progress_percentage / 100)}

                    />
                </View> */}


        </TouchableOpacity>


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

export { PublicCoursesProfileItem }