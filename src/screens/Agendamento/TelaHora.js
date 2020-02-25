import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { Button } from 'native-base';

import api from '../../services/api/api';

const TelaLocal = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const resultsApi = async () => {
    try {
      const response = await api.get('/horarios');

      setResults(response.data);
    } catch (error) {
      setErrorMessage('Algo de errado ocorreu.');
    }
  };

  useEffect(() => {
    resultsApi();
  }, []);

  const dadosData = navigation.state.params.dadosData;
  const dadosLocal = navigation.state.params.dadosData.dadosLocal;
  const dadosEspec = navigation.state.params.dadosData.dadosEspec;

  return (
    <SafeAreaView style={styles.container}>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {!results.length ? (
        <View>
          <Text style={styles.textoNenhum}>
            Nenhum horário disponível no momento. Selecione outra data.
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.titulo}>Selecione o horário: </Text>
          <FlatList
            data={results}
            keyExtractor={results => JSON.stringify(results.idHora)}
            numColumns={3}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.btnAgendar}
                  onPress={() =>
                    navigation.navigate('Confirmacao', {
                      dados: {
                        hora: item.hora,
                        dadosData,
                        dadosLocal,
                        dadosEspec,
                      },
                    })
                  }>
                  <Text style={styles.btnTexto}>{item.hora}</Text>
                </TouchableOpacity>
              );
            }}
          />

          <Text>{dadosData.data}</Text>
          <Text>{dadosLocal.nomeLocal}</Text>
          <Text>{dadosEspec.nomeEspec}</Text>
          <Button
            rounded
            block
            onPress={() => navigation.goBack()}
            style={styles.voltar}>
            <Text style={styles.btnTexto}>Voltar</Text>
          </Button>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  btnAgendar: {
    width: 100,
    height: 50,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#2E76BB',
    justifyContent: 'center',
    borderColor: '#FFF',
    margin: 10,
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
    margin: 20,
  },
});

export default TelaLocal;
