import { PermissionsAndroid, Platform } from 'react-native';
import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import RNFS from 'react-native-fs';
import debounceAction from 'debounce-action';
import FileViewer from 'react-native-file-viewer';
import RNBackgroundDownloader from 'react-native-background-downloader';
import RNFetchBlob from 'rn-fetch-blob'
// import PushNotification from 'react-native-push-notification';
import * as ActionTypes from './ActionTypes';
import CToast from '../../../common/components/CToast';
import { reportcatchToFireBase } from '../../../utils/helper/functions';


export const getCourseDownloadsPending = () => ({
    type: ActionTypes.GET_COURSE_DOWNLOADS_PENDING
})

export const getCourseDownloadsError = (error) => ({
    type: ActionTypes.GET_COURSE_DOWNLOADS_ERROR,
    error: error
})

export const getCourseDownloadsSuccess = (value) => ({
    type: ActionTypes.GET_COURSE_DOWNLOADS_SUCCESS,
    payload: value
})

const getCourseDownloadsOnSuccess = (response, exData) => {
    store.dispatch(getCourseDownloadsSuccess(response.data.data))
    exData.callback(response.data.data)
}

const getCourseDownloadsOnFailed = (error) => {
    store.dispatch(getCourseDownloadsError(error))
}

export const getCourseDownloads = (url, callback) => (dispatch) => {
    dispatch(getCourseDownloadsPending())

    apiRequest(
        'get',
        url,
        false,
        getCourseDownloadsOnSuccess,
        getCourseDownloadsOnFailed,
        getCourseDownloads(url, callback),
        true,
        { callback }
    )
}


export const createDownloadState = (value) => ({
    type: ActionTypes.CREATE_DOWNLOAD_STATE,
    payload: value
})

export const changeDownloadState = (value) => ({
    type: ActionTypes.CHANGE_DOWNLOAD_STATE,
    payload: value
})

export const downloadFilePending = () => ({
    type: ActionTypes.DOWNLOAD_FILE_PENDING
})

export const downloadFileError = (error) => ({
    type: ActionTypes.DOWNLOAD_FILE_ERROR,
    error: error
})

export const downloadFileSuccess = (value) => ({
    type: ActionTypes.DOWNLOAD_FILE_SUCCESS,
    payload: value
})

export const changeDownloadProgress = (value, fileName) => ({
    type: fileName + '-' + ActionTypes.CHANGE_DOWNLOAD_PROGRESS,
    payload: value,
    fileName: fileName
})

const progressDebounced = debounceAction(changeDownloadProgress, 50, { leading: true });

const downloadFileOnSuccess = (response, exData) => {
    store.dispatch(downloadFileSuccess(response.data.data))
    exData.callback(response.data.data)
}

const downloadFileOnFailed = (error) => {
    store.dispatch(downloadFileError(error))
}

export const downloadFile = (item, setProgress, setLoading, setExist, setJobId) => (dispatch) => {
    // dispatch(downloadFilePending())
    setLoading(true)
    // pushNotifi()
    downloadOpenClick(item, setProgress, setLoading, setExist, setJobId)
}

