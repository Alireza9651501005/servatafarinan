import * as ActionTypes from "../actions/ActionTypes";
const authenticationReducer = (
  state = {
    phoneNumber: "",
    two: 234234,
    networkError: false,
    error: "",
    loading: false,
    success: null,
    authenticationReducerStep: 1,
    password: "",
    verifyCode: "",
    timer: null,
    tokensData: null,
    userPassword: "",
    userConfirmPassword: "",
    userName: "",
    userJob: "",
    userEmail: "",
    userJobPosition: "",
    userPhoneNumber: "",
    registerOptionalInfoLoading: false,
    verificationCodeData:null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PHONENUMBER:
      return { ...state, phoneNumber: action.payload, timer: null };

    case ActionTypes.CHANGE_PASSWORD:
      return { ...state, password: action.payload };

    case ActionTypes.VERIFY_CODE:
      return { ...state, verifyCode: action.payload };

    case ActionTypes.VERIFY_TIMER:
      return { ...state, timer: action.payload };
    case ActionTypes.VERIFY_TIMER_TOZERO:
      return { ...state, timer: 0 };

    case ActionTypes.CHECK_USER_ACCOUNT_PENDING:
      return { ...state, loading: true };
    case ActionTypes.CHECK_USER_ACCOUNT_SUCCESS:
      return { ...state, loading: false };
    case ActionTypes.CHECK_USER_ACCOUNT_ERROR:
      return { ...state, loading: false };
    //below lones need to check
    case ActionTypes.CHECK_USER_PASS_PENDING:
      return { ...state, loading: true };
    case ActionTypes.CHECK_USER_PASS_SUCCESS:
      return { ...state, loading: false, tokensData: action.payload };
    case ActionTypes.CHECK_USER_PASS_ERROR:
      return { ...state, loading: false };

    case ActionTypes.SECOND_LEVEL_AUTHENTICATION:
      return { ...state, authenticationReducerStep: action.value };
    //register
    case ActionTypes.CHANGE_USER_PASS:
      return { ...state, userPassword: action.payload };
    case ActionTypes.CHANGE_USER_CONFIRM_PASS:
      return { ...state, userConfirmPassword: action.payload };
    case ActionTypes.CHANGE_USER_NAME:
      return { ...state, userName: action.payload };
    case ActionTypes.CHANGE_USER_JOB:
      return { ...state, userJob: action.payload };
    case ActionTypes.CHANGE_USER_JOB_POSITION:
      return { ...state, userJobPosition: action.payload };
    case ActionTypes.CHANGE_USER_EMAIL:
      return { ...state, userEmail: action.payload };
    case ActionTypes.CHANGE_USER_PHONENUMBER:
      return { ...state, userPhoneNumber: action.payload };
    //check verify
    case ActionTypes.CHECK_VERIFY_CODE_PENDING:
      return { ...state, loading: true };
    case ActionTypes.CHECK_VERIFY_CODE_SUCCESS:
      return { ...state, loading: false, tokensData: action.payload, verificationCodeData: action.data };
    case ActionTypes.CHECK_VERIFY_CODE_ERROR:
      return { ...state, loading: false };
    //register user
    case ActionTypes.REGISTER_PENDING:
      return { ...state, loading: true };
    case ActionTypes.REGISTER_ERROR:
      return { ...state, loading: false };
    case ActionTypes.REGISTER_SUCCESS:
      return { ...state, loading: false, tokensData: action.payload, phoneNumber: '' };
    //register user optional info
    case ActionTypes.REGISTER_USER_OPTIONAL_INFORMATION_PENDING:
      return { ...state, registerOptionalInfoLoading: true };
    case ActionTypes.REGISTER_USER_OPTIONAL_INFORMATION_ERROR:
      return { ...state, registerOptionalInfoLoading: false };
    case ActionTypes.REGISTER_USER_OPTIONAL_INFORMATION_SUCCESS:
      return { ...state, registerOptionalInfoLoading: false };
    default:
      return state;
  }
};
export default authenticationReducer;
