import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, ImageBackground, Keyboard } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ActionBar } from '.'
import { theme } from '../constants'
import { appBAckgroundColor, whiteThird, white } from '../../utils/helper/commonVariables'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { reportcatchToFireBase } from '../../utils/helper/functions'
class AuthenticationParentView extends Component {
    constructor(props) {
        super(props)
        Keyboard.addListener('keyboardDidShow', this.handleKeyboardShow.bind(this));
        Keyboard.addListener('keyboardDidHide', this.handleKeyboardHide.bind(this));
        this.state = {
            activeScroll: true,
            flexGrowValue: 1
        }
        this.scroll = null;
    }
    handleKeyboardShow = async (event) => {
        try {
            // this.setState({ activeScroll: !this.state.activeScroll })
            // this.scroll.scrollToPosition(100, hp(100))
            if (Platform.OS == 'android') {
                this.setState({ activeScroll: !this.state.activeScroll, flexGrowValue: .20 }, () => {
                    setTimeout(() => {
                        // alert()
                        // this.scroll.scrollToPosition(0, hp(0))
                        this.props.scrollToPosition ? this.scroll.scrollToPosition(this.props.scrollToPosition, hp(this.props.scrollToPosition)) : null
                    }, 200);
                })
                // setTimeout(() => {
                //     this.scroll ? this.scroll.scrollToPosition(100, hp(100)) : null
                // }, 250);
            }
        } catch (error) {
            reportcatchToFireBase(error, 'AuthenticationParentView.js/line:36')
            console.log('error')
        }
    };
    handleKeyboardHide = () => {
        this.setState({ flexGrowValue: 1 })
        // this.setState({ activeScroll: true })
    };

