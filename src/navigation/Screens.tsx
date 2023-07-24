import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  About,
  Agreement,
  Components,
  Notifications,
  Privacy,
  Register,
  Login,
  Gallery,
  Settings,
  CreatePin,
  Restore,
  Transfer,
  ViewNFT,
  Transactions,
  Payments,
} from '../screens';

import {useScreenOptions, useTranslation} from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CreatePin"
        component={CreatePin}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Restore"
        component={Restore}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="ViewNFT"
        component={ViewNFT}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Payments"
        component={Payments}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Transfer"
        component={Transfer}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Agreement"
        component={Agreement}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="About"
        component={About}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{title: t('navigation.home')}}
      />
    </Stack.Navigator>
  );
};
