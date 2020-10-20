import { Image, View, StyleSheet, AsyncStorage } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Onboarding from 'react-native-onboarding-swiper';

async function completeOnboarding(navigation){
    const hasOnborded = await AsyncStorage.setItem('hasOnboarded', JSON.stringify({
        hasOnboarded: true,
    }));
    navigation.navigate('OrphanagesMap');
}

const Square = ({ selected }) => {
    let backgroundColor = selected ? '#FFD152' : '#BECFD8';
    let width = selected ? 16 : 6;
    return (
    <View
        style={{
        width: width,
        height: 6,
        marginHorizontal: 3,
        borderRadius: 4,
        backgroundColor,
        marginBottom: 76,
        display: 'flex',
        alignItems: 'flex-start',
        }}
    />
    );
};

const backgroundColor = '#D1EDF2';
const color = '#D1EDF2';


const Done = ({ ...props }) => (
    <Button
    title={<Feather name="arrow-right" size={20} color={'#15B6D6'}/>}
    buttonStyle={{
        backgroundColor: backgroundColor,
        marginRight: 40,
        borderRadius: 20,
        width: 56,
        height: 56,
        marginBottom: 50,
    }}
    containerViewStyle={{
        marginVertical: 50,
        width: 70,
        backgroundColor: backgroundColor,
    }}
    textStyle={{ color: color }}
    {...props}
    />
);

const Next = ({ ...props }) => (
    <Button
    title={<Feather name="arrow-right" size={20} color={'#15B6D6'}/>}
    buttonStyle={{
        backgroundColor: backgroundColor,
        marginRight: 40,
        borderRadius: 20,
        width: 56,
        height: 56,
        marginBottom: 50,
    }}
    containerViewStyle={{
        marginVertical: 50,
        width: 70,
        backgroundColor: backgroundColor,
    }}
    textStyle={{ color: color }}
    {...props}
    />
    
);

const CustomButtons = () => {
    const navigation = useNavigation();
    return(
        <Onboarding
            DotComponent={Square}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            showSkip={false}
            bottomBarColor={'transparent'}
            bottomBarHighlight={false}
            bottomBarHeight={106}
            titleStyles={{ color: '#0089A5' }}
            containerStyles={{justifyContent: 'center', paddingBottom: 80, position: 'relative'}}
            imageContainerStyles={{paddingBottom: 20, padding: 0,}}
            onDone={() => completeOnboarding(navigation)}
            pages={[
                {
                backgroundColor: '#2AB5D1',
                image: <Image source={require('../images/Logotipo.png')}/>,
                title: 'Porto',
                subtitle: 'Portugal',
                titleStyles: { color: '#fff', fontFamily: 'Nunito_800ExtraBold', fontSize: 20, paddingBottom: 0},
                subTitleStyles: { color: '#fff', fontFamily: 'Nunito_600SemiBold', fontSize: 20},
                },
                {
                backgroundColor: '#fff',
                image: <Image source={require('../images/Onboarding01.png')} style={styles.imageOnboardingTwo}/>,
                title: 'Leve felicidade para o mundo',
                subtitle: 'Visite orfanatos e mude o dia de muitas crianças.',
                titleStyles: { color: '#0089A5', fontFamily: 'Nunito_800ExtraBold', fontSize: 48, textAlign: 'left', paddingRight: 80, lineHeight: 48, paddingLeft: 46},
                subTitleStyles: { color: '#5C8599', fontFamily: 'Nunito_600SemiBold', fontSize: 20, textAlign: 'left', paddingRight: 80, paddingLeft: 46, lineHeight: 30,},
                },
                {
                backgroundColor: '#fff',
                image: <Image source={require('../images/Onboarding02.png')} />,
                title: 'Escolha um orfanato no mapa e faça uma visita',
                subtitle: "",
                titleStyles: { color: '#0089A5', fontFamily: 'Nunito_800ExtraBold', fontSize: 30, textAlign: 'right', paddingLeft: 80, paddingBottom: 0, paddingTop: 40, paddingRight: 39, lineHeight: 36},
                },
            ]}
        />
    )
};

const styles = StyleSheet.create({
    imageOnboardingTwo: {
        margin: 0,
        padding: 0,
        paddingLeft: 46,
    }
})

export default CustomButtons;