    render() {
        const parent = [
            styles.container,
            this.props.style
        ]
        const {
            screenName,
            buttomPicture,
            followHeaderShape,
            noRradius,
            share,
            shareOnPress,
            navigation,
            titleColor,
            back,
            title,
            menu,
            buttomPictureType,
            buttomPictureContainerHeight,
            scrollToPosition,
            style
        } = this.props;
        let buttomPictureSrc = require('../../assets/authenticationBAckgroundImage/authenticationBAckgroundImage.png');
        if (buttomPictureType == 'changePasswordMode') {
            buttomPictureSrc = require('../../assets/changePasswordBottomPicture/changePasswordBottomPicture.png');
        }
        // if (false) {
        if (!scrollToPosition) {
            return (
                <View style={[{ flex: 1, backgroundColor: theme.colors.headerDarkBlue },style]}>
                    <View style={{ height: hp(8), borderWidth: 0, borderColor: 'green' }}>
                        {this.props.title || this.props.back ? <ActionBar
                            noRradius={noRradius}
                            share={share}
                            shareOnPress={shareOnPress}
                            navigation={navigation}
                            titleColor={titleColor}
                            back={back}
                            title={title}
                            menu={menu} />
                            : null}
                    </View>

                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps='handled'
                        scrollEnabled={false}
                        style={{ borderWidth: 0, borderColor: 'blue' }}
                        contentContainerStyle={{ justifyContent: 'space-between', flexGrow: 1 }}
                    >
                        <View style={{ borderWidth: 0, borderColor: 'cyan', height: hp(60) }}>
                            {
                                this.props.children
                            }
                        </View>
                        {buttomPicture ?
                            <View style={{
                                // flex: 1,
                                borderWidth: 0,
                                borderColor: 'red',
                                // height: hp(30),
                                // height: buttomPictureContainerHeight ? hp(40) : null,
                                // flex:1,
                                // height:'100%'
                                // height: buttomPictureContainerHeight ? hp(buttomPictureContainerHeight) : null,
                                // justifyContent: 'flex-end'
                            }}>
                                <ImageBackground
                                    source={buttomPictureSrc}
                                    style={[styles.authenticationBAckgroundImageStyle, { borderWidth: 0, height: hp(25) }]}
                                // style={[styles.authenticationBAckgroundImageStyle, { marginTop: screenName && screenName != 'Register' ? hp(47) : screenName == 'Register' ? hp(18.5) : hp(5) }]}
                                />
                            </View>
                            : null}
                    </KeyboardAwareScrollView>


                </View>
            )

        } 
        else if(scrollToPosition){
            return (
                <View style={[{ flex: 1, backgroundColor: theme.colors.headerDarkBlue },style]}>
                    <View style={{ height: hp(8), borderWidth: 0, borderColor: 'magenta' }}>
                        {this.props.title || this.props.back ? <ActionBar
                            noRradius={noRradius}
                            share={share}
                            shareOnPress={shareOnPress}
                            navigation={navigation}
                            titleColor={titleColor}
                            back={back}
                            title={title}
                            menu={menu} />
                            : null}
                    </View>
                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps='handled'
                        contentContainerStyle={[styles.scrollContainer, { flexGrow:scrollToPosition? this.state.flexGrowValue:1 }]} //style changed to contentContainerStyle
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={scrollToPosition?{ marginBottom: this.state.flexGrowValue == 0 ? hp(5) : hp(0),borderWidth:0 }:{}}
                        ref={ref => {
                            this.scroll = ref
                        }}
                        scrollEnabled={scrollToPosition?true:false}
                    >
                        <View
                            style={{
                                justifyContent: "space-between",
                                // backgroundColor: "green",
                                flex: 1 ,//flex added
                                borderWidth:0,
                                borderColor:'yellow'
                            }}
                        >
                            {
                                this.props.children
                            }
                            {/* {this.state.flexGrowValue==0 ? <View style={{ height: hp(50) }} /> : null} */}


                            {buttomPicture ?
                                <View style={{
                                    borderWidth: 0,
                                    borderColor: 'red',

                                }}>
                                    <ImageBackground
                                        source={buttomPictureSrc}
                                        style={[styles.authenticationBAckgroundImageStyle, { borderWidth: 0, height: hp(25) }]}
                                    />
                                </View>
                                : null}


                        </View>
                    </KeyboardAwareScrollView>
                </View>
            );
        }




        // return (
        //     <View style={{ flex: 1, height: hp(100) }}>
        //         {this.props.title || this.props.back ? <ActionBar noRradius={noRradius} share={share} shareOnPress={shareOnPress} navigation={navigation} titleColor={titleColor} back={back} title={title} menu={menu} /> : null}
        //         {followHeaderShape ?
        //             <View style={[styles.followHeaderShapeStyle, { backgroundColor: theme.colors.darkBlue }]} />
        //             : null}
        //         <KeyboardAwareScrollView
        //             scrollEnabled={this.state.activeScroll}
        //             keyboardShouldPersistTaps='handled'
        // ref={ref => {
        //     this.scroll = ref
        // }}
        //             resetScrollToCoords={{ x: 0, y: 0 }}
        //             contentContainerStyle={[parent ]}
        //             // contentContainerStyle={[parent, this.state.activeScroll ? { flex: 1 } : {} ]}
        //             // contentContainerStyle={[parent, this.state.activeScroll ? screenName && screenName != 'Register' ? { flex: 1 } : {} : { flex: 1 }]}
        //         >

        //             {/* <Text style={{ color: white }}>{this.state.activeScroll.toString()}</Text> */}

        //             <ScrollView  style={{borderWidth:0,borderColor:'green'}} keyboardShouldPersistTaps="handled">
        //                 {
        //                     this.props.children
        //                 }                 


        //                 {buttomPicture ?
        //                     <View style={{
        //                         borderWidth: 0,
        //                         borderColor: 'red',
        //                         height: buttomPictureContainerHeight ? hp(buttomPictureContainerHeight) : null,
        //                        justifyContent: 'flex-end'
        //                     }}>
        //                         <ImageBackground
        //                             source={buttomPictureSrc}
        //                             style={[styles.authenticationBAckgroundImageStyle, { borderWidth: 0, height: hp(10) }]}
        //                         // style={[styles.authenticationBAckgroundImageStyle, { marginTop: screenName && screenName != 'Register' ? hp(47) : screenName == 'Register' ? hp(18.5) : hp(5) }]}
        //                         />
        //                     </View>
        //                     : null}
        //                 {/* {buttomPicture ?
        //                     <View style={{
        //                         borderWidth: 1,
        //                         borderColor: 'red',
        //                         height: buttomPictureContainerHeight ? hp(buttomPictureContainerHeight) : null,
        //                        justifyContent: 'flex-end'
        //                     }}>
        //                         <ImageBackground
        //                             source={buttomPictureSrc}
        //                             style={[styles.authenticationBAckgroundImageStyle, { borderWidth: 0, height: hp(10) }]}
        //                         // style={[styles.authenticationBAckgroundImageStyle, { marginTop: screenName && screenName != 'Register' ? hp(47) : screenName == 'Register' ? hp(18.5) : hp(5) }]}
        //                         />
        //                     </View>
        //                     : null} */}
        //             </ScrollView>

        //         </KeyboardAwareScrollView>
        //     </View>
        // )
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.darkBlue,
        // height: hp(93)
        // backgroundColor: theme.colors.background,
        // flex: 1,
    },
    authenticationBAckgroundImageStyle: {
        minHeight: hp(24),
        // minHeight: hp(24),
        width: '100%', height: '100%',
        // width: wp(99.9),
        borderWidth: 0,
        borderColor: whiteThird,
        // justifyContent: 'center',
        // alignSelf: 'flex-end',
        resizeMode: 'contain',
        // bottom: hp(0),
        // top: hp(2),
        // flex: 1,
    },
    followHeaderShapeStyle: {
        width: wp(100),
        borderWidth: 0,
        height: hp(6),
        borderBottomLeftRadius: theme.sizes.globalRadius,
        borderBottomRightRadius: theme.sizes.globalRadius,
    },

    scrollContainer: {
        // backgroundColor: "yellow",
        // flex:1

        //added flexGrow
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 2,//flex added
        borderWidth: 0
    },
    formConstainer: {
        flex: 1,
        borderColor: 'red',
        borderWidth: 0//flex added
    },
})
export { AuthenticationParentView }
// render() {
//     const parent = [
//         styles.container,
//         this.props.style
//     ]
//     return (
//         <View style={parent}>
//             {this.props.title || this.props.back ? <ActionBar share={this.props.share} shareOnPress={this.props.shareOnPress} navigation={this.props.navigation} titleColor={this.props.titleColor} back={this.props.back} title={this.props.title} menu={this.props.menu} /> : null}
//             {
//                 this.props.children
//             }
//             {/* <View style={{ width: wp(100), borderWidth: 0, borderColor: whiteThird, flex: 1, justifyContent: 'flex-end' }}> */}
//             <View style={{ width: wp(100),borderWidth: 0, borderColor: whiteThird, flex: 1 }} />
//             <ImageBackground
//                 source={require('../../assets/authenticationBAckgroundImage/authenticationBAckgroundImage.png')}
//                 style={styles.authenticationBAckgroundImageStyle}
//             />
//             {/* </View> */}
//         </View>
//     )