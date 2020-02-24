import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import { format, parseISO } from 'date-fns';

const EventoItem = ({ titulo, local, horario, info }) => {
  const dataIso = parseISO(horario);
  const novaData = format(dataIso, 'dd/MM/yyyy');
  const novaHora = format(dataIso, 'HH:mm');

  return (
    <View style={styles.container}>
      <Card>
        <CardItem header bordered>
          <Text style={styles.eventoTexto}>{titulo}</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text style={styles.eventoTexto}>Local: {local}</Text>
            <Text style={styles.eventoTexto}>Dia: {novaData}</Text>
            <Text style={styles.eventoTexto}>Hora: {novaHora}</Text>
            <Text style={styles.eventoTexto}>Informações: {info}</Text>
          </Body>
        </CardItem>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  eventoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
});

export default EventoItem;
