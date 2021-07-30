import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import { ParentViewActionBar, CustomPending, GeneralList, CustomTxetInputes } from '../../common/components'
import { theme } from '../../common/constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { changeGeneralListPageNum, getGeneralList } from './actions/generalListAction';
import { CustomsearchTxtInput } from "../../common/components/CustomsearchTxtInput";
import { textHeaderWhite } from '../../utils/helper/commonVariables';

class GeneralListScreen extends Component {
    constructor() {
        super();
        this.test = null;
    }
    state = {
        buttonAction: '',
        searchTerm: '',
        istyping: false,
    }

    componentDidMount() {
        this.getListData()
    };
    getListData() {
        const buttonAction = this.props.route.params;
        //console.log('buttonAction', buttonAction)
        let { pageNum, getGeneralList, changeGeneralListPageNum } = this.props;
        // changeGeneralListPageNum(1)
        this.setState({ buttonAction: buttonAction })
        pageNum = 1;
        const url = buttonAction.api + '?page=' + pageNum
        getGeneralList('get', url, 1, [])
    };
    searchInListData = () => {
        const buttonAction = this.props.route.params
        let { pageNum, getGeneralList, changeGeneralListPageNum } = this.props;
        changeGeneralListPageNum(1)
        this.setState({ buttonAction: buttonAction })
        pageNum = 1;
        const url = buttonAction.api + '?page=' + pageNum + '&q=' + this.state.searchTerm;
        //console.log('searchInListData', url)
        getGeneralList(buttonAction.api_method, url, 1, [])
    };
    onEndFunction() {
        // alert('ok')
        const { buttonAction } = this.state;
        const { pageNum, getGeneralList, contents, listData } = this.props;
        const url = buttonAction.api + '?page=' + pageNum
        if (pageNum <= contents.last_page) {
            getGeneralList(buttonAction.api_method, url, pageNum, listData)
        }
    };
    componentWillUnmount() {
        this.props.changeGeneralListPageNum(1)
    };
    componentDidUpdate = async (prevStates) => {
        const { searchTerm, istyping } = this.state;
        clearTimeout(this.test)
        if (prevStates.searchTerm != searchTerm) {
            this.test = setTimeout(() => {
                istyping ? [this.searchInListData(), this.setState({ istyping: false }), this.props.changeGeneralListPageNum(1)] : null
            }, 1000);
        }
    };
    render() {
        const { failed, pending, contents, pageNum, listLoading, listData, buttonAction, appHeaderColor } = this.props;
        //console.log('loading ====', pending)
        return (
            <ParentViewActionBar noRradius titleColor={textHeaderWhite} back title={this.state.buttonAction.title} navigation={this.props.navigation}>
                <View style={[styles.searchInputeContainer, { backgroundColor: appHeaderColor }]}>
                    <CustomTxetInputes searchMode wrapperStyle={styles.searchInpute} hasIcon onChangeText={text => this.setState({ searchTerm: text, istyping: true })} value={this.state.searchTerm} />
                    {/* <CustomsearchTxtInput wrapperStyle={styles.searchInpute} hasIcon onChangeText={text => this.setState({ searchTerm: text, istyping: true })} value={this.state.searchTerm} /> */}
                </View>
                {/* <ScrollView showsVerticalScrollIndicator={false} > */}
                {/* <Buttons props={this.props} /> */}
                {failed == true || pending == true ?
                    <CustomPending
                        style={styles.pending}
                        pending={pending}
                        retryAction={() => console.log('retry')} /> :
                    < GeneralList
                        buttonAction={this.props.route.params}
                        onPullDown={
                            () => {
                                this.getListData();
                                this.setState({ searchTerm: '' })
                            }
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
    },
    searchInpute: {
        width: wp(86.7),
        height: hp(5),
        backgroundColor: 'white',
        marginTop: hp(.5),
        borderRadius: hp(2)
    },
    searchInputeContainer: {
        width: wp(100),
        borderWidth: 0,
        height: hp(7),
        borderBottomLeftRadius: hp(2),
        borderBottomRightRadius: hp(2)
    },
})

const mapStateToProps = (state) => ({
    pending: state.generalListReducer.loading,
    failed: state.generalListReducer.error,
    contents: state.generalListReducer.generalListData,
    pageNum: state.generalListReducer.pageNum,
    listLoading: state.generalListReducer.listLoading,
    listData: state.generalListReducer.listData,
    appHeaderColor: state.globalReducer.appHeaderColor
})

const mapDispatchToProps = {
    getGeneralList,
    changeGeneralListPageNum
}
export default connect(mapStateToProps, mapDispatchToProps)(GeneralListScreen)