import React, { Component } from 'react';
import { CustomText, RippleEffect } from '../../../common/components';
import { theme } from '../../../common/constants';
// import { AppTour, AppTourView } from 'react-native-app-tour'

import { fontSize16 } from '../../../utils/helper/responsiveSizes';
import * as NavigationService from '../../../utils/NavigationService'
import { Pressable } from 'react-native';


export default class ScoreButton extends Component {
    render() {
        const { title, score, key, cStyle, onPress, tourOrder,tourProps } = this.props
        return (
            <Pressable
                key={key}
                ref={ref => {
                    if (!ref) return

                    this.button1 = ref

                    // this.props.addAppTourTarget &&
                    //     this.props.addAppTourTarget(AppTourView.for(ref, { ...tourProps }))
                }}
                onPress={() => {
                    onPress();
                    // let targetView = AppTourView.for(this.button1, {
                    //     ...tourProps
                    // })

                    // AppTour.ShowFor(targetView)
                }}
                style={{ alignItems: 'center' }}

            >
                <CustomText style={{ color: theme.colors.lightBlue, fontSize: fontSize16 }}>{score}</CustomText>
                <CustomText style={{ color: theme.colors.white }}>{title}</CustomText>
            </Pressable>
        )
    }

}