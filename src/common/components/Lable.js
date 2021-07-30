import React from "react";
import { StyleSheet } from "react-native";
import { CustomText } from ".";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontSize14, fontSize16 } from "../../utils/helper/responsiveSizes";
import { theme } from "../constants";
import { handleAction } from "../../utils/helper/functions";
import { useSelector, useDispatch } from "react-redux";
const Lable = ({ WrapperStyle, action }) => {
    const dispatch = useDispatch();
    return (
        <CustomText onPress={handleAction(action, dispatch)} style={[styles.defaultLableStyle, WrapperStyle]}>
            {action.title}
        </CustomText>
    );

};
const styles = StyleSheet.create({
    defaultLableStyle: {
        textAlign: 'right',
        fontSize: fontSize16,
        // marginBottom: hp(2),
        // borderWidth:1,
        width: wp(80),
        alignSelf: 'center',
        color: theme.colors.blue1
    },
});
export { Lable };