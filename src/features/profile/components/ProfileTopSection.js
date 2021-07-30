import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { DeviceEventEmitter, View } from 'react-native';
// import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { editPictureGuidDescirption, editPictureGuidTitle, shareGuidDescription, shareGuidTitle } from '../texts';
import ProfileImageRow from './ProfileImageRow';
import ProfileShare from './ProfileShare';
import { changeProfileAppTour } from '../../../store/globalActions';
import { fontSize14, fontSize16 } from '../../../utils/helper/responsiveSizes';

export default function ProfileTopSection(props) {
  let appTourTargets = []
  let sequenceStepListener = null
  let finishSequenceListener = null
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  let profileAppTour = state.globalReducer.profileAppTour
  let currentRouteName = state.globalReducer.currentRouteName
  const [isFocus, setIsFocus] = useState(false)
  // useEffect(() => {
  //   //console.log('current route ==================>', currentRouteName)
  //   registerSequenceStepEvent()
  //   registerFinishSequenceEvent()
  //   setTimeout(() => {
  //     if (currentRouteName === 'ProfileScreen') {
  //       showTour()
  //     }
  //   }, 100);


  // }, [])

  // const showTour = () => {
  //   if (profileAppTour) {
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
  //       dispatch(changeProfileAppTour(false))
  //     }
  //   )
  // }
  return (
    <View>
      <ProfileShare
        shareContent={props.profileData.profileData.share_content}
        addAppTourTarget={appTourTarget => {
          appTourTargets.push(appTourTarget)

        }}
        tourProps={{
          order: 5,
          title: shareGuidTitle,
          description: shareGuidDescription,
          outerCircleColor: '#3f52ae',
          //  cancelable: false,
          targetRadius: wp(7),
          descriptionTextSize: fontSize14,
          titleTextSize: fontSize16,
          titleTextAlignment: 'Right',
          targetCircleColor: '#00000000',
        }}
        key={'ProfileShare'}
      />
      <ProfileImageRow
        addAppTourTarget={appTourTarget => {
          appTourTargets.push(appTourTarget)

        }}
        tourProps={{
          order: 6,
          title: editPictureGuidTitle,
          description: editPictureGuidDescirption,
          outerCircleColor: '#3f52ae',
          // cancelable: false,
          targetRadius: wp(25),
          descriptionTextSize: fontSize14,
          titleTextSize: fontSize16,
          titleTextAlignment: 'Right',
          targetCircleColor: '#00000000',
        }}
        key={'ProfileImage'}
      />
    </View>
  )


}