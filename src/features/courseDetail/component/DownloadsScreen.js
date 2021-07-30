import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet,  } from "react-native";
import { theme } from "../../../common/constants";
import { CustomPending, DownloadList } from "../../../common/components";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
export default function DownloadsScreen({downloadListData }) {
    const states = useSelector(state => state);
    let loading;
    loading = states.courseDownloadReducer.loading;
    //console.log('downloadListData props', downloadListData)
    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: theme.colors.bgGray }}>
            {downloadListData.attachments ?
                <DownloadList listData={downloadListData.attachments} />
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