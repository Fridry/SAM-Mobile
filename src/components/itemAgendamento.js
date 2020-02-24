import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';
import { format, parseISO } from 'date-fns';

const { width: WIDTH } = Dimensions.get('window');

const itemAgendamento = ({ navigation, especialidade, local, horario }) => {
  const dataIso = parseISO(horario);
  const novaData = format(dataIso, 'dd/MM/yyyy');
  const novaHora = format(dataIso, 'HH:mm');

  return (
    <View style={styles.container}>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text style={styles.agendaTexto}>
                Especialidade: {especialidade}
              </Text>
              <Text style={styles.agendaTexto}>Local: {local}</Text>
              <Text style={styles.agendaTexto}>Dia: {novaData}</Text>
              <Text style={styles.agendaTexto}>Hora: {novaHora}</Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <TouchableOpacity
              style={styles.btnCancela}
              onPress={() => navigation.navigate('Cancelamento')}>
              <Text style={styles.btnTexto}>Cancelar agendamento</Text>
            </TouchableOpacity>
          </CardItem>
        </Card>
      </Content>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agendaTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  btnCancela: {
    width: WIDTH - 70,
    height: 35,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#2E76BB',
    justifyContent: 'center',
    borderColor: '#FFF',
  },
  btnTexto: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  btnAgendar: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#2E76BB',
    justifyContent: 'center',
    borderColor: '#FFF',
    margin: 10,
  },
});

export default itemAgendamento;
