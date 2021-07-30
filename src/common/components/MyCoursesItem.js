import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../constants'
import { CustomText } from '.'
import * as NavigationService from "../../utils/NavigationService";
import CustomeImage from "./CustomeImage";
import { changeCurrentCourse } from '../../store/globalActions';
import { useDispatch, useSelector } from "react-redux";
import { font12, font14, font16, largeFont, smallFont } from '../../utils/helper/responsiveSizes'
import { createNativeWrapper } from 'react-native-gesture-handler'
import { actionsTypes } from '../constants/variables'
const MyCoursesItem = ({ item, actions, itemLayout }) => {
    let fontSize = largeFont
    const [currentFont, setCurrentFont] = useState(fontSize);
    const dispatch = useDispatch();
    // let style = actions.type == 'user-view' ? styles.imageUserMode : styles.image;
    // //console.log('IssueListItem', item)
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => onPress(actions, dispatch)} style={[styles.container, { backgroundColor: item.item.color }]}>
            < View style={styles.imageWrapper} >
                <Image
                    style={styles.image}
                    source={{ uri: item.item.image }} />
            </View>

            <View style={{ paddingRight: wp(5), paddingLeft: wp(5) }}>
                <CustomText style={{ marginRight: wp(2), color: theme.colors.white, fontSize: font12 }}>{item.item.level}</CustomText>

                <View style={{ height: hp(6), justifyContent: 'center', top: -6 }}>
                    <CustomText
                        bold
                        style={[styles.text, { fontSize: item.item.title.length < 14 ? largeFont : font14 }]}
                        numberOfLines={1} >
                        {item.item.title}
                    </CustomText>

                </View>
            </View>

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
            testFunc
        })
    );
    NavigationService.push(navigation[actions.type], actions)
}
const styles = StyleSheet.create({
    container: {
        width: wp(47),
        // minHeight: wp(47),
        borderRadius: wp(5),
        backgroundColor: theme.colors.white,
        // elevation: 2,
        // borderWidth: 1,
        overflow: 'hidden'
    },
    image: {
        width: wp(35),
        height: wp(27),
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
        paddingTop: wp(3),
        // borderBottomWidth: 0.5,
        // borderColor: theme.colors.white,
        width: wp(37),
        alignSelf: 'center'
    }
})

export { MyCoursesItem }