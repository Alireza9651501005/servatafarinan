import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CustomPending, CustomText, ParentViewActionBar } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors, sizes } from "../../common/constants/theme";
import { getUserPublicProfile, getUserPublicProfilePending } from "./actions/publicProfileAction";
import PublicProfileShare from "./components/PublicProfileShare";
import LinearGradient from 'react-native-linear-gradient';
import PublicProfileInfo from "./components/PublicProfileInfo";
import PublicProfileImageRow from "./components/PublicProfileImageRow";
import PublicCoursesList from "./components/PublicCoursesList";
import { changePublicCoursesPageNum, getPublicCoursesSuccess } from "./actions/publicCoursesAction";
import { changeAppHeaderColor } from "../../store/globalActions";




export default function PublicProfile({ route, navigation }) {

    const states = useSelector(state => state);
    const dispatch = useDispatch();

    let id = route.params.id
    // //console.log(route)
    let profileData = states.publicProfileReducer;
    let publicCoursesReducer = states.publicCoursesReducer

    useEffect(() => {
        dispatch(changeAppHeaderColor(colors.headerDarkBlue))
        dispatch(getUserPublicProfile(id))
        // dispatch(getPublicCoursesSuccess('', []))
        // dispatch(changePublicCoursesPageNum(1))
        return () => {
            dispatch(getPublicCoursesSuccess('', []))
            dispatch(changePublicCoursesPageNum(1))
            dispatch(getUserPublicProfilePending())
        }
    }, []);

    return (
        <ParentViewActionBar scroll titleColor={colors.headerTitleColor} navigation={navigation} title={'پروفایل عمومی'} back >
            {profileData.error || profileData.loading ?
                <CustomPending
                    style={styles.pending}
                    pending={profileData.loading}
                    retryAction={() => dispatch(getUserPublicProfile(id))}
                />
                :
                < LinearGradient
                    colors={['#232a47', '#2a346a', '#3847a0', '#3847a0']}
                    style={styles.darkCard} >

                    <PublicProfileShare shareContent={profileData.share_content} />
                    <PublicProfileImageRow profileData={profileData.profileData} />
                    <PublicProfileInfo profileData={profileData.profileData} />
                    <CustomText style={{ alignSelf: 'center', color: colors.textWhite, marginBottom: hp(1) }}>دوره‌های آموزشی</CustomText>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {publicCoursesReducer.listData.length<2?null:<View style={{ width: wp(5), alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                style={{ width: wp(3), height: wp(3), resizeMode: 'contain', top: -wp(3) }}
                                source={require('../../assets/arrow/arrow-left.png')}
                            />
                        </View>}

                        <View style={{ height: wp(43), flex: 1, paddingRight: sizes.globalMargin }}> 
                           {profileData.profileData?<PublicCoursesList publicProfile={id} layout={'profile'} navigation={navigation} /> :null}
                        </View>
                    </View>

                </ LinearGradient>

            }
        </ParentViewActionBar>
    )


}



const styles = StyleSheet.create({
    pending: {
        position: "relative",
        marginTop: hp(34)
    },
    darkCard: {
        width: '90%',
        marginRight: sizes.globalMargin,
        marginLeft: sizes.globalMargin,
        marginTop: hp(2),
        marginBottom: hp(15),
        borderRadius: sizes.globalRadius,
        backgroundColor: colors.componentsDarkBlue
    }
});

