import React from 'react';
import { Image, View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';


export default function CreateOrphanageOk(){
    const navigation = useNavigation();

    function goToMapPage(){
        navigation.navigate('OrphanagesMap');
    }

    return(
        <View style={styles.container}>
            <Image source={require('../../images/SuccessImage.png')}/>
            <View style={styles.textContainer}>
                <Text style={[styles.title, styles.text]}>Ótimo!</Text>
                <Text style={[styles.subtitle, styles.text]}>A submissão dos dados foi feita com sucesso! É só voltar ao mapa e ver a nova associação.</Text>
            </View>
            <RectButton style={styles.okButton} onPress={goToMapPage}>
                <Text style={styles.okButtonText}>Ir para o mapa</Text>
            </RectButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 0,
        position: 'relative',
        backgroundColor: '#39CC83',
    },
    textContainer: {
        paddingTop: 40,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        paddingRight: 30,
        paddingLeft: 30,
    },
    title: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 32,
    },
    subtitle: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 20,
    },
    okButton: {
        backgroundColor: '#19C06D',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,

        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 60,
    },
    okButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    }
})