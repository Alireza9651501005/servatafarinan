import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { CustomText, ListItem, CustomTouchableText } from '.'
import { theme } from '../constants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as NavigationService from '../../utils/NavigationService'
import { changeCurrentCourse, changeAppHeaderColor } from '../../store/globalActions';
import { useSelector, useDispatch } from "react-redux";
import { morePageHeaderColor } from '../../utils/helper/commonVariables'
import { actionsTypes } from '../constants/variables'
const navigation = actionsTypes;
const HorizontalList = ({ data, btnTitle, title, itemLayout, buttonAction }) => {
    const states = useSelector(state => state);
    let token = states.globalReducer.accessToken;
    //console.log('HorizontalList', data)
    const dispatch = useDispatch();
    const onPress = (buttonAction) => () => {
        dispatch(changeCurrentCourse(buttonAction))
        dispatch(changeCurrentCourse(buttonAction))
        dispatch(changeAppHeaderColor(morePageHeaderColor));
        NavigationService.push(navigation[buttonAction.type], buttonAction)
    }
    return (
        <View style={styles.container}>
            <View style={[styles.textBox, { marginTop: token && itemLayout == 'course' ? hp(7) : hp(2) }]}>
                <CustomTouchableText
                    onPress={onPress(buttonAction)}
                    text={btnTitle} />
                <CustomText
                    fontSize={theme.fontSize.font14}
                    textColor={theme.colors.gray2}>
                    {title}
                </CustomText>
            </View>
            <View style={styles.line} />
            <FlatList
                data={data}
                horizontal
                inverted
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, i) => i.toString()}
                renderItem={item =>
                    <View style={item.index == data.length - 1 ? styles.lastItem : styles.item}>
                        <ListItem item={item} itemLayout={itemLayout} />
                    </View>
                }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // marginTop: theme.sizes.verticalMargin10,
        // borderWidth:1
    },
    line: {
        marginHorizontal: theme.sizes.horizontalMargin15,
        height: hp(0.3),
        marginTop: hp(0.6),
        marginBottom: theme.sizes.verticalMargin10,
        // backgroundColor: theme.colors.primary
    },
    textBox: {
        marginHorizontal: wp(5),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    item: {
        paddingBottom: hp(3),
        paddingRight: wp(5),
    },
    lastItem: {
        paddingBottom: hp(3),
        paddingHorizontal: wp(5)
    }
})
export { HorizontalList }