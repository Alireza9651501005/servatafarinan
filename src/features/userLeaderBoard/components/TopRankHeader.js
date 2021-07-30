import React from "react";
import { View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { theme } from "../../../common/constants";
import { white2 } from "../../../common/constants/theme";
import TinySubHeader from "./TinySubHeader";
import { UserProfileImage } from './UserProfileImage';
export default function TopRankHeader({ navigation, item, onPress }) {
    const states = useSelector(state => state);
    return (
        <View style={styles.container}>
            <TinySubHeader />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', width: wp(90), bottom: hp(-4), zIndex: 1 }}>
                <UserProfileImage onPress={onPress} data={item[1]} style={{ marginTop: hp(4) }} size={20} />
                <UserProfileImage onPress={onPress} data={item[0]} style={{ marginBottom: hp(4) }} size={25} />
                <UserProfileImage onPress={onPress} data={item[2]} style={{ marginTop: hp(4) }} size={20} />
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        width: wp(100),
        height: hp(30),
        backgroundColor: theme.colors.headerDarkBlue,
        borderColor: white2,
        borderBottomRightRadius: theme.sizes.globalRadius,
        borderBottomLeftRadius: theme.sizes.globalRadius,
    },
});