import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';

import { Container, Content, Card, CardItem, Body, Button } from 'native-base';

const { width: WIDTH } = Dimensions.get('window');

const Agendamento = ({ navigation }) => {
  // const { nomeLocal } = navigation.state.params.dados.local;
  // const { nomeEspec } = navigation.state.params.dados.especialidade;
  // const data = navigation.state.params.dados.data;
  // const hora = navigation.state.params.dados.hora;

  return (
    <Container>
      <Content style={styles.cardContainer}>
        <Card>
          <CardItem>
            <Body>
              <Text style={styles.agendaTexto}>
                Verifique as informações de agendamento antes de confirmar:
              </Text>
              <Text style={styles.texto}>Especialidade: </Text>
              <Text style={styles.texto}>Local: </Text>
              <Text style={styles.texto}>Data: </Text>
              <Text style={styles.texto}>Hora: </Text>
              <Button
                rounded
                block
                onPress={() => navigation.goBack()}
                style={styles.btnAgendar}>
                <Text style={styles.btnTexto}>Agendar</Text>
              </Button>

              <Button
                rounded
                block
                onPress={() => navigation.goBack()}
                style={styles.voltar}>
                <Text style={styles.btnTexto}>Voltar</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAgendar: {
    width: WIDTH - 70,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#2E76BB',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnAgendarTexto: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  labelTexto: {
    fontSize: 16,
    textAlign: 'center',
  },
  cardContainer: {
    margin: 15,
  },
  agendaTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  voltar: {
    marginTop: 10,
    width: WIDTH - 70,
  },
  btnTexto: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  texto: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Agendamento;
