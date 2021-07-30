import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, FlatList, Keyboard, TextInput, Image, TouchableOpacity, Text } from 'react-native'
import { CustomText, CustomTextInput, RippleEffect } from '../../../common/components';
import { changeCommentText, changeCommentVisible, changeMentionsVisible, getMentionList, saveSelectedComment } from '../actions/commentsAction';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../common/constants';
import { mentionListApi } from '../../../utils/api/Url';
import { colors, sizes } from '../../../common/constants/theme';

export default function CommentInput({ setReply, sendComment }) {
    const myInput = useRef(null);
    const dispatch = useDispatch()
    const states = useSelector(state => state)
    let reply = states.commentsReducer.reply
    let mentionsList = states.commentsReducer.mentionsList
    let mentionsVisible = states.commentsReducer.mentionsVisible
    let selectedComment = states.commentsReducer.selectedCommentData
    let userProfile = states.profileReducer.profileData
    const [atPos, setAtPos] = useState(null)
    const [tag, setTag] = useState(false)
    const [subText, setSubText] = useState('')
    let keyboardDidHideListener, keyboardDidShowListener
    const [cursor, setCursor] = useState(0)
    const [message, setMessage] = useState('')
    //console.log('-----', userProfile)
    useEffect(() => {
        if (selectedComment) {
            setMessage('@' + selectedComment.user.username + ' ')
        }
        setTimeout(() => {
            myInput.current && myInput.current.focus()

        }, 100);

        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = () => {
        // alert("Keyboard Shown");
    };

    const _keyboardDidHide = () => {
        // alert("Keyboard Hidden");
        dispatch(changeMentionsVisible(false))

    };

    const renderMentionItem = (item, index) => {
        return (
            <TouchableOpacity
                style={{ flexDirection: 'row-reverse', alignItems: 'center', marginBottom: hp(2) }}
                onPress={() => {
                    let atSignPos = subText.lastIndexOf('@')
                    let b = '@' + item.username
                    var output = [message.slice(0, atSignPos), b, message.slice(atSignPos + 1 + tag.length)].join('');
                    setMessage(output)
                    dispatch(changeMentionsVisible(false))
                    //console.log(output)
                }}
            >
                <View style={{ width: wp(10), height: wp(10), borderRadius: wp(5), overflow: 'hidden', marginLeft: 10 }}>
                    <Image
                        style={{ width: wp(10), height: wp(10), resizeMode: 'cover', borderRadius: wp(5) }}
                        source={{ uri: item.image }}
                    />
                </View>

                <CustomText bold >{item.username}</CustomText>
            </TouchableOpacity>
        )
    }


    return (
        <View style={{ width: wp(100), height: '100%', position: 'absolute' }}>
            <TouchableOpacity
                onPress={() => {
                    dispatch(changeCommentVisible(false))
                    setMessage('')
                    dispatch(saveSelectedComment(false, false, false))
                }}
                style={{ flex: mentionsVisible ? 0 : 1, top: -hp(5) }} />
            <TouchableOpacity
                onPress={() => {
                    dispatch(changeCommentVisible(false))
                    setMessage('')
                    dispatch(saveSelectedComment(false, false, false))
                }}
                style={{ height: hp(20), position: 'absolute', bottom: hp(10), width: wp(100) }} />
            {
                mentionsVisible ?
                    <View
                        style={{ backgroundColor: theme.colors.background, padding: 10, flex: 1 }}

                    >
                        <FlatList
                            keyboardShouldPersistTaps={'handled'}
                            keyExtractor={(_, i) => i.toString()}
                            renderItem={({ item, index }) => renderMentionItem(item, index)}
                            ListEmptyComponent={() => <View><CustomText>نام کاربری مورد نظر را تایپ کنید</CustomText></View>}
                            data={mentionsList}
                        />
                    </View>

                    : null
            }
            <View style={styles.container}>

                <View style={styles.inputBody} >
                    <View style={{ width: wp(10), height: wp(10), borderRadius: wp(5), marginLeft: 5 }}>
                        <Image
                            style={{ width: wp(10), height: wp(10), borderRadius: wp(5), resizeMode: 'cover' }}
                            source={userProfile ? { uri: userProfile.image } : require('../../../assets/profileUser.png')}
                        />
                    </View>
                    < TextInput
                    autoCorrect={false}
                    autoCapitalize={'none'}
                        ref={myInput}
                        multiline={true}
                        // onSelectionChange={handleSelectionChange}
                        onSelectionChange={(event) => {
                            setCursor(event.nativeEvent.selection.start)
                            // //console.log('selection change', event.nativeEvent.selection)
                        }}
                        style = {
                            {
                                // textAlign: 'right',
                                direction: 'rtl',
                                flex: 1,
                                color: theme.colors.textWhite,
                                fontSize: theme.fontSize.font16,
                              

                            }
                        }
                        value={message}
                        onChangeText={(strng) => {
                            setMessage(strng)
                            let text = strng.substr(0, cursor + 1)
                            setSubText(text)
                            let last2Chr = text.slice(-2)
                            let lastChr = text.slice(-1)
                            let tempTag = ''

                            if (lastChr === '@' && text.length <= 1) {
                                dispatch(changeMentionsVisible(true))
                                setAtPos(text.length)
                            }
                            if (last2Chr === ' @') {
                                dispatch(changeMentionsVisible(true))
                                setAtPos(text.length)
                            }

                            if (lastChr === ' ' || text.length == 0) {
                                dispatch(changeMentionsVisible(false))
                                tempTag = ''
                                setTag('')
                                setAtPos(null)

                            }

                            if (atPos) {
                                tempTag = text.substr(atPos, text.length)
                                setTag(text.substr(atPos, text.length))
                            } else {
                                if (mentionsVisible) {
                                    dispatch(changeMentionsVisible(false))
                                }
                            }

                            if (tempTag.length >= 1) {
                                let url = mentionListApi + tempTag
                                dispatch(getMentionList(url))
                            }

                        }}

                    />
                    {/* <CustomTextInput
                    inputRef={myInput}
                    multiline={true}
                    // onSelectionChange={handleSelectionChange}
                    onSelectionChange={(event) => {
                        setCursor(event.nativeEvent.selection.start)
                        // //console.log('selection change', event.nativeEvent.selection)
                    }}
                    style={{ textAlign: 'right' ,direction:'rtl' }}
                    value={message}
                    onChangeText={(strng) => {
                        setMessage(strng)
                        let text = strng.substr(0, cursor + 1)
                        setSubText(text)
                        let last2Chr = text.slice(-2)
                        let lastChr = text.slice(-1)
                        let tempTag = ''

                        if (lastChr === '@' && text.length <= 1) {
                            dispatch(changeMentionsVisible(true))
                            setAtPos(text.length)
                        }
                        if (last2Chr === ' @') {
                            dispatch(changeMentionsVisible(true))
                            setAtPos(text.length)
                        }

                        if (lastChr === ' ' || text.length == 0) {
                            dispatch(changeMentionsVisible(false))
                            tempTag=''
                            setTag('')
                            setAtPos(null)

                        }

                        if (atPos) {
                            tempTag = text.substr(atPos, text.length)
                            setTag(text.substr(atPos, text.length))
                        }else{
                            if(mentionsVisible){
                                dispatch(changeMentionsVisible(false))
                            }
                        }

                        if (tempTag.length >= 1) {
                            let url = mentionListApi + tempTag
                            dispatch(getMentionList(url))
                        }

                    }}

                /> */}
                    <RippleEffect
                        style={{ width: wp(10), height: hp(6), alignItems: 'center', justifyContent: 'center', paddingTop: 5 }}
                        onPress={() => {
                            sendComment(message);
                            dispatch(changeCommentVisible(false))

                        }}>
                        <CustomText style={{ color: colors.textLightBlue }}>ثبت</CustomText>
                    </RippleEffect>
                </View>

            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // bottom: 0,
        width: wp(100),

    },
    inputBody: {
        padding: wp(3),
        borderWidth: 1,
        maxHeight: wp(30),
        // backgroundColor: theme.colors.white,
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        borderTopLeftRadius: sizes.globalRadius,
        borderTopRightRadius: sizes.globalRadius,
        backgroundColor: colors.componentsDarkBlue,
        bottom:hp(32.2)
    }
})