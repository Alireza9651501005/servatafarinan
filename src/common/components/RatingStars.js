import React from 'react';
import { Image ,View , StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

function RatingStars({rate ,small , type}) {
    const stars = [];
    for (i = 0; i < rate; i++) {
        stars.push(<Image
            key={i + 't'}
            style={small? styles.smallSize :styles.starColor}
            source={require('../../assets/star/star.png')}
        />)
    }
    for (i = 0; i < 5 - rate; i++) {
        stars.push(<Image
            key={i + 'f'}
            style={small? styles.smallSize :styles.starColor}
            source={type==='profile'? require('../../assets/star-border.png'):require('../../assets/star/star-border.png')}
        />)
    }
    return (
        <View style={styles.container}>
            {stars}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
     flexDirection: 'row', 
    //  borderWidth:1
    },
    starColor:{
        //change by mahdi
        // height: wp(3),
        // width: wp(3),
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain'
    },
    smallSize:{
        height: wp(2),
        width: wp(2),
        resizeMode: 'contain'
    }
})

export {RatingStars}