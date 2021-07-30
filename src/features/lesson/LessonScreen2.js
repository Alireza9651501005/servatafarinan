import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector ,connect } from "react-redux";
import { View, StyleSheet, ScrollView, Text, Pressable, Linking, Image } from "react-native";
import {
    ParentViewActionBar,
    ContentList,
    GradientImageButton,
    CustomPending,
    CustomText,
    MediumButtonWhite, RippleEffect, CustomTextInput
} from "../../common/components";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
    CustomCarousel,
} from "../../common/components";

import { headerTxt } from "./texts";
import { theme } from "../../common/constants";
import { getLesson, likeLesson } from './actions/lessonAction';
import { getLessonData } from "../../utils/api/Url";
import CommentsScreen from "../comments/CommentsScreen";
import { changeCommentVisible, saveSelectedComment } from "../comments/actions/commentsAction";
import LessonButton from "./components/LessonButton";
import { sizes } from "../../common/constants/theme";
import { fontSize12 } from "../../utils/helper/responsiveSizes";
import LikeButton from "./components/LikeButton";


class LessonScreen extends React.Component {

    // const CourseId = route.params.item.id;

    // const [lessonData, setLessonData] = useState({ loading: false, data: { images: [], title: route.params.item.title } })
    // const [likeLessonData, setLikeLesson] = useState({ isLike: false, likes: 0 })

    state = {
        lessonData:{
            loadig:false,
            data: { images: [], title: route.params.item.title }
        },
        likeLessonData:{
            isLike:false,
            likes:0
        }
    }

    setShowReply = (value) => {
        this.props.changeCommentVisible(value)
    }

    setLessonData = (value) => {
        this.setState({lessonData:value})
    }

    setLikeLesson = (value) => {
        this.setState({likeLessonData:value})
    }       

    componentDidMount(){
        this.callLessonData()
        this.setState({CourseId:this.props.route.params.item.id})
    }

    callLessonData = () => {
        let url =  getLessonData + route.params.item.id
        this.props.getLesson(url,this.apiHandle)
    }
    
    apiHandle = (value) => {
        let lessonData = this.state.lessonData


        if (value === 'pending') {
            this.setLessonData({ ...lessonData, loading: true })
        }
        else if (value === 'error') {
            this.setLessonData({ ...lessonData, loading: false })
        }
        else {
            this.setLessonData({ ...lessonData, loading: false, data: value, CourseId: this.state.CourseId })
            this.setLikeLesson({ isLike: value.user_liked_lesson, likes: value.likes })
        }
    }


    renderPageContent = () => {
        let interactive = this.state.lessonData.data.interactive
        let video = this.state.lessonData.data.video
        return (
            <View
                style={{ flex: 1 }}
            >

                <View style={{ flexDirection: 'row', paddingRight: sizes.globalMargin, paddingLeft: sizes.globalMargin, justifyContent: 'space-around' }}>
                    {interactive ? <LessonButton
                        onPress={() => { navigation.navigate('IntractiveScreen', this.state.lessonData) }}
                        title={interactive.button_title}
                        myScore={interactive.user_score}
                        totalScore={interactive.score}
                        icon={require('../../assets/interactive/interactive.png')}
                        viewCount={interactive.subscribers}
                    /> : null}

                    {video ? <LessonButton
                        onPress={() =>
                            navigation.navigate('VideoScreen', { url: getLessonData + route.params.item.id, videoData: this.state.lessonData.data.video })
                        }
                        title={video.button_title}
                        myScore={video.user_score}
                        totalScore={video.score}
                        icon={require('../../assets/video/online-video.png')}
                        viewCount={video.subscribers}
                    /> : null}

                </View>

                <View style={{ flexDirection: 'row', padding: sizes.globalMargin }}>
                    <LikeButton
                        isLike={this.state.likeLessonData.isLike}
                        likes={this.state.likeLessonData.likes}
                        lessonId={this.props.route.params.item.id}
                    />

                    <RippleEffect onPress={() => {
                        this.setShowReply(true)
                        this.props.saveSelectedComment(false, false)
                    }}
                        style={{}}>
                        <Image
                            source={require('../../assets/comment/comment.png')}
                            style={{ width: wp(5), height: wp(5), resizeMode: 'contain' }}
                        />
                    </RippleEffect>
                </View>


            </View>
        );
    };


    render() {
        return (
            <ParentViewActionBar
                // scroll

                navigation={navigation}
                title={this.state.lessonData.data.title}
                back
            >
                {this.state.lessonData.loading == true ? (
                    <CustomPending
                        style={styles.pending}
                        pending={this.state.lessonData.loading}
                        // pending={false}

                        retryAction={() => this.callLessonData()}
                    />
                ) : (
                        <View style={{ flex: 1 }}>
                            <CommentsScreen
                                showReply={this.props.showReply}
                                setShowReply={this.setShowReply}
                                headerComponent={this.renderPageContent}
                                lessonId={this.props.route.params.item.id} />
                        </View>
                    )
                }

            </ParentViewActionBar>
        )
    }
}

const mapStateToProps = (state) => ({
    showReply: state.commentsReducer.showReply

})

export default connect(mapStateToProps,{saveSelectedComment,changeCommentVisible,getLesson})(LessonScreen)