import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import * as Progress from 'react-native-progress';
import { theme } from "../../../common/constants";
import { CustomeButton, CustomPending, CustomText, RippleEffect } from "../../../common/components";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { appBAckgroundColor } from "../../../utils/helper/commonVariables";
import { courseStatusAction } from "../action/courseStatusAction";
import { courseStatus } from "../../../utils/api/Url";
import { colors, sizes, white } from "../../../common/constants/theme";
import { fontSize10, fontSize12, fontSize14, fontSize16, fontSize20, fontSizeXL } from "../../../utils/helper/responsiveSizes";
import { courseStartTxt, examButtonTxt, examDisableTxt, examEnableTxt, interactivePointsTxt, lastLessonSeenTxt, lastVisitTxt, learnedLessonsTxt, videoPointsTxt } from "../texts";
import LineProgress from "./LineProgress";
import CircularProgress from "./CircularProgress";
import * as NavigationService from '../../../utils/NavigationService';
import { useFocusEffect } from "@react-navigation/native";
import { changeActiveTab } from "../action/courseDetailAction";

export default function CourseStatus({ route, courseId }) {

  // let notifId = route.params.courseId;
  const states = useSelector(state => state);
  const dispatch = useDispatch();
  const [statusData, setStatusData] = useState({ loading: true, data: '' })
  let refreshPage = states.courseStatusReducer.refreshCourseStatus, idCourse, MainId;
  idCourse = states.courseDetailReducer.id;
  MainId = idCourse ? idCourse : courseId;
  // useEffect(() => {
  //   dispatch(changeActiveTab(3,null))
  // }, [])
  useFocusEffect(
    React.useCallback(() => {
      console.log(idCourse ? 'idCourse' + idCourse : 'courseId' + courseId)
      // alert(idCourse ? idCourse : courseId)
      let url = courseStatus + MainId + '/status';
      dispatch(courseStatusAction(url, apiHandle))
      return(()=>{
        // dispatch(changeActiveTab(2,null))
      })
    }, [])
  );
  // let loading = states.courseStatusReducer.loading
  // let statusData = states.courseStatusReducer.statusData


  const apiHandle = (value) => {
    if (value === 'pending') {
      setStatusData({ ...statusData, loading: true })
    }
    else if (value === 'error') {
      setStatusData({ ...statusData, loading: false })
    }
    else {
      setStatusData({ ...statusData, loading: false, data: value })
    }
  }

  const renderPageContent = () => {
    return (
      <View>
        < View style={styles.dateInfoWrapper} >

          < View style={styles.dateInfoView} >
            <CustomText style={{ fontSize: fontSize14, color: colors.textWhite, marginTop: 5 }}>{courseStartTxt}</CustomText>
            <CustomText style={{ fontSize: fontSize12, color: colors.textWhite }}>{statusData.data.course_start_time}</CustomText>
          </View>

          < View style={styles.dateInfoView} >
            <CustomText style={{ fontSize: fontSize14, color: colors.textWhite, marginTop: 5 }}>{lastVisitTxt}</CustomText>
            <CustomText style={{ fontSize: fontSize12, color: colors.textWhite }}>{statusData.data.course_last_activity_time}</CustomText>
          </View>

        </View>

        {/* line progress */}
        < View style={
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: sizes.globalMargin,
            paddingRight: sizes.globalMargin,
            marginTop: 21
          }
        } >
          <View style={{ alignItems: 'center' }}>
            <CircularProgress
              title={learnedLessonsTxt}
              percent={statusData.data.progress_percentage}
              totalCount={statusData.data.course_lessons_count}
              doneCount={statusData.data.user_done_lessons_count}
            />
          </View>
          <View style={{ justifyContent: 'space-between' }}>
            <LineProgress
              percent={88}
              title={interactivePointsTxt}
              fromCount={statusData.data.total_user_interactive_scores}
              toCount={statusData.data.total_course_interactive_scores}
            />

            <LineProgress
              percent={88}
              title={videoPointsTxt}
              fromCount={statusData.data.total_user_video_scores}
              toCount={statusData.data.total_course_video_scores}
            />
          </View>

        </View>

        <View style={{
          marginLeft: sizes.globalMargin,
          marginRight: sizes.globalMargin, marginTop: hp(3)
        }}>
          <CustomText>{lastLessonSeenTxt}</CustomText>
          < RippleEffect
            onPress={() => {
              NavigationService.navigate('LessonScreen', { item: { id: statusData.data.last_lesson.lesson_id, title: statusData.data.last_lesson.lesson_title } })
            }}
            style={
              {

                backgroundColor: colors.componentLightBlue,
                borderRadius: sizes.globalRadius,
                alignItems: 'center',
                justifyContent: 'center',
                padding: wp(2)
              }
            } >
            {statusData.data ?
              <CustomText style={{ color: colors.textWhite }}>{statusData.data.last_lesson.chapter_title} / {statusData.data.last_lesson.lesson_title}</CustomText>
              :
              <CustomText>...</CustomText>
            }
          </RippleEffect>
        </View>

        <View style={{
          flex: 1,
          justifyContent: 'space-between',
          marginLeft: sizes.globalMargin,
          marginRight: sizes.globalMargin, marginTop: hp(3),
          flexDirection: 'row-reverse',
          alignItems: 'center'
        }}>
          <CustomText numberOfLines={2} style={{ width: wp(50) }}>{statusData.data ? statusData.data.exam.active ? examEnableTxt : examDisableTxt : ''}</CustomText>
          <CustomeButton
            backgroundColor={colors.buttonGreen}
            onPress={() => {
              NavigationService.navigate('IntractiveScreen', { exam: statusData.data.exam.action, id: courseId })
            }}
            btnStyle={{ marginTop: 0, marginBottom: 0 }}
            disable={statusData.data ? !statusData.data.exam.active : false}>{statusData.data.exam ? statusData.data.exam.title : null}</CustomeButton>
        </View>

        <View style={{ height: hp(10) }} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, minHeight: hp(40), alignItems: "center", backgroundColor: theme.colors.background }}>
      {/* <CustomText>{JSON.stringify(statusData)}</CustomText> */}
      {!statusData.loading ?
        renderPageContent()
        :
        <CustomPending
          style={styles.pending}
          pending={statusData.loading}
        //   retryAction={() => dispatch(getCourseDetail(method, url))}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  pending: {
    position: "relative",
    marginTop: hp(7)
  },
  dateInfoWrapper: {
    flexDirection: 'row-reverse',
    paddingRight: sizes.globalMargin,
    paddingLeft: sizes.globalMargin,
    width: wp(100),
    justifyContent: 'space-between',
    marginTop: hp(2)
  },
  dateInfoView: {
    alignItems: 'center',
    backgroundColor: colors.componentLightBlue,
    alignItems: 'center',
    borderRadius: sizes.globalRadius,
    width: wp(40)
  }
})
