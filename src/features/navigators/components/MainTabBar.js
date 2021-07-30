import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image, Pressable } from 'react-native';
import { CustomText, RippleEffect } from '../../../common/components';
import { mainBlue } from '../../../utils/helper/commonVariables';

import Svg, { Circle, Path } from 'react-native-svg';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { font10, font12, fontSize12 } from '../../../utils/helper/responsiveSizes';
import { theme } from '../../../common/constants';
import Badge from '../../../common/components/Badge';
import * as NavigationService from '../../../utils/NavigationService';


const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
export default function MainTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  // const [states, setStates] = useState({
  //   selectedIndex: 1,
  //   defaultPage: 1,
  //   navFontSize: 12,
  //   navTextColor: 'rgb(148, 148, 148)',
  //   navTextColorSelected: 'rgb(51, 163, 244)',
  //   circleRadius: new Animated.Value(546),
  //   pathD: new Animated.Value(357),
  //   pathX: '357',
  //   pathY: '675',
  //   pathA: '689',
  //   pathB: '706',
  //   showIcon: true,
  // })
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const getIconSource = (route) => {
    let iconSource
    if (route.name === 'Home') {
      iconSource = require('../../../assets/home.png')
    }
    else if (route.name === 'Credit') {
      iconSource = require('../../../assets/credit/credit_tab.png')
    }
    else if (route.name === 'MyCoursesTab') {
      iconSource = require('../../../assets/courses.png')
    }
    else if (route.name === 'Message') {
      iconSource = require('../../../assets/message.png')
    }
    else if (route.name === 'ProfileScreen') {
      iconSource = require('../../../assets/user-profile.png')
    } else {

    }
    return iconSource
  }

  return (

    < View style={
      {
        flexDirection: 'row',
        height: 57,
        width: wp(100),
        zIndex: 4,
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 0,
      }
    } >

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        let iconSource = getIconSource(route)
        const onPress = () => {
          // if (route.name == 'Home' || route.name == 'ProfileScreen' || route.name == 'MyCourses'|| route.name == 'Message') {
          // navigation.navigate(route.name);
          // };
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
            // navigation.navigate(route.name);
            // NavigationService.reset(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        if (isFocused) {
          return (
            <RippleEffect
              key={index + 'a'}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              // onPress={onPress}
              onLongPress={onLongPress}
              style={
                {
                  flex: 1,
                  // height: hp(9),
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginBottom:hp(4),
                  // backgroundColor: '#ccc'
                }
              }
            >
              < View style={
                {
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  // borderWidth: 1,
                  backgroundColor: '#232a47',
                  overflow: 'hidden',
                  top: -18,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              } >
                <Image
                  source={iconSource}
                  style={{ width: 30, height: 30, resizeMode: 'contain', alignSelf: 'center' }}
                />
                {route.name === 'Message' ?
                  <Badge type='isFocus' />
                  : null}

              </View>

              <View style={{ position: 'absolute', zIndex: 1 }}>
                {/* <Image
                      source={require('../../../assets/curve.png')}
                      style={{ width: wp(20),resizeMode:'contain' }}
                    /> */}
                <Svg xmlns="http://www.w3.org/2000/svg" width="377" height="57" viewBox="0 0 377 57">
                  <Path id="Subtraction_2" data-name="Subtraction 2" d="M377,57H0V0H156.324A38.694,38.694,0,0,0,156,5a36.627,36.627,0,0,0,10.533,25.955A29.783,29.783,0,0,0,187.792,40h.415a29.788,29.788,0,0,0,21.25-9.032A36.625,36.625,0,0,0,220,5a38.7,38.7,0,0,0-.324-5H377V57Z" fill="#232a47" />
                </Svg>
              </View>
            </RippleEffect>
          );
        } else {
          return (
            <RippleEffect
              key={index + 'a'}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={
                {
                  flex: 1,
                  zIndex: 3,
                  // height: hp(9),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#232a47',
                  // backgroundColor: isFocused ? mainBlue : '#ccc'
                }
              }
            >
              <View style={{ width: 25, height: 26, borderColor: '#fff', overflow: 'hidden' }}>
                <Image
                  source={iconSource}
                  style={{ width: 25, height: 25, resizeMode: 'contain', alignSelf: 'center' }}
                />
              </View>
              {route.name === 'Message' ?
                <Badge />
                : route.name === 'Credit' ? <Badge type='Credit' /> : null}
              <CustomText style={{ color: '#fff', textAlign: 'center', fontSize: font10 }}>
                {label}
              </CustomText>
            </RippleEffect>
          );
        }

      })}

    </View>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // overflow: 'hidden',
  },
});



