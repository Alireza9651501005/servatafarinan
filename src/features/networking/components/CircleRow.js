import React from 'react'
import { View, FlatList, Image } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CircleItem from './CircleItem'
import HalfCircleSeparator from './HalfCircleSeparator'

export default function CircleRow(props) {
    const renderListFooter = () => {
        return (
            <View >
                <Image
                    source={require('../../../assets/networking/point.png')}
                    style={{ width: wp(5), height: wp(5), resizeMode: 'contain' }}
                />
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
                data={props.data}
                renderItem={({ item, index }) => <CircleItem item={item} index={index}/>}
                ItemSeparatorComponent={() => <HalfCircleSeparator />}
                ListHeaderComponent={() => renderListFooter()}
                ListHeaderComponentStyle={{justifyContent:'center',marginRight:wp(1.5)}}
            />
        </View>

    )
}