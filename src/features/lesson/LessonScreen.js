import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
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
import { getLessonData, sendVideoRecordsApi } from "../../utils/api/Url";
import CommentsScreen from "../comments/CommentsScreen";
import { changeCommentVisible, saveSelectedComment } from "../comments/actions/commentsAction";
import LessonButton from "./components/LessonButton";
import { sizes } from "../../common/constants/theme";
import { fontSize12 } from "../../utils/helper/responsiveSizes";
import LikeButton from "./components/LikeButton";
import { sendVideoRecords } from "../video/actions/videoAction";
import LessonTopButtons from "./components/LessonTopButtons";

export default function LessonScreen({ route, navigation }) {
    console.log(route.params.item)
    console.log('LessonScreen', route.params)
    let CourseId, courseTitle;
    if (route.params.item) {
        CourseId = route.params.item.id;
        courseTitle = route.params.item.title
    } else {
        console.log('oute.params.', route.params.actions)
        CourseId = route.params.actions.id;
        courseTitle = route.params.actions.title;
    }
    const states = useSelector(state => state);
    let refreshPage = states.lessonReducer.refreshPage
    // let showReply = states.commentsReducer.showReply

    const dispatch = useDispatch()
    const setShowReply = (value) => {
        dispatch(changeCommentVisible(value))
    }

    const [lessonData, setLessonData] = useState({ loading: false, data: { images: [], title: courseTitle } })
    const [likeLessonData, setLikeLesson] = useState({ isLike: false, likes: 0 })
    const [buttonsData, setButtonsData] = useState({ interactive: false, video: false })

    useEffect(() => {
        callLessonData()
        // if (videoRecords.length > 0) {
        //     dispatch(sendVideoRecords(sendVideoRecordsApi, videoRecords,route.params.item.id,apiHandle ))
        // }
    }, [refreshPage]);

    const callLessonData = () => {
        let url = getLessonData + CourseId
        dispatch(getLesson(url, apiHandle))
    }

    const apiHandle = (value) => {
        if (value === 'pending') {
            setLessonData({ ...lessonData, loading: true })
        }
        else if (value === 'error') {
            setLessonData({ ...lessonData, loading: false })
        }
        else {
            setLessonData({ ...lessonData, loading: false, data: value, CourseId: CourseId })
            setLikeLesson({ isLike: value.user_liked_lesson, likes: value.likes })
            setButtonsData({ interactive: value.interactive, video: value.video })
        }
    }



    const renderPageContent = () => {
        let interactive = buttonsData.interactive
        let video = buttonsData.video
        // //console.log('=======', likeLessonData)
        return (
            <View
                style={{ flex: 1 }}
            >

                <LessonTopButtons
                    route={route}
                    apiHandle={apiHandle}
                    lessonData={lessonData}
                    getLessonData={getLessonData}
                    navigation={navigation}
                    video={video}
                    interactive={interactive} />

                <View style={{ flexDirection: 'row', padding: sizes.globalMargin }}>
                    <LikeButton
                        isLike={likeLessonData.isLike}
                        likes={likeLessonData.likes}
                        lessonId={CourseId}
                    />

                    <RippleEffect onPress={() => {
                        setShowReply(true)
                        dispatch(saveSelectedComment(false, false))
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


    return (
        <ParentViewActionBar
            titleColor={theme.colors.headerTitleColor}
            // scroll
            navigation={navigation}
            title={lessonData.data.title}
            back
        >
            {lessonData.loading == true ? (
                <CustomPending
                    style={styles.pending}
                    pending={lessonData.loading}
                    // pending={false}

                    retryAction={() => callLessonData()}
                />
            ) : (
                    <View style={{ flex: 1 }}>
                        <CommentsScreen
                            // showReply={showReply}
                            setShowReply={setShowReply}
                            headerComponent={renderPageContent}
                            lessonId={CourseId} />
                    </View>
                )
            }

        </ParentViewActionBar>
    );
}


const styles = StyleSheet.create({
    button: {
        marginRight: wp(5.5)
    },
    buttonView: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: theme.sizes.verticalMargin10
    },
    pending: {
        position: "relative",
        marginTop: hp(34)
    },
    titleAndBuyBtnVuStyle: {
        borderWidth: 1,
        width: wp(90),
        height: hp(10),
        borderWidth: 0,
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    courseDescriptionVuStyle: {
        borderWidth: 1,
        width: wp(90),
        // maxHeight: hp(40),
        borderWidth: 0,
        alignSelf: "center"
        // marginBottom:hp(10)
    }
});
