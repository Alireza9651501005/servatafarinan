import React from 'react'
import { Text, View } from 'react-native'
import { CourseRowItem } from './CourseRowItem'

const GeneralListItem = ({ item, action,itemLayout }) => {
    // //console.log('GeneralListItem',item.item)
    // //console.log('itemLayout',itemLayout)
    // switch (itemLayout) {
    //     case 'issue':
    //         // return <CourseRowItem item={item} actions={item.item.action} />
    //         return (<Text>asdasdas</Text>)
    //     // case 'category' :
    //     //     return <CategoryListItem item={item} actions={item.item.action} />
    // }
    return (
        <View>
            <CourseRowItem item={item.item} actions={item.action} itemLayout={itemLayout} />
        </View>
    )
}
export { GeneralListItem }