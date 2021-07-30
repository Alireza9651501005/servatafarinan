import Toast from 'react-native-root-toast';
import { font14, font12 } from '../../utils/helper/responsiveSizes';
import { errorToast, lightGreen, iranSans } from '../../utils/helper/commonVariables';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

let toastArr = [];

export default CToast = (text, mode,duration = Toast.durations.LONG) => {
    //console.log('toast : ', text);
    //let shouldShow = true;
    if (toastArr.length > 1) {
        toastArr.map((item) => {
            if (toastArr.indexOf(item) === toastArr.length - 1) {
                //return
                // shouldShow = false;
            } else {
                Toast.hide(item);
            }
        })
    }

    let toast = Toast.show(text, {
        duration: duration,
        // position: 100,
        position: Toast.positions.TOP,

        shadow: false,
        animation: false,
        hideOnPress: true,
        delay: 0,
        textStyle: {
            color: 'white',
            fontSize: font12,
            fontFamily: iranSans,
            textAlign: 'center',
            alignSelf: 'center',
            width: '100%',
            padding: 5,
        },
        containerStyle: {
            width: '70%',
            // backgroundColor: '#f2dede',
            backgroundColor: mode==='success'?'#0a0':mode==='alert'? '#e8ae30' :errorToast,
            borderRadius: hp(2),
            padding: 10,
            opacity: 1,
        },
        opacity: 1,
        onShow: () => {
            toastArr.push(toast)
        },
    });

}