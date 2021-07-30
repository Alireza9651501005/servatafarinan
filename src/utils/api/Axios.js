import axios from "axios";
import * as constant from './Url'
export default axios.create({
  baseURL: constant.baseUrl ,
  headers :{
    'Content-Type' : 'application/json'
  },
  // validateStatus: function (status) {
  //   return status < 500;
  // },
  timeout: 2500,
});