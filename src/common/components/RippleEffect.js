import React from 'react';
import { StyleSheet,
    Platform,
    TouchableOpacity,
    View
} from 'react-native';
import { iranSans, iranSansBold} from '../../utils/helper/commonVariables';
import Ripple from 'react-native-material-ripple';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
class RippleEffect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.disabled){
            return (
                <View
                    // rippleContainerBorderRadius={wp(4)}
                    //   rippleColor='red'
                    {...this.props}
                //   style={[styles.defaultStyle,this.props.bold?styles.bold:null, this.props.style]}
                >
                    {this.props.children}
                </View>
                // <TouchableOpacity
                //     rippleContainerBorderRadius={wp(4)}
                //     //   rippleColor='red'
                //     {...this.props}
                // //   style={[styles.defaultStyle,this.props.bold?styles.bold:null, this.props.style]}
                // >
                //     {this.props.children}
                // </TouchableOpacity>
            );
        }else{
            return (
                <Ripple 
                ref={this.props.ref}
                    rippleContainerBorderRadius={wp(4)}
                    //   rippleColor='red'
                    {...this.props}
                //   style={[styles.defaultStyle,this.props.bold?styles.bold:null, this.props.style]}
                >
                    {this.props.children}
                </Ripple>
                // <TouchableOpacity
                //     rippleContainerBorderRadius={wp(4)}
                //     //   rippleColor='red'
                //     {...this.props}
                // //   style={[styles.defaultStyle,this.props.bold?styles.bold:null, this.props.style]}
                // >
                //     {this.props.children}
                // </TouchableOpacity>
            );
        }
       
    }
}

const styles = StyleSheet.create({
    defaultStyle: {
        fontFamily: iranSans,
    },
    bold: Platform.OS === 'ios' ? {
        fontFamily: iranSans,
        fontWeight: 'bold'
    } : {
            fontFamily: iranSansBold
        },
});

export { RippleEffect }