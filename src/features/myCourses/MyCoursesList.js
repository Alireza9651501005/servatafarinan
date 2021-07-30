import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, Text, Pressable, Image, ActivityIndicator, FlatList } from 'react-native';
import { ParentViewActionBar, ContentList, GradientImageButton, CustomPending, CommentsList, RippleEffect, CustomTextInput, CustomText } from '../../common/components'
import { theme, strings } from '../../common/constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { changeMyCoursesPageNum, getMyCourses, } from './actions/myCoursesAction'
import { myCoursesApi } from '../../utils/api/Url';
import { MyCoursesItem } from './components/MyCoursesItem';
import { MyCoursesProfileItem } from '../profile/components/MyCoursesProfileItem';
import { colors } from '../../common/constants/theme';

class MyCoursesList extends Component {

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
        const { pageNum, getMyCourses, changeMyCoursesPageNum, lessonId, activeTab } = this.props;
        changeMyCoursesPageNum(1)

        const url = myCoursesApi
        const filter = '&filter=' + activeTab
        getMyCourses('get', url, 1, [], filter)
    }

    onEndFunction() {
        const { pageNum, getMyCourses, contents, listData, lessonId, activeTab,  } = this.props;
        // const url = myCoursesApi
        const url = myCoursesApi
        const filter = '&filter=' + activeTab
        if (pageNum <= contents.last_page) {
            getMyCourses('get', url, pageNum, listData, filter)
        }
    }

    componentWillUnmount() {
        this.props.changeMyCoursesPageNum(1)
    }

    renderMyCoursesList() {
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
                    renderItem={({ item, index }) => this.props.layout === 'profile' ?
                        <MyCoursesProfileItem actions={item.action} item={item} index={index} />
                        :
                        <MyCoursesItem actions={item.action} item={item} index={index} />

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
                    this.renderMyCoursesList()
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
    pending: state.myCoursesReducer.loading,
    failed: state.myCoursesReducer.error,
    contents: state.myCoursesReducer.myCoursesData,
    pageNum: state.myCoursesReducer.pageNum,
    listLoading: state.myCoursesReducer.listLoading,
    listData: state.myCoursesReducer.listData,
    activeTab: state.myCoursesReducer.activeTab
})

const mapDispatchToProps = {
    getMyCourses,
    changeMyCoursesPageNum
}
export default connect(mapStateToProps, mapDispatchToProps)(MyCoursesList)