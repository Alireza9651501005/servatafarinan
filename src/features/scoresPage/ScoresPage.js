import React, { useEffect } from "react";
import { ContentList, CustomPending, ParentViewActionBar } from "../../common/components";
import { theme } from "../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { getAwardsRequest } from "./action/scoresPageAction";
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
export default function ScoresPage({ navigation }) {
    useEffect(() => {
        ScoresPageRequest()
        }, [])
    const ScoresPageRequest = () => {
        dispatch(getAwardsRequest())
    }
    const dispatch = useDispatch();
    const states = useSelector(state => state);
    let error, loading, scoresPageReducer, contents;
    scoresPageReducer = states.scoresPageReducer;
    loading = scoresPageReducer.loading;
    error = scoresPageReducer.error;
    contents = scoresPageReducer.data;
    return (
        <ParentViewActionBar
            title={'هدایا'}
            titleColor={theme.colors.someHeaderColor}
            style={{ backgroundColor: theme.colors.bgGray }}
            onPullDown={ScoresPageRequest}
            navigation={navigation}
            back>
            {error == true || loading == true ?
                <CustomPending
                    style={styles.pending}
                    pending={loading}
                    retryAction={ScoresPageRequest}

                /> :
                <ContentList
                    onPullDown={() => ScoresPageRequest}
                    // scroll={false}
                    contents={contents ? contents.content_rows : null} />
            }
        </ParentViewActionBar>
    )
}

const styles = StyleSheet.create({
    pending: {
        position: 'relative',
        marginTop: hp(40)
    }
});