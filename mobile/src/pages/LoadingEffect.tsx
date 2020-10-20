import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Lottie from 'lottie-react-native';
import {LinearGradient} from 'expo-linear-gradient';



export default function LoadingAnimation() {  
    return (
    <View style={styles.container}>
        <LinearGradient
            // Background Linear Gradient
            colors={['#15B6D6', '#15D6D6']}
            style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: Dimensions.get('screen').height,
            opacity: 0.8,
            }}
        ></LinearGradient>
        <Lottie
        source={require('../components/Loading.json')}
        autoSize
        autoPlay
        loop
        resizeMode="contain"
        style={styles.loading} />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        padding: 0,
        margin: 0,
    }
})