import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, Text, Pressable, Image, ActivityIndicator, FlatList } from 'react-native';
import {
    ParentViewActionBar,
    ContentList,
    GradientImageButton,
    CustomPending,
    CommentsList,
    RippleEffect,
    CustomTextInput,
    CustomText
} from '../../../common/components'
import { theme, strings } from '../../../common/constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { changePublicCoursesPageNum, getPublicCourses, } from '../actions/publicCoursesAction'
import { PublicCoursesProfileItem } from './PublicCoursesProfileItem';
import { colors } from '../../../common/constants/theme';

class PublicCoursesList extends Component {

    state = {
        buttonAction: '',
        reply: ''
    }

    componentDidMount() {
        // this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getListData()

        // });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }


    getListData() {
        const { pageNum, getPublicCourses, changePublicCoursesPageNum, lessonId, activeTab, publicProfile } = this.props;
        changePublicCoursesPageNum(1)

        const url = `users/${publicProfile}/public-profile/courses` 
        getPublicCourses('get', url, 1, [])
    }

    onEndFunction() {
        const { pageNum, getPublicCourses, contents, listData, lessonId, activeTab, publicProfile } = this.props;
        // const url = publicCoursesApi
        const url =  `users/${publicProfile}/public-profile/courses`
        if (pageNum <= contents.last_page) {
            getPublicCourses('get', url, pageNum, listData)
        }
    }

    componentWillUnmount() {
        this.props.changePublicCoursesPageNum(1)
    }

    renderPublicCoursesList() {
        return (
            <View style={{ flex: 1 }}>

                <FlatList
                    inverted={this.props.layout === 'profile' ? this.props.listData.length == 0 ? false : true : false}
                    horizontal={this.props.layout === 'profile' ? true : false}
                    style={{ paddingTop: this.props.layout === 'profile' ? hp(0) : hp(2) }}
                    contentContainerStyle={{ paddingBottom: hp(2) }}
                    data={this.props.listData}
                    keyExtractor={(_, i) => i.toString()}
                    ListEmptyComponent={() =>
                        <View style={{ width: wp(80), alignSelf: 'center', height: wp(38), alignItems: 'center', justifyContent: 'center' }}>
                            <CustomText style={{ alignSelf: 'center', color: this.props.layout === 'profile' ? colors.textWhite : colors.textBlack }}>در حال حاضر دوره ای در لیست نیست‎</CustomText>
                        </View>}
                    renderItem={({ item, index }) => 
                        <PublicCoursesProfileItem actions={item.action} item={item} index={index} />
                    }
                    ListFooterComponent={() => this.ListFooter(this.props.loading)}
                    ItemSeparatorComponent={() => <View style={{ height: hp(2), width: wp(5) }} />}
                    onEndReached={() => this.onEndFunction()}
                    onEndReachedThreshold={0.5}
                />
                {/* <View style={{height:hp(10)}}/> */}
            </View>
        )
    }

    ListFooter(loading) {
        if (loading) {
            return (
                <View style={{ height: hp(11), width: '100%' }}>
                    <ActivityIndicator color={'#00b'} />
                </View>
            )
        } else {
            return (
                <View style={{ height: hp(11), width: '100%' }}></View>
            )
        }
    }


    render() {
        const { failed, pending, contents, pageNum, listLoading, listData } = this.props;
        return (

            <View style={styles.container}>
                {failed == true || pending == true ?
                    <CustomPending
                        style={styles.pending}
                        pending={pending}
                        retryAction={() => this.getListData()} /> :
                    this.renderPublicCoursesList()
                }

            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth: 5
    },
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
        marginTop: hp(7)
    }
})

const mapStateToProps = (state) => ({
    pending: state.publicCoursesReducer.loading,
    failed: state.publicCoursesReducer.error,
    contents: state.publicCoursesReducer.publicCoursesData,
    pageNum: state.publicCoursesReducer.pageNum,
    listLoading: state.publicCoursesReducer.listLoading,
    listData: state.publicCoursesReducer.listData,
    activeTab: state.publicCoursesReducer.activeTab
})

const mapDispatchToProps = {
    getPublicCourses,
    changePublicCoursesPageNum
}
export default connect(mapStateToProps, mapDispatchToProps)(PublicCoursesList)