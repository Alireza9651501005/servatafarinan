import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { CustomPending, ActionBar, ParentViewActionBar } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { headerText, whenListIsEmptyText } from "./texts";
import PageGuide from "./components/PageGuide";
import { getNetworking, getNetworkingPending } from "./actions/networkingAction";
import { networkingApi } from '../../utils/api/Url';
import { colors, sizes } from "../../common/constants/theme";
import CircleItem from "./components/CircleItem";
import HalfCircleSeparator from './components/HalfCircleSeparator'
import CircleRow from "./components/CircleRow";
import LevelsRow from "./components/LevelsRow";
import VerticalSeparators from "./components/VerticalSeparators";
import PeopleRow from "./components/PeopleRow";
import ScoreItem from './components/ScoreItem'
import ShareApp from "./components/ShareApp";
import NetworkingAppTour from "./components/NetworkingAppTour";

export default function networkingScreen({ navigation }) {
    const states = useSelector(state => state);
    const dispatch = useDispatch();

    let loading, error, networkingData, showPageGuideStatus;
    loading = states.networkingReducer.loading;
    error = states.networkingReducer.error;
    networkingData = states.networkingReducer.networking;
    showPageGuideStatus = states.networkingReducer.showPageGuide;

    useEffect(() => {
        dispatch(getNetworking('get', networkingApi))
        return ()=>{
            dispatch(getNetworkingPending())
        }
    }, [])

    const data = [
        {
            "label": "سطح یک",
            "total_score": 0,
            "persons": 0
        },
        {
            "label": "سطح دو",
            "total_score": 0,
            "persons": 0
        },
        {
            "label": "سطح سه",
            "total_score": 0,
            "persons": 0
        },
        {
            "label": "سطح چهار",
            "total_score": 0,
            "persons": 0
        }
    ]
    const renderContent = () => {
        return (
            <View style={{ flex: 1, paddingRight: sizes.globalMargin, paddingLeft: sizes.globalMargin,paddingBottom:hp(10) }}>
                <NetworkingAppTour navigation={navigation} networkingData={networkingData}/>
            </View>
        )
    }

    return (
        <ParentViewActionBar scroll back titleColor={theme.colors.someHeaderColor} title={headerText} navigation={navigation}>
            <View style={styles.container}>
                {error || loading == true ?
                    <CustomPending
                        style={styles.pending}
                        pending={loading}
                        retryAction={() => dispatch(getNetworking('get', networkingApi))} /> :
                    renderContent()
                }

            </View>
        </ParentViewActionBar>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pending: {
        position: 'relative',
        marginTop: hp(40)
    }
})