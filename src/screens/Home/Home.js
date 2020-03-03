import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Agenda from '../../components/ListaAgendamentos';
import Evento from '../../components/ListaEventos';
import Outros from './Outros';

import { Container, Tab, Tabs } from 'native-base';

const Home = ({ navigation }) => {
  return (
    <Container style={styles.container}>
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
});

export default Home;
