import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {theme} from '../constants'

const CustomScrollView = ({paginationAction, style, children, loading, showsVerticalScrollIndicator}) =>{
    const loadNextPage = (event) => {
        const contentHeight = event.nativeEvent.contentSize.height
        const scrollHeight = event.nativeEvent.contentOffset.y + theme.sizes.height * 0.81
        if(scrollHeight >= contentHeight * 0.97 && !loading){
            paginationAction()
        }
    }
    return( 
        <ScrollView 
            onScroll={ event => loadNextPage(event) } 
            showsVerticalScrollIndicator = {showsVerticalScrollIndicator}
            style={style}>
            {children}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    spinner :{
        alignSelf: 'center',
    }
})

export {CustomScrollView}