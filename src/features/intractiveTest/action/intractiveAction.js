import { store } from "../../../store/store";
import { apiRequest } from "../../../utils/api/apiService";
import * as ActionTypes from "./ActionTypes";
import { sendInteractiveResilt } from "../../../utils/api/Url";
import * as NavigationService from "../../../utils/NavigationService";
import { refreshPage } from "../../lesson/actions/lessonAction";
import { refreshMyCourses } from "../../myCourses/actions/myCoursesAction";
export const sendIntractiveResultPending = () => ({
  type: ActionTypes.SEND_INTERACTIVE_RESULT_PENDING
});
export const sendIntractiveResultError = error => ({
  type: ActionTypes.SEND_INTERACTIVE_RESULT_ERROR,
  error: error
});
export const sendIntractiveResultSuccess = value => ({
  type: ActionTypes.SEND_INTERACTIVE_RESULT_SUCCESS,
  payload: value
});
const sendIntractiveResultOnSuccess = (response, exData) => {
  let data = response.data.data;
  store.dispatch(refreshPage(Math.random(0, 1000)))
  store.dispatch(refreshMyCourses(true));
  NavigationService.goBack('LessonScreen')
  if (data ? data.update : null) {
  }
  store.dispatch(sendIntractiveResultSuccess(), data);
  exData.callback(
    JSON.stringify({ status: "result", data: { success: true } }),
    data.result_page
  );
};
const sendIntractiveResultOnFailed = (error, exData) => {
  store.dispatch(sendIntractiveResultError(error));
  exData.callback(
    JSON.stringify({ status: "result", data: { success: false } }),
    null);
};
export const sendIntractiveResult = (lessonId, callback, data) => dispatch => {
  let url = `${sendInteractiveResilt}${lessonId}/interactive`;
  const formData = new FormData();
  formData.append('data', data);
  //console.log("url", url);
  dispatch(sendIntractiveResultPending());
  apiRequest(
    "post",
    url,
    formData,
    sendIntractiveResultOnSuccess,
    sendIntractiveResultOnFailed,
    sendIntractiveResult(lessonId, callback, data),
    true,
    { callback }
  );
};
