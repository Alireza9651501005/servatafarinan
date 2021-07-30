import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, View } from 'react-native'
// import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour'
import { useSelector, useDispatch } from 'react-redux'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { shareAppGuidDescription, shareAppGuidTitle } from '../texts';
import CircleRow from './CircleRow';
import LevelsRow from './LevelsRow';
import PageGuide from './PageGuide';
import PeopleRow from './PeopleRow';
import ScoreItem from './ScoreItem';
import ShareApp from './ShareApp';
import VerticalSeparators from './VerticalSeparators';
import { changeNetworkingAppTour } from '../../../store/globalActions';
import { fontSize14, fontSize16 } from '../../../utils/helper/responsiveSizes';

export default function NetworkingAppTour({ networkingData, navigation }) {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  let appTourTargets = []
  let sequenceStepListener = null
  let finishSequenceListener = null
  let networkingAppTour = state.globalReducer.networkingAppTour
  let currentRouteName = state.globalReducer.currentRouteName
  const [isFocus, setIsFocus] = useState(false)
  // useEffect(() => {
  //   //console.log('current route ==================>', currentRouteName)
  //   registerSequenceStepEvent()
  //   registerFinishSequenceEvent()
  //   setTimeout(() => {
  //     if (currentRouteName === 'NetworkingScreen') {
  //       showTour()
  //     }
  //   }, 100);


  // }, [])

  // const showTour = () => {
  //   if (networkingAppTour) {
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
  //       dispatch(changeNetworkingAppTour(false))
  //     }
  //   )
  // }
  return (
    <View>
      <PageGuide />
      <CircleRow data={networkingData.network_scores} />
      <VerticalSeparators data={networkingData.network_scores} />
      <LevelsRow data={networkingData.network_scores} />
      <PeopleRow data={networkingData.network_scores} />
      <ScoreItem score={networkingData.total_network_score} />
      <ShareApp
        addAppTourTarget={appTourTarget => {
          appTourTargets.push(appTourTarget)

        }}
        tourProps={{
          order: 5,
          title: shareAppGuidTitle,
          description: shareAppGuidDescription,
          outerCircleColor: '#3f52ae',
          // cancelable: false,
          targetRadius: widthPercentageToDP(22),
          descriptionTextSize: fontSize14,
          titleTextSize: fontSize16,
          titleTextAlignment: 'Right',
          targetCircleColor: '#00000000',
        }}
        key={'AppShare'}
        shareContent={networkingData.invite_app_link} />
    </View>
  )
}