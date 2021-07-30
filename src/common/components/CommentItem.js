import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import { CustomText, ListItem, CustomTouchableText } from '.'
import { theme } from '../constants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as NavigationService from '../../utils/NavigationService'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CommentsList } from './CommentsList'
import { RippleEffect } from './RippleEffect'
import { changeCommentText, changeCommentVisible, reactionComment, saveSelectedComment } from '../../features/comments/actions/commentsAction'
import { RatingStars } from './RatingStars';
import { colors, sizes } from '../constants/theme';
import { fontSize10 } from '../../utils/helper/responsiveSizes';
import { reactionCommentApi } from '../../utils/api/Url';
import CToast from './CToast';
import Ripple from 'react-native-material-ripple';
import { reportcatchToFireBase } from '../../utils/helper/functions';


// const onPress = (props) => {
//     alert()
// }
const CommentItem = ({ item, index, sub }) => {
    const states = useSelector(state => state);
    const commentsData = states.commentsReducer.listData
    const dispatch = useDispatch()
    let wordArray
    const txt = '@Mohammad سلام علیکم برادر adobeeee ps داری؟'
    try {
        wordArray = item.content.split(/(@\S{1,})/);
        // wordArray = txt.split(/(@\S{1,})/);


    } catch (error) {
        reportcatchToFireBase(error, 'CommentItem.js/line:35')
        wordArray = item.content
    }
    if (item.loading) {
        return (
            <View activeOpacity={0.6} onPress={() => onPress(props.actions)} style={sub ? itemStyle.subContainer : itemStyle.container}>
                <View style={[itemStyle.imageWrapper]}>
                    <Image
                        // resizeMode={'repeat'}
                        style={itemStyle.image}
                        source={require('../../assets/profilecircle.png')} />
                </View>

                <View style={{ flex: 1, padding: 10 }}>
                    <CustomText>

                        {wordArray.map((text) => {
                            if (text[0] === '@') {
                                return (
                                    <CustomText
                                        onPress={() => { text[0] === '@' && alert(text) }}

                                        style={[itemStyle.text, { color: theme.colors.primary }]}
                                        // numberOfLines={1}
                                        fontSize={theme.fontSize.font12}
                                        textColor={theme.colors.gray2} >
                                        {text + ' '}
                                    </CustomText>

                                )
                            } else {
                                return (
                                    <CustomText
                                        style={[itemStyle.text, { color: theme.colors.gray2 }]}
                                        // numberOfLines={1}
                                        fontSize={theme.fontSize.font12}
                                        textColor={theme.colors.gray2} >
                                        {text + ' '}
                                    </CustomText>
                                )

                            }

                        }

                        )}
                    در حال ارسال...
                </CustomText>
                    {/* <ActivityIndicator color={'black'}/> */}
                </View>

            </View>

        )
    } else {
        return (
            < View style={[itemStyle.mainContainer,{marginTop:sub?hp(1):hp(2)}]} >
                <View activeOpacity={0.6} onPress={() => onPress(props.actions)} style={sub ? itemStyle.subContainer : itemStyle.container}>
                    <Ripple rippleSize={1} onPress={() => NavigationService.navigate('PublicProfileScreen', { id: item.user.id })} style={{ alignItems: 'center' }}>
                        <View style={[sub ? itemStyle.imageWrapperSub : itemStyle.imageWrapper, { justifyContent: 'flex-start' }]}>
                            <Image
                                // resizeMode={'repeat'}
                                style={sub ? itemStyle.imageSub : itemStyle.image}
                                source={item.user.image ? { uri: item.user.image } : require('../../assets/profilecircle.png')} />

                        </View>
                        <RatingStars small rate={item.user.stars} />

                    </Ripple>

                    <View style={{ flex: 1, paddingRight: 5,marginTop:sub?0:wp(1),alignItems:'flex-end'}}> 
                        <Text style={{ direction: 'rtl', textAlign: 'right'}}>
                            {/* <CustomText style={{ color: colors.componentWhite2 }}>ا</CustomText> */}
                            <CustomText bold style={{ color: theme.colors.gray2,direction:'rtl',textAlign:'right' }}>
                            <CustomText style={{ color: colors.componentWhite2 }}>اا</CustomText> 
                                {item.user.username}
                                <CustomText style={{ color: colors.componentWhite2 }}>اا</CustomText> 
                            </CustomText>
                            {wordArray.map((text) => {
                                if (text[0] === '@') {
                                    return (
                                        <CustomText
                                            onPress={() => { NavigationService.navigate('PublicProfileScreen', { id: text.slice(1) }) }}

                                            style={[itemStyle.text, { color: theme.colors.primary }]}
                                            // numberOfLines={1}
                                            fontSize={theme.fontSize.font12}
                                            textColor={theme.colors.gray2} >
                                            <CustomText style={{ color: colors.componentWhite2 }}>i</CustomText>{text + ' '}
                                        </CustomText>

                                    )
                                } else {
                                    return (
                                        <CustomText
                                            style={[itemStyle.text, { color: theme.colors.gray2 }]}
                                            // numberOfLines={1}
                                            fontSize={theme.fontSize.font12}
                                            textColor={theme.colors.gray2} >
                                            {text + ' '}
                                        </CustomText>
                                    )

                                }

                            }

                            )}
                        </Text>
                    </View>

                </View>

                {/* comment actions like , dislike ,... */}
                <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between',marginLeft:wp(15),marginRight:wp(2)}}>
                    <RippleEffect 
                    rippleOpacity={0}
                    onPress={() => {
                        if (item.reaction === 'NONE' || !item.reaction) {
                            let url = reactionCommentApi + item.id + '/reaction'
                            let parentIndex = sub ? sub.index : index
                            let subIndex = sub ? index : false
                            //console.log('Like =>', sub, commentsData, parentIndex, subIndex)
                            dispatch(reactionComment(url, 'LIKE', commentsData, parentIndex, subIndex))
                        } else {
                            CToast('شما قبلا بازخورد خود را ثبت کرده اید')
                        }
                    }}
                    style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                        <CustomText style={{ fontSize: fontSize10, color: colors.textGray, marginRight: 2 }}>{item.likes}</CustomText>
                        <RippleEffect
                        >
                            <Image
                                style={{ width: wp(4.3), height: wp(4.3), resizeMode: 'contain', top: -4 }}
                                source={item.reaction === 'LIKE' ? require('../../assets/agree/agree2.png') : require('../../assets/agree/agree.png')}
                            />
                        </RippleEffect>
                    </RippleEffect>

                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <CustomText style={{ fontSize: fontSize10, color: colors.textGray, marginRight: 2 }}>{item.score ? item.score : '0'}</CustomText>

                        <Image
                            style={{ width: wp(4.3), height: wp(4.3), resizeMode: 'contain' }}
                            source={require('../../assets/score/comment-score.png')}
                        />
                    </View>

                    <RippleEffect
                    onPress={() => {
                        if (item.reaction === 'NONE' || !item.reaction) {
                            let url = reactionCommentApi + item.id + '/reaction'
                            let parentIndex = sub ? sub.index : index
                            let subIndex = sub ? index : false
                            //console.log('DISLike =>', sub, commentsData, parentIndex, subIndex)

                            dispatch(reactionComment(url, 'DISLIKE', commentsData, parentIndex, subIndex))
                        } else {
                            CToast('شما قبلا بازخورد خود را ثبت کرده اید')

                        }
                    }}
                    rippleOpacity={0}
                    style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                        <CustomText style={{ fontSize: fontSize10, color: colors.textGray, marginRight: 2 }}>{item.dislikes}</CustomText>
                        <RippleEffect
                            // style={{ paddingLeft: 10, paddingRight: 10 }}
                            
                        >
                            <Image
                                style={{ width: wp(4.3), height: wp(4.3), resizeMode: 'contain', bottom: -2 }}
                                source={item.reaction === 'DISLIKE' ? require('../../assets/disagree/disagree2.png') : require('../../assets/disagree/disagree.png')}
                            />
                        </RippleEffect>
                    </RippleEffect>

                    <RippleEffect
                        rippleOpacity={0}
                        onPress={() => {
                            if (sub) {
                                dispatch(saveSelectedComment(sub.item.id, sub.index, item))
                                dispatch(changeCommentText('@' + item.user.username))
                            } else {
                                dispatch(saveSelectedComment(item.id, index, item))
                                dispatch(changeCommentText('@' + item.user.username + ' '))

                            }
                            dispatch(changeCommentVisible(true))
                        }}
                        style={{ flexDirection: 'row-reverse', alignItems: 'center', paddingRight: 10 }}>
                        <Image
                            style={{ width: wp(4.3), height: wp(4.3), resizeMode: 'contain', bottom: -2 }}
                            source={require('../../assets/reply/reply.png')}
                        />
                    </RippleEffect>
                </View>
                
                {/* sub comments list */}
                {item.children ?
                    <View >
                        <CommentsList sub={{ item: item, index: index }} listData={item.children} />
                    </View>
                    :
                    null
                }
            </View>

        )
    }

}

