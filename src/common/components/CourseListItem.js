import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../constants'
import { CustomText } from '.'
import * as NavigationService from "../../utils/NavigationService";
import CustomeImage from "./CustomeImage";
import { changeCurrentCourse } from '../../store/globalActions';
import { useDispatch, useSelector } from "react-redux";
import { font10, font12, font14, font16, fontSize10, fontSize12, fontSize14, fontSize16, largeFont, smallFont } from '../../utils/helper/responsiveSizes'
import { createNativeWrapper } from 'react-native-gesture-handler'
import { priceSeparator } from '../../utils/helper/functions'
import { actionsTypes } from '../constants/variables'
const CourseListItem = ({ item, actions, itemLayout }) => {
    let fontSize = largeFont
    const [currentFont, setCurrentFont] = useState(fontSize);
    const dispatch = useDispatch();
    let style = itemLayout == 'user' ? styles.imageUserMode : styles.image;
    // let style = actions.type == 'user-view' ? styles.imageUserMode : styles.image;
    // //console.log('IssueListItem', item)
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => onPress(actions, dispatch)} style={[styles.container, { backgroundColor: item.item.color }]}>
            < View style={styles.imageWrapper} >
                <Image
                    style={style}
                    source={{ uri: item.item.image }} />
            </View>
            {/* <View style={{width:wp(50),alignSelf:'center',opacity:0.4,height:0.8,backgroundColor:theme.colors.white}}/> */}
            <View style={{ paddingRight: wp(5), paddingLeft: wp(5) }}>

                <View style={{ marginTop: hp(1) }}>
                    <CustomText style={{ color: theme.colors.white, fontSize: fontSize12 }}>{item.item.level}</CustomText>
                    <View style={{ height: hp(6), justifyContent: 'center', top: -6 }}>
                        <CustomText
                            // onTextLayout={(e) => {
                            //     const { lines } = e.nativeEvent;
                            //     // //console.log('text----',e)
                            //     if (lines.length > 1) {
                            //         setCurrentFont(currentFont - 1);
                            //     }
                            // }}
                            bold
                            style={[styles.text, { fontSize: item.item.title.length < 14 ? largeFont : fontSize14 }]}
                            numberOfLines={1} >
                            {item.item.title}
                        </CustomText>
                    </View>
                </View>
                <View style={{ top: -10 }}>
                    <CustomText numberOfLines={2} light style={{ fontSize: fontSize12, color: theme.colors.white }}>{item.item.short_description}</CustomText>
                </View>
            </View>
            {/* 
            <View style={{ flex: 1 }} /> */}

            <View style={{ backgroundColor: theme.colors.white, flexDirection: "row-reverse", paddingRight: wp(5), paddingLeft: wp(5), paddingBottom: 5, paddingTop: 5 }}>
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/time.png')}
                            style={{ width: wp(4), height: wp(4), resizeMode: 'contain', marginLeft: wp(0.5) }}
                        />
                        <CustomText style={{ fontSize: fontSize12 }}>{item.item.total_hours}</CustomText>
                    </View>

                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/level.png')}
                            style={{ width: wp(4), height: wp(4), resizeMode: 'contain', marginLeft: wp(0.5) }}
                        />
                        <CustomText style={{ fontSize: fontSize12 }}>{item.item.level}</CustomText>
                    </View>

                </View>

                <View style={{ justifyContent: 'space-around', paddingBottom: item.item.price ? 5 : 0, height: hp(8) }}>
                    <View style={{ height: item.item.price ? hp(5) : hp(4) }}>
                        {item.item.last_price ? <CustomText style={styles.lastPrice}>{priceSeparator(item.item.last_price)}</CustomText> : null}
                        <CustomText
                            style={{ color: theme.colors.priceColor, fontSize: fontSize16, textAlign: 'left', top: item.item.last_price ? -10 : 0 }}
                        >{item.item.price ? priceSeparator(item.item.price) : ''}</CustomText>

                    </View>
                    {item.item.owned ?
                        <CustomText style={{ color: theme.colors.green, fontSize: fontSize14, textAlign: 'left' }}>
                            {'خریداری شده'}
                        </CustomText>
                        :
                        <CustomText style={{ color: theme.colors.green, fontSize: item.item.price ? fontSize10 : fontSize16, textAlign: 'left' }}>
                            {item.item.price ? 'تومان' : 'رایگان'}
                        </CustomText>
                    }   
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
        width: wp(55),
        // minHeight: hp(50), 
        borderRadius: wp(5),
        backgroundColor: theme.colors.white,
        // elevation: 2,
        // borderWidth: 1,
        overflow: 'hidden'
    },
    image: {
        width: wp(45),
        height: hp(20),
        resizeMode: 'contain'
    },
    imageWrapper: {
        alignItems: 'center',
        paddingTop: wp(3),
        // borderBottomWidth: 0.5,
        // borderColor: theme.colors.white,
        width: wp(49),
        alignSelf: 'center'
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
    lastPrice: {
        color: theme.colors.priceColor,
        fontSize: fontSize12,
        textAlign: 'left',
        marginLeft: 10,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    }
})

export { CourseListItem }