import React, { Component } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mainBlue, inputBgColor, inputLabelColor, txtBlack, lightBlueGrey, errorToast, txtInputError, iranSans } from '../../utils/helper/commonVariables';
import { reportcatchToFireBase } from '../../utils/helper/functions';
import { font12, font14, font16, font10 } from '../../utils/helper/responsiveSizes';
import { RippleEffect } from "../components/RippleEffect";
import CustomeImage from "./CustomeImage";
class CustomTxtInput extends Component {
    constructor(props) {
        super(props);
        this.labelAnimate = new Animated.Value(0);
        this.labelAnimateBack = new Animated.Value(0);

        this.state = {
            labelShow: false,
            secureText: true,
            animate: false,
            animateBack: false
        };
    }
    componentDidMount() {
        if (this.props.touchEnable) {
            this.setState({ labelShow: true })
        }
        if (!this.props.password) {
            this.setState({ secureText: false })
        }
        if (this.props.value) {
            this.setState({ animate: true })
        }
    }

    renderLabel() {

        let animStyle
        let labelAnim
        if (this.state.animate) {
            Animated.timing(this.labelAnimate, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }).start()

            animStyle = {
                transform: [{
                    translateY: this.labelAnimate.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -hp(2)]
                    }),

                    // translateX: this.circle.interpolate({
                    //     inputRange: [0, 1],
                    //     outputRange: [from, to]
                    // })
                }],
            }

            labelAnim = {
                transform: [{
                    scale: this.labelAnimate.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.9]
                    }),
                    translateX: this.labelAnimate.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 4]
                    })
                }]
            }

        }
        if (this.state.animateBack) {
            Animated.timing(this.labelAnimateBack, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }).start()

            animStyle = {
                transform: [{
                    translateY: this.labelAnimateBack.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-hp(2), 0]
                    }),

                    // translateX: this.circle.interpolate({
                    //     inputRange: [0, 1],
                    //     outputRange: [from, to]
                    // })
                }],
            }

            labelAnim = {
                transform: [{
                    scale: this.labelAnimateBack.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1]
                    }),
                    translateX: this.labelAnimateBack.interpolate({
                        inputRange: [0, 1],
                        outputRange: [4, 0]
                    })
                }]
            }

        }
        return (
            < Animated.View
                style={
                    [styles.labelWrapper, animStyle, {
                        top: !this.state.animate && !this.state.animateBack && this.props.value.length != 0 ? hp(1) : hp(2.5)
                    }]
                } >
                <Animated.Text
                    onPress={this.props.touchEnable ? this.props.onPress :
                        () => {
                            try {
                                this.input.focus()
                            } catch (error) {
                                reportcatchToFireBase(error, 'CustomTxtInput.js/line:120')
                            }
                        }
                    }
                    style={
                        [styles.label, labelAnim, {
                            fontSize: !this.state.animate && !this.state.animateBack && this.props.value ? font12 : font14,
                            color: this.props.error ? errorToast : lightBlueGrey
                        }]
                    }
                >{this.props.label}</Animated.Text>
            </Animated.View>
        )

    }

    render() {
        //need to refactor
        const { value, label, onChangeText, style, wrapperStyle, disable, keyboardType, touchEnable, maxLength, inputStyle, password, error, iconAction, iconActionFunction, onPress, hasIcon } = this.props
        if (touchEnable) {
            return (
                <RippleEffect
                    key='CustomTxtInput'
                    // disabled={!touchEnable}
                    onPress={onPress}
                    style={[styles.container, { backgroundColor: error ? txtInputError : inputBgColor }, wrapperStyle]}
                >
                    {this.renderLabel()}
                    <View style={styles.wrapperStyle}>
                        {touchEnable ?
                            <Text style={[hasIcon ? styles.inputStyleInSearchMode : styles.inputStyle, style]}>{value}</Text>
                            :

                            <TextInput
                                autoCorrect={false}
                                ref={ref => this.input = ref}
                                secureTextEntry={this.state.secureText}
                                keyboardType={keyboardType}
                                autoCapitalize='none'
                                editable={disable ? false : true}
                                placeholderTextColor={inputLabelColor}
                                value={value}
                                // multiline
                                onChangeText={onChangeText}
                                // placeholder={this.state.labelShow ? '' : label}
                                maxLength={maxLength}
                                onFocus={() => {
                                    if (this.props.value) {
                                        this.setState({ labelShow: true, animateBack: false })
                                    } else {
                                        this.setState({ labelShow: true, animate: true, animateBack: false })
                                    }
                                }}
                                onBlur={() => {
                                    this.setState({ labelShow: false });
                                    if (!value) {
                                        this.setState({ animate: false, animateBack: true })
                                    }
                                }}
                                // style={
                                //     { textAlignVertical: 'top', borderWidth: 1, height: hp(16.8) }
                                // }
                                style={
                                    this.state.labelShow || value ? [hasIcon ? styles.inputStyleInSearchMode : styles.inputStyle, {
                                        color: disable ? lightBlueGrey : txtBlack,
                                    }, password ? {} : { fontFamily: iranSans }] : [styles.inputStyleMain, inputStyle, {
                                        color: disable ? lightBlueGrey : txtBlack
                                    }, password ? {} : { fontFamily: iranSans }]
                                }
                            />}



                        {password ?
                            <RippleEffect
                                style={styles.iconButton}
                                onPress={() => { this.setState({ secureText: !this.state.secureText }) }}
                            >
                                <Image
                                    source={require('../../assets/eye/eye.png')}
                                    style={styles.icon}
                                />
                            </RippleEffect>
                            :
                            null
                        }



                        {iconAction ?
                            <RippleEffect
                                disabled={iconActionFunction ? false : true}
                                style={styles.iconButton}
                                onPress={iconActionFunction}
                            >
                                <Image
                                    source={iconAction}
                                    style={styles.iconAction}
                                />
                            </RippleEffect> :
                            null
                        }

                    </View>
                </RippleEffect>
            )
        }
        else {
            return (
                <TouchableOpacity
                    key='CustomTxtInput'
                    disabled={!touchEnable}
                    onPress={onPress}
                    style={[styles.container, { backgroundColor: error ? txtInputError : inputBgColor }, wrapperStyle]}
                >
                    {this.renderLabel()}
                    <View style={styles.wrapperStyle}>

                        {/* {hasIcon?<View style={{ width: wp(10), height: hp(5), backgroundColor: 'red' }} />:null} */}
                        {hasIcon ?
                            <RippleEffect
                                style={styles.hasIconStyle}
                                onPress={() => { this.setState({ secureText: !this.state.secureText }) }}
                            >
                                <Image
                                    source={require('../../assets/search/searchIcon.png')}
                                    style={styles.searchIconStyle}
                                />
                            </RippleEffect> :
                            null
                        }
                        {touchEnable ?
                            <Text style={[hasIcon ? styles.inputStyleInSearchMode : styles.inputStyle, style]}>{value}</Text>
                            :

                            <TextInput
                                ref={ref => this.input = ref}
                                secureTextEntry={this.state.secureText}
                                keyboardType={keyboardType}
                                autoCapitalize='none'
                                editable={disable ? false : true}
                                placeholderTextColor={inputLabelColor}
                                value={value}
                                // multiline
                                onChangeText={onChangeText}
                                // placeholder={this.state.labelShow ? '' : label}
                                maxLength={maxLength}
                                onFocus={() => {
                                    if (this.props.value) {
                                        this.setState({ labelShow: true, animateBack: false })
                                    } else {
                                        this.setState({ labelShow: true, animate: true, animateBack: false })
                                    }
                                }}
                                onBlur={() => {
                                    this.setState({ labelShow: false });
                                    if (!value) {
                                        this.setState({ animate: false, animateBack: true })
                                    }
                                }}
                                // style={
                                //     { textAlignVertical: 'top', borderWidth: 1, height: hp(16.8) }
                                // }
                                style={
                                    this.state.labelShow || value ? [hasIcon ? styles.inputStyleInSearchMode : hasIcon ? styles.inputStyleInSearchMode : styles.inputStyle, {
                                        color: disable ? lightBlueGrey : txtBlack,
                                    }, password ? {} : { fontFamily: iranSans }] : [styles.inputStyleMain, inputStyle, {
                                        color: disable ? lightBlueGrey : txtBlack
                                    }, password ? {} : { fontFamily: iranSans }]
                                }
                            />}



                        {password ?
                            <RippleEffect
                                style={styles.iconButton}
                                onPress={() => { this.setState({ secureText: !this.state.secureText }) }}
                            >
                                <Image
                                    source={require('../../assets/eye/eye.png')}
                                    style={styles.icon}
                                />
                            </RippleEffect> :
                            null
                        }



                        {iconAction ?
                            <RippleEffect
                                disabled={iconActionFunction ? false : true}
                                style={styles.iconButton}
                                onPress={iconActionFunction}
                            >
                                <Image
                                    source={iconAction}
                                    style={styles.iconAction}
                                />
                            </RippleEffect> :
                            null
                        }

                    </View>
                </TouchableOpacity>
            )
        }

    }

}
// const { hasIcon} = props;
const styles = StyleSheet.create({
    container: {
        width: wp(90),
        height: hp(8.7),
        borderRadius: hp(2),
        backgroundColor: inputBgColor,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(1.1),
        marginBottom: hp(1.1)

    },
    inputStyle: {
        textAlign: 'right',
        color: txtBlack,
        // fontSize: font12,
        fontSize: font16,
        paddingRight: wp(8),
        paddingLeft: wp(8),
        top: hp(1.2),
        flex: 1,
        textAlignVertical: 'top',
        borderWidth: 0
    },
    inputStyleInSearchMode: {
        fontFamily: iranSans,
        textAlign: 'right',
        color: txtBlack,
        fontSize: font14,
        // fontSize: font16,
        paddingRight: wp(2),
        paddingLeft: wp(8),
        top: hp(.4),
        paddingTop:hp(1),
        paddingBottom:hp(1),
        // top: hp(1.2),
        flex: 1,
        textAlignVertical: 'top',
        borderWidth: 0
    },
    inputStyleMain: {
        fontFamily: iranSans,
        textAlign: 'right',
        color: txtBlack,
        fontSize: font14,
        paddingRight: wp(8),
        paddingLeft: wp(8),
        flex: 1,
        // borderWidth:1,
        minHeight: hp(6)
    },

    wrapperStyle: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        alignSelf: 'center',
    },
    label: {
        // position: 'absolute',
        fontFamily: iranSans,
        color: lightBlueGrey,
        fontSize: font14,
        textAlign: 'right',
        // right: -4,
        // top: hp(2.5),
        flex: 1,
        zIndex: 90
        // borderWidth:1
    },
    labelWrapper: {
        position: 'absolute',
        right: wp(8),
        top: hp(2.5),
        flex: 1,
        alignItems: 'flex-end',
        // borderWidth:1
    },
    requireStar: {
        color: 'red',
        paddingTop: 5
    },
    icon: {
        width: wp(5.5),
        height: hp(2),
        resizeMode: 'contain',
    },
    searchIconStyle: {
        width: wp(6.4),
        height: hp(2.9),
        resizeMode: 'contain',
    },
    iconAction: {
        width: hp(4.4),
        height: hp(4.4),
        resizeMode: 'contain'
    },
    iconButton: {
        width: wp(7),
        height: hp(4),
        marginLeft: wp(6.3),
        alignItems: 'center',
        justifyContent: 'center',
    },
    hasIconStyle: {
        width: wp(7),
        height: hp(4),
        marginRight: wp(2),
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
// const styles = {

// }

export { CustomTxtInput };