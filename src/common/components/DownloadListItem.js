import React, { useState ,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../constants'
import { CustomText } from '.'
import NavigationService from '../../utils/NavigationService'
import CustomeImage from "./CustomeImage";
import { RippleEffect } from './RippleEffect'
import { cancelDownload, changeDownloadProgress, changeDownloadState, createDownloadState, downloadFile,getDirType } from '../../features/courseDetail/action/courseDownloadsAction';
import RNFS from 'react-native-fs';
import Ripple from 'react-native-material-ripple'
import { reportcatchToFireBase } from '../../utils/helper/functions'


const DownloadListItem = (props) => {
    const [progress, setProgress] = useState(0)
    // const [loading, setLoading] = useState(false)
    // const [isExist, setExist] = useState(false)
    // const [jobId, setJobId] = useState(null)
    let states = useSelector(state => state);
    const dispatch = useDispatch();
    let name = props.item.item.file_unique_name
    let downloadsState = states.courseDownloadReducer.downloadsState
    let progresss = downloadsState[name]?downloadsState[name].progress:0
    let loadingg = downloadsState[name]?downloadsState[name].loading:false
    let isExistt = downloadsState[name]?downloadsState[name].isExist:false
    let jobIdd =downloadsState[name]?downloadsState[name].jobId:0
    useEffect(() => {   
        createState()
        checkExist() 
    }, [])

    const createState = async()=>{
        let obj = downloadsState
        if(!downloadsState[name]){
            let value = {
                loading:false,
                progress:0,
                file_unique_name:name,
                jobId:null,
                isExist:false
            }
            obj[name] = value;
            dispatch(createDownloadState(obj))
        }
        
    }
    const checkExist = async () => {
        //file name
        const selectedFile = name + '.' + props.item.item.type;
        let dirType = await getDirType()
        if(!progresss && !loadingg){
            RNFS.exists(`${dirType}/servat/downloads/${selectedFile}`).then((output) => {
                //console.log('output',output)
                if (output) {
                    setExist(true)
                } else {
                    setExist(false)
                }   
            });
        }
        
    }

    const setLoading = (value) => {
        let dow = downloadsState
             dow[name]= {...dow[name], loading: value}
            dispatch(changeDownloadState(dow))
    }

    const setExist = (value) => {
        let dow = downloadsState
             dow[name]= {...dow[name], isExist: value}
            dispatch(changeDownloadState(dow))
    }

    const setJobId = (value) => {
        let dow = downloadsState
             dow[name]= {...dow[name], jobId: value}
            dispatch(changeDownloadState(dow))
    }

    const renderIcon =()=>{
        if(loadingg){
            return (
                <RippleEffect
                    rippleOpacity={0}
                    onPress={async() => {
                        setExist(false)
                            dispatch(changeDownloadProgress(0,name)) 
                            setLoading(false)
                        // //console.log
                        RNFS.stopDownload(jobIdd)
                        const selectedFile = name + '.' + props.item.item.type;
                        let dirType = await getDirType()
                        RNFS.unlink(`${dirType}/servat/downloads/${selectedFile}`)
                        .then((res)=>{
                            setExist(false)
                            dispatch(changeDownloadProgress(0,name)) 
                            setLoading(false)
                        })
                        .catch((err)=>{
                            reportcatchToFireBase(err, 'DownloadListItem.js/line:100')
                        })
                        //    cancelDownload(jobId)
                    }}
                    style={{ paddingLeft: wp(3), flexDirection: 'row' }}>
                    <Image
                        source={require('../../assets/cancel.png')}
                        style={{
                            width: wp(5),
                            resizeMode: 'contain'
                        }}
                    />
                </RippleEffect>
            )
        } else {
            if (isExistt) {
                return (
                    <View style={{ paddingLeft: wp(3), flexDirection: 'row' }}>
                        <Image
                            source={require('../../assets/tick.png')}
                            style={{
                                width: wp(5),
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                )
            } else {
                return (
                    <View style={{ paddingLeft: wp(3), flexDirection: 'row' }}>
                        <Image
                            source={require('../../assets/download.png')}
                            style={{
                                width: wp(5),
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                )
            }
        }

    }

    const onPress = (item) => {
        // //console.log(item)
        dispatch(downloadFile(item, setProgress, setLoading,setExist,setJobId))
        // NavigationService.push('issueDetails', actions)
    }
    return (
        <RippleEffect disabled={loadingg} rippleOpacity={0} onPress={() => onPress(props.item)} style={styles.container}>
            <View style={{ backgroundColor: theme.colors.lightBlue,  }}>
                <Image
                    style={styles.image}
                    source={{ uri: props.item.item.icon }} />
            </View>

            <View style={{flexDirection:'row-reverse',flex:1,alignItems:'center'}}>
                <CustomText
                    style={styles.text}
                    numberOfLines={1}
                    fontSize={theme.fontSize.font14}
                    textColor={theme.colors.gray2} >
                    {props.item.item.title}
                </CustomText>

                {loadingg ?
                <View style={{height:hp(6),justifyContent:'center'}}>
                    <CustomText style={{ marginLeft:5,marginTop:3 }}>{progresss} %</CustomText> 
                </View>
                : null
                }

                {renderIcon()}
                
            </View>


        </RippleEffect>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(90),
        // height: hp(10),
        borderWidth: 1,
        borderColor: theme.colors.lightBlue,
        // alignSelf: 'center',
        borderRadius: wp(5),
        // justifyContent: 'center',
        // padding: wp(3),
        flexDirection: 'row-reverse',
        marginTop: hp(1),
        marginBottom: hp(1),
        backgroundColor: theme.colors.white,
        // elevation: 2,
        overflow: "hidden"
    },
    image: {
        width: hp(5),
        height: hp(5),
        borderRadius: wp(2),
        margin:wp(2.5)
    },
    text: {
        padding: hp(0.5),
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'right',
        marginRight: wp(2),
    }
})

export { DownloadListItem }