const itemStyle = StyleSheet.create({
    mainContainer: {
        width: wp(90),
        backgroundColor: colors.componentWhite2,
        alignSelf: 'center',
        borderRadius: sizes.globalRadius,
        // marginTop: hp(0.2),
        // marginBottom: hp(0.2),
        // borderWidth:1
        // paddingBottom: hp(1)
    },
    container: {
        // width: '90%',
        // height: hp(10),
        // alignSelf: 'center',
        // borderRadius: wp(3),
        justifyContent: 'center',
        // padding: wp(1),
        paddingRight:wp(3),
        paddingLeft:wp(3),
        paddingTop:wp(2),

        flexDirection: 'row-reverse',
        // alignItems: 'center',
        marginTop: hp(1),
        // marginBottom: hp(1),
        // backgroundColor: theme.colors.white,
        // elevation: 2,
        // borderWidth:1
    },
    subContainer: {
        // width: '70%',
        // borderWidth:1,
        // height: hp(10),
        alignSelf: 'center',
        borderRadius: wp(3),
        justifyContent: 'center',
        paddingRight: wp(1),
        paddingLeft: wp(1),
        flexDirection: 'row-reverse',
        // alignItems: 'center',
        marginTop: hp(1),
        // marginBottom: hp(1),
        marginLeft: wp(15)
        // backgroundColor: theme.colors.white,
        // elevation: 2
    },
    image: {
        width: wp(9),
        height: wp(9),
        resizeMode: 'contain'
    },
    imageSub: {
        width: wp(6.4),
        height: wp(6.4),
        resizeMode: 'contain'
    },
    imageWrapper: {
        width: wp(9),
        height: wp(9),
        borderRadius: wp(4.5),
        // borderWidth: 1,
        borderColor: theme.colors.gray,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        // marginTop: 5

    },
    imageWrapperSub: {
        width: wp(6.4),
        height: wp(6.4),
        borderRadius: wp(3.2),
        // borderWidth: 1,
        borderColor: theme.colors.gray,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        // marginTop:hp(2)
    },
    text: {
        // padding: hp(0.5),
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'right',
        // marginRight: wp(2),
        direction: 'rtl'
    }
})

export { CommentItem }