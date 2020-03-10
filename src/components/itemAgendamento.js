import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
  Linking,
} from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';
import { format, parseISO } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: WIDTH } = Dimensions.get('window');

const itemAgendamento = ({
  navigation,
  especialidade,
  local,
  horario,
  id,
  endereco,
  numero,
  telefone,
}) => {
  const dataIso = parseISO(horario);
  const novaData = format(dataIso, 'dd/MM/yyyy');
  //const novaHora = format(dataIso, 'HH:mm');
  const novaHora = formatToTimeZone(dataIso, 'HH:mm', {
    timeZone: 'America/Sao_Paulo',
  });

  const mapa = () => {
    Linking.openURL(
      'https://www.google.com/maps/search/?api=1&query=' +
        endereco +
        ',+' +
        numero,
    );
  };

  return (
    <View style={styles.container}>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <View style={styles.viewTexto}>
                <Text style={styles.agendaTexto}>Especialidade:</Text>
                <Text style={styles.agendaDados}>{especialidade}</Text>
              </View>
              <View style={styles.viewTexto}>
                <Text style={styles.agendaTexto}>Local:</Text>
                <Text style={styles.agendaDados}>{local}</Text>
              </View>
              <View style={styles.viewTexto}>
                <Text style={styles.agendaTexto}>Endereço:</Text>
                <Text style={styles.agendaDados}>
                  {endereco}, {numero}
                </Text>
              </View>
              <View style={styles.viewBtn}>
                <TouchableOpacity style={styles.btnMapa} onPress={mapa}>
                  <Icon name="map-marker" style={styles.btnTexto} />
                </TouchableOpacity>
              </View>
              <View style={styles.viewTexto}>
                <Text style={styles.agendaTexto}>Telefone:</Text>
                <Text style={styles.agendaDados}>{telefone}</Text>
              </View>
              <View style={styles.viewTexto}>
                <Text style={styles.agendaTexto}>Dia:</Text>
                <Text style={styles.agendaDados}>{novaData}</Text>
              </View>
              <View style={styles.viewTexto}>
                <Text style={styles.agendaTexto}>Hora:</Text>
                <Text style={styles.agendaDados}>{novaHora}</Text>
              </View>
            </Body>
          </CardItem>
          <CardItem footer>
            <TouchableOpacity
              style={styles.btnCancela}
              onPress={() => navigation.navigate('Cancelamento', { id })}>
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
    margin: 10,
  },
  agendaTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  agendaDados: {
    fontSize: 16,
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
  btnMapa: {
    width: 35,
    height: 35,
    backgroundColor: '#2E76BB',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  viewTexto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtn: {
    flex: 1,
    marginLeft: '40%',
    padding: 5,
  },
});

export default itemAgendamento;
