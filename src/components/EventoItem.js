import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome';

const EventoItem = ({ titulo, local, horario, info, endereco, numero }) => {
  const dataIso = parseISO(horario);
  const novaData = format(dataIso, 'dd/MM/yyyy');
  const novaHora = format(dataIso, 'HH:mm');

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
      <Card>
        <CardItem header bordered>
          <Text style={styles.eventoTexto}>{titulo}</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <View style={styles.viewTexto}>
              <Text style={styles.eventoTexto}>Local: </Text>
              <Text style={styles.eventoTextoVar}>{local}</Text>
            </View>
            <View style={styles.viewTexto}>
              <Text style={styles.eventoTexto}>Endereço: </Text>
              <Text style={styles.eventoTextoVar}>
                {endereco}, {numero}
              </Text>
            </View>
            <View style={styles.viewBtn}>
              <TouchableOpacity style={styles.btnMapa} onPress={mapa}>
                <Icon name="map-marker" style={styles.btnTexto} />
              </TouchableOpacity>
            </View>
            <View style={styles.viewTexto}>
              <Text style={styles.eventoTexto}>Dia: </Text>
              <Text style={styles.eventoTextoVar}>{novaData}</Text>
            </View>
            <View style={styles.viewTexto}>
              <Text style={styles.eventoTexto}>Hora: </Text>
              <Text style={styles.eventoTextoVar}>{novaHora}</Text>
            </View>
          </Body>
        </CardItem>
        <CardItem footer>
          <View style={styles.footerCard}>
            <Text style={styles.eventoTexto}>Informações: </Text>
            <Text style={{ fontSize: 16 }}>{info}</Text>
          </View>
        </CardItem>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  eventoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewTexto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventoTextoVar: {
    fontSize: 16,
    textAlign: 'center',
    padding: 5,
  },
  footerCard: {
    flex: 1,
    justifyContent: 'flex-start',
    textAlign: 'left',
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
  viewBtn: {
    flex: 1,
    marginLeft: '40%',
    padding: 5,
  },
  btnTexto: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EventoItem;
