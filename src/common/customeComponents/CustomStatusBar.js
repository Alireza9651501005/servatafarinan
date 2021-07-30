import React, { Component } from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { hasNotch } from 'react-native-device-info'

class CustomStatusBar extends Component {

    state = {
        color: '#fff'
    }

    calculateHeight(){
        let has = hasNotch()

        if(this.props.currentRouteName==='VideoScreen'){
            return 1 
        }
        else{
            if(has){ return 50 }
            else { return 20}
        }
       
    }
    render() {
        console.log('=====================>',this.calculateHeight(),this.props.currentRouteName)
        let has = hasNotch()

        const { appStatusBarColor,splashLoading } = this.props;
        //console.log('noch noch noch', has)
        if (Platform.OS === 'ios') {
            return (
                <View style={{ height: this.calculateHeight(), backgroundColor: appStatusBarColor}}>
                    <StatusBar hidden backgroundColor={appStatusBarColor} barStyle='light-content' />
                </View>
            )
        } else {
            return (
                <View >
                    <StatusBar hidden={!splashLoading} backgroundColor={appStatusBarColor} barStyle='light-content' />

                </View>

            )
        }

    }
}

const mapStateToProps = (state) => ({
    currentRouteName: state.globalReducer.currentRouteName,
    appStatusBarColor: state.globalReducer.appHeaderColor,
    splashLoading: state.splashReducer.success,
})

export default connect(mapStateToProps, {})(CustomStatusBar);