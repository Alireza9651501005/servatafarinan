import React from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { CustomText, ListItem, CustomTouchableText } from '.'
import { theme } from '../constants'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import * as NavigationService from '../../utils/NavigationService'
import { GeneralListItem } from './GeneralListItem'
import { actionsTypes } from '../constants/variables'

const navigation = actionsTypes

const ListFooter = ({loading}) => {
    if(loading){
        return(
            <View style={{height:20,width:'100%'}}>
                <ActivityIndicator color={'#00b'}/>
            </View>
        )
    }else{
        return(
            <View></View>
        )
    }
}
const GeneralList = (props) => {
    // //console.log('my general list data',props)
    // //console.log('my general list data',props.buttonAction.item_layout )
    // //console.log('--------->',props)  
    const onPress = (buttonAction) => () => {
        // //console.log()
        // NavigationService.push(navigation[buttonAction.type], buttonAction)  
    }
    const {listLoading} = props;

    return (
        <View style={styles.container}>

            <FlatList
                refreshControl={props.onPullDown?
                    <RefreshControl
                        refreshing={false}
                        onRefresh={()=>props.onPullDown()}
                    />
                    :null
                }
                style={{ paddingTop: hp(2)}}
                contentContainerStyle={{paddingBottom:hp(12)}}
                data={props.listData}
                keyExtractor={(_, i) => i.toString()}
                renderItem={item =>
                    // <View style={item.index == props.data.length - 1 ? styles.lastItem : styles.item}>
                    <GeneralListItem  item={item} itemLayout={props.buttonAction.item_layout } />
                    // </View>
                }
                ListFooterComponent={()=><ListFooter loading={listLoading}/>}
                onEndReached={props.onEndFunc}
                onEndReachedThreshold={0.1}
                // maxToRenderPerBatch={3}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: theme.sizes.verticalMargin10,
        // borderWidth:1
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
        paddingRight: theme.sizes.horizontalMargin15
    },
    lastItem: {
        paddingBottom: theme.sizes.verticalMargin10,
        paddingHorizontal: theme.sizes.horizontalMargin15
    }
})
export { GeneralList }