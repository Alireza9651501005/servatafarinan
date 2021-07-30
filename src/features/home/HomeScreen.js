import React, { Component } from 'react';
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, ScrollView, Text, Pressable, Linking } from 'react-native'
import { ParentViewActionBar, ContentList, GradientImageButton, CustomPending, CustomText } from '../../common/components'
import { theme, strings } from '../../common/constants'
import { homeRequest } from './action/HomeAction'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import UserInfo from './components/UserInfo';
import HomeHeader from './components/HomeHeader';
//handle notifcation intract
import PushNotification from 'react-native-push-notification';
import { handleAction } from '../../utils/helper/functions';
import { store } from '../../store/store';
import { actionsTypes, browse, categoryLsit, creditView, lessonView, netWorkView, ProfileView } from '../../common/constants/variables';
import * as NavigationService from '../src/../../utils/NavigationService';
import AnimatedView from '../../common/components/AnimatedView';
import RankingButton from './components/RaninkgButton';


class HomeScreen extends Component {

    componentDidMount() {
        !this.props.logoutMode ? this.props.homeRequest() : null
    }

    render() {
        const { failed, pending, contents, tokenData, homeRequest, data } = this.props;
        return (
            <ParentViewActionBar
                style={{ backgroundColor: theme.colors.bgGray }}
                // onPullDown={()=>homeRequest}
                // scroll  
                navigation={this.props.navigation} menu >

                {/* <Buttons props={this.props} /> */}
                {failed == true || pending == true ?
                    <CustomPending
                        style={styles.pending}
                        pending={pending}
                        retryAction={() => this.props.homeRequest()}

                    /> :
                    <AnimatedView
                        customeHeader={<UserInfo navigation={this.props.navigation} userInfo={data.user} />}
                        onPullDown={() => this.props.homeRequest()}
                        // onPullDown={() => homeRequest}
                        type='home'
                        list={<ContentList
                            constantHeader={data.user ?
                                <UserInfo navigation={this.props.navigation} userInfo={data.user} />
                                :
                                <HomeHeader navigation={this.props.navigation} />
                            }
                            onPullDown={() => homeRequest}
                            // scroll={false}
                            contents={contents} />}
                    />
                }
            </ParentViewActionBar>

        )
    }

}
const Buttons = ({ props }) => (
    <View style={styles.buttonView}>
        {/* <GradientImageButton
            // onPress={() => props.navigation.navigate('categories')} 
            title={strings.category} icon={require('../../assets/category.png')}
            style={styles.button} />
        <GradientImageButton
            title={strings.search}
            icon={require('../../assets/whiteSearch.png')} /> */}
    </View>
)
const styles = StyleSheet.create({
    button: {
        marginRight: wp(5.5)
    },
    buttonView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: theme.sizes.verticalMargin10
    },
    pending: {
        position: 'relative',
        marginTop: hp(34)
    }
})

const mapStateToProps = (state) => ({
    pending: state.home.homePending,
    failed: state.home.failed,
    contents: state.home.contents,
    tokenData: state.authenticationReducer.tokensData,
    data: state.home.data,
    logoutMode: state.profileReducer.logOutMode,
})

const mapDispatchToProps = {
    homeRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)