const downloadOpenClick = async (item, setProgress, setLoading, setExist, setJobId) => {

    try {
        //file name
        const selectedFile = item.item.file_unique_name + '.' + item.item.type;
        let name = item.item.file_unique_name

        let dirType = await getDirType()
        //file exist or not (open or download)
        var exists = false;
        RNFS.exists(`${dirType}/servat/downloads/${selectedFile}`).then((output) => {
            if (output) {
                exists = true;
                const path = `${dirType}/servat/downloads/${selectedFile}`;

                FileViewer.open(path)
                    .then(() => {
                        // success
                        setLoading(false)

                    })
                    .catch(error => {
                        setLoading(false)
                        // error
                        console.log('error');
                        console.log(error);
                        // reportcatchToFireBase(error, 'courseDonloadAction.js/line:122')
                    });
            } else {
                // const selectedFileUrl = selectedFile.replace(/\s/g, '%20');
                //download

                setLoading(true)
                RNFS.downloadFile({
                    fromUrl: item.item.url,
                    // cacheable: true,
                    toFile: `${dirType}/servat/downloads/${selectedFile}`,
                    background: true,
                    begin: (res) => {
                        setJobId(res.jobId)
                        //console.log(res.jobId);
                        // this.setState({ contentLength: res.contentLength });
                    },
                    progress: (res) => {
                        // this.setState({ showSpinner: true });
                        var prog = res.bytesWritten / res.contentLength
                        // this.setState({ downloaded: prog });
                        // //console.log('Progress',res);
                        let percent = parseInt(prog * 100)
                        // if (percent > progr) {
                        store.dispatch(progressDebounced(percent, name))
                        // }
                        // setProgress(parseInt(prog * 100))
                    }
                }).promise.then((r) => {
                    ////console.log(r);
                    store.dispatch(downloadFileSuccess(r))
                    store.dispatch(changeDownloadProgress(0))
                    setLoading(false)
                    store.dispatch(changeDownloadProgress(0, name))
                    setExist(true)
                    // const path = `${dirType}/${tipoDesc}/${oggetto}/${selectedFile}`;
                    const path = `${dirType}/servat/downloads/${selectedFile}`;

                    FileViewer.open(path)
                        .then(() => {
                            // success
                        })
                        .catch(error => {
                            // error
                            console.log('error open file');
                            console.log(error);
                            // reportcatchToFireBase(error, 'courseDonloadsAction.js/line:170')
                        });
                }).catch(error => {
                    if (error.code === 'EUNSPECIFIED' && jobId === -1) {
                        CToast('دانلود متوقف شد')
                    }
                    setExist(false)
                    setLoading(false)
                    store.dispatch(changeDownloadProgress(0, name))
                    //console.log('catch error 00000000')
                    //console.log(error);

                    store.dispatch(downloadFileError(error))
                });;
            }
        });

    } catch (error) {
        console.log('main catch error =-=-=-=-');
        console.log(error);
        // reportcatchToFireBase(error, 'courseDonloadsAction.js/line:191')
    }
};

export const getDirType = async () => {
    //define directory
    var dirType = null;
    if (Platform.OS === 'ios') {
        dirType = RNFS.DocumentDirectoryPath;

    } else {
        // await this.requestStoragePermission();
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        dirType = RNFS.DocumentDirectoryPath;
    }


    //create folder
    RNFS.mkdir(dirType + `/servat`).then(files => {
        RNFS.mkdir(dirType + `/servat/downloads`).then(files => {
            ////console.log(files);
        }).catch(err => {
            //console.log('-------+++++', err, err.message, err.code);
        });
    }).catch(err => {
        console.log('--------------', err, err.message, err.code);
        // reportcatchToFireBase(err, 'courseDonloadsAction.js/line:218')
    });
    return dirType
}

export const cancelDownload = async (jobId) => {
    //console.log('jobId===>', jobId)
    RNFS.stopDownload(jobId)
    // unlink(filepath: string)
    await RNFS.unlink(`${RNFS.DocumentDirectoryPath}/temp/`).then(res => {

    })
        .catch(err => {
            reportcatchToFireBase(err, 'courseDonloadsAction.js/line:233')
            console.log(err.message, err.code);

        });
}

// Originally inspired by  David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// // be triggered. The function will be called after it stops being called for
// // `wait` milliseconds.
// const debounce = (func, wait) => {
//     let timeout;

//     // This is the function that is returned and will be executed many times
//     // We spread (...args) to capture any number of parameters we want to pass
//     return function executedFunction(...args) {

//       // The callback function to be executed after 
//       // the debounce time has elapsed
//       const later = () => {
//         // null timeout to indicate the debounce ended
//         timeout = null;

//         // Execute the callback
//         func(...args);
//       };
//       // This will reset the waiting every function execution.
//       // This is the step that prevents the function from
//       // being executed because it will never reach the 
//       // inside of the previous setTimeout  
//       clearTimeout(timeout);

//       // Restart the debounce waiting period.
//       // setTimeout returns a truthy value (it differs in web vs Node)
//       timeout = setTimeout(later, wait);
//     };
//   };




export const pushNotifi = () => {
    // PushNotification.localNotification({
    //     title: "My Notification Title", // (optional)
    //     message: "My Notification Message", // (required)
    //    });
}




