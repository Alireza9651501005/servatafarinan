import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Platform, PixelRatio, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
const screenW = width;
const screenH = height;
// based on iphone 5s's scale
const scale = screenW / 320;

function normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios')
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    else
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

export const darkBlue = '#232A47';
export const lightBlue = '#8BC3EE';
export const lightBlue2 = '#39c2fd';
export const lightBlue3 = '#80b7e2';
export const lightBlue4 = '#c4daea';
export const lightBlue5 = '#76b5e6'
export const lightBlueProfile = '#a8abff';
export const lightBlueProfile2 = ''
export const white = '#fafafa';
export const white2 = '#f5f5fa';
export const white3 = '#eeeeee';
export const white4 = '#ffffff';
export const black = '#000';
export const black1 = '#200e32';
export const green = '#0a8f7d';
export const blue = '#2179ac';
export const blue2 = '#1792c7';
export const blue5 = '#c8e2ec';
export const gray1 = '#E4E4EA';//background
export const gray2 = '#95a29e';//deactive button
export const gray3 = '#eee'; //comments 
export const gray5 = '#8c8692'; //seen message 
export const red = '#f00';
export const red3 = '#d33e57'
export const yellow = '#FFD700';
export const gray4 = '#ebedf0';
export const gray6 = '#d6fafafa';
export const gray7 = '#f0efef';
export const blue4 = '#1f94c7';
export const gray8 = '#d2d2d2'; //border color
export const red2 = '#f03d52';
export const gray9 = '#696e77';
export const gold = '#efaf30';

// export const gray6 = '#d6fafafa',


const colors = {
    danger: '#dc3545',
    warning: '#ffc107',
    success: '#28a745',
    primary: '#3498db',
    accent: '#86ce85',
    deleteButton: '#f53649',
    tab: '#5e94ff',
    darkGray: '#505050',
    black: '#000000',
    white: 'white',
    gray: '#919191',
    gray2: '#505050',
    gray3: '#707070',
    shadowGray: '#eee',
    greenTypeC: '#0a8f7d',
    whiteTypeC: '#f5f5f5',
    gradient: ['#3498db', '#41d8dd'],
    lightBlue: '#8BC3EE',
    blue: '#1974BB',
    darkBlue: '#232A47',
    yellow: '#FFD700',
    green: '#0F996D',
    bgGray: '#E4E4EA',
    deleteProfielImageBackground: red2,
    priceColor: green,
    buttons: lightBlue2,
    buttonGreen: green,
    background: gray1,
    disable: gray2,
    textGreen: green,
    componentLightBlue: lightBlue3,
    componentWhite: white,
    componentWhite2: white2,
    textWhite: white,
    textBlack: black,
    progress: blue,
    progressInvert: lightBlue3,
    textInuteTitleColor: black1,
    componentsDarkBlue: darkBlue,
    textLightBlue: lightBlue2,
    textLightBlue2: '#abffff',
    textBlue: blue4,
    textGray: gray9,
    headerDarkBlue: darkBlue,
    headerTitleColor: white3,
    splashLoading: white4,
    someHeaderColor: white3,
    borderBlue: lightBlue,
    borderGray: gray2,
    borderBlue2: blue4,
    gainCircle: gray4,
    seenMEssage: gray5,
    inActiveText: white,
    creditItemBg: lightBlue4,
    userProfileBorderColor: blue2,
    //in leader board
    rewardBackGround: gray7,
    userItemBackgroundInLeaderBoard: blue4,
    editeProfileUserImageBackColor: blue5,
    chapterScore: lightBlue5,
    chapterNoScore: red3,
    giftBorderColor: gold,
    //old use
    white1: '#ffffff',
    white2: '#fafafa',
    blue1: '#39C2FD',
    blue2: '#39c2fd',
    blue3: '#4375b7',
    black1: '#200e32',
    //old use


}
const fontSize = {
    font12: normalize(11),
    font14: normalize(12.5),
    font16: normalize(14),
    font20: normalize(18),
}
const sizes = {
    height,
    width,
    tabBarHeight: hp(7.5),
    actionBarHeight: hp(7),
    iconSize: hp(3),
    spinner: wp(11.1),
    verticalMargin10: hp(1.5),//10
    verticalMargin20: hp(3),//20
    horizontalMargin7: wp(2),//7.5
    horizontalMargin15: wp(4),//15
    smallHeaderHeight: hp(13.4),
    largHeaderHeight: hp(22),
    globalRadius: wp(4.5),
    globalMargin: wp(5),
    spinnerSize: hp(8)
}
export { colors, fontSize, sizes }
