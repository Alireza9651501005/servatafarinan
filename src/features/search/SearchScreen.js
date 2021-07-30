import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp,  heightPercentageToDP as hp} from "react-native-responsive-screen";
import {useDispatch } from "react-redux";
import { searchTermAction } from "./actions/searchAction";
import { ParentViewActionBar, ContentList, CustomPending } from '../../common/components'
import { CustomTxtInput } from "../../common/components/CustomTxtInput";
import { headerText } from "./texts";
export default function SearchScreen({ navigation }) {
  //states
  const [searchTerm, setSearchTerm] = useState('')
  const [contentRowsData, setContentRowsData] = useState({ loading: false, data: {} })
  //useEffect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(searchTermAction(searchTerm, apiHandle))
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])
  //dispatch
  const dispatch = useDispatch();
  //funtion
  const renderPageContent = () => {
    let loading = contentRowsData.loading;
    if (loading) {
      return (
        <CustomPending style={styles.pending} pending={loading} retryAction={() => dispatch(searchTermAction(searchTerm, apiHandle))} />
      )
    } else {
      let contentRows = contentRowsData.data.content_rows;
      //console.log('contentRows',contentRowsData.data.content_rows)
      return (
        //need append onPullDown  in ContentList?
        //onPullDown={() => homeRequest}
        <ContentList contents={contentRows} />
        // null
      )
    }
  }
  const apiHandle = (value) => {
    if (value === 'pending') {
      setContentRowsData({ ...contentRowsData, loading: true })
    }
    else if (value === 'error') {
      setContentRowsData({ ...contentRowsData, loading: false })
    }
    else {
      setContentRowsData({ ...contentRowsData, loading: false, data: value })
    }
  }
  return (
    <ParentViewActionBar navigation={navigation} title={headerText} back >
      <CustomTxtInput
        wrapperStyle={{ width: wp(80), marginTop: hp(2), marginBottom: hp(2) }}
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
      label={headerText}
      />
      {renderPageContent()}
    </ParentViewActionBar>
  )
}
const styles = StyleSheet.create({
  pending: {
    position: "relative",
    marginTop: hp(34)
  },
});