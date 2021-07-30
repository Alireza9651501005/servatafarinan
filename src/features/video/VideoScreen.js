import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    StatusBar,
    View,
    ActivityIndicator,
    AppState,
    BackHandler
} from "react-native";
import Video from "react-native-video";
import VideoPlayer from 'react-native-video-controls';
// import {screenH, screenW} from "../../helper/Global";
import Orientation from 'react-native-orientation';
import { Controller, TopController } from "./components/Controller";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getVideo, getVideoPending, saveVideoProgress, saveVideoRecords, sendVideoRecords } from './actions/videoAction';
import { sendVideoRecordsApi } from '../../utils/api/Url';
import { analyticCustomEvent } from '../../utils/helper/functions';
import Controls from './components/Controls';
import { isIos } from '../../utils/helper/Global';
import { changeAppHeaderColor } from '../../store/globalActions';
class VideoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLoaded: false,
            isControllerUp: true,
            //
            // videoUrl: this.props.navigation.state.params.videoUrl,
            //
            volume: 1,
            duration: 0,
            progress:0,
            currentTime: 0,
            playableDuration: 0,
            paused: false,
            startDateTime: 0,
            startTime: false,
            endTime: false,
            endDateTime: 0,
            lessonId: 0,
            hasSeek: false,
            isPlaySeek: false,
            firstSeek: false,
            courseTitle:'',
            cover:''
        };

        this.timeoutId = null;
        this.showVideoTimeout = null;
    }
    _pasEditUnmountFunction = this.handleBackButton.bind(this)

    componentDidMount() {
        const { videoData, route, videoRecords, sendVideoRecords, getVideo, lastProgress } = this.props;
        AppState.addEventListener("change", this._handleAppStateChange);
        BackHandler.addEventListener('hardwareBackPress', this._pasEditUnmountFunction)
        console.log('=========================>',route)
        let timeOut = videoData.urlTimeOut;
        let videoURl = videoData.url;
        let url = route.params.url + '/video';
        let lessonId = route.params.lessonId;
        let cover = route.params.cover;

        let apiHandleLesson = route.params.apiHandle
        // this.props.changeAppHeaderColor('#000')
        // this.props.saveVideoRecords([])
        analyticCustomEvent('video_in', { lessonId: lessonId })
        if (videoRecords.length > 0) {
            sendVideoRecords(sendVideoRecordsApi, videoRecords, this.state.lessonId, apiHandleLesson)
        }
        this.showVideoTimeout = !videoURl ? setTimeout(() => {
            getVideo(url)
        }, 1000) : null;
        this.showVideoTimeout;
        //need to change
        // let url = this.props.route.params.url + '/video'
        // !videoURl ? this.props.getVideo(url) : null;
        Orientation.lockToLandscape();
        console.log('-------------------------',cover)
        setTimeout(() => {
            this.setState({ loading: false, lessonId: lessonId ,courseTitle:route.params.courseTitle,cover:cover });

        }, timeOut);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._pasEditUnmountFunction)

        const { startTime, currentTime, startDateTime, lessonId, hasSeek } = this.state;
        const { videoRecords, route, sendVideoRecords, lastProgress, saveVideoRecords, saveVideoProgress } = this.props;
        let apiHandleLesson = route.params.apiHandle
        if (startTime !== false) {
            let obj = {
                lesson_id: lessonId,
                start_time: startDateTime,
                stop_time: Date.now(),
                video_start_time: startTime,
                video_stop_time: currentTime * 1000,
                has_seek: hasSeek
            }
            let records = videoRecords
            records.push(obj)
            saveVideoRecords(records)
        }
        analyticCustomEvent('video_out', { lessonId: lessonId })
        if (videoRecords.length > 0) {
            sendVideoRecords(sendVideoRecordsApi, videoRecords, lessonId, apiHandleLesson)
        }
        AppState.addEventListener("change", this._handleAppStateChange);
        let lastProgressState = lastProgress;
        lastProgress[lessonId] = { progress: currentTime }
        saveVideoProgress(lastProgress)
        this.terminateTimer();
        // this.props.getVideoPending()
    }

    handleVolume = (value) => {
        this.setState({volume:value})
    }

    handleBackButton() {
        Orientation.lockToPortrait();

        return false
    }

    _handleAppStateChange = nextAppState => {
        const { saveVideoProgress, lastProgress, videoRecords, route, sendVideoRecords } = this.props;
        const { lessonId, currentTime } = this.state
        //console.log('-------------------------------------> app state',nextAppState)
        let apiHandleLesson = route.params.apiHandle
        if (nextAppState === 'background') {
            //console.log(this.player)
            lastProgress[lessonId] = { progress: currentTime }
            saveVideoProgress(lastProgress)
            this.setState({ paused: true })
            if (videoRecords.length > 0) {
                // sendVideoRecords(sendVideoRecordsApi, videoRecords, lessonId, apiHandleLesson)
                //console.log('send video records',videoRecords)
            }
        }
    };

    addVideoTimeRecord = () => {
        const { startTime, currentTime, startDateTime, lessonId, hasSeek } = this.state;
        const { videoRecords, saveVideoRecords } = this.props;
        if (startTime !== false) {
            let obj = {
                lesson_id: lessonId,
                start_time: startDateTime,
                stop_time: Date.now(),
                video_start_time: startTime,
                video_stop_time: currentTime * 1000,
                has_seek: hasSeek
            }
            let records = videoRecords
            records.push(obj)
            saveVideoRecords(records)
            this.setState({
                startTime: false,
                endTime: false,
                startDateTime: Date.now(),
                hasSeek: false
            })
        }
    }

    terminateTimer = () => {
        if (this.timeoutId !== null) clearTimeout(this.timeoutId);
    };

    setController = (status, callback = null) => {
        this.setState({ isControllerUp: status }, callback)
    };

    setControllerUp = () => {
        this.terminateTimer();
        this.setController(true, () => {
            // this.timeoutId = setTimeout(() => {
            //     this.setController(false)
            // }, 10000)
        })
    };

    onTouchScreen = () => {
        //console.log('onTouchScreen');
        if (this.state.isControllerUp) {
            this.setController(false);
        } else {
            this.setControllerUp();
        }
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar translucent={false} backgroundColor={'#000'} barStyle="light-content" hidden={true} />
                {this.props.loading ? null :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Video
                            playInBackground={false}
                            // controls={true}
                            // onPlay={(value) => //console.log('play play', value)}
                            fullscreen={true}
                            fullscreenOrientation={'landscape'}
                            // fullscreenAutorotate={true}
                            ignoreSilentSwitch={"ignore"}
                            source={{
                                uri: this.props.videoData.url
                                // uri:'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8'

                            }}
                            ref={ref => this.player = ref}
                            style={{
                                alignSelf: 'center',
                                width: hp(100),
                                height: wp(100),
                            }}
                            poster={this.state.cover}
                            posterResizeMode={'contain'}
                            resizeMode={'contain'}
                            bufferConfig={{
                                minBufferMs: 15000,//mls
                                maxBufferMs: 100000,
                                bufferForPlaybackMs: 5000,
                                bufferForPlaybackAfterRebufferMs: 5000
                            }}

                            // fullscreen={true}
                            minLoadRetryCount={5}
                            setKeepScreenOn = {true}
                            setScreenOnWhilePlaying={true}
                            //allowsExternalPlayback={false}

                            onBuffer={this.onBuffer}             // Callback when remote video is buffering
                            onError={this.onError}               // Callback when video cannot be loaded
                            paused={this.state.paused}
                            volume={this.state.volume}
                            onLoad={this.onLoad}
                            onLoadStart={this.onLoadStart}
                            onProgress={this.onProgress}
                            progressUpdateInterval={1000}
                            onEnd={this.onEnd}
                            onSeek={this.onSeek}
                            // onPlaybackResume={(value) => //console.log('on play back resume', value)}
                            onReadyForDisplay={this.onReadyForDisplay}
                        // onPlaybackRateChange={(value) => //console.log('on play back change', value)}
                        // onExternalPlaybackChange={(value) => //console.log('on external play back change', value)}
                        // onPlaybackStalled={(value) => //console.log('on play back stalled', value)}
                        />

                        <Controller
                            isControllerUp={this.state.isControllerUp}

                            onPlayPress={this.onPlayPress}
                            // onValueChange={this.onValueChange}
                            onSlidingStart={this.onSlidingStart}
                            onSlidingComplete={this.onSlidingComplete}
                            duration={this.state.duration}
                            currentTime={this.state.currentTime}
                            playableDuration={this.state.playableDuration}
                            player = {this.player}
                            volume = {this.state.volume}
                            setVolume = {this.handleVolume}
                            paused={this.state.paused}
                            courseTitle = {this.state.courseTitle}
                        />
                    </View>
                }

                {!this.state.isLoaded && <View style={{
                    position: 'absolute', flex: 1, justifyContent: 'center', alignItems: 'center',
                }}>
                    <ActivityIndicator
                        size="large" color='#aaa' />
                </View>}

            </View>
        )
    }

    onSlidingStart = (value) => {
        //console.log('onSlidingStart_ value : ', value);
        this.setState({ paused: true });
    };

    onPlayPress = () => {
        //console.log('onPlayPress');
        this.setControllerUp();

        if (this.state.currentTime === Math.round(this.state.duration)) {
            this.player && this.player.seek(0);
            setTimeout(() => {
                this.setState({
                    paused: false,
                    currentTime: 0,
                })
            }, 300);

        } else {
            this.setState((prevSate) => {
                return {
                    paused: !prevSate.paused,
                }
            })
        }
    };

    onSlidingComplete = (time) => {
        console.log('onSlidingComplete',time);
        time = Math.floor(time);
        this.player && this.player.seek(time);
        this.setState({
            currentTime: time,
            paused: false,
        });
    };

    onEnd = () => {
        //console.log('onEnd');
        this.addVideoTimeRecord()
        this.setState({
            currentTime: Math.round(this.state.duration),
            paused: true,
        })
        Orientation.lockToPortrait()
        this.props.navigation.goBack()
    };

    onProgress = (progress) => {
        //console.log('onProgress', progress);
        this.setState({progress: progress.currentTime/this.state.duration});
        if (this.state.startTime !== false) {
            this.setState({
                endTime: progress.currentTime * 1000,
                isLoaded: true,
                currentTime: Math.floor(progress.currentTime),
                playableDuration: Math.floor(progress.playableDuration),
            })
        } else {
            this.setState({
                startTime: progress.currentTime * 1000,
                startDateTime: Date.now(),
                isLoaded: true,
                currentTime: Math.floor(progress.currentTime),
                playableDuration: Math.floor(progress.playableDuration),
            })
        }

    };

    onReadyForDisplay = (value) => {
        //console.log('on ready display', value)
        const { lessonId, startTime, endTime, hasSeek, startDateTime, endDateTime, isPlaySeek } = this.state
        const { videoRecords, saveVideoRecords } = this.props
        if (startTime !== false && !isPlaySeek) {
            let obj = {
                lesson_id: lessonId,
                start_time: startDateTime,
                stop_time: Date.now(),
                video_start_time: startTime,
                video_stop_time: endTime,
                has_seek: hasSeek
            }
            let records = videoRecords
            records.push(obj)
            saveVideoRecords(records)
            this.setState({
                startTime: false,
                endTime: false,
                startDateTime: Date.now(),
                hasSeek: false
            })
        }
        this.setState({ isPlaySeek: false })
    }

    onSeek = (value) => {
        //console.log('on seeek', value)
        if (this.state.startTime !== false) {
            this.setState({
                hasSeek: this.state.firstSeek ? false : true,
                endTime: value.currentTime * 1000,
                currentTime: value.currentTime,
                isPlaySeek: true,
                firstSeek: false
            })
        } else {
            this.setState({ endTime: value.currentTime * 1000, currentTime: value.currentTime })
        }
    }

    onLoad = (payLoad) => {
        console.log('onLoad');
        const { lastProgress } = this.props;
        const { lessonId } = this.state
        if (lastProgress[lessonId] && this.player&&lastProgress[lessonId].progress!= Math.floor(payLoad.duration)) {
            this.player.seek(lastProgress[lessonId].progress)
            this.setState({
                startTime: lastProgress[lessonId].progress * 1000,
                startDateTime: Date.now(),
                firstSeek: true,
                currentTime:lastProgress[lessonId].progress
            })
        }
        this.setState({
            //currentTime: payLoad.currentTime,
            duration: Math.floor(payLoad.duration),
        });
    };

    onLoadStart = (payLoad) => {
        //console.log('onLoadStart');
        clearTimeout(this.showVideoTimeout)
    };

    onMutePress = () => {
        //console.log('onMutePress');
        this.setControllerUp();
        this.setState((prevState) => {
            return {
                volume: prevState.volume === 1 ? 0 : 1
            }

        })
    };

    onBackPress = () => {
        //console.log('onBackPress');
        this.props.navigation.goBack();
    };


    onBuffer = () => {
        //console.log('onBuffer');
        this.setState({ isLoaded: false, });
        this.setControllerUp();
        clearTimeout(this.showVideoTimeout)
    };

    onError = (err) => {
        //console.log('onError : ', err);
    }
}

const mapStateToProps = (state) => ({
    loading: state.videoReducer.loading,
    videoData: state.videoReducer.videoData,
    videoUrl: state.videoReducer.videoData.url,
    videoRecords: state.videoTimesReducer.videoRecords,
    lastProgress: state.videoTimesReducer.lastProgress
})

const mapDispatchToProps = {
    getVideo,
    getVideoPending,
    saveVideoRecords,
    sendVideoRecords,
    saveVideoProgress,
    changeAppHeaderColor
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen)