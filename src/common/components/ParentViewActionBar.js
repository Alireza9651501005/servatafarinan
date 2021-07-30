import React from 'react'
import { View, StyleSheet, RefreshControl } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ActionBar } from '.'
import { theme } from '../constants'
import { appBAckgroundColor } from '../../utils/helper/commonVariables'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
const ParentViewActionBar = (props) => {
    const parent = [
        styles.container,
        props.style
    ]

    return (
        <View style={parent}>
            {props.title || props.back ? <ActionBar noRradius={props.noRradius} share={props.share} shareOnPress={props.shareOnPress} navigation={props.navigation} titleColor={props.titleColor} back={props.back} title={props.title} menu={props.menu} /> : null}
            {props.scroll ?
                <ScrollView
                    refreshControl={props.onPullDown ?
                        <RefreshControl
                            refreshing={false}
                            onRefresh={props.onPullDown()}
                        />
                        : null
                    }
                >
                    {props.children}
                </ScrollView>
                :
                props.children
            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: appBAckgroundColor,
        // backgroundColor: 'red',
        // backgroundColor: theme.colors.background,
        flex: 1,
    },
})
export { ParentViewActionBar }