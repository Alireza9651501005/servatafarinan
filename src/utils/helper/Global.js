import {Dimensions, Platform, NativeModules} from 'react-native';

const {width, height} = Dimensions.get('window');
const {StatusBarManager} = NativeModules;

export const isIos = (Platform.OS === 'ios');
export const screenW = width;
export const screenH = height;

export const psdW = 1080;
export const psdH = 1920;

// const sh = () => StatusBarManager.getHeight((statusBarHeight) => {
//     return statusBarHeight;
// });

export const iosSH = 25;

export const statusH = isIos ? iosSH : StatusBarManager.HEIGHT;

export const toolbarH = calValueH(160);

export const h5 = calValueH(5);
export const h4 = calValueH(4);
export const h7 = calValueH(7);
export const h10 = calValueH(10);
export const h16 = calValueH(16);
export const h20 = calValueH(20);
export const h30 = calValueH(30);
export const h35 = calValueH(35);
export const h40 = calValueH(40);
export const h50 = calValueH(50);
export const h60 = calValueH(60);
export const h100 = calValueH(100);
export const h120 = calValueH(120);
export const h125 = calValueH(125);
export const h150 = calValueH(200);
export const h245 = calValueH(245);
export const h293 = calValueH(293);
export const h430 = calValueH(430);
export const w40 = calValueW(40);

export const edgeW = h40;
export const edgeH = h35;

export const selectColor = '#8c5bba';
export const rightColor = '#62ba5b';
export const wrongColor = '#d41818';
export const normalColor = '#e6e6e6';
export const boColor = '#c8c8c8';

export const selectColorLight = '#9a6fc3';
export const rightColorLight = '#75c36f';
export const wrongColorLight = '#e83030';
export const normalColorLight = '#f4f4f4';

export const accentColor = '#8c5bba';

export const purple1 = '#7c45b0';
export const purple2 = '#7121c0';

export const textPrimaryColor = '#414141';
export const textSelectedColor = '#fff';

// __________________________ FONT SIZE ____________________________ //
export const fontSize30 = calValueW(30, 0.8);
export const fontSize36 = calValueW(36, 0.8);
export const fontSize40 = calValueW(40, 0.8);
export const fontSize43 = calValueW(43, 0.8);
export const fontSize45 = calValueW(45, 0.8);
export const fontSize48 = calValueW(48, 0.8);
export const fontSize50 = calValueW(50, 0.8);
export const fontSize70 = calValueW(70, 0.8);
export const fontSize80 = calValueW(80, 0.8);
export const fontSize90 = calValueW(90, 0.8);
export const fontSize100 = calValueW(100, 0.8);
export const fontSize120 = calValueW(120, 0.8);
export const fontSize140 = calValueW(140, 0.8);
// ________________________________________________________________ //


// const psdRatio = psdH / psdW;
// const sRatio = screenH / screenW;
// function calValueHW(value) {
//     return (sRatio * value) / psdRatio;
// }


function calValueH(value) {
    return (screenH * value) / psdH;
}

function calValueW(value, factor = 1) {
    return ((screenW * value) / psdW ) * factor;
}
