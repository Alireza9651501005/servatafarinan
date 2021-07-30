import * as ActionTypes from "../actions/ActionTypes";
import { Url } from "../../../utils/api";
import { apiRequest } from "../../../utils/api/apiService";
import { store } from "../../../store/store";
const searchTermOnSuccess = (response, exData) => {
  let data= response.data.data;
  store.dispatch(searchTermSuccess(data));
  exData.callback(data)
};
const  searchTermOnFail = (error,exData) => {
  store.dispatch(searchTermError(error));
  exData.callback('error')
};
export const searchTermPending = () => ({
  type: ActionTypes.SEARTCH_TERM_PENDING
});
export const searchTermError = error => ({
  type: ActionTypes.SEARTCH_TERM_ERROR,
  error: error
});
export const  searchTermSuccess= value => ({
  type: ActionTypes.SEARTCH_TERM_SUCCESS,
  payload: value
});
export const searchTermAction = (term,callback) => {
  return dispatch => {
    dispatch(searchTermPending());
    callback('pending')
    apiRequest(
      "get",
      `${Url.searchTermApi}?q=${'مهدی'}`,
      // `${Url.searchTermApi}?q=${"term"}`,
      false,
      searchTermOnSuccess,
      searchTermOnFail,
      searchTermAction(term,callback),
      true,
      { callback }
    );
  };
};