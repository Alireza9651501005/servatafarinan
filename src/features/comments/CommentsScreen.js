import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    BackHandler
} from 'react-native'
import { CustomPending, CommentsList} from '../../common/components'
import { theme, strings } from '../../common/constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { changeCommentsPageNum, changeCommentText, changeCommentVisible, getComments, saveSelectedComment, sendComment } from './actions/commentsAction';
import { baseUrl, baseUrlReal, lessonCommentsApi, sendCommentApi } from '../../utils/api/Url';
import CommentInput from './components/CommentInput';

class CommentsScreen extends Component {

    // constructor(props){
    //     this._pasEditUnmountFunction = this.handleBackButton.bind(this)
    // }

    _pasEditUnmountFunction = this.handleBackButton.bind(this)


    state = {
        buttonAction: '',
        reply: ''
    }

    componentDidMount() {
        this.props.changeCommentsPageNum(1)
        this.getListData()
        BackHandler.addEventListener('hardwareBackPress', this._pasEditUnmountFunction)
    }

    getListData() {
        const { pageNum, getComments, changeCommentsPageNum, lessonId } = this.props;
    // //console.log('comments lesson id props==>',lessonId)

        const url = lessonCommentsApi+lessonId+'/comments'
        getComments('get', url, 1, [])
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._pasEditUnmountFunction)
        // this.props.changeCommentsPageNum(1)
    }

    handleBackButton() {
        if (this.props.showReply) { 
            this.props.changeCommentVisible(false)
            return true
        }else{
            return false
        }
    }


    sendNewComment(message) {
        // const { selectedIndex, selectedComment, sendComment, lessonId, listData } = this.props;
        let url = sendCommentApi + this.props.lessonId + '/comment'
        this.props.sendComment(url, message, this.props.listData, this.props.selectedComment, this.props.selectedIndex)
    }

    render() {
        const { failed, pending, contents, pageNum, listLoading, listData, lessonId, buttonAction, saveSelectedComment, showReply } = this.props;
        return (

            <View style={styles.container}>
                {failed == true || pending == true ?
                    <CustomPending
                        style={styles.pending}
                        pending={pending}
                        retryAction={() => console.log('retry')} /> :
                    <CommentsList
                        onPullDown={
                            () => this.getListData()
                        }
                        onEndFunc={
                            () => this.onEndFunction()
                        }
                        headerComponent={this.props.headerComponent}
                        pageNum={pageNum}
                        listLoading={listLoading}
                        listData={listData}
                        data={contents}
                        lessonId={lessonId}
                    />
                }


                {showReply ?
                    <CommentInput
                        sendComment={this.sendNewComment.bind(this)}
                    />
                    : null}
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth: 5
    },
    button: {
        marginRight: wp(5.5)
    },
    buttonView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: theme.sizes.verticalMargin10
    },
    pending: {
        position: 'relative',
        marginTop: hp(34)
    }
})

const mapStateToProps = (state) => ({
    pending: state.commentsReducer.loading,
    failed: state.commentsReducer.error,
    contents: state.commentsReducer.commentsData,
    pageNum: state.commentsReducer.pageNum,
    listLoading: state.commentsReducer.listLoading,
    listData: state.commentsReducer.listData,
    sendLoading: state.commentsReducer.sendLoading,
    reply: state.commentsReducer.reply,
    selectedComment: state.commentsReducer.selectedComment,
    selectedIndex: state.commentsReducer.selectedIndex,
    showReply: state.commentsReducer.showReply
})

const mapDispatchToProps = {
    getComments,
    changeCommentsPageNum,
    sendComment,
    saveSelectedComment,
    changeCommentText,
    changeCommentVisible
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen)