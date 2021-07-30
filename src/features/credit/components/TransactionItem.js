import React from 'react';
import { Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomText } from '../../../common/components';
import { colors, sizes } from '../../../common/constants/theme';
import { priceSeparator } from '../../../utils/helper/functions';
import { fontSize10, fontSize12, fontSize8 } from '../../../utils/helper/responsiveSizes';

export default function TransactionItem({ item, index }) {
    function isOdd(num) { return num % 2; }
    return (
        < View style={
            {
                wdith: wp(100),
                paddingRight: sizes.globalMargin,
                paddingLeft:sizes.globalMargin,
                paddingTop:wp(3),
                paddingBottom:wp(3),
                height:73,
                backgroundColor: isOdd(index) ? 'transparent' : colors.creditItemBg,
                flexDirection: 'row-reverse', alignItems: 'center'
            }
        } >
            <View style={{ flex: 2, alignItems: 'center' }}>
                <CustomText style={{ fontSize: fontSize12 }}>{item.date}</CustomText>
            </View>

            <View style={{ flex: 3, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
                    {item.status==0?<Image
                        style={{ width: wp(2), height: wp(2), resizeMode: 'contain' }}
                        source={require('../../../assets/cancel/cancel.png')}
                    />:null}
                    <CustomText style={{top:2}}>{item.negetive ? ' -' : ' +'}{priceSeparator(item.amount)}</CustomText>
                    <Image
                        style={{ width: wp(6), height: wp(6), resizeMode: 'contain' }}
                        source={{ uri: item.icon }}
                    />
                </View>
                {/* {item.traceCode?<View>
                    <CustomText numberOfLines={1} style={{fontSize:fontSize10}}>کد رهگیری  {item.traceCode}</CustomText>
                </View>:null} */}
            </View>

            <View style={{ flex: 5, alignItems: 'center' }}>
                    <CustomText numberOfLines={2} style={{textAlign:'center',fontSize:fontSize12}}>{item.description}</CustomText>
            </View>
        </View>
    )
}
