import React from 'react';
import { View, StyleSheet, Image, Text,Pressable } from 'react-native';
// import { AppTour, AppTourView } from 'react-native-app-tour'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, sizes } from '../../../common/constants/theme';
import { CustomText, RippleEffect } from '../../../common/components'
import { fontSize12, fontSize16 } from '../../../utils/helper/responsiveSizes';

class LessonButton extends React.Component {

    render(){
        const { addAppTourTarget, key, tourProps } = this.props
        return (
            <Pressable
            key={key}
                ref={ref => {
                    if (!ref) return

                    this.button1 = ref

                    // this.props.addAppTourTarget &&
                    //     this.props.addAppTourTarget(AppTourView.for(ref, { ...tourProps }))
                }}
                onPress={this.props.onPress}
                style={styles.container}>
                <Image
                    source={this.props.icon}
                    style={styles.image}
                />
    
                <CustomText bold style={{ color: colors.textWhite, fontSize: fontSize16,textAlign:'justify',direction:'rtl'}}>{this.props.title}</CustomText>
    
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',paddingRight:wp(4.2) ,paddingLeft:wp(4.2)}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomText style={{ color: colors.textWhite, maxWidth: wp(8), fontSize: fontSize12, marginRight: 3, top: 1 }}>{this.props.viewCount}</CustomText>
                        <Image
                            source={require('../../../assets/view/view.png')}
                            style={{ width: wp(4), height: wp(4), resizeMode: 'contain' }}
                        />
                    </View>
    
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomText numberOfLines={1} style={{ color: colors.textWhite, maxWidth: wp(12), fontSize: fontSize12, marginRight: 3, top: 1 }}>{this.props.myScore + '/' + this.props.totalScore}</CustomText>
                        <Image
                            source={require('../../../assets/score/lesson-score.png')}
                            style={{ width: wp(4), height: wp(4), resizeMode: 'contain' }}
                        />
                    </View>
                </View>
            </Pressable>
        )
    }
    
}

// const areEqual = (prevProps, nextProps) => return false

const styles = StyleSheet.create({
    container: {
        width: wp(40),
        backgroundColor: colors.buttons,
        borderRadius: sizes.globalRadius,
        alignItems: 'center',
        padding: wp(3)
    },
    image: {
        width: wp(16),
        height: wp(16),
        resizeMode: 'contain'
    }
})


export default LessonButton