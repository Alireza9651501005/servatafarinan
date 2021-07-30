import React from 'react'
import { CustomCarousel, SnapCarousel, HorizontalList } from '.'
import { RefreshControl, ScrollView,View } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
const ContentList = ({ contents, children, style, onPullDown ,scroll,constantHeader}) => {
    const containerStyle = [
        { flex: 1 },
        style
    ]
    const list = (row, i) => {
        if (row.items ? row.items.length > 0 : false)
            switch (row.type) {
                case 'banner':
                    return <CustomCarousel key={i.toString()} v_padding={row.v_padding} h_padding={row.h_padding} full={row.full} height={row.height} data={row.items} />//SnapCarousel
                case 'item-list':
                    return <HorizontalList key={i.toString()} itemLayout={row.item_layout} btnTitle={row.button_title} title={row.title} data={row.items} buttonAction={row.button_action} />

            }
    }
    
    return (
        <ScrollView
            refreshControl={onPullDown ?
                <RefreshControl
                    refreshing={false}
                    onRefresh={onPullDown()}
                />
                : null
            }
            style={containerStyle}>
                {constantHeader?
                constantHeader:null    
            }
            {contents && contents.length > 0 ?
                contents.map((row, i) => list(row, i)) : null}
            {children}
            <View style={{height:heightPercentageToDP(10)}}/>
        </ScrollView>
    )
}
export { ContentList }