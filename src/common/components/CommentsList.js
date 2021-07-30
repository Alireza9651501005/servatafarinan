import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { theme } from '../constants'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import NavigationService from '../../utils/NavigationService'
import { LeaderBoardItem } from './LeaderboardItem'
import { CommentItem } from './CommentItem'
import { lessonCommentsApi } from '../../utils/api/Url'
import { getComments } from '../../features/comments/actions/commentsAction'
import ListEmptyComponent from '../../features/comments/components/ListEmptyComponent'


const ListFooter = ({ loading }) => {
    if (loading) {
        return (
            <View style={{ height: 20, width: '100%' }}>
                <ActivityIndicator color={'#00b'} />
            </View>
        )
    } else {
        return (
            <View></View>
        )
    }
}


const CommentsList = (props) => {
    const dispatch = useDispatch()
    const states = useSelector(state => state)
    const { listLoading, headerComponent } = props
    let contents = states.commentsReducer.commentsData
    let pageNum = states.commentsReducer.pageNum
    let listData = states.commentsReducer.listData
    // //console.log('comments props==>',props.lessonId , props.sub ,props)
    const onEndFunction = () => {
        // //console.log('en reach',listData,pageNum)
        const url = lessonCommentsApi + props.lessonId + '/comments'
        if (pageNum <= contents.last_page) {
            dispatch(getComments('get', url, pageNum, listData))
        }
    }
    return (
        <View style={styles.container}>

            <FlatList
                ListEmptyComponent={!props.sub ? () => <ListEmptyComponent /> : null}
                scrollEnabled={props.sub}
                refreshControl={props.onPullDown ?
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => props.onPullDown()}
                    />
                    : null
                }
                style={{ paddingTop: hp(2) }}
                contentContainerStyle={{ paddingBottom: hp(2) }}
                data={props.listData}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item, index }) => <CommentItem sub={props.sub} item={item} index={index} />}
                ListFooterComponent={props.sub ? null : () => <ListFooter loading={listLoading} />}
                ListHeaderComponent={props.sub ? null : headerComponent}
                onEndReached={props.sub ? () => { console.log('no end method') } : () => onEndFunction()}
                onEndReachedThreshold={0.3}
            // maxToRenderPerBatch={3}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // height:300,
        // marginTop: theme.sizes.verticalMargin10,
        // borderWidth:5
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
export { CommentsList }