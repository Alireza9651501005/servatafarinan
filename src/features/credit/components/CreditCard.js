import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomText } from '../../../common/components';
import { colors, sizes } from '../../../common/constants/theme';
import { priceSeparator } from '../../../utils/helper/functions';
import { fontSize10, fontSize16, fontSize18, fontSize8 } from '../../../utils/helper/responsiveSizes';

export default function CreditCard({data}) {
    return (
        <View style={styles.container}>
            <CustomText bold>کیف پول شما</CustomText>
            <View style={styles.card}>
                <View style={styles.iconRow}>

                    <Image
                        style={{ width: wp(6.4), height: wp(6.4), resizeMode: 'contain' }}
                        source={require('../../../assets/credit/card_chit.png')}
                    />
                    <Image
                        style={{ width: wp(14), height: wp(16), resizeMode: 'contain' }}
                        source={require('../../../assets/credit/logo.png')}
                    />
                    

                </View>

                <View style={styles.row2}>
                    <CustomText style={{fontSize:fontSize16,color:colors.textWhite}}>
                        {data.name}
                    </CustomText>

                    <Text  style={{fontSize:fontSize18,color:colors.textWhite}}>
                        {data.amount?priceSeparator(data.amount):0}
                    </Text>
                </View>

                <View style={{width:'100%',alignItems:'flex-start'}}>
                    <CustomText style={{fontSize:fontSize8,color:colors.textWhite}}>{data.currency}</CustomText>
                </View>

                <View style={styles.cardNumRow}>
                    <Text style={{fontSize:fontSize16,color:colors.textWhite}}>2234</Text>
                    <Text style={{fontSize:fontSize16,color:colors.textWhite}}>4567</Text>
                    <Text style={{fontSize:fontSize16,color:colors.textWhite}}>5443</Text>
                    <Text style={{fontSize:fontSize16,color:colors.textWhite}}>8787</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingRight: sizes.globalMargin,
        paddingLeft:sizes.globalMargin,
        paddingTop:hp(2),
        paddingBottom:hp(2)
    },
    card: {
        width: wp(78),
        borderRadius: sizes.globalRadius,
        backgroundColor: colors.componentsDarkBlue,
        padding: wp(5),
        alignSelf:'center',
        marginTop:hp(1)
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row2:{
        flexDirection:'row-reverse',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:hp(1)
    },
    cardNumRow:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:hp(1)
    }
})