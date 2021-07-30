import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {theme} from '../constants'
import CustomeImage from "./CustomeImage";

const ParentView = ({children, largeHeader, smallHeader}) => {
    const containerStyle =[
        styles.container,
        largeHeader && styles.largeHeader,
        smallHeader && styles.smallHeader
    ]
    return <View style={containerStyle}>
        <Image 
            style={styles.header} 
            source={largeHeader? 
            require('../../assets/largeHeader.png'): 
            require('../../assets/smallHeader.png')} />
        {children}
    </View>
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: theme.colors.white
    },
    header:{
        position: 'absolute',
        width: theme.sizes.width,
        resizeMode: 'stretch'
    },
    largeHeader:{
        height: theme.sizes.largeHeaderHeight,
    },
    smallHeader:{
        height: theme.sizes.smallHeaderHeight,
    }
})
export {ParentView}