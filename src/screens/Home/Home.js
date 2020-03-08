import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Agenda from '../../components/ListaAgendamentos';
import Evento from '../../components/ListaEventos';
import Outros from './Outros';

import { Container, Tab, Tabs, Header, Right, Body } from 'native-base';

const Home = ({ navigation }) => {
  const [nome, setNome] = useState('');
  AsyncStorage.getItem('@nome').then(nome => setNome(nome));
  const newNome = nome.substr(0, nome.indexOf(' '));

  const logout = () => {
    Alert.alert('Sair', 'Deseja sair?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        style: 'default',
        onPress: () => navigation.navigate('Login'),
      },
    ]);
  };

  return (
    <Container>
      <Header hasTabs>
        <Body>
          <Text style={styles.textoHeader}>Bem-vindo(a) {newNome}</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.textoHeader}>Sair</Text>
          </TouchableOpacity>
        </Right>
      </Header>
      <Tabs style={styles.tabMenu}>
        <Tab heading="Agendamentos">
          <Text style={styles.agendaTitulos}>Meus Agendamentos</Text>
          <Agenda navigation={navigation} />
        </Tab>

        <Tab heading="Eventos">
          <Text style={styles.agendaTitulos}>Eventos</Text>
          <Evento />
        </Tab>

        <Tab heading="Meus dados">
          <Text style={styles.agendaTitulos}>Meus dados</Text>
          <Outros />
        </Tab>
      </Tabs>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  agendaTitulos: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  tabMenu: {
    backgroundColor: '#2E76BB',
  },
  textoHeader: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default Home;
