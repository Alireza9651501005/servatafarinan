import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, ScrollView, Linking, Image, Platform } from "react-native";
import { ParentViewActionBar, ContentList, CustomPending, CustomText } from "../../common/components";
import Share from 'react-native-share';
import { CustomeButton } from "../../common/components/CustomeButton";
import { MediumButton } from "../../common/components/MediumButton";
import DescriptionScreen from "../courseDetail/component/DescriptionScreen";
import { changeCurrentCourse, changeAppHeaderColor } from "../../store/globalActions";
import { changeBuyStatus, getCourseDetail, getCourseDetailContentRows, addToLibrary, changeActiveTab } from "./action/courseDetailAction";
import CourseDetailTopNav from "./component/CourseDetailTopNav";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CustomCarousel } from "../../common/components";
import { headerTxt, examNotExistTxt, shareCourseTxt, addToLibraryTxt } from "./texts";
import CToast from "../../common/components/CToast";
import { whiteThird, iranSans, priceColor } from "../../utils/helper/commonVariables";
import { fontSize12, fontSize8, fontSize20, fontSize14 } from "../../utils/helper/responsiveSizes";
import { theme } from "../../common/constants";
import { analyticCustomEvent, priceSeparator } from "../../utils/helper/functions";
import AnimatedView from "../../common/components/AnimatedView";

