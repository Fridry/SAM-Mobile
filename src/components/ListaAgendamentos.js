import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import api from '../services/api/api';

import AgendaItem from './itemAgendamento';

const { width: WIDTH } = Dimensions.get('window');

const Agenda = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const resultsApi = async () => {
    try {
      const response = await api.get('/agenda/usuario/8');

      setResults(response.data);
    } catch (error) {
      setErrorMessage('Algo de errado ocorreu.');
    }
  };

  resultsApi();

  return (
    <SafeAreaView style={styles.container}>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {!results.length ? (
        <View>
          <Text style={styles.textoNenhum}>
            Você não possui nenhum atendimento agendado!
          </Text>

          <TouchableOpacity
            style={styles.btnAgendar}
            onPress={() => navigation.navigate('Especialidade')}>
            <Text style={styles.btnTexto}>Agendar atendimento</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={results => JSON.stringify(results.id_agendamento)}
          renderItem={({ item }) => {
            return (
              <AgendaItem
                especialidade={item.tipo_especialidade}
                local={item.nome_local}
                horario={item.dataHora}
                navigation={navigation}
                id={item.id_agendamento}
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnTexto: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
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
});

export default Agenda;
