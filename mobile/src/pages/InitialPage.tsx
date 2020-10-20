import React from 'react';
import { Image, View, Text, StyleSheet, Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


export default function InitialPage(){
    const navigation = useNavigation();

    setTimeout(() => {
        navigation.navigate('OrphanagesMap');
    }, 4000);
    return(
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#2AB5D1', '#00C7C7']}
                style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: Dimensions.get('screen').height,
                }}
            ></LinearGradient>
            <Image source={require('../images/Logotipo.png')}/>
            <View style={styles.footer}>
                <Text style={[styles.title, styles.text]}>Porto</Text>
                <Text style={[styles.subtitle, styles.text]}>Portugal</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        position: 'relative',
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    footer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
    },
    title: {
        fontFamily: 'Nunito_800ExtraBold',
    },
    subtitle: {
        fontFamily: 'Nunito_600SemiBold',
    },
})