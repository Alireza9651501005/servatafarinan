import React from 'react'
import { StyleSheet, View, Text, FlatList, Image } from 'react-native'
import { CustomText, ListItem, CustomTouchableText ,LeaderBoardItem } from '.'
import { theme } from '../constants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as NavigationService from '../../utils/NavigationService'
import { actionsTypes } from '../constants/variables'

const navigation = actionsTypes

const LeaderboardList = ({ data, type, title, itemLayout, buttonAction }) => {
    const onPress = (buttonAction) => () => {
        NavigationService.navigate('LeaderboardDetail', {type:type})  
    }
    return (
        <View style={styles.container}>
            <View style={styles.textBox}>
                <CustomTouchableText
                    onPress={onPress(buttonAction)}
                    text={'بیشتر'} />
                <CustomText
                    fontSize={theme.fontSize.font14}
                    textColor={theme.colors.gray2}>
                    {data.title}
                </CustomText>
            </View>
            <View style={styles.line} />
            <FlatList
                data={data.items}
                // horizontal
                // inverted
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item, index }) => <LeaderBoardItem item={item} index={index} />}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: theme.sizes.verticalMargin10,
        // backgroundColor:theme.colors.gra
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

    },
    item: {
        paddingBottom: theme.sizes.verticalMargin10,
        paddingRight: theme.sizes.horizontalMargin15,
    },
    lastItem: {
        paddingBottom: theme.sizes.verticalMargin10,
        paddingHorizontal: theme.sizes.horizontalMargin15
    }
})
export { LeaderboardList }