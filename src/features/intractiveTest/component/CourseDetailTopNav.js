import React, { useState } from "react";
import { View, Text } from "react-native";
import { MediumButtonWhite } from "../../../common/components/MediumButtonWhite";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
  descriptionTabTxt,
  galleryTxt,
  lessonTxt,
  descriptionTxt
} from "../texts";
import ChaptersScreen from "../../courseDetail/component/ChaptersScreen";
import DownloadsScreen from "../../courseDetail/component/DownloadsScreen";
import DescriptionScreen from "../../courseDetail/component/DescriptionScreen";
export default function CourseDetailTopNav({
  chaptersData,
  courseId,
  courseDescription
}) {
  let gallery = 0,
    description = 1,
    lesson = 2;
  const [activeTab, setActiveTab] = useState(2);
  const changeActiveTab = activeTab => () => {
    setActiveTab(activeTab);
  };
  const renderPageContent = () => {
    if (activeTab == gallery) {
      return (
        <View style={{ borderWidth: 0 }}>
          {/* <Text>{galleryTxt}</Text> */}
          <DownloadsScreen courseId={courseId} />
        </View>
      );
    } else if (activeTab == description) {
      return (
        <View style={{ borderWidth: 0 }}>
          {/* <Text>{descriptionTabTxt}</Text> */}
          <DescriptionScreen courseDescription={courseDescription} />
        </View>
      );
    } else if (activeTab == lesson) {
      return (
        <View style={{ borderWidth: 0 }}>
          {/* <Text>{lessonTxt}</Text> */}
          <ChaptersScreen chaptersData={chaptersData} />
        </View>
      );
    }
  };
  return (
    <View style={{ borderWidth: 0, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 0,
          justifyContent: "center"
        }}
      >
        <MediumButtonWhite
          onPress={changeActiveTab(gallery)}
          btnStyle={{
            width: wp(20),
            backgroundColor: activeTab == gallery ? 'yellow' : "white"
          }}
        >
          {galleryTxt}
        </MediumButtonWhite>
        <MediumButtonWhite
          onPress={changeActiveTab(lesson)}
          btnStyle={{
            width: wp(20),
            backgroundColor: activeTab == lesson ? "yellow" : "white"
          }}
        >
          {lessonTxt}
        </MediumButtonWhite>
        <MediumButtonWhite
          onPress={changeActiveTab(description)}
          btnStyle={{
            width: wp(20),
            backgroundColor: activeTab == description ? "yellow" : "white"
          }}
        >
          {descriptionTabTxt}
        </MediumButtonWhite>
      </View>
      {renderPageContent()}
    </View>
  );
}