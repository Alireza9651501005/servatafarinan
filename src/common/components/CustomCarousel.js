import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { theme } from '../constants'
import { CarouselItem } from '.'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

class CustomCarousel extends React.Component {
    scrollRef = React.createRef()
    constructor(props) {
        super(props)
        this.state = {
            selectedItem: 0,
            list: props.data
        }
    }

    changeIndex = event => {
        const viewSize = event.nativeEvent.layoutMeasurement.width
        const contentOffset = event.nativeEvent.contentOffset.x
        const selectedItem = Math.floor(contentOffset / viewSize)
        if (this.state.selectedItem != selectedItem)
            this.setState(() => ({ selectedItem: selectedItem === this.props.data.length ? 0 : selectedItem }))
    }

    componentDidMount = () => {
        if (this.props.data) {
            this.interval = setInterval(() => {
                this.setState(prev => ({ selectedItem: prev.selectedItem === this.props.data.length - 1 ? 0 : prev.selectedItem + 1 }),
                    () => {
                        this.scrollRef.current.scrollToIndex({
                            animated: true,
                            index: this.state.selectedItem
                        })
                    })
            }, 3000)
        }
       
    }

    componentWillUnmount = () => {
        clearInterval(this.interval)
    }

    render() {
        const { data, height, full, v_padding,h_padding, borderRadius } = this.props
        // //console.log('=======',data)
        const h = hp(height * 100 / 640)
        const { selectedItem, list } = this.state

        return (
            <View style={{ width: wp(100), alignItems: 'center', marginBottom: hp(3) }}>
                <FlatList
                    horizontal
                    pagingEnabled
                    inverted
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, i) => i.toString()}
                    ref={this.scrollRef}
                    data={data}
                    getItemLayout={(data, index) => (
                        { length: wp(100), offset: wp(100) * index, index }
                    )}
                    onMomentumScrollEnd={this.changeIndex}
                    renderItem={item =>
                        <CarouselItem
                            borderRadius={borderRadius}
                            v_padding={v_padding}
                            h_padding={h_padding}

                            full={full}
                            item={item.item}
                            image={item.item.image}
                            height={h}
                            color={item.item.color}
                        />
                    } />
                {data ? data.length > 1 : false ?
                    <View style={[styles.view, { marginTop: h * 0.88 }]}>
                        {data.map((_, i) => <View key={i} style={[styles.dot, { opacity: i === selectedItem ? 1 : 0.4 }]} />)}
                    </View>
                    : null}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    image: {
        width: wp(79.4),
        height: hp(18.7),
        borderRadius: wp(3),
    },
    dot: {
        width: wp(2),
        height: wp(2),
        backgroundColor: theme.colors.gray2,
        marginHorizontal: wp(0.8),
        borderRadius: wp(1.3),
    },
    view: {
        flexDirection: 'row-reverse',
        display: 'flex',
        alignSelf: 'center',
        position: 'absolute',
    }
})
export { CustomCarousel }