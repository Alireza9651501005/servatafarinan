import DeviceInfo from 'react-native-device-info'
import {Platform} from 'react-native'

const os = Platform.OS 
const os_ver = DeviceInfo.getSystemVersion() 
const factory =  DeviceInfo.getBrand()  
const app_ver = DeviceInfo.getVersion()
const uuid = DeviceInfo.getUniqueId()

export {os, os_ver, factory, app_ver,uuid}