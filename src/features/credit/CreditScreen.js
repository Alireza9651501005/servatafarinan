import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { CustomPending, ActionBar, CustomText, ParentViewActionBar, ProfilePageForGuestUser } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { headerText } from "./texts";
import { getCredit, getTransactions } from "./actions/creditAction";
import { getTransactionsApi } from '../../utils/api/Url';
import TransactionList from "./TransactionsList";
import CreditCard from "./components/CreditCard";
import { changeAppHeaderColor } from "../../store/globalActions";
import { colors, sizes } from "../../common/constants/theme";
import { fontSize10 } from "../../utils/helper/responsiveSizes";
import TransactionItem from "./components/TransactionItem";
import Spinner from "react-native-spinkit";


export default function CreditScreen({ navigation }) {

    const states = useSelector(state => state);

    let loading, error, listData, pageNum, lastPage, listLoading, walletData;
    loading = states.creditReducer.loading;
    error = states.creditReducer.error;
    listData = states.creditReducer.listData;
    pageNum = states.creditReducer.pageNum;
    lastPage = states.creditReducer.transactionsData.last_page;
    listLoading = states.creditReducer.listLoading;
    walletData = states.creditReducer.walletData

    useEffect(() => {
        dispatch(getCredit())
        dispatch(changeAppHeaderColor(colors.headerDarkBlue))
        dispatch(getTransactions('get', getTransactionsApi, 1, []))

    }, [])

    const dispatch = useDispatch();

    const onPullDown = () => {
        dispatch(getCredit())
        dispatch(getTransactions('get', getTransactionsApi, 1, []))
    }


    const renderTransactionsList = () => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => onPullDown()}
                        />
                    }
                    style={{  flex: 1 }}
                    // contentContainerStyle={{ paddingBottom: hp(10), paddingTop: hp(2) }}
                    data={listData}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={({ item, index }) => <TransactionItem item={item} index={index} />}
                    ListFooterComponent={ListFooter(listLoading)}
                    ListHeaderComponent={() => HeaderListComponent()}
                    // ItemSeparatorComponent={() => <ItemSeperator />}
                    onEndReached={({ distanceFromEnd }) => {
                        // if (distanceFromEnd >= 0) {
                        onEndFunction();
                        // }
                    }}
                    onEndReachedThreshold={0.3}
                />
            </View>
        )
    }
    const ListFooter = (loading) => () => {
        if (loading) {
            return (
                <View style={{ height: hp(12),alignItems:'center', width: '100%', borderWidth: 0, marginTop: hp(2) }}>
                    {/* <ActivityIndicator size={hp(4)} color={'#00b'} /> */}
                    <Spinner type={'ThreeBounce'} size={hp(4)} color={colors.progress}/>
                </View>
            )
        } else {
            return (
                <View style={{ height: hp(12) }}></View>
            )
        }
    }
    const onEndFunction = () => {
        //console.log('onEndFunction')
        //console.log('lastPage', lastPage)
        if (pageNum <= lastPage) {
            dispatch(getTransactions('get', getTransactionsApi, pageNum, listData))
        }
    }


    const HeaderListComponent = (props) => {
        return (
            <View>
                <CreditCard data={walletData} />
                <CustomText bold style={{ marginRight: wp(5) }}>تراکنش ها</CustomText>

                <View style={{ flexDirection: 'row-reverse', paddingRight: sizes.globalMargin, paddingLeft: sizes.globalMargin ,marginTop:hp(1)}}>
                    <View style={{ flex: 2, alignItems: 'center' }}>
                        <CustomText >تاریخ</CustomText>
                    </View>

                    <View style={{ flex: 3, alignItems: 'center' }}>
                        <CustomText >مبلغ<CustomText style={{ fontSize: fontSize10 }}>(تومان)</CustomText></CustomText>
                    </View>

                    <View style={{ flex: 5, alignItems: 'center' }}>
                        <CustomText >بابت</CustomText>
                    </View>
                </View>
            </View>
        )


    }

    if(states.globalReducer.accessToken.length>2){
        return (
            <View style={{ backgroundColor: theme.colors.background, height: hp(99) }} >
                <ActionBar back titleColor={theme.colors.someHeaderColor} title={headerText} navigation={navigation} />
                {error || loading == true ?
                    <CustomPending
                        style={styles.pending}
                        pending={loading}
                        retryAction={() => {
                            dispatch(getCredit());
                            dispatch(getTransactions('get', getTransactionsApi, 1, []))
                        }} /> :
                    <View style={{ flex: 1 }}>
                        {/* <CreditCard data={walletData} /> */}
                        <View style={{ flex: 1 }}>
                            {renderTransactionsList()}
    
                        </View>
    
                    </View>
                }
            </View>
        )
    }else{
        return (
            <ParentViewActionBar titleColor={colors.textWhite} style={{ width: '100%' }} navigation={navigation} title={headerText} back>
              {/* <CustomeButton onPress={() => { navigation.navigate('AuthenticationStepOne') }}>ثبت نام / ورود</CustomeButton> */}
              <ProfilePageForGuestUser navigation={navigation} />
            </ParentViewActionBar>
          ) 
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pending: {
        position: 'relative',
        marginTop: hp(40)
    }
})

