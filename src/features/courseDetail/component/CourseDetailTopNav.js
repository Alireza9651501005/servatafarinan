import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, DeviceEventEmitter } from "react-native";
// import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour'
import { useSelector, useDispatch } from 'react-redux'
import { MediumButtonWhite } from "../../../common/components/MediumButtonWhite";
import { MediumButton } from "../../../common/components/MediumButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { descriptionTabTxt, galleryTxt, lessonTxt, descriptionTxt, courseLessonGuidTitle, courseLessonGuidDescription, courseFilesGuidTitle, courseFilesGuidDescription, courseIntroGuidTitle, courseIntroGuidDescription, courseStatusGuidTitle, courseStatusGuidDescription } from "../texts";
import ChaptersScreen from "../../courseDetail/component/ChaptersScreen";
import DownloadsScreen from "../../courseDetail/component/DownloadsScreen";
import DescriptionScreen from "../../courseDetail/component/DescriptionScreen";
import CourseStatus from './CourseStatus';
import { CustomText } from '../../../common/components/CustomText'
import { font10, fontSize10, fontSize14, fontSize16 } from "../../../utils/helper/responsiveSizes";
import { iranSans, courseDetailHeaderColor, whiteSecond, appBAckgroundColor } from "../../../utils/helper/commonVariables";
import { RippleEffect } from "../../../common/components";
import CourseDetailTab from "./CourseDetailTab";
import { changeCourseAppTour } from "../../../store/globalActions";
export default function CourseDetailTopNav({ chaptersData, courseId, courseDescription, downloadListData, renderContentRows, navigation }) {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  let appTourTargets = [];
  let sequenceStepListener = null;
  let finishSequenceListener = null;
  let courseAppTour = state.globalReducer.courseAppTour;
  let currentRouteName = state.globalReducer.currentRouteName;
  const [isFocus, setIsFocus] = useState(false)
  // useEffect(() => {
  //   //console.log('current route ==================>', currentRouteName)
  //   registerSequenceStepEvent()
  //   registerFinishSequenceEvent()
  //   setTimeout(() => {
  //     if (currentRouteName === 'CourseDetailScreen') {
  //       showTour()
  //     }
  //   }, 100);


  // }, [])

  // const showTour = () => {
  //   if (courseAppTour) {
  //   let appTourSequence = new AppTourSequence()
  //   appTourTargets.forEach(appTourTarget => {
  //     appTourSequence.add(appTourTarget)
  //   })
  //   AppTour.ShowSequence(appTourSequence)

  //   }
  // }

  // const registerSequenceStepEvent = () => {

  //   if (sequenceStepListener) {
  //     sequenceStepListener.remove()
  //   }
  //   sequenceStepListener = DeviceEventEmitter.addListener(
  //     'onShowSequenceStepEvent',
  //     (e) => {
  //       //console.log(e)
  //     }
  //   )
  // }

  // const registerFinishSequenceEvent = () => {
  //   if (finishSequenceListener) {
  //     finishSequenceListener.remove()
  //   }
  //   finishSequenceListener = DeviceEventEmitter.addListener(
  //     'onFinishSequenceEvent',
  //     (e) => {
  //       //console.log(e)
  //       dispatch(changeCourseAppTour(false))
  //     }
  //   )
  // }

  let gallery = 0,
    description = 1,
    lesson = 2,
    status = 3,
    activeTabRedux = state.courseDetailReducer.activeTab;
  const [activeTab, setActiveTab] = useState(activeTabRedux);
  const changeActiveTab = activeTab => () => {
    setActiveTab(activeTab);
  };
  const renderButtons = () => {
    let lessonPic = require('../../../assets/lesson/lesson.png')
    let filePic = require('../../../assets/files/files.png')
    let introducePic = require('../../../assets/introduce/introduce.png')
    let examPic = require('../../../assets/exam/exam.png')
    return (
      // 85.6
      <View style={{ flexDirection: 'row-reverse', borderWidth: 0, width: wp(100), alignSelf: "center", marginTop: hp(-1), marginBottom: hp(1.5) }}>
        {/* {renderCourseDetail(lessonPic, 'درس ها', activeTab == lesson, changeActiveTab(lesson))} */}
        <CourseDetailTab
          // addAppTourTarget={appTourTarget => {
          //   appTourTargets.push(appTourTarget)

          // }}
          // tourProps={{
          //   order: 2,
          //   title: courseLessonGuidTitle,
          //   description: courseLessonGuidDescription,
          //   outerCircleColor: '#3f52ae',
          //   // cancelable: false,
          //   targetRadius: wp(10)
          // }}
          key={'lessons'}
          image={lessonPic} title={'درس ها'} 
          activeTab={activeTabRedux == lesson} 
          activeTabId={lesson}
          onPress={changeActiveTab(lesson)} />

        <CourseDetailTab
          activeTabId={gallery}
          // addAppTourTarget={appTourTarget => {
          //   appTourTargets.push(appTourTarget)

          // }}
          // tourProps={{
          //   order: 3,
          //   title: courseFilesGuidTitle,
          //   description: courseFilesGuidDescription,
          //   outerCircleColor: '#3f52ae',
          //   //  cancelable: false,
          //   targetRadius: wp(10)
          // }}
          key={'files'}
          image={filePic} title={'فایل ها'} activeTab={activeTabRedux == gallery} onPress={changeActiveTab(gallery)} />

        <CourseDetailTab
          activeTabId={description}
          // addAppTourTarget={appTourTarget => {
          //   appTourTargets.push(appTourTarget)

          // }}
          // tourProps={{
          //   order: 4,
          //   title: courseIntroGuidTitle,
          //   description: courseIntroGuidDescription,
          //   outerCircleColor: '#3f52ae',
          //   //  cancelable: false,
          //   targetRadius: wp(10)
          // }}
          key={'intro'}
          image={introducePic} title={'معرفی'} activeTab={activeTabRedux == description} onPress={changeActiveTab(description)} />

        <CourseDetailTab
          activeTabId={status}
          addAppTourTarget={appTourTarget => {
            appTourTargets.push(appTourTarget)

          }}
          tourProps={{
            order: 5,
            title: courseStatusGuidTitle,
            description: courseStatusGuidDescription,
            outerCircleColor: '#3f52ae',
            // cancelable: false,
            targetRadius: wp(10),
            descriptionTextSize: fontSize14,
            titleTextSize: fontSize16,
            titleTextAlignment: 'Right',
            targetCircleColor: '#00000000',
          }}
          key={'status'}
          image={examPic} title={'وضعیت دوره'} activeTab={activeTabRedux == status} onPress={changeActiveTab(status)} />

      </View>
    )
  };

  const renderCourseDetail = (image, title, activeTab, onPress, marginRight) => {
    return (
      <RippleEffect rippleCentered onPress={onPress} style={{ borderWidth: 0, alignItems: 'center', justifyContent: 'center', width: wp(15), marginRight: title == 'درس ها' ? wp(4) : wp(10) }}>
        <CustomText style={{ fontSize: fontSize10, fontFamily: iranSans }} numberOfLines={1}> {title}</CustomText>
        <Image style={styles.chartAndClockAndSessionImageStyle} source={image} />
        {/* left: wp(1) */}
        <View style={{ backgroundColor: activeTab ? courseDetailHeaderColor : appBAckgroundColor, width: wp(10), height: hp(0.7), borderRadius: hp(2), marginTop: hp(.7), }} />
      </RippleEffect>
    )
  }
  const renderPageContent = () => {
    // //console.log('renderContentRows', renderContentRows)
    if (activeTabRedux == gallery) {
      return (
        <View style={{ borderWidth: 0 }}>
          {/* <Text>{galleryTxt}</Text> */}
          <DownloadsScreen courseId={courseId} downloadListData={downloadListData} />
          {renderContentRows}
        </View>
      );
    } else if (activeTabRedux == description) {
      return (
        <View style={{ borderWidth: 0 }}>
          {/* <Text>{descriptionTabTxt}</Text> */}
          <DescriptionScreen courseDescription={courseDescription} />
          {renderContentRows}
        </View>
      );
    } else if (activeTabRedux == lesson) {
      return (
        // <View style={{ borderWidth: 0 }}>
        <ChaptersScreen chaptersData={chaptersData} />
        // </View>
      );
    } else if (activeTabRedux == status) {
      return (
        <CourseStatus courseId={courseId} />
      );
    }
  };
  return (
    <View style={{ borderWidth: 0, flex: 1 }}>
      {renderButtons()}
      {renderPageContent()}
    </View>
  );
}
const styles = StyleSheet.create({
  chartAndClockAndSessionImageStyle: {
    width: wp(6.9),
    height: hp(3.5),
    marginTop: hp(.3),
    resizeMode: 'contain',
    borderWidth: 0
  },
})