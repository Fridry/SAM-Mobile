import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Button } from 'native-base';

import { format } from 'date-fns';

const { width: WIDTH } = Dimensions.get('window');

const TelaLocal = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios' ? true : false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const dadosLocal = navigation.state.params.dadosLocal;
  const dadosEspec = navigation.state.params.dadosLocal.dadosEspec;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Selecione a data: </Text>
      <View>
        <Button rounded block onPress={showDatepicker} style={styles.voltar}>
          <Text style={styles.btnTexto}>
            Para selecionar a data clique aqui
          </Text>
        </Button>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={date}
          is24Hour={true}
          display="default"
          onChange={onChange}
          locale="pt-BR"
        />
      )}

      <Text style={styles.tituloData}>{format(date, 'dd/MM/yyyy')}</Text>
      <Button
        rounded
        block
        onPress={() =>
          navigation.navigate('Hora', {
            dadosData: {
              data: date,
              dadosEspec,
              dadosLocal,
            },
          })
        }
        style={styles.voltar}>
        <Text style={styles.btnTexto}>Selecionar a Hora</Text>
      </Button>

      <Button
        rounded
        block
        onPress={() => navigation.goBack()}
        style={styles.voltar}>
        <Text style={styles.btnTexto}>Voltar</Text>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  btnAgendar: {
    width: WIDTH - 45,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#2E76BB',
    justifyContent: 'center',
    borderColor: '#FFF',
    margin: 10,
    alignSelf: 'center',
  },
  textoNenhum: {
    textAlign: 'center',
    fontSize: 16,
    margin: 15,
  },
  btnTexto: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  voltar: {
    margin: 10,
  },
  tituloData: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 15,
  },
});

export default TelaLocal;
