import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import {LinearGradient} from 'expo-linear-gradient';
import Header from '../../components/Header';

import mapMarkerImg from '../../images/map-marker.png';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export default function SelectMapPosition() {
    const navigation = useNavigation();

    const [position, setPosition] = useState({ latitude: 0, longitude: 0});
    const [initialPosition, setInitialPosition] = useState({ latitude: 0, longitude: 0});
    const [showMap, setShowMap] = useState(false);

    function handleNextStep() {
        navigation.navigate('OrphanageData', {position});
    }

    function handleSelectMapPosition(event: MapEvent){
        setPosition(event.nativeEvent.coordinate);
    }

    function displayMap(){
        setShowMap(true);
        navigation.setOptions({ headerShown: true, header: () => <Header title="Selecione no mapa"/> });
    }

    useEffect(() => {
        (async () => {
            const { granted } = await requestPermissionsAsync();
            if (!granted) {
                setInitialPosition({latitude: 41.1581635, longitude: -8.6304085});
            } else {
                try{
                    const { coords } = await getCurrentPositionAsync({});
                    const { latitude, longitude } = coords;
                    setInitialPosition({latitude, longitude});
                } catch(e){
                    setInitialPosition({latitude: 41.1581635, longitude: -8.6304085});
                }

            }
        })();
    }, []);

    return (
    <View style={styles.container}>
        {initialPosition.latitude != 0 && (
        <MapView 
            initialRegion={{
                latitude: initialPosition.latitude,
                longitude: initialPosition.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
            }}
            style={styles.mapStyle}
            onPress={handleSelectMapPosition}
        >
            {position.latitude != 0 && (
                <Marker 
                    icon={mapMarkerImg}
                    coordinate={{ latitude: position.latitude, longitude: position.longitude }}
                />
            )}
        </MapView>)}
        {!showMap && (
            <View style={styles.topContent}>
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
                <TouchableWithoutFeedback onPress={displayMap} style={styles.touchableContainer}>
                    <Image source={require('../../images/Cursor.png')}/>
                    <Text style={styles.description}>Toque no mapa para adicionar uma associação</Text>
                </TouchableWithoutFeedback>
            </View>
        )}
        {position.latitude != 0 && (
            <RectButton style={styles.nextButton} onPress={handleNextStep}>
                <Text style={styles.nextButtonText}>Próximo</Text>
            </RectButton>
        )}
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },

    mapStyle: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },

    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,

        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 40,
    },

    nextButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    },
    topContent: {
        position: 'absolute',
        top: 0,
    },
    touchableContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        paddingRight: 80,
        paddingLeft: 80,
    },
    description: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
    },
})