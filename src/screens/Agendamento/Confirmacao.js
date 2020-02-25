import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';

import { Container, Content, Card, CardItem, Body, Button } from 'native-base';

import { format } from 'date-fns';

const { width: WIDTH } = Dimensions.get('window');

const Agendamento = ({ navigation }) => {
  const dadosLocal = navigation.state.params.dados.dadosLocal;
  const dadosEspec = navigation.state.params.dados.dadosEspec;
  const data = navigation.state.params.dados.dadosData;
  const hora = navigation.state.params.dados.hora;

  const dataDoAntendimento = format(data.data, 'dd/MM/yyyy');

  return (
    <Container>
      <Content style={styles.cardContainer}>
        <Card>
          <CardItem>
            <Body>
              <Text style={styles.agendaTexto}>
                Verifique as informações de agendamento antes de confirmar:
              </Text>
              <Text style={styles.texto}>
                Especialidade: {dadosEspec.nomeEspec}
              </Text>
              <Text style={styles.texto}>Local: {dadosLocal.nomeLocal}</Text>
              <Text style={styles.texto}>Data: {dataDoAntendimento}</Text>
              <Text style={styles.texto}>Hora: {hora}</Text>
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
