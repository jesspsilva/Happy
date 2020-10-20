import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import InitialPage from './pages/InitialPage';
import OrphanagesMap from './pages/Orphanages-map';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanages/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanages/OrphanageData';
import CreateOrphanageOk from './pages/CreateOrphanages/CreateOrphanageOk';
import CreateOrphanageCancel from './pages/CreateOrphanages/CreateOrphanageCancel';
import Onboarding from './pages/Onboarding';

import Header from './components/Header';
import { AsyncStorage, View, Text } from 'react-native';
import { formData } from './services/formData';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {

  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    async function getStorageData(){
      let value = await AsyncStorage.getItem('hasOnboarded');
      if(value != null){
        setHasOnboarded(true);
      }
      setHasValue(true);
    }
    
    getStorageData();
  }, []);

  

  if(!hasValue){
      return null;
  }

  // const clearAsyncStorage = async() => {
  //     AsyncStorage.clear();
  // }

  // clearAsyncStorage();

  return (
    <NavigationContainer>
        <Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'}}}>
          {!hasOnboarded && (
            <Screen 
              name='Onboarding' 
              component={Onboarding} 
            /> 
          )}

          <Screen 
            name='InitialPage' 
            component={InitialPage} 
          />

          <Screen 
            name='OrphanagesMap' 
            component={OrphanagesMap} 
          />

          <Screen 
            name='OrphanageDetails' 
            component={OrphanageDetails} 
            options={{
              headerShown: true,
              header: () => <Header showCancel={false} title="Associações"/>
            }}
          />

          <Screen 
            name='SelectMapPosition' 
            component={SelectMapPosition}
          />

          <Screen 
            name='OrphanageData' 
            component={OrphanageData}
            options={{
              headerShown: true,
              header: () => <Header title="Preencha os dados"/>
            }}
          />

          <Screen 
            name='CreateOrphanageOk' 
            component={CreateOrphanageOk}
          />

          <Screen 
            name='CreateOrphanageCancel' 
            component={CreateOrphanageCancel}
          />

        </Navigator>
    </NavigationContainer>
  );
}