import React from 'react';
import { Image, View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';


export default function CreateOrphanageCancel(){
    const navigation = useNavigation();

    function goToMapPage(){
        navigation.navigate('OrphanagesMap');
    }

    return(
        <View style={styles.container}>
            <Image source={require('../../images/CancelIcon.png')}/>
            <View style={styles.textContainer}>
                <Text style={[styles.title, styles.text]}>Cancelar submissão</Text>
                <Text style={[styles.subtitle, styles.text]}>Tem a certeza que pretende cancelar a submisssão de dados?</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <RectButton style={styles.notCancelButton} onPress={navigation.goBack}>
                    <Text style={styles.notCancelText}>Não</Text>
                </RectButton>
                <RectButton style={styles.cancelButton} onPress={goToMapPage}>
                    <Text style={styles.cancelText}>Sim</Text>
                </RectButton>
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
        backgroundColor: '#FF669D',
    },
    textContainer: {
        paddingTop: 20,
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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 40,
    },
    cancelButton: {
        backgroundColor: '#D6487B',
        borderRadius: 20,
        height: 56,
        paddingRight: 60,
        paddingLeft: 60,
        marginLeft: 20,
        justifyContent: 'center',
    },
    cancelText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
    },
    notCancelButton: {
        backgroundColor: '#FFF',
        borderColor: '#D6487B',
        borderWidth: 1,
        borderRadius: 20,
        height: 56,
        paddingRight: 60,
        paddingLeft: 60,
        justifyContent: 'center',
        opacity: 0.5,
    },
    notCancelText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#D6487B',
    }
})