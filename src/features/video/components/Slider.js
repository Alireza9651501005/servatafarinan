import * as React from "react";
import {I18nManager} from "react-native";
import Animated from "react-native-reanimated";
import {PanGestureHandler, State} from "react-native-gesture-handler";
import Ballon from "./Ballon";

//react-native-reanimated-slider

const {
    Value,
    event,
    cond,
    eq,
    set,
    clockRunning,
    startClock,
    spring,
    stopClock,
    Extrapolate,
    sub,
    Clock,
    divide,
    call,
    interpolate,
    multiply,
    block,
    or
} = Animated;

const BUBBLE_WIDTH = 100;

/**
 * The slider component to show progress. you should install and link `react-native-reanimated`
 * and `react-native-gesture-handler` to be able to use it. All animated values must be imported from
 * `react-native-reanimated`.
 *
 * ## Usage
 *
 * ```js
 * import Slider from 'react-native-reanimated-slider';
 * ...
 *
 * renderBallon=()=>(
 *  <View>
 *    <TextInput ref={this.text} />
 *  </View>
 * )
 *
 * setBallonText=(text)=>{
 *   this.text.setNativeProps({text})
 * }
 *
 * render(){
 *   return (
 *     <Slider
 *       style={{ flex: 1 }}
 *       minimumTrackTintColor="#fff"
 *       thumbTintColor="#fff"
 *       ballon={value => this.convertSecondToTime(value)}
 *       progress={this.currentTime}
 *       min={new Reanimated.Value(0)}
 *       cache={this.playableDuration}
 *       max={this.seekableDuration}
 *       onSlidingStart={this.slidingStart}
 *       onSlidingComplete={this.slidingComplete}
 *
 *       // only if you want to render custom ballon for sliding
 *       renderBallon={this.renderBallon}
 *       setBallonText={this.setBallonText}
 *     />
 *   )
 * }
 * ```
 *
 *
 */

class Slider extends React.Component{
    static defaultProps = {
        minimumTrackTintColor: "#333",
        maximumTrackTintColor: "d4d4d4",
        cacheTrackTintColor: "#333",
        borderColor: "#333"
    };
    ballon = React.createRef();

    constructor(props) {
        super(props);

        const {min, max} = props;

        this.convert_to_percent = value =>
            cond(eq(min, max), 0, divide(value, sub(max, min)));

        this.gestureState = new Value(0);

        this.x = new Value(0);

        this.width = new Value(0);


        this.clamped_x = cond(
            eq(this.width, 0),
            0,
            interpolate(this.x, {
                inputRange: [0, this.width],
                outputRange: [0, this.width],
                extrapolate: Extrapolate.CLAMP
            })
        );
        this.value_x = divide(multiply(this.clamped_x, max), this.width);

        this.onGestureEvent = event([
            {
                nativeEvent: {
                    state: this.gestureState,
                    x: this.x
                }
            }
        ]);

        this.clock = new Clock();


        this.spring_state = {
            finished: new Value(0),
            velocity: new Value(0),
            position: new Value(0),
            time: new Value(0)
        };

        this.runspring = ({toValue}) => {
            const config = {
                damping: 10,
                mass: 1,
                stiffness: 150,
                overshootClamping: false,
                restSpeedThreshold: 0.001,
                restDisplacementThreshold: 0.001,
                toValue: new Value(0)
            };
            return [
                cond(clockRunning(this.clock), 0, [
                    set(this.spring_state.finished, 0),
                    set(this.spring_state.velocity, 0),
                    // set(this.spring_state.position, from),
                    set(config.toValue, toValue),
                    startClock(this.clock)
                ]),

                spring(this.clock, this.spring_state, config),
                cond(this.spring_state.finished, [stopClock(this.clock)]),
                this.spring_state.position
            ];
        };

        this.height = cond(
            or(
                eq(this.gestureState, State.BEGAN),
                eq(this.gestureState, State.ACTIVE)
            ),
            [this.runspring({from: 0, toValue: 1})],
            cond(
                or(
                    eq(this.gestureState, State.UNDETERMINED),
                    eq(this.gestureState, State.END)
                ),
                [this.runspring({from: 1, toValue: 0})],
                this.spring_state.position
            )
        );

        this.state = {ballon: ""};
    }


    componentDidMount() {
        // this.progress_x = multiply(this.convert_to_percent(this.props.progress), this.width);

    }

    _onLayout = ({nativeEvent}) => {
        this.width.setValue(nativeEvent.layout.width);
    };

    _renderBallon = () => {
        return <Ballon ref={this.ballon}/>;
    };


    seekSlider = () => {
        this.seek = block([
            // debug("s", this.),
            cond(
                or(
                    eq(this.gestureState, State.ACTIVE),
                    eq(this.gestureState, State.BEGAN)
                ),
                [
                    call([this.value_x], x => {
                        // this.props.setBallonText
                        //     ? this.props.setBallonText(this.props.ballon(x[0]))
                        //     : this.ballon.current.setText(this.props.ballon(x[0]));
                    }),
                    cond(
                        eq(this.gestureState, State.BEGAN),
                        call([this.value_x], () => this.props.onSlidingStart())
                    ),
                    this.clamped_x
                ],
                [
                    cond(eq(this.gestureState, State.END), [
                        set(this.gestureState, State.UNDETERMINED),
                        call([this.value_x], x => this.props.onSlidingComplete(x[0]))
                    ]),
                    this.progress_x
                ]
            )
        ]);
    };

    render() {
        const {ballon} = this.state;


        const {
            renderBallon,
            style,
            minimumTrackTintColor,
            maximumTrackTintColor,
            cacheTrackTintColor,
            borderColor,
            progress,
            cache,
            height = 30,
            seekHeight = 7,
        } = this.props;

        this.progress_x = multiply(this.convert_to_percent(progress), this.width);

        this.cache_x = multiply(this.convert_to_percent(cache), this.width);

        this.seekSlider();

        // const ballonRenderer = renderBallon || this._renderBallon;
        return (
            <PanGestureHandler
                onGestureEvent={this.onGestureEvent}
                onHandlerStateChange={this.onGestureEvent}
            >
                <Animated.View
                    style={[
                        {
                            height: height,
                            overflow: "visible",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            backgroundColor: "transparent"
                        },
                        style
                    ]}
                    onLayout={this._onLayout}
                >
                    <Animated.View
                        style={{
                            width: "100%",
                            height: 8,
                            overflow: "hidden",
                            backgroundColor: maximumTrackTintColor
                        }}
                    >
                        <Animated.View
                            style={{
                                backgroundColor: cacheTrackTintColor,
                                height: "100%",
                                width: this.cache_x,
                                [I18nManager.isRTL ? "right" : "left"]: 0,

                                position: "absolute"
                            }}
                        />
                        <Animated.View
                            style={{
                                backgroundColor: minimumTrackTintColor,
                                height: "100%",
                                maxWidth: "100%",
                                width: this.seek,
                                [I18nManager.isRTL ? "right" : "left"]: 0,
                                position: "absolute"
                            }}
                        />
                    </Animated.View>
                    <Animated.View
                        style={{
                            position: "absolute",
                            bottom: 25,
                            [I18nManager.isRTL ? "right" : "left"]: -50,
                            width: BUBBLE_WIDTH,
                            opacity: this.height,
                            transform: [
                                {
                                    translateY: 0
                                },
                                {
                                    translateX: this.clamped_x
                                },
                                {
                                    scale: this.height
                                }
                            ]
                        }}
                    >
                        {/* {ballonRenderer({text: ballon})} */}
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        );
    }
}

export default Slider;
