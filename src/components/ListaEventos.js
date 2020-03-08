import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import api from '../services/api/api';

import EventoItem from './EventoItem';

const Eventos = () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [carregando, setCarrendo] = useState(false);

  const resultsApi = async () => {
    try {
      setCarrendo(true);
      const response = await api.get('/evento');
      setCarrendo(false);
      setResults(response.data);
    } catch (error) {
      setErrorMessage('Algo de errado ocorreu.');
    }
  };

  useEffect(() => {
    resultsApi();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {carregando ? (
        <ActivityIndicator size="large" color="#2E76BB" />
      ) : !results.length ? (
        <Text style={styles.textoNenhum}>
          Nenhum evento registrado para os próximos 30 dias
        </Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={results => JSON.stringify(results.id_evento)}
          renderItem={({ item }) => {
            return (
              <EventoItem
                titulo={item.nome_evento}
                local={item.nome_local}
                horario={item.dataHoraEvento}
                info={item.informacoes}
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
  textoNenhum: {
    textAlign: 'center',
    fontSize: 14,
    margin: 10,
  },
});

export default Eventos;
