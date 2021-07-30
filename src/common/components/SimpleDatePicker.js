import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import moment from 'moment-jalaali'
// import DatePicker from 'react-native-jalaali-date-picker';
import { RippleEffect } from "../components/RippleEffect";
import { WheelPicker, TimePicker, DatePicker } from 'react-native-wheel-picker-android'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { white, yekanBold, yekan, datePickerIndicator } from '../../utils/helper/commonVariables';
import { CustomText } from '../components/CustomText';
import { font16, font12 } from '../../utils/helper/responsiveSizes';
import { theme } from '../constants';


class DatePickerModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: "2016-05-15",
            visible: true,
            day: 0,
            month: 0,
            year: 0,
            months: [
                'فروردین',
                'اردیبهشت',
                'خرداد',
                'تیر',
                'مرداد',
                'شهریور',
                'مهر',
                'آبان',
                'آذر',
                'دی',
                'بهمن',
                'اسفند'
            ],
            years: ['1392']
        }
    }

    componentDidMount() {
        this.initYears()
        // let yearIndex = this.state.years.findIndex(item=>this.setIndexes(item))
        // //console.log('yearIndex',yearIndex)
        // this.setState({year:yearIndex})
    }

    initYears() {
        var years = [];
        const {activeDate,type} = this.props
        var year = moment().jYear(); 

        for (let i = year; i >= 1200; i--) {
            years.push(i + '');
        }
        //console.log('111')
        let yearIndex = activeDate? years.findIndex(item=>this.setIndexes(item,activeDate)):type==='register'?years.findIndex(item=>this.setIndexes(item,'1365')):0;
        //console.log('222')

        //console.log('month --- > ',Number(activeDate?activeDate.substr(5,2)-1:0))
        this.setState({ years,year:yearIndex,month:Number(activeDate?activeDate.substr(5,2)-1:0),day:Number(activeDate?activeDate.substr(8,2)-1:0) })
        //console.log('333')

    }
 
    setIndexes(item , activeDate) {
        // const {activeDate} = this.props
        //console.log('444')

        return item == activeDate.substr(0,4)
        // //console.log('555')


    }


    render() {
        var defaultMonth = moment().jMonth();
        var defaultDay = moment().jDate() - 1;
        const { changeVisible, visible, changeValue, actionFunc, activeDate } = this.props
        const { day, month, months, year, years } = this.state
        let monthDays = 30
        if (month > 5) {
            monthDays = 30
        } else {
            monthDays = 31
        }
        let days = []
        for (let i = 1; i <= monthDays; i++) {
            days.push(i + '');
        }
        // let selectedYearIndex = years.findIndex(item=>this.setIndexes(item))
        // let selectedMonthIndex = Number(activeDate?activeDate.substr(5,2)-1:0)
        // let selectedDayIndex = Number(activeDate?activeDate.substr(8,2)-1:0)


        return (
            <Modal
                onBackdropPress={() => changeVisible(false)}
                onBackButtonPress={() => changeVisible(false)}
                isVisible={visible}
                backdropOpacity={0.5}
                useNativeDriver={true}
                style={{ height: hp(50)}}
            >
                <View style={styles.container}>

                    <View style={styles.titleWrapper}>
                        <CustomText style={styles.dateText}>{days[day] ? days[day] : 1} {months[month]} {years[year]}</CustomText>

                    </View>

                    <View style={[styles.pickersRow,Platform.OS==='ios'?{paddingTop:0}:{}]}>

                        <WheelPicker
                            selectedItem={year}
                            itemStyle={{ fontSize: font16, fontFamily: yekan, height: hp(22) }}
                            data={years}
                            style={{ width: wp(25) }}
                            selectedItemTextSize={font16}
                            selectedItemTextFontFamily={yekan}
                            itemTextSize={font16}
                            itemTextFontFamily={yekan}
                            indicatorWidth={2}
                            onItemSelected={(index) => this.setState({ year: index })}
                        />

                        <WheelPicker
                            selectedItem={month}
                            itemStyle={{ fontSize: font16, fontFamily: yekan, height: hp(22) }}
                            data={months}
                            style={{ width: wp(25) }}
                            selectedItemTextSize={font16}
                            selectedItemTextFontFamily={yekan}
                            itemTextSize={font16}
                            itemTextFontFamily={yekan}
                            indicatorWidth={2}
                            onItemSelected={(index) => this.setState({ month: index })}
                        />

                        <WheelPicker
                            selectedItem={day}
                            itemStyle={{ fontSize: font16, fontFamily: yekan, height: hp(22) }}
                            data={days}
                            style={{ width: wp(25) }}
                            selectedItemTextSize={font16}
                            selectedItemTextFontFamily={yekan}
                            itemTextSize={font16}
                            itemTextFontFamily={yekan}
                            indicatorWidth={2}
                            onItemSelected={(index) => this.setState({ day: index })}
                        />

                    </View>

                    <View style={styles.buttonsWrapper}>
                        <RippleEffect
                            style={{ padding: 5 }}
                            onPress={
                                () => {
                                    let dayValue
                                    if (days[day]) {
                                        dayValue = days[day]
                                    } else {
                                        dayValue = 1
                                    }
                                    let monthValue = month+1
                                    if(monthValue.toString().length<2){
                                        monthValue = '0'+monthValue
                                    }
                                    if(dayValue.toString().length<2){
                                        dayValue = '0'+dayValue
                                    }
                                    const birthDate = years[year] + '-' + monthValue + '-' + dayValue;
                                    // const birthDateText = years[year] + '-' + months[month] + '-' + dayValue;
                                    const birthDateText = dayValue + ' ' + months[month] + ' ' + years[year];


                                    changeValue(birthDate, birthDateText)

                                    setTimeout(() => {
                                        changeVisible(false)
                                    if (actionFunc) {
                                        actionFunc()
                                    }
                                    }, 200);
                                    
                                }
                            }
                        >
                            <CustomText style={{ color: datePickerIndicator }}>تایید</CustomText>
                        </RippleEffect>

                        <RippleEffect
                            style={{ padding: 5 }}
                            onPress={() => { changeVisible(false) }}
                        >
                            <CustomText style={{ color: datePickerIndicator }}>لغو</CustomText>
                        </RippleEffect>
                    </View>
                </View>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: hp(48),
        backgroundColor: white,
        padding: wp(2),
        borderRadius:theme.sizes.globalRadius 

    },
    pickersRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: hp(3)
        // alignItems:'center',
        // backgroundColor: white,
        // marginTop:hp(10)

    },
    titleWrapper: {
        // flex:1,
        height: hp(10),
        // borderWidth:1
    },
    dateText: {
        alignSelf: 'center',
        margin: 20,
        fontSize: font16
    },
    buttonsWrapper: {
        height: hp(10),
        width: wp(40),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingLeft: wp(7),
        paddingBottom: hp(2)
    }
})


const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {})(DatePickerModal)