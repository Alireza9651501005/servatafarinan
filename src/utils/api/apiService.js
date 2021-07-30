import Axios from "axios";
import CToast from "../../common/components/CToast";
import { store } from "../../store/store";
import { Alert } from "react-native";
import NetInfo, {
  NetInfoStateType,
  NetInfoVpnState
} from "@react-native-community/netinfo";
import { factory, os, os_ver, uuid } from "../../common/constants/deviceInformations";
import { changeToken, saveAccessToken, saveRefreshToken } from "../../store/globalActions";
import * as NavigationService from '../NavigationService'
import { reportcatchToFireBase } from "../helper/functions";


const clientSecret = 'WtVEK|6le7uH1c%B+TEo54w!(x4hl2*s$UJ7$D+o|y0G2V1idUUX)7ol@$cc`znW,TnL@#cU8)AztB4s$NA!S*3wN,x*1oabqDUL'
const showMessage = message => {
  if (message.popup) {
    Alert.alert(message.message);
  } else {
    CToast(message.message, message.type);
  }
};

export const apiRequest = (
  type,
  url,
  params,
  onSuccess,
  onFailed,
  myFunc,
  isToken,
  extraData,
  toastOff,
  clientSec,
  deleteTokenFieldInHeader
) => {
  //console.log("url", url);
  if (type === "post") {
    apiCall = Axios.post;
    // Axios.post()
  } else if (type === "get") {
    apiCall = Axios.get;
  } else if (type === "put") {
    apiCall = Axios.put;
  }
  else if (type === "delete") {
    apiCall = Axios.delete;
  }
  let token;
  let state;
  state = store.getState();

  token = state.globalReducer.accessToken;
  Axios.defaults.headers.common["device_uuid"] = uuid;
// //console.log('my token =======> ',token)
// //console.log('my store =======> ',state)

  if (deleteTokenFieldInHeader) {
    delete Axios.defaults.headers.common["Authorization"];
  }
  if (clientSec) {
    Axios.defaults.headers.common["client_secret"] = clientSecret;
  }
  if (token ? token.length > 2 : false) {
  // if (token ? token.length > 2 : false) {
    //console.log("Authorization", "Bearer " + token);
    Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    Axios.defaults.headers.common["client_id"] = '1ee^x%72m3PPaTS9twwbkjdsfa43#6$';

  } else {
    delete Axios.defaults.headers.common["Authorization"];
    Axios.defaults.headers.common["os"] = os === 'android' ? 1 : 2;
    Axios.defaults.headers.common["os_version"] = os_ver;
    Axios.defaults.headers.common["device_brand"] = factory;
  }
  apiCall(url, params)
    // apiCall('http://mocky.myfreenet.ir/r/v1/hadi/ServatAfarinan/app/home', params)
    .then(response => {
      console.log("response", response);
      // && toastOff
      if (response.data.message && !toastOff) {
          showMessage(response.data.message)
      }
      onSuccess(response, extraData);
    })
    .catch((error, response) => {
      reportcatchToFireBase(error, 'apiService.js/line:87');
      onFailed(error, extraData);
      //console.log("response error", error.response);
      // CToast(error.response.status);
      // alert(error.response.status);
      if (error.response) {
        //it does not test simple and real for internet tab for remove adsl
        if (error.response.data.message && error.response.status == 406) {
          // NavigationService.resetFirst('ServicesScreen')
          // showMessage(error.response.data.message)
        }
        if (error.response.data.message) {
          showMessage(error.response.data.message);
        }
        if (error.response.status == 401) {
          store.dispatch(changeToken(onFailed("error"), myFunc));
        } 
        else if(error.response.status == 403){
          store.dispatch(saveAccessToken(''))
          store.dispatch(saveRefreshToken(''))
          // NavigationService.resetFirst('Home')
        }
        else if (
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          //console.log(error.response.status);
        } else if (error.response.status >= 500) {
          //console.log(error.response.status);
        }
      } else if (error.request) {
        //no response
        //console.log("no response error", error.request);
        // checkVpn()
        CToast("لطفا اتصال خود به اینترنت را بررسی نمایید.");
        // alert('لطفا اتصال خود به اینترنت را بررسی نمایید.')
      } else {
        //error in setting up the request
        //console.log("error in setting up the request", error.message);
      }
    });
};

const checkVpn = () => {
  // alert(checkVpn);
  NetInfo.fetch().then(state => {
    //console.log("checkVpn", state.isConnected);
    // alert(JSON.stringify(state))
    // if(state.type==='vpn'){
    //     CToast('لطفا vpn دستگاه را خاموش کنید')
    // }else{
    //     CToast('مشکل در برقراری ارتباط با سرویس دهنده. از اتصال به اینترنت و خاموش بودن vpn مطمئن شوید.')

    // }
  });
};
