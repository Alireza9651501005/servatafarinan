import { combineReducers } from 'redux';
import home from '../features/home/reducer/HomeReducer';
import splashReducer from '../features/splash/reducers/splashReducer';
import authenticationReducer from '../features/authentication/reducers/authenticationReducer';
import globalReducer from './globalReducer';
import generalListReducer from '../features/generalList/reducers/generalListReducer';
import courseDetailReducer from '../features/courseDetail/reducer/courseDetailReducer';
import courseChapterReducer from '../features/courseDetail/reducer/courseChapterReducer';
import courseDownloadReducer from '../features/courseDetail/reducer/courseDownloadReducer'
import intractiveReducer from '../features/intractiveTest/reducer/intractiveReducer'
import videoReducer from '../features/video/reducers/videoReducer';
import profileReducer from '../features/profile/reducers/profileReducer';
import changePasswordReducer from '../features/changePassword/reducers/changePasswordReducer';
import leaderboardReducer from '../features/leaderboard/reducers/leaderboardReducer';
import leaderboardDetailReducer from '../features/leaderboardDetail/reducers/leaderboardDetailReducer';
import searchReducer from '../features/search/reducers/searchReducer';
import changePhoneNumberReducer from '../features/changePhoneNumber/reducers/changePhoneNumberReducer';
import commentsReducer from '../features/comments/reducers/commentsReducer';
import courseStatusReducer from '../features/courseDetail/reducer/courseStatusReducer';
import forgetPasswordReducer from '../features/forgetPassword/reducers/forgetPasswordReducer';
import myCoursesReducer from '../features/myCourses/reducers/myCoursesReducer';
import userGainHistoryReducer from '../features/userGainHistory/reducers/userGainHistoryReducer';
import publicProfileReducer from '../features/publicProfile/reducers/publicProfileReducer';
import publicCoursesReducer from '../features/publicProfile/reducers/publicCoursesReducer'
import userInboxReducer from '../features/userInbox/reducers/userInboxReducer';
import creditReducer from '../features/credit/reducers/creditReducer';
import userLeaderBoardReducer from '../features/userLeaderBoard/reducers/userLeaderBoardReducer';
import networkingReducer from '../features/networking/reducers/NetworkingReducer';
import scoresPageReducer from '../features/scoresPage/reducer/scoresPageReducer';
import videoTimesReducer from '../features/video/reducers/videoTimesReducer';
import lessonReducer from '../features/lesson/reducers/lessonReducer';

export default combineReducers({
    home,
    globalReducer,
    splashReducer,
    authenticationReducer,
    generalListReducer,
    courseDetailReducer,
    courseChapterReducer,
    courseDownloadReducer,
    intractiveReducer,
    videoReducer,
    profileReducer,
    changePasswordReducer,
    // leaderboardReducer,
    // leaderboardDetailReducer,
    searchReducer,
    changePhoneNumberReducer,
    commentsReducer,
    courseStatusReducer,
    forgetPasswordReducer,
    myCoursesReducer,
    userGainHistoryReducer,
    publicProfileReducer,
    userInboxReducer,
    creditReducer,
    userLeaderBoardReducer,
    publicCoursesReducer,
    networkingReducer,
    scoresPageReducer,
    videoTimesReducer,
    lessonReducer
})