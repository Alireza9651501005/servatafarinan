import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import { ParentViewActionBar, CustomPending, LeaderboardDetailList } from '../../common/components'
import { theme } from '../../common/constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { changeLeaderboardListPageNum, getLeaderboardList } from './actions/leaderboardDetailAction';
import { leaderboardDetailApi } from '../../utils/api/Url';
import { monthlyRankText, yearlyRankText } from './texts';

class LeaderboardDetailScreen extends Component {

    state = {
        params: ''
    }

    componentDidMount() {
        this.getListData()
    }

    getListData(){
        const params = this.props.route.params
        const { pageNum, getLeaderboardList, changeLeaderboardListPageNum } = this.props;
        changeLeaderboardListPageNum(1)
        this.setState({ params: params })
        const url = leaderboardDetailApi + params.type + '?page=' + pageNum
        getLeaderboardList( url, 1, [])
    }

    onEndFunction() {
        // alert('ok')
        const { params } = this.state;
        const { pageNum, getLeaderboardList, contents, listData } = this.props;
        const url = leaderboardDetailApi + params.type + '?page=' + pageNum
        if (pageNum <= contents.last_page) {
            getLeaderboardList( url, pageNum, listData)
        }
    }

    componentWillUnmount() {
        this.props.changeLeaderboardListPageNum(1)
    }

    render() {
        const { failed, pending, contents, pageNum, listLoading, listData } = this.props;
    //console.log('loading ====',pending)

        return (

            <ParentViewActionBar back title={this.state.params.type==='monthly'?monthlyRankText:yearlyRankText} navigation={this.props.navigation}  >
                {/* <ScrollView showsVerticalScrollIndicator={false} > */}
                {/* <Buttons props={this.props} /> */}
                {failed == true || pending == true ?
                    <CustomPending
                        style={styles.pending}
                        pending={pending}
                        retryAction={() => console.log('retry')} /> :
                    <LeaderboardDetailList
                        onPullDown={
                            () => this.getListData()
                        }
                        onEndFunc={
                            () => this.onEndFunction()
                        }
                        pageNum={pageNum}
                        listLoading={listLoading}
                        listData={listData}
                        data={contents}
                    />
                }
                {/* </ScrollView> */}
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
    pending: state.leaderboardDetailReducer.loading,
    failed: state.leaderboardDetailReducer.error,
    contents: state.leaderboardDetailReducer.leaderboardListData,
    pageNum: state.leaderboardDetailReducer.pageNum,
    listLoading: state.leaderboardDetailReducer.listLoading,
    listData: state.leaderboardDetailReducer.listData
})

const mapDispatchToProps = {
    getLeaderboardList,
    changeLeaderboardListPageNum
}
export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardDetailScreen)