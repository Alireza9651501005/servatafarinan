import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomText, RatingStars } from '../../../common/components';
import { theme } from '../../../common/constants';
import { colors, sizes } from '../../../common/constants/theme';
import { fontSize16, fontSize20, largeFont } from '../../../utils/helper/responsiveSizes';
import { totalPointTxt } from '../../profile/texts';


export default function PublicProfileImageRow({ profileData }) {
    const renderPicture = () => {
        return (
            <View style={{ borderWidth: 2, borderRadius: theme.sizes.globalRadius, overflow: 'hidden', borderColor: colors.borderBlue }}>
                <View style={{ width: wp(33), height: wp(33), alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={{ width: wp(33), height: wp(33) }}
                        source={{ uri: profileData.image }} />

                </View>
            </View>
        );
    };
    return (
        < View style={
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                // paddingLeft: sizes.globalMargin
            }
        } >

            <View>
                {renderPicture()}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    uploadImageModalContainer: {
        width: wp(80),
        height: hp(15),
        // borderWidth:1,
        justifyContent: 'space-between',
        marginTop: hp(2),
        marginBottom: hp(2),
    },
    modalItm: {
        width: wp(80),
        height: hp(6.5),
        borderRadius: hp(2),
        alignItems: 'center',
        backgroundColor: colors.componentWhite,
        flexDirection: 'row-reverse'
    },
    image: {
        width: wp(8),
        height: hp(3),
        borderWidth: 0,
        resizeMode: 'contain',
        // marginLeft: wp(4),
        // marginRight: wp(4),
    },
})
