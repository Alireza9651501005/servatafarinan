import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { CustomText, ListItem, CustomTouchableText } from '.'
import { theme } from '../constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as NavigationService from '../../utils/NavigationService';
import { LessonItem } from './LessonItem';
import { font16, fontSize16, fontSize14 } from '../../utils/helper/responsiveSizes';
import { lessonSessionColor } from '../../utils/helper/commonVariables';

const ChaptersList = ({ data, btnTitle, title, itemLayout, buttonAction }) => {
    // //console.log('ChaptersList',data)
    const onPress = (buttonAction) => () => {
        // NavigationService.push(navigation[buttonAction.type], buttonAction)  
    }
    return (
        <View style={styles.container}>
            <View style={styles.textBox}>
                <CustomTouchableText
                    // onPress={onPress(buttonAction)} 
                    text={''} />
                <CustomText style={{ fontSize: fontSize14, color: lessonSessionColor }}>
                    {data.title}
                </CustomText>
            </View>
            {/* <View style={styles.line} /> */}
            <View style={{}}>
            <FlatList
                data={data.lessons}
                scrollEnabled={false}
                // horizontal
                // inverted
                // style={{borderWidth:1}}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item, index }) =>
                    <View style={styles.item}>
                        <LessonItem item={item} />
                    </View>
                    // <View style={[index == data.lessons.length - 1 ?  styles.lastItem : styles.item]}>
                    //     <LessonItem item={item}/>
                    // </View>
                }
            />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // marginTop :theme.sizes.verticalMargin10,
        borderWidth: 0,
        // height:hp(100),
        flex:1,
    },
    line: {
        marginHorizontal: theme.sizes.horizontalMargin15,
        height: hp(0.3),
        marginTop: hp(0.6),
        marginBottom: theme.sizes.verticalMargin10,
        backgroundColor: theme.colors.primary
    },
    textBox: {
        marginHorizontal: theme.sizes.horizontalMargin15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 0,
        width: wp(86.6),
        marginBottom: hp(2)

    },
    item: {
        borderWidth:0,
        alignSelf:"center",
        width: wp(86.6),
        height: hp(9),
        marginBottom:hp(3)
        // paddingBottom: theme.sizes.verticalMargin10,
        // paddingRight: theme.sizes.horizontalMargin15,
    },
    lastItem: {
        paddingBottom: theme.sizes.verticalMargin10,
        paddingHorizontal: theme.sizes.horizontalMargin15,
    }
})
export { ChaptersList }