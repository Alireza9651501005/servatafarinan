import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, View } from 'react-native';
// import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour'
import { useSelector, useDispatch } from 'react-redux'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { sizes } from '../../../common/constants/theme';
import { interactiveGuideDescription, interactiveGuideTitle, videoGuideDescription, videoGuideTitle } from '../texts';
import LessonButton from './LessonButton';
import { changeLessonAppTour } from '../../../store/globalActions';
import { fontSize14, fontSize16 } from '../../../utils/helper/responsiveSizes';

export default function LessonTopButtons({ navigation, interactive, video, lessonData, getLessonData, apiHandle, route }) {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  let appTourTargets = []
  let sequenceStepListener = null
  let finishSequenceListener = null
  let lessonAppTour = state.globalReducer.lessonAppTour
  let currentRouteName = state.globalReducer.currentRouteName
  const [isFocus, setIsFocus] = useState(false)
  // useEffect(() => {
  //   //console.log('current route ==================>', currentRouteName)
  //   registerSequenceStepEvent()
  //   registerFinishSequenceEvent()
  //   setTimeout(() => {
  //     if (currentRouteName === 'LessonScreen') {
  //       showTour()
  //     }
  //   }, 100);


  // }, [])

  // const showTour = () => {
  //   if (lessonAppTour) {
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
  //       dispatch(changeLessonAppTour(false))
  //     }
  //   )
  // }

  return (
    <View style={{ flexDirection: 'row', paddingRight: sizes.globalMargin, paddingLeft: sizes.globalMargin, justifyContent: 'space-between' }}>
      {/* <MediumButtonWhite onPress={() => { navigation.navigate('IntractiveScreen', lessonData) }}>{IntractiveBtnTitle}</MediumButtonWhite> */}
      {interactive ? <LessonButton
        onPress={() => { navigation.navigate('IntractiveScreen', lessonData) }}
        title={interactive.button_title}
        myScore={interactive.user_score}
        totalScore={interactive.score}
        icon={require('../../../assets/interactive/interactive.png')}
        viewCount={interactive.subscribers}
        addAppTourTarget={appTourTarget => {
          appTourTargets.push(appTourTarget)

        }}
        tourProps={{
          order: 2,
          title: interactiveGuideTitle,
          description: interactiveGuideDescription,
          outerCircleColor: '#3f52ae',
          // cancelable: false,
          targetRadius: widthPercentageToDP(30),
          descriptionTextSize: fontSize14,
          titleTextSize: fontSize16,
          titleTextAlignment: 'Right',
          targetCircleColor: '#00000000',
        }}
        key={'interactive'}
      /> : null}

      {video ? <LessonButton
        onPress={() =>
          navigation.navigate('VideoScreen', {
            url: getLessonData + route.params.item.id,
            videoData: lessonData.data.video,
            lessonId: route.params.item.id,
            apiHandle: apiHandle,
            courseTitle: lessonData.data.course.title,
            cover: lessonData.data.video.cover
          })
        }
        title={video.button_title}
        myScore={video.user_score}
        totalScore={video.score}
        icon={require('../../../assets/video/online-video.png')}
        viewCount={video.subscribers}
        addAppTourTarget={appTourTarget => {
          appTourTargets.push(appTourTarget)

        }}
        tourProps={{
          order: 1,
          title: videoGuideTitle,
          description: videoGuideDescription,
          outerCircleColor: '#3f52ae',
          // cancelable: false,
          targetRadius: widthPercentageToDP(30),
          descriptionTextSize: fontSize14,
          titleTextSize: fontSize16,
          titleTextAlignment: 'Right',
          targetCircleColor: '#00000000',
        }}
        key={'video'}
      /> : null}

      {/* <MediumButtonWhite onPress={() =>
                        navigation.navigate('VideoScreen', { url: getLessonData + route.params.item.id, videoData: lessonData.data.video })
                    }>نمایش ویدیو</MediumButtonWhite> */}
    </View>
  )
}