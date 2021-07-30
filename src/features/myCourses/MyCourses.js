import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { BigHeader, ParentViewActionBar, ProfilePageForGuestUser } from '../../common/components';
import { colors } from '../../common/constants/theme';
import { changeAppHeaderColor } from '../../store/globalActions';
import MyCoursesNavigator from './components/MyCoursesNavigator';
import MyCoursesList from './MyCoursesList';
import { myCoursesActiveTab } from './actions/myCoursesAction';

export default function MyCourses({route,navigation}) {
    const dispatch = useDispatch()
    const states = useSelector(state => state)
    const accessToken = states.globalReducer.accessToken
    useEffect(()=>{
        dispatch(myCoursesActiveTab('0'))
        dispatch(changeAppHeaderColor(colors.headerDarkBlue))
    },[])
    if(accessToken.length>2){
        return (
            <View style={styles.container}>
                <BigHeader 
                    title={'دوره های من'}
                    bigImage = {require('../../assets/mycourses/banner.png')}
                />
                <MyCoursesNavigator />
                <MyCoursesList navigation={navigation}/>
            </View>
        )
    } else {
        return (
            <ParentViewActionBar titleColor={colors.textWhite} style={{ width: '100%' }} navigation={navigation} title={'دوره های من'} back>
                {/* <CustomeButton onPress={() => { navigation.navigate('AuthenticationStepOne') }}>ثبت نام / ورود</CustomeButton> */}
                <ProfilePageForGuestUser navigation={navigation} />
            </ParentViewActionBar>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:colors.background,
        flex:1
    }
})