import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Image, View } from 'react-native';
import { CustomText, RippleEffect } from '../../../common/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { likeLesson } from '../actions/lessonAction';
import { fontSize12 } from '../../../utils/helper/responsiveSizes';
import { likeLessonApi } from '../../../utils/api/Url';

export default function LikeButton(props) {
    const [likeData, setLikeData] = useState({ isLike: false, likes: 0 })
    useEffect(() => {
        setLikeData({ isLike: props.isLike, likes: props.likes })
    }, [])
    const dispatch = useDispatch()

    const likeHandle = (value) => {
        let data = likeData
        let status = data.isLike
        if (value === 'pending') {
            // //console.log(data)
            if (status) {
                data.likes -= 1
                data.isLike = false
            } else {
                data.likes += 1
                data.isLike = true
            }
            data.isLike = status ? false : true
            setLikeData({ ...data })
        }
        else if (value === 'error') {
            if (status) {
                data.likes -= 1
                data.isLike = false
            } else {
                data.likes += 1
                data.isLike = true
            }
            setLikeData({ ...data })
        }
        else {
            data.likes = value.likes
            data.isLike = value.user_liked_lesson
            setLikeData({...data})
            // setLessonData({ ...lessonData, loading: false, data: value, CourseId: CourseId })
        }
    }


    return (
        <RippleEffect onPress={() => {
            let url = likeLessonApi + props.lessonId + '/like'
            if(likeData.isLike){
                dispatch(likeLesson('delete',url, likeHandle))
            }else{
                dispatch(likeLesson('post',url, likeHandle))
            }
        }}
            style={{ flexDirection: 'row', alignItems: 'center', marginRight: wp(2) }}>
            <Image
                source={likeData.isLike ? require('../../../assets/like/liked.png') : require('../../../assets/like/like.png')}
                style={{ width: wp(5), height: wp(5), resizeMode: 'contain', marginRight: 5 }}
            />
            <CustomText style={{ fontSize: fontSize12 }}>{likeData.likes}</CustomText>
        </RippleEffect>
    )
}