// import React from 'react'
// import {Text, StyleSheet} from 'react-native'

// const CustomText = ({style, children, numberOfLines, textColor, fontSize, bold, underline, fontFamily}) => {
//     const textStyle = [
//         styles.textStyle,
//         textColor && {color :textColor},
//         fontSize && {fontSize: fontSize},
//         underline && styles.underline,
//         bold && styles.bold,
//         fontFamily && {fontFamily: fontFamily},
//         style
//     ]
//     return ( 
//         <Text 
//             ellipsizeMode={'tail'}  
//             numberOfLines={numberOfLines} 
//             style={textStyle}>
//             {children}
//         </Text>
//     )
// }
// const styles = StyleSheet.create({
//     textStyle: {
//         textAlign:'right',
//         textAlignVertical: 'center',
//         fontFamily: 'Vazir',
//     },
//     bold: {
//         fontFamily: 'Vazir-Bold'
//     },
//     underline: {
//         textDecorationLine: 'underline'
//     },
// })

// export default CustomText
import React from 'react';
import {
  Text,
  StyleSheet,
  Platform
} from 'react-native';
import { iranSans, iranSansLight, iranSansBold } from '../../utils/helper/commonVariables';
import { font14 } from '../../utils/helper/responsiveSizes';

class CustomText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text 
      //need to check with CTO
      allowFontScaling={false}
      {...this.props} 
      style={[styles.defaultStyle, this.props.style,this.props.bold?styles.bold:null,this.props.light?styles.light:null]}>
        {this.props.children}
      </Text>
    );
  }
}
 
const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: iranSans,
    fontSize:font14,
    textAlign:"right",
    // borderWidth:1,
  },
  bold: Platform.OS === 'ios' ? {
    fontFamily: iranSans,
    fontWeight: 'bold'
  } : {
   fontFamily: iranSansBold
  },
  light: Platform.OS === 'ios' ? {
    fontFamily: iranSans,
    fontWeight: '300'
  } : {
   fontFamily: iranSansLight
  },
});

export {CustomText}