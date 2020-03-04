import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './screens/Login/Login';
import Home from './screens/Home/Home';
import Cancelamento from './screens/Home/Cancelamento';
import TelaLocal from './screens/Agendamento/TelaLocal';
import TelaEspec from './screens/Agendamento/TelaEspec';
import TelaData from './screens/Agendamento/TelaData';
import TelaHora from './screens/Agendamento/TelaHora';
import Confirmacao from './screens/Agendamento/Confirmacao';

const stackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
        // title: 'SAM',
        // headerLeft: null,
        // headerStyle: {
        //   backgroundColor: '#2E76BB',
        // },
        // headerTitleStyle: { color: '#FFF' },
        // headerTitleAlign: 'center',
      },
    },
    Cancelamento: {
      screen: Cancelamento,
      navigationOptions: {
        title: 'Cancelamento',
        headerStyle: {
          backgroundColor: '#2E76BB',
        },
        headerTitleStyle: { color: '#FFF' },
        headerTitleAlign: 'center',
      },
    },
    Local: {
      screen: TelaLocal,
      navigationOptions: {
        title: 'Local',
        headerStyle: {
          backgroundColor: '#2E76BB',
        },
        headerTitleStyle: { color: '#FFF' },
        headerTitleAlign: 'center',
      },
    },
    Especialidade: {
      screen: TelaEspec,
      navigationOptions: {
        title: 'Especialidade',
        headerStyle: {
          backgroundColor: '#2E76BB',
        },
        headerTitleStyle: { color: '#FFF' },
        headerTitleAlign: 'center',
      },
    },
    Data: {
      screen: TelaData,
      navigationOptions: {
        title: 'Data',
        headerStyle: {
          backgroundColor: '#2E76BB',
        },
        headerTitleStyle: { color: '#FFF' },
        headerTitleAlign: 'center',
      },
    },
    Hora: {
      screen: TelaHora,
      navigationOptions: {
        title: 'Hora',
        headerStyle: {
          backgroundColor: '#2E76BB',
        },
        headerTitleStyle: { color: '#FFF' },
        headerTitleAlign: 'center',
      },
    },
    Confirmacao: {
      screen: Confirmacao,
      navigationOptions: {
        title: 'Confirmação',
        headerStyle: {
          backgroundColor: '#2E76BB',
        },
        headerTitleStyle: { color: '#FFF' },
        headerTitleAlign: 'center',
      },
    },
  },
  {
    initialRouteKey: 'Login',
  },
);

export default createAppContainer(stackNavigator);
