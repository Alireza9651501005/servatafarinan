// import React, { useEffect } from "react";
// import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
// import { CustomPending, ActionBar, CustomText } from "../../common/components";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { theme } from "../../common/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { headerText } from "./texts";
// import { getTransactions } from "./actions/creditAction";
// import { getTransactionsApi } from '../../utils/api/Url';
// import { sizes } from "../../common/constants/theme";
// import TransactionItem from "./components/TransactionItem";
// import { fontSize10 } from "../../utils/helper/responsiveSizes";


// export default function TransactionList({ navigation }) {

//     const states = useSelector(state => state);
//     const dispatch = useDispatch();

//     let loading, error, listData, pageNum, lastPage, listLoading;
//     loading = states.creditReducer.loading;
//     error = states.creditReducer.error;
//     listData = states.creditReducer.listData;
//     pageNum = states.creditReducer.pageNum;
//     lastPage = states.creditReducer.transactionsData.last_page;
//     listLoading = states.creditReducer.listLoading;

//     // useEffect(() => {
//     //     dispatch(getTransactions('get', getTransactionsApi, 1, []))
//     // }, [])


//     // const renderTransactionsList = () => {
//     //     return (
//     //         <View style={{ flex: 1}}>
//     //             <CustomText bold style={{marginRight:wp(5)}}>تراکنش ها</CustomText>
//     //             <FlatList
//     //                 style={{ paddingTop: hp(2),flex:1}}
//     //                 // contentContainerStyle={{ paddingBottom: hp(10), paddingTop: hp(2) }}
//     //                 data={listData}
//     //                 keyExtractor={(_, i) => i.toString()}
//     //                 renderItem={({ item, index }) =><TransactionItem item={item} index={index}/>}
//     //                 ListFooterComponent={ListFooter(listLoading)}
//     //                 ListHeaderComponent={() =><HeaderListComponent/>}
//     //                 // ItemSeparatorComponent={() => <ItemSeperator />}
//     //                 onEndReached={({ distanceFromEnd }) => {
//     //                     // if (distanceFromEnd >= 0) {
//     //                         onEndFunction();
//     //                     // }
//     //                 }}
//     //                 onEndReachedThreshold={0.3}
//     //             />
//     //         </View>
//     //     )
//     // }
//     // const ListFooter = (loading) => () => {
//     //     if (loading) {
//     //         return (
//     //             <View style={{ height: hp(12), width: '100%', borderWidth: 0, marginTop: hp(2) }}>
//     //                 <ActivityIndicator size={hp(4)} color={'#00b'} />
//     //             </View>
//     //         )
//     //     } else {
//     //         return (
//     //             <View style={{height:hp(12)}}></View>
//     //         )
//     //     }
//     // }
//     // const onEndFunction = () => {
//     //     //console.log('onEndFunction')
//     //     //console.log('lastPage', lastPage)
//     //     if (pageNum <= lastPage) {
//     //         dispatch(getTransactions('get', getTransactionsApi, pageNum, listData))
//     //     }
//     // }

//     return (
//         <View style={styles.container}>
//             {
//             // listError?
//                 // <CustomPending
//                 //     style={styles.pending}
//                 //     pending={false}
//                 //     retryAction={() => dispatch(getTransactions('get', getTransactionsApi, 1, []))} /> :
//                 renderTransactionsList()
//             }

//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     pending: {
//         position: 'relative',
//         marginTop: hp(40)
//     }
// })
