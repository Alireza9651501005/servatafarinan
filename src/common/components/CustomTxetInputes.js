import React, { Component } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { yekan, mainBlue, inputBgColor, inputLabelColor, txtBlack, lightBlueGrey, errorToast, iranSansMedium, iranSans, iranSansLight, iranSansBold, whiteFour, yekanLight } from '../../utils/helper/commonVariables';
import { font12, font14, font16, font10, fontSize14, fontSize20, normalize } from '../../utils/helper/responsiveSizes';
import { RippleEffect } from "../components/RippleEffect";
import { theme } from '../constants';
import { color } from 'react-native-reanimated';
import Ripple from 'react-native-material-ripple';
class CustomTxetInputes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            labelShow: false,
            secureText: true,
        };
    }
    componentDidMount() {
        if (this.props.touchEnable) {
            this.setState({ labelShow: true })
        }
        if (!this.props.password) {
            this.setState({ secureText: false })
        }
    }
    keyPress = (event) => {

        /* this line will solve your error */

        event.persist();
        //console.log('event')
        //console.log(event);
    }
    render() {
        //need to refactor
        const {
            value,
            label,
            onChangeText,
            lableWrapperStyle,
            lableTextWrapperStyle,
            style,
            wrapperStyle,
            inputeWrapperStyle,
            disable,
            keyboardType,
            multiline,
            touchEnable,
            maxLength,
            inputStyle,
            password,
            error,
            iconAction,
            iconActionFunction,
            onPress,
            hasIcon,
            searchMode,
            onSubmitEditing,
            inviteCodeOnPress } = this.props
        return (
            <View>
                {searchMode ? null :
                    <View style={[{ borderWidth: 0, borderColor: 'white', alignSelf: 'center', width: wp(79.7), marginBottom: hp(.3), flexDirection: 'row-reverse' }, lableWrapperStyle]}>
                        <Text style={[styles.lableStyle, { color: lableTextWrapperStyle ? lableTextWrapperStyle : theme.colors.white2 }]}>{label}</Text>
                        {inviteCodeOnPress ? <Ripple onPress={inviteCodeOnPress} style={{ width: wp(6),borderWidth:0,borderColor:'red' }} >
                            <Image style={{resizeMode:'contain' }}
                                source={require('../../assets/inviteCodeGuide/inviteCodeGuide.png')} />
                        </Ripple> : null}
                    </View>}
                {onPress ?
                    < View
                        key='CustomsearchTxtInput'
                        // disabled={!touchEnable}
                        // onPress={() => this.input.focus()}
                        style={[styles.container, wrapperStyle]}
                    >
                        <RippleEffect onPress={onPress} style={styles.wrapperStyle}>
                            {searchMode ?
                                <RippleEffect
                                    style={styles.searchIconStyle}
                                // onPress={() => { this.setState({ secureText: !this.state.secureText }) }}
                                >
                                    <Image
                                        source={require('../../assets/search/searchIcon.png')}
                                        style={styles.searchIconStyle}
                                    />
                                </RippleEffect> :
                                null
                            }
                            <TextInput
                                onKeyPress={this.keyPress}
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
                                style={[styles.inputStyle, inputeWrapperStyle, { fontFamily: yekanLight }]}
                            // style={[styles.inputStyleInSearchMode, { top: password ? this.state.secureText ? hp(.5) : hp(.4) : hp(.5), }]}
                            // style={styles.inputStyle}
                            />

                            {password ?
                                <RippleEffect
                                    style={styles.iconButton}
                                    onPress={() => { this.setState({ secureText: !this.state.secureText }) }}
                                >
                                    <Image
                                        source={require('../../assets/eyes/eyes.png')}
                                        style={styles.icon}
                                    />
                                </RippleEffect>
                                :
                                null
                            }

                        </RippleEffect>
                    </View >
                    :
                    < View
                        key='CustomsearchTxtInput'
                        // disabled={!touchEnable}
                        // onPress={() => this.input.focus()}
                        style={[styles.container, wrapperStyle]}
                    >
                        <View style={styles.wrapperStyle}>
                            {searchMode ?
                                <RippleEffect
                                    style={styles.searchIconStyle}
                                // onPress={() => { this.setState({ secureText: !this.state.secureText }) }}
                                >
                                    <Image
                                        source={require('../../assets/search/searchIcon.png')}
                                        style={styles.searchIconStyle}
                                    />
                                </RippleEffect> :
                                null
                            }
                            <TextInput
                                // onKeyPress={this.keyPress}
                                onSubmitEditing={onSubmitEditing}
                                returnKeyType='done'
                                autoCorrect={false}
                                ref={ref => this.input = ref}
                                secureTextEntry={this.state.secureText}
                                keyboardType={keyboardType}
                                autoCapitalize='none'
                                editable={disable ? false : true}
                                placeholderTextColor={inputLabelColor}
                                value={value}
                                multiline={multiline}
                                onChangeText={onChangeText}
                                // placeholder={this.state.labelShow ? '' : label}
                                maxLength={maxLength}
                                style={[styles.inputStyle, inputeWrapperStyle, { fontFamily: this.state.secureText ? null : yekanLight }]}
                            // style={[styles.inputStyleInSearchMode, { top: password ? this.state.secureText ? hp(.5) : hp(.4) : hp(.5), }]}
                            // style={styles.inputStyle}
                            />

                            {password ?
                                <RippleEffect
                                    style={styles.iconButton}
                                    onPress={() => { this.setState({ secureText: !this.state.secureText }) }}
                                >
                                    <Image
                                        source={this.state.secureText ? require('../../assets/eyes/hide.png') : require('../../assets/eyes/eyes.png')}
                                        style={styles.icon}
                                    />
                                </RippleEffect>
                                :
                                null
                            }

                        </View>
                    </View >
                }


            </View>

        )

    }

}
// const { hasIcon} = props;
const styles = StyleSheet.create({
    container: {
        width: wp(79.7),
        height: hp(5.5),
        // height: hp(4.6),
        borderRadius: theme.sizes.globalRadius,
        backgroundColor: theme.colors.white2,
        alignSelf: 'center',
        // alignItems: 'center',
        justifyContent: 'center',
        // marginTop: hp(1.1),
        // marginBottom: hp(1.1),
        borderWidth: hp(.12),
        borderColor: theme.colors.blue3,
    },
    inputStyle: {
        borderRadius: theme.sizes.globalRadius,
        textAlign: 'right',
        // fontWeight: '200',
        // fontFamily: iranSans,
        // fontFamily: yekanLight,
        fontSize: normalize(14),
        // lineHeight:1,
        left: wp(3),
        paddingLeft: wp(7),
        top: wp(.2),
        color: txtBlack,
        paddingTop: hp(0),
        paddingBottom: hp(0),
        flex: 1,
        textAlignVertical: 'center',
        // padding:hp(5),
        borderWidth: 0,
        // height: hp(3.5),
    },
    // inputStyleInSearchMode: {
    //     fontFamily: yekan,
    //     textAlign: 'right',
    //     color: txtBlack,
    //     fontSize: font14,
    //     // fontSize: font16,
    //     paddingRight: wp(2),
    //     paddingLeft: wp(8),
    //     top: hp(0),
    //     paddingTop: hp(1),
    //     paddingBottom: hp(1),
    //     // top: hp(1.2),
    //     flex: 1,
    //     textAlignVertical: 'top',
    //     borderWidth: 1
    // },
    inputStyleInSearchMode: {
        fontFamily: iranSans,
        textAlign: 'right',
        color: 'red',
        fontSize: font14,
        // fontSize: font16,
        paddingRight: wp(2),
        paddingLeft: wp(8),
        top: hp(0),
        paddingTop: hp(2),
        paddingBottom: hp(2),
        // top: hp(1.2),
        flex: 1,
        textAlignVertical: 'center',
        borderWidth: 10,
        height: hp(5)
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
        justifyContent: 'center',
        // alignSelf: 'center',
        borderWidth: 0,
        // height: hp(4.6),
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
        width: wp(5.3),
        height: wp(5.3),
        resizeMode: 'contain',
    },
    searchIconStyle: {
        width: wp(6.4),
        height: hp(6.4),
        resizeMode: 'contain',
        borderWidth: 1
    },
    iconAction: {
        width: hp(4.4),
        height: hp(4.4),
        resizeMode: 'contain'
    },
    iconButton: {
        width: wp(7),
        height: hp(4.5),
        marginLeft: wp(3),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        top: hp(.2),
    },
    searchIconStyle: {
        width: wp(7),
        height: hp(4),
        marginRight: wp(2),
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lableStyle: {
        fontSize: fontSize14,
        fontFamily: iranSansLight,
        color: theme.colors.white2,
        // height: hp(4),
    },
})
// const styles = {

// }

export { CustomTxetInputes };