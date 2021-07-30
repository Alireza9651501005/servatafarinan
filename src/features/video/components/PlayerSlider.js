import React, {Component} from 'react';
import Reanimated from "react-native-reanimated";
import { minutesAndSeconds } from '../../../utils/helper/functions';
// import {activeTint, inputBorderColor} from "../../../helper/Colors";
import Slider from "./Slider";

const activeTint ='#d4d4d4';
const inputBorderColor = '#333'

export default class PlayerSlider extends Component {

    convertSecondToTime = (value) => {
        let time = minutesAndSeconds(Math.round(value));
        return time[0] + ':' + time[1];
    };
 
    render() {
        let {
            position = 0 , bufferedPosition , duration,
            onSlidingStart, onSlidingComplete, height = 20, seekHeight ,
        } = this.props;

        console.log('PlayerSlider : ', this.props);

        return (
            <Slider
                borderColor={inputBorderColor}
                maximumTrackTintColor={inputBorderColor}
                minimumTrackTintColor={activeTint}
                height={height}
                seekHeight={seekHeight}
                ballon={this.convertSecondToTime}
                progress={position}
                min={new Reanimated.Value(-0.0000000000000000001)}
                cache={bufferedPosition}
                max={duration}
                onSlidingStart={onSlidingStart}
                onSlidingComplete={onSlidingComplete}
            />
        )
    }

}
