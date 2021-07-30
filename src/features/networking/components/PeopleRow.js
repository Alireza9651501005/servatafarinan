import React from 'react'
import { View, FlatList, Image } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import LevelItem from './LevelItem'
import HalfCircleSeparator from './HalfCircleSeparator'
import PeopleItem from './PeopleItem'

export default function PeopleRow(props) {
    const renderListFooter = () => {
        return (
            <View >
                <Image
                    source={require('../../../assets/networking/people.png')}
                    style={{ width: wp(5), height: wp(5), resizeMode: 'contain' }}
                />
            </View>
        )

    }
    return (
        <View style={{marginTop:wp(8)}}>
            <FlatList
                // contentContainerStyle={{justifyContent:'center',borderWidth:40,borderColor:'black'}}
                keyExtractor={(_, i) => i.toString()}
                inverted
                scrollEnabled={false}
                horizontal
                data={props.data}
                renderItem={({ item, index }) => <PeopleItem item={item} index={index}/>}
                // ItemSeparatorComponent={() => <View style={{width:wp(5)}} />}
                ListHeaderComponent={() => renderListFooter()}
                ListHeaderComponentStyle={{justifyContent:'center',marginRight:wp(1.5)}}
            />
        </View>

    )
}