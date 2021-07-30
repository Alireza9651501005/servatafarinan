// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// // this variables base on screen height percent on 736 px 
// import { Dimensions, Platform, PixelRatio } from 'react-native';

// const {
//   width: SCREEN_WIDTH,
//   height: SCREEN_HEIGHT,
// } = Dimensions.get('window');

// export function fixedFont(size) {
//   // NOTE: Font Scale should always be the same as the Pixel Ratio on iOS, making this
//   // a no-op.
//   return size * PixelRatio.get() / PixelRatio.getFontScale();
// }


import { Platform, PixelRatio, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
export const screenW = width;
export const screenH = height;
// based on iphone 5s's scale
const scale = screenW / 320;

export function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export const smallFont = normalize(7)
export const font10 = normalize(9)
export const font12 = normalize(11)
export const font14 = normalize(12.5)
export const font16 = normalize(14)
export const largeFont = normalize(20)


// export const fontSize14 = normalize(14)
// export const fontSize16 = normalize(16)
// export const fontSize12 = normalize(12)
// export const fontSize20 = normalize(20)
// export const fontSize8 = normalize(8)
// export const fontSize10 = normalize(10)
export const fontSize14 = normalize(12.5)
export const fontSize16 = normalize(14)
export const fontSize12 = normalize(11)
export const fontSize20 = normalize(18)
export const fontSize18 = normalize(16)
export const fontSize8 = normalize(7)
export const fontSize10 = normalize(9)
export const fontSizeXL = normalize(25)




