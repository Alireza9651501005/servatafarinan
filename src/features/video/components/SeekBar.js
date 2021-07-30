import React, { useState ,useEffect } from 'react';

// import { defaultString } from '../String/defaultStringValue';
import {
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons//FontAwesome'
import Slider from '@react-native-community/slider';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useLinkProps } from '@react-navigation/native';

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);

const defaultString = {
  activeColor: '#d4d4d4',
  deactiveColor: '#333',
  thumbColor: '#fff'
}

const SeekBar = ({
  trackLength,
  currentPosition,
  onSeek,
  onSlidingStart,
  show
}) => {
  const [thumbIcon, setThumbIcon] = useState()
  useEffect(() => {
    Icon.getImageSource('circle', wp(4), defaultString.thumbColor).then(source => setThumbIcon(source))
}, [])
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  return (
    <View style={styles.container}>
      {/* <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.text, { color: defaultString.darkColor }]}>
          {elapsed[0] + ":" + elapsed[1]}
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={[styles.text, { width: 40, color: defaultString.darkColor }]}>
          {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text>
      </View> */}
      {show ?
        <Slider
          // style={{ height: 25, borderWidth: 5, backgroundColor: '#fff' }}
          maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSeek}
          value={currentPosition}
          minimumTrackTintColor={defaultString.activeColor}
          maximumTrackTintColor={defaultString.deactiveColor}
          // thumbTintColor={defaultString.thumbColor}
        // thumbStyle={styles.thumb}
        trackStyle={styles.track}
        thumbImage={thumbIcon}
        />
        :
        null
      }

    </View>
  );
};

export default SeekBar;

const styles = StyleSheet.create({
  slider: {
    // marginTop: -12,
  },
  container: {
    // paddingLeft: 16,
    // paddingRight: 16,
    // paddingTop: 16,
    // borderWidth:1,
    // borderColor:'#fff'
  },
  track: {
    height: 30,
    borderRadius: 1,
    borderColor: '#FFF'
  },
  thumb: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: defaultString.thumbColor,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign: 'center',
  }
});