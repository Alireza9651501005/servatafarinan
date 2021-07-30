import React, { Component } from 'react';
import { CustomText, RippleEffect } from '../../../common/components';
import { theme } from '../../../common/constants';
// import { AppTour, AppTourView } from 'react-native-app-tour'

import { fontSize16 } from '../../../utils/helper/responsiveSizes';
import * as NavigationService from '../../../utils/NavigationService'
import { Pressable, View } from 'react-native';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class RankingButton extends Component {
    render() {
        const { title, rank, key, cStyle, onPress, tourOrder, tourProps,direction } = this.props
        if(direction==='right'){
            return (
                <Pressable
                    rippleSize={hp(.1)}
                    onPress={() => {
                        onPress()
                    }}
                    key={key}
                    ref={ref => {
                        if (!ref) return
    
                        this.button1 = ref
    
                        // this.props.addAppTourTarget &&
                        //     this.props.addAppTourTarget(AppTourView.for(ref, { ...tourProps }))
                    }}
                    style={{ flexDirection: 'row-reverse' }}>
                    <CustomText style={{ marginLeft: 5, color: theme.colors.white }}>{title}</CustomText>
                    <CustomText style={{ color: theme.colors.yellow, fontSize: fontSize16 }}>{rank}</CustomText>
                </Pressable>
            )
        }
        else if(direction==='left'){
            return (
                <Pressable
                    rippleSize={hp(.1)}
                    onPress={() => {
                        onPress()
                    }}
                    key={key}
                    ref={ref => {
                        if (!ref) return
    
                        this.button1 = ref
    
                        // this.props.addAppTourTarget &&
                        //     this.props.addAppTourTarget(AppTourView.for(ref, { ...tourProps }))
                    }}
                    style={{ flexDirection: 'row-reverse' }}>
                    <CustomText style={{ color: theme.colors.yellow, fontSize: fontSize16 }}>{rank}</CustomText>
                            <CustomText style={{ marginRight: 5, color: theme.colors.white }}>{title}</CustomText>
                </Pressable>
            )
        }else{
            <View />
        }
       
    }

}