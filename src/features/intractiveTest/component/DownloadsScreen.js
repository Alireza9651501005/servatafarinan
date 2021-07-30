import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, ScrollView, Text, Pressable, ActivityIndicator } from "react-native";
import { theme } from "../../../common/constants";
import { CustomPending, DownloadList } from "../../../common/components";
import { getCourseDownloads } from "../action/courseDownloadsAction";
import { courseDownloads } from "../../../utils/api/Url";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


export default function DownloadsScreen({ courseId }) {
    const states = useSelector(state => state);
    let loading;
    loading = states.courseDownloadReducer.loading;
    //console.log('reducers', states)
    const [downloadList, setDownloadList] = useState('')
    const dispatch = useDispatch()
    getDownloadsData = (data) => {
        setDownloadList(data)
    }

    useEffect(() => {
        let url = courseDownloads + courseId + '/attachment';
        dispatch(getCourseDownloads(url, getDownloadsData))
    }, [])

    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: theme.colors.white }}>
            {/* {loading ? <ActivityIndicator /> : downloadList ?
                <DownloadList listData={downloadList.atachments} />
                : null} */}

            {downloadList.atachments ? 
            <DownloadList listData={downloadList.atachments} />
            :
                <CustomPending
                    style={styles.pending}
                    pending={loading}
                //   retryAction={() => dispatch(getCourseDetail(method, url))}
                />
            }
        </View>
    );
}


const styles = StyleSheet.create({
    pending: {
      position: "relative",
      marginTop: hp(7)
    },
  })