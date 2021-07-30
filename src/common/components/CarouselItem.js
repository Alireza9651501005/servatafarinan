import React from 'react'
import { useDispatch } from 'react-redux'
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native'
import { theme } from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CustomeImage from './CustomeImage';
import * as NavigationService from '../../utils/NavigationService'
import { changeCurrentCourse } from '../../store/globalActions'
import { actionsTypes } from '../constants/variables'

const navigation = actionsTypes
const CarouselItem = ({ item, height, color, full, v_padding,h_padding, image, borderRadius }) => {
    let borderRadiusCondition = borderRadius ? { borderBottomLeftRadius: hp(2), borderBottomRightRadius: hp(2) } : null
    const dispatch = useDispatch();
    const testFunc = () => {
        return null;
    };
    const onPress = () => {
        let courseActionData = item.action
        // //console.log(actions)
        // alert()
        dispatch(
            changeCurrentCourse({
                courseActionData,
                testFunc,
                testFunc
            })
        )
        setTimeout(() => {
            NavigationService.push(navigation[item.action.type], item.action)

        }, 10);
    }
    let mwidth= h_padding? wp(100)-(h_padding*2):wp(100)
    // //console.log(mwidth,h_padding)
    return (
        < View style={[styles.container, borderRadiusCondition, { backgroundColor: color, width: full ? wp(100) : wp(90), alignSelf: 'center', borderRadius: full ? 0 : wp(3) }]} >
            <TouchableOpacity style={full?{marginTop:v_padding,marginBottom:v_padding,marginRight:h_padding,marginLeft:h_padding}:{}} activeOpacity={1} onPress={onPress}>
                <CustomeImage
                    style={[{ height: height, borderRadius: full ? 0 : wp(3), resizeMode: full ? 'contain' : 'cover' }, styles.image,full?{width:mwidth}:{} ]}
                    // source={{uri : item.uri}}
                    source={{ uri: image }}
                />
            </TouchableOpacity>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        width: theme.sizes.width,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        borderWidth: 0,
    },
    image: {
        width: wp(90),
        // borderRadius: wp(3),
        alignSelf: 'center',
        // resizeMode:'contain'
    },
})

export { CarouselItem }