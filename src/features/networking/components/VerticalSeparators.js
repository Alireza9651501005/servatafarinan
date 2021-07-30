import React from 'react'
import { View, FlatList, Image } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import LevelItem from './LevelItem'
import HalfCircleSeparator from './HalfCircleSeparator'
import { colors } from '../../../common/constants/theme'

export default function VerticalSeparators() {
    const renderListFooter = () => {
        return (
            <View style={{ width: wp(5) }}>

            </View>
        )

    }
    return (
        <View>
            <FlatList
                // contentContainerStyle={{justifyContent:'center',borderWidth:40,borderColor:'black'}}
                keyExtractor={(_, i) => i.toString()}
                inverted
                scrollEnabled={false}
                horizontal
                data={[
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
                        "label": "سطح جهار",
                        "total_score": 0,
                        "persons": 0
                    }
                ]}
                renderItem={({ item, index }) =>
                    <View style={{
                        width: wp(16),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{ width: 1, borderRightWidth: wp(.3), height: 18, borderColor: colors.borderGray, alignSelf: 'center' }} />
                    </View>}
                ItemSeparatorComponent={() => <View style={{ width: wp(5) }} />}
                ListHeaderComponent={() => renderListFooter()}
                ListHeaderComponentStyle={{ justifyContent: 'center', marginRight: wp(1.5) }}
            />
        </View>

    )
}