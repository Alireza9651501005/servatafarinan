import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { activeBAckMode, deleteRouteName, addRouteName, changeModalStatus } from 'store/globalActions';
import { CustomText } from './CustomText'
import { font14 } from '../../utils/helper/responsiveSizes';
import { RippleEffect } from '../components/RippleEffect';
import CustomeImage from "./CustomeImage";

export class Header extends Component {
    render() {
        const {
            title,
            leftItm,
            rightItm,
            rightItmOnpress,
            leftItmOnpress,
            activeOpacity,
            titleS
        } = this.props;
        return (
            <View style={styles.container}>
                <RippleEffect
                    rippleCentered
                    rippleContainerBorderRadius={wp(0)}
                    onPress={leftItmOnpress}
                    // onPress={leftItmOnpress ? this.handleBackButton : leftItmOnpress}
                    style={styles.leftItmTouchableArea}>
                    <Image
                        source={leftItm}
                        style={styles.leftItmArea}
                    />
                </RippleEffect>

                <View style={styles.titleWrapper}>
                    <CustomText bold style={[styles.title, titleS]}>{title}</CustomText>
                </View>

                <RippleEffect
                    // rippleSize={hp(8)}
                    rippleCentered
                    // rippleCentered={true}
                    // rippleSequential={true}
                    rippleContainerBorderRadius={wp(0)}
                    disabled={activeOpacity}
                    onPress={rightItmOnpress}
                    style={styles.rightItmTouchableArea}>
                    <Image
                        source={rightItm}
                        style={styles.rightItmArea}
                    />
                </RippleEffect>
            </View>
        )
    }
    
    navigateToProfile = () => {
        this.props.navigation.navigate('ProfileScreen')
    }
}

const styles = StyleSheet.create({
    container: {
        height: hp(5),
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0,
    },
    leftItmArea: {
        width: wp(4),
        height: hp(1.4),
        borderWidth: 0,
        resizeMode: 'contain',
        alignSelf: 'flex-start',
        marginLeft: wp(5)
    },
    leftItmTouchableArea: {
        width: wp(15),
        // width: wp(5),
        height: hp(5),
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    rightItmArea: {
        width: wp(7),
        height: hp(4),
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        marginRight: wp(5)
    },
    rightItmTouchableArea: {
        width: wp(15),
        // width: wp(18.5),
        height: hp(4.5),
        justifyContent: 'center',
        // alignItems: 'flex-end',
        borderWidth: 0
    },
    titleWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0
    },
    title: {
        fontSize: font14,
        // borderWidth:1,
        paddingBottom: hp(0.7),
    }
})
const mapDispatchToProps = {
    // activeBAckMode,
    // deleteRouteName,
    // addRouteName,
    // changeModalStatus
}
const mapStateToProps = state => {
    return {
    //     routeNames: state.globalReducer.routeNames,
    //    serviceType: state.servicesReducer.selectedService.type,
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)