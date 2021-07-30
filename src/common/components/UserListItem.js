import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../constants'
import { CustomText } from '.'
import * as NavigationService from "../../utils/NavigationService";
import CustomeImage from "./CustomeImage";
import { changeCurrentCourse,changeAppHeaderColor } from '../../store/globalActions';
import { useDispatch, useSelector } from "react-redux";
import { actionsTypes } from '../constants/variables'
const UserListItem = ({ item, actions,itemLayout }) => {
    const dispatch = useDispatch();
    let style = itemLayout == 'user' ? styles.imageUserMode : styles.image;
    // let style = actions.type == 'user-view' ? styles.imageUserMode : styles.image;
    // //console.log('IssueListItem', item)
    return <TouchableOpacity activeOpacity={0.6} onPress={() => onPress(actions, dispatch)} style={styles.container}>
        <Image
            style={style}
            source={{ uri: item.item.image }} />
        {/* {actions.type=='user-view'? */}
        <CustomText
            style={styles.text}
            numberOfLines={1}
            fontFamily={'Segoe'}
            fontSize={theme.fontSize.font14}
            textColor={theme.colors.gray2} >
            {item.item.title}
        </CustomText>

    </TouchableOpacity>
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
// dispatch(changeAppHeaderColor(courseDetailHeaderColor))
    NavigationService.push(navigation[actions.type], actions)
}
const styles = StyleSheet.create({
    container: {
        width: wp(26.3),
        // height: hp(25),
        borderRadius: wp(3),
        backgroundColor: theme.colors.white,
        // elevation: 2,
        // borderRadius:hp(2)
    },
    image: {
        width: wp(26.3),
        height: hp(21.8),
    },
    imageUserMode: {
        width: wp(26.3),
        height: wp(26.3),
        borderRadius: wp(26.3)
    },
    text: {
        padding: hp(0.5),
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',

    }
})

export { UserListItem }