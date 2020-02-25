import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { Button } from 'native-base';

import api from '../../services/api/api';

const { width: WIDTH } = Dimensions.get('window');

const TelaLocal = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const resultsApi = async () => {
    try {
      const response = await api.get('/local');

      setResults(response.data);
    } catch (error) {
      setErrorMessage('Algo de errado ocorreu.');
    }
  };

  useEffect(() => {
    resultsApi();
  }, []);

  const dadosEspec = navigation.state.params.dadosEspec;

  return (
    <SafeAreaView style={styles.container}>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {!results.length ? (
        <View>
          <Text style={styles.textoNenhum}>
            Nenhuma TelaLocal disponível no momento!
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.titulo}>Selecione o local: </Text>
          <FlatList
            data={results}
            keyExtractor={results => JSON.stringify(results.id_local)}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.btnAgendar}
                  onPress={() =>
                    navigation.navigate('Data', {
                      dadosLocal: {
                        nomeLocal: item.nome_local,
                        idLocal: item.id_local,
                        dadosEspec,
                      },
                    })
                  }>
                  <Text style={styles.btnTexto}>{item.nome_local}</Text>
                </TouchableOpacity>
              );
            }}
          />
          <Button
            rounded
            block
            onPress={() => navigation.goBack()}
            style={styles.voltar}>
            <Text style={styles.btnTexto}>Voltar</Text>
          </Button>
        </View>
      )}
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
    margin: 25,
  },
});

export default TelaLocal;
