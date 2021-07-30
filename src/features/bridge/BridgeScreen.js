import React, { Component,useState } from 'react';
import { View, Text, ActivityIndicator, TextInput,Button,ToastAndroid } from 'react-native';
import { WebView  } from 'react-native-webview';
const BridgeScreen = () => {
    const [text,setText]=useState('green');
    const changeBackcolor = ()=>{
        // myWebView.postMessage('\'\"\\&?/')
        myWebView.postMessage(text)
        // myWebView.postMessage('red')
    };
    let myWebView;
    const renderLoading = () => {
        <ActivityIndicator 
        style={{ flex: 1 }} 
        animating color='yellow'
         size={"large"} />
    }
    const runFirst = `
        document.body.style.backgroundColor='yellow';
        true;
        `;
        
    return (
        <View style={{ flex: 1 }}>
            <TextInput onChangeText={setText} placeholder='inter your text'/>
            <Button onPress={changeBackcolor} title='send your text'/>
            <WebView
                ref={el => myWebView = el}
                injectedJavaScript={runFirst}
                onLoadEnd={() => {
                    myWebView.postMessage('\'\"\\&?/')
                    // myWebView.postMessage('blue')
                }}
                onMessage={event =>{
                    let data=event.nativeEvent.data;
                    ToastAndroid.show(data,ToastAndroid.LONG)
                }}
                source={{ uri: 'http://192.168.1.53:5500/src/features/bridge/webView.html' }}
                startInLoadingState={true}
                renderLoading={renderLoading}
            />
        </View>

    )
}
export default BridgeScreen;