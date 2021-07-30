import React, { Component } from 'react';
import {
    Animated,
    Platform,
    StyleSheet,
    Text,
    View,
    RefreshControl,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../constants';
import { ActionBar } from './ActionBar';
import HomeStickyHeader from '../../features/home/components/HomeStickyHeader';

const HEADER_MAX_HEIGHT = Platform.OS === 'ios' ? hp(0) : hp(35);
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? hp(0) : hp(0);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class AnimatedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? hp(0) : 0,
            ),
            refreshing: false,
        };
    };

    render() {
        const { list, imageSource, titleColor, title, shareOnPress, share, type, customeHeader, onPullDown } = this.props;
        let image, color;
        image = imageSource ? imageSource[0].image : null;
        color = imageSource ? imageSource[0].color : null;
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? hp(0) : 0,
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });
        const headerTranslateTest = scrollY.interpolate({
            inputRange: [0, hp(28.2)],
            outputRange: [0, hp(-28.2)],
            extrapolate: 'clamp',
        });

        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        if (type == 'home') {
            return (
                <View style={styles.fill}>
                    <Animated.ScrollView
                        style={styles.fill}
                        scrollEventThrottle={1}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            { useNativeDriver: true },
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={onPullDown}

                                // Android offset for RefreshControl
                                progressViewOffset={HEADER_MAX_HEIGHT}
                            />
                        }
                        // iOS offset for RefreshControl
                        contentInset={{
                            top: HEADER_MAX_HEIGHT,
                        }}
                        contentOffset={{
                            y: -HEADER_MAX_HEIGHT,
                        }}
                    >
                        {list}
                    </Animated.ScrollView>

                    <Animated.View
                        style={[
                            styles.bar,
                            {
                                bottom: hp(70),
                                // transform: [
                                //     // { scale: titleScale },
                                //     { translateY: headerTranslateTest },
                                // ],
                            },
                        ]}
                    >
                      
                        {/* {Platform.OS !== 'ios' ? <HomeStickyHeader /> : null} */}
                        {Platform.OS !== 'ios' ? <HomeStickyHeader /> : null}
                    </Animated.View>
                </View>
            );

        } else {
            return (
                <View style={styles.fill}>
                    <Animated.ScrollView
                        style={styles.fill}
                        scrollEventThrottle={1}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            { useNativeDriver: true },
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={onPullDown}
                                // Android offset for RefreshControl
                                progressViewOffset={HEADER_MAX_HEIGHT}
                            />
                        }
                        // iOS offset for RefreshControl
                        contentInset={{
                            top: HEADER_MAX_HEIGHT,
                        }}
                        contentOffset={{
                            y: -HEADER_MAX_HEIGHT,
                        }}
                    >
                        {list}
                    </Animated.ScrollView>
                    <Animated.View
                        pointerEvents="none"
                        style={[
                            styles.header,
                            {
                                backgroundColor: color,
                                transform: [{ translateY: headerTranslate }]
                            },
                        ]}
                    >
                        <Animated.Image
                            style={[
                                styles.backgroundImage,
                                {
                                    // backgroundColor: color,
                                    opacity: imageOpacity,
                                    transform: [{ translateY: imageTranslate }],
                                },
                            ]}
                            source={{ uri: image }}
                        />

                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.bar,
                            {
                                height: hp(3),
                                transform: [
                                ],
                            },
                        ]}
                    >
                        <ActionBar
                            back
                            title={title}
                            titleColor={titleColor}
                            share={share}
                            shareOnPress={shareOnPress} />
                    </Animated.View>
                </View >
            );
        }
    }
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'red',
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
        borderRadius: theme.sizes.globalRadius
        // zIndex:1,

    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'contain',
        // backgroundColor: 'magenta',
        // zIndex:2,
    },
    bar: {
        backgroundColor: 'transparent',
        // backgroundColor: 'red',
        // marginTop: Platform.OS === 'ios' ? 0 :  hp(5),
        //home
        // height: hp(5),
        height: hp(0),
        // alignItems: 'center',
        // justifyContent: 'center',
        position: 'absolute',
        // top: hp(3),
        left: 0,
        right: 0,
        // bottom: hp(92),
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width:'95%',
        alignSelf: 'center',
        borderBottomLeftRadius: theme.sizes.globalRadius,
        borderBottomRightRadius: theme.sizes.globalRadius,
        // borderWidth: 1,
        // borderColor: 'white'
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? 0 : 0,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});