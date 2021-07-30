import React, { useEffect } from "react";
import { connect ,useSelector} from "react-redux";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import { ChaptersList } from "../../../common/components/ChaptersList";
import { theme } from "../../../common/constants";
import { CustomPending } from "../../../common/components";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { appBAckgroundColor } from "../../../utils/helper/commonVariables";


export default function ChaptersScreen({ chaptersData }) {

  const states = useSelector(state => state);
  let loading = states.courseChapterReducer.loading
  let chapters = chaptersData.chapters;
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: appBAckgroundColor,marginBottom:hp(10) }}>
      {chapters ? chapters.map((item) => {
        return (
          <ChaptersList data={item} />
        )
      }) :
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