export default function CourseDetailScreen({ route, navigation }) {
  const [courseDetailData, setCourseDetailData] = useState([]);
  const [courseChaptersData, setCourseChaptersData] = useState([]);
  const [contentRowsData, setContentRowsData] = useState([]);
  const [downloadList, setDownloadList] = useState('')
  const [addToLibraryState, setAddToLibrary] = useState({ loading: false })
  let method, courseId, url, urlContentRows;

  useEffect(() => {
    //console.log("courseActionData", courseActionData);
    callCourseDetailWebService();
    // dispatch(changeActiveTab(2,null))
    return () => {
      dispatch(changeAppHeaderColor(theme.colors.darkBlue))
    }
  }, []);


  const dispatch = useDispatch();
  const states = useSelector(state => state);

  let accessToken, courseDetailLoading, contentRowsLoading, courseActionData, addToLibraryLoading, contents, courseDetail, error;
  (contents = states.home.contents),
    (accessToken = states.globalReducer.accessToken);
  courseActionData = states.globalReducer.currentCourseAction.courseActionData;
  courseDetail = states.courseDetailReducer.courseDetail.data;
  courseDetailLoading = states.courseDetailReducer.loading;
  contentRowsLoading = states.courseDetailReducer.contentRowsLoading;
  addToLibraryLoading = states.courseDetailReducer.addToLibraryLoading;
  error = states.courseDetailReducer.error;

  const renderCourseDetail = (image, title, type) => {
    return (
      <View style={{ borderWidth: 0, height: hp(4.4), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: wp(16.8) }}>
        <CustomText style={[styles.renderCourseDetailTxtStyle, { right: type == 'number' ? wp(.4) : wp(-.6), top: hp(.2), borderWidth: 0 }]} numberOfLines={1}> {title}</CustomText>
        <Image style={styles.chartAndClockAndSessionImageStyle} source={image} />
      </View>
    )
  }

  const rendrPrice = (value) => {
    return value ? priceSeparator(value) : null;
  }
  const callCourseDetailWebService = () => {
    if (courseActionData ? courseActionData.type : false) {
      method = courseActionData.api_method;
      courseId = courseActionData.id;
      url = `http://pms-api.myfreenet.ir/api/v1/courses/${courseActionData.id}`;
      // urlContentRows = `http://pms-api.myfreenet.ir/api/v1/courses/${courseActionData.id}/content-rows`;
      dispatch(getCourseDetail('get', url, courseActionData.id, getCourseDetailData, getCourseChaptersData, getDownloadsData));
      // dispatch(getCourseDetailContentRows("GET", urlContentRows, getContentRowsData));
      dispatch(changeCurrentCourse({ courseActionData, getCourseDetailData, getCourseChaptersData }));
    }
  }
  const callback = () => {
    if (courseActionData ? courseActionData.type : false) {
      method = courseActionData.api_method;
      courseId = courseActionData.id;
      url = `http://pms-api.myfreenet.ir/api/v1/courses/${courseActionData.id}`;
      urlContentRows = `http://pms-api.myfreenet.ir/api/v1/courses/${courseActionData.id}/content-rows`;
      // dispatch(getCourseDetail('get', url, courseActionData.id, (val) => { }, (val) => { }, (val) => { }));
      dispatch(getCourseDetail('get', url, courseActionData.id, getCourseDetailData, getCourseChaptersData, getDownloadsData));
      dispatch(getCourseDetailContentRows("GET", urlContentRows, getContentRowsData));
      // dispatch(changeCurrentCourse({ courseActionData, getCourseDetailData, getCourseChaptersData }));
    }
    // else {
    //   alert('brovo')
    // }
  }

  const renderPriceCollection = (style) => {
    return (
      <View style={[{ width: wp(38.4), height: hp(10), borderWidth: 0, flex: 1 }]}>
        <View style={{ borderWidth: 0, width: wp(32.5), height: hp(8.4), alignItems: 'flex-start', paddingTop: hp(0), paddingBottom: hp(1), marginLeft: wp(1), }}>
          <CustomText style={styles.lastPrice} numberOfLines={1}>{rendrPrice(courseDetailData ? courseDetailData.payment ? courseDetailData.payment.last_price : null : null)}</CustomText>
          <CustomText style={styles.price} numberOfLines={1}>{courseDetailData ? courseDetailData.payment ? priceSeparator(courseDetailData.payment.price) : 'رایگان' : null}</CustomText>
          <CustomText style={[styles.currency, { right: wp(-.6) }]} numberOfLines={1}>{courseDetailData ? courseDetailData.payment ? 'تومان' : null : null}</CustomText>
        </View>
      </View>
    )
  }
  const renderButton = () => {
    let action, title;
    action = courseDetailData ? courseDetailData.main_button ? courseDetailData.main_button.action : null : null
    title = courseDetailData ? courseDetailData.main_button ? courseDetailData.main_button.title : null : null;
    return (
      <CustomeButton backgroundColor={theme.colors.greenTypeC} onPress={buyCourse} loading={addToLibraryLoading} btnStyle={{ marginLeft: wp(0), minWidth: wp(38), }}>
        {/* خرید */}
        {title}
      </CustomeButton>
    )
  }

  const renderTitleAndBuyBtn = () => {
    let action, title, clockIcon, chartIcon, chapterTitle, documentIcon, userIcon;
    clockIcon = require('../../assets/clock/clock.png');
    chartIcon = require('../../assets/chart/chart.png');
    documentIcon = require('../../assets/document/document.png');
    userIcon = require('../../assets/user/user.png');
    chapterTitle = `${courseDetailData ? courseDetailData.total_chapters : null} ‌فصل`;
    action = courseDetailData ? courseDetailData.main_button ? courseDetailData.main_button.action : null : null
    title = courseDetailData ? courseDetailData.main_button ? courseDetailData.main_button.title : null : null;
    // //console.log('renderTitleAndBuyBtn', action)
    // //console.log('renderTitleAndBuyBtn', courseDetailData ? courseDetailData.main_button : null)

    return (
      <View style={styles.titleAndBuyBtnVuStyle}>
        {renderPriceCollection()}
        <View style={{ flex: 1, height: hp(10), borderWidth: 0, }}>
          <View style={{ flex: 1, height: hp(5), borderWidth: 0, flexDirection: "row", justifyContent: 'space-between' }}>
            {renderCourseDetail(userIcon, courseDetailData ? courseDetailData.engagement : null, 'number')}
            {renderCourseDetail(clockIcon, courseDetailData ? courseDetailData.total_hours : null, 'number')}
            {/* total_hours total_chapters engagement */}
          </View>
          <View style={{ flex: 1, height: hp(5), borderWidth: 0, flexDirection: "row", justifyContent: 'space-between', bottom: hp(1.5) }}>
            {renderCourseDetail(documentIcon, chapterTitle, null)}
            {renderCourseDetail(chartIcon, courseDetailData ? courseDetailData.level : null, null)}
          </View>
        </View>
      </View>
    );
  };

  const renderCourseDescription = () => {
    return (
      // <View style={styles.courseDescriptionVuStyle}>
      //   <CustomText>
      //     {courseDetailData ? courseDetailData.description : null}
      //   </CustomText>
      // </View>
      <DescriptionScreen courseDescription={courseDetailData ? courseDetailData.description : null} />
    );
  };

  const getCourseDetailData = serverData => {
    setCourseDetailData(serverData);
  };

  const getCourseChaptersData = serverData => {
    setCourseChaptersData(serverData);
  };

  const getDownloadsData = (data) => {
    setDownloadList(data)
  }

  const getContentRowsData = serverData => {
    setContentRowsData(serverData);
  };

  const renderContentRows = () => {
    return contentRowsLoading == true ? (
      <CustomPending style={styles.pending} pending={contentRowsLoading} retryAction={() => dispatch(getCourseDetailContentRows("get", urlContentRows, getContentRowsData))} />
      // <CustomPending style={styles.pending} pending={contentRowsLoading} retryAction={() => dispatch(getCourseDetailContentRows("GET", urlContentRows, getContentRowsData))} />
    ) : (
        <ContentList contents={contentRowsData ? contentRowsData.content_rows : null} />
      );
  };

  const navToExamPage = params => {
    if (courseDetailData) {
      //console.log("navToExamPage", courseDetailData.exam);
      courseDetailData.exam
        ? navigation.navigate("IntractiveScreen", {
          exam: courseDetailData.exam,
          id: courseActionData.id
        })
        : CToast(examNotExistTxt, 'alert');
    }
  };
  const apiHandle = value => {
    if (value === "pending") {
      setAddToLibrary({ loading: true });
    } else if (value === "error") {
      setAddToLibrary({ loading: false });
      callback();

    } else {
      setAddToLibrary({
        loading: false,
      });

    }
  }
  const buyCourse = () => {
    let action = courseDetailData ? courseDetailData.main_button.action : null;

    let analyticsData = {
      courseId: action.id ? action.id : null,
      time: Date.now(),
      userName: states.profileReducer.profileData.username
    }
    analyticCustomEvent('buy_button', analyticsData)

    if (accessToken) {
      if (action.type == "browse") {
        Linking.openURL(
          action ? action.url : 'http://www.google.com'
        );
      }
      else if ('add-library') {
        let url, method, courseId;
        url = 'user/profile/library';
        method = action.api_method;
        courseId = action.id;

        // dispatch(addToLibrary(url, courseId, method, apiHandle))
        dispatch(addToLibrary(url, courseId, 'post', callback))
      }
    } else {
      dispatch(changeAppHeaderColor(theme.colors.darkBlue))
      dispatch(changeBuyStatus(true));
      navigation.push("AuthenticationStepOne");
    }
  };

  const shareCourse = () => {
    const shareOptions = {
      title: 'Share cource',
      failOnCancel: false,
      message: courseDetailData.share_content
    };
    Share.open(shareOptions)
  }

  const addToLibraryCallBack = () => {
    if (courseActionData ? courseActionData.type : false) {
      method = courseActionData.api_method;
      courseId = courseActionData.id;
      url = `http://pms-api.myfreenet.ir/api/v1/courses/${courseActionData.id}`;
      urlContentRows = `http://pms-api.myfreenet.ir/api/v1/courses/${courseActionData.id}/content-rows`;
      dispatch(getCourseDetail(method, url, courseActionData.id, getCourseDetailData, getCourseChaptersData, getDownloadsData));
      dispatch(getCourseDetailContentRows("GET", urlContentRows, getContentRowsData));
      dispatch(changeCurrentCourse({ courseActionData, getCourseDetailData, getCourseChaptersData }));
    }
  }

  const renderPageContent = () => {
    let actionData = route.params;
    if (courseDetailData ? courseDetailData.access : null) {
      let addToLibraryText, examText;
      addToLibraryText = courseDetailData.main_button ? courseDetailData.main_button.title : addToLibraryTxt;
      examText = courseDetailData ? courseDetailData.exam ? courseDetailData.exam.button_title : "آزمون" : null
      return (
        <ScrollView scrollEnabled style={{ borderWidth: 0 }}>
          {Platform.OS !== 'ios' ? null : <CustomCarousel borderRadius full height={hp(28)} width={wp(100)} data={courseDetailData ? courseDetailData.image : null} />}
          <View style={Platform.OS == 'ios' ? null : { marginTop: hp(40) }}>
            <CourseDetailTopNav renderContentRows={renderContentRows()}
              navigation={navigation}
              courseDescription={courseDetailData ? courseDetailData.description : null}
              courseId={actionData ? actionData.id : null} chaptersData={courseChaptersData} downloadListData={downloadList} />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{ marginBottom: hp(10) }} showsVerticalScrollIndicator={false}>
          <CustomCarousel borderRadius full height={hp(28)} width={wp(100)} data={courseDetailData ? courseDetailData.image : null} />
          {renderTitleAndBuyBtn()}
          <View style={{ width: wp(90), borderWidth: 0, alignSelf: 'center', marginTop: hp(-1), minHeight: hp(7) }}>
            <CustomText style={{ fontSize: fontSize14 }}>
              {courseDetailData ? courseDetailData.short_description : null}
            </CustomText>
          </View>
          {renderButton()}
          {renderCourseDescription()}
          <View style={{ borderWidth: 0, flex: 1, width: wp(60), alignSelf: "center", justifyContent: "center", alignItems: "center" }}>
            {/* {renderPriceCollection()} */}
            <View style={{ borderWidth: 0, width: wp(32.5), height: hp(8.4), alignItems: 'center', paddingTop: hp(0), paddingBottom: hp(1), marginLeft: wp(1), }}>
              <CustomText style={[styles.lastPrice, { borderWidth: 0 }]} numberOfLines={1}>{rendrPrice(courseDetailData ? courseDetailData.payment ? courseDetailData.payment.last_price : null : null)}</CustomText>
              <CustomText style={styles.price} numberOfLines={1}>{courseDetailData ? courseDetailData.payment ? priceSeparator(courseDetailData.payment.price) : 'رایگان' : null}</CustomText>
              {/* <CustomText style={styles.price} numberOfLines={1}>{rendrPrice(courseDetailData.payment ? courseDetailData.payment.price : null)}</CustomText> */}
              <CustomText style={[styles.currency, {}]} numberOfLines={1}>{courseDetailData ? courseDetailData.payment ? 'تومان' : null : null}</CustomText>
            </View>
          </View>
          <View style={{ borderWidth: 0, bottom: hp(1) }}>{renderButton()}</View>
          {/* {renderContentRows()} */}
          {/* <ContentList contents={contents} /> */}
        </ScrollView>
      );
    }
  };
  return (
    // title={courseDetail ? courseDetail.title : headerTxt} back 
    <ParentViewActionBar
      noRradius
      share
      shareOnPress={shareCourse}
      navigation={navigation}
      style={{ marginBottom: hp(0), backgroundColor: theme.colors.bgGray }}
      titleColor={whiteThird}>
      {courseDetailLoading == true || error ? (
        <CustomPending
          style={styles.pending}
          pending={courseDetailLoading}
          retryAction={callback}
        // retryAction={() =>
        //   dispatch(
        //     getCourseDetail(
        //       'get',
        //       url,
        //       courseActionData.id,
        //       getCourseDetailData,
        //       getCourseChaptersData
        //     )
        //   )
        // }
        />
      ) : (
          <AnimatedView
            onPullDown={callback}
            titleColor={whiteThird}
            share
            shareOnPress={shareCourse}
            title={courseDetail ? courseDetail.title : headerTxt}
            imageSource={courseDetailData ? courseDetailData.image : null}
            list={renderPageContent()}
          />
        )}
    </ParentViewActionBar>
  );
}

const styles = StyleSheet.create({
  pending: {
    position: "relative",
    marginTop: hp(34)
  },
  titleAndBuyBtnVuStyle: {
    borderWidth: 0,
    width: wp(90),
    height: hp(10),
    marginTop: hp(-1.5),
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(2)
  },
  courseDescriptionVuStyle: {
    borderWidth: 0,
    width: wp(90),
    // maxHeight: hp(40),
    borderWidth: 0,
    alignSelf: "center"
    // marginBottom:hp(10)
  },
  chartAndClockAndSessionImageStyle: {
    width: wp(3.6),
    height: wp(3.6),
    resizeMode: 'contain',
    borderWidth: 0,
  },
  lastPrice: {
    textAlign: 'right',
    fontSize: fontSize12,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: priceColor,
    borderWidth: 0,
    marginTop: hp(0),
    marginBottom: hp(0),
    height: hp(3)
  },
  price: {
    textAlign: 'right',
    // fontFamily: iranSansLight,
    fontSize: fontSize20,
    marginTop: hp(0),
    marginBottom: hp(0),
    borderWidth: 0,
    color: priceColor,
    height: hp(5),
    bottom: hp(1.5),
    left: hp(-.5),
  },
  currency: {
    textAlign: 'right',
    // fontFamily: iranSans,
    fontSize: fontSize8,
    marginTop: hp(0),
    borderWidth: 0,
    color: priceColor,
    marginTop: hp(0),
    marginBottom: hp(0),
    height: hp(2),
    bottom: hp(3),
  },
  renderCourseDetailTxtStyle: {
    fontSize: fontSize12,
    fontFamily: iranSans,
    borderWidth: 0,
    flex: 1,
    textAlign: 'right',
  },
});
