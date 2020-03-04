import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import { format, parseISO } from 'date-fns';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api/api';

const Outros = () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const resultsApi = async () => {
    try {
      const idLogin = await AsyncStorage.getItem('@idLogin');
      const response = await api.get('/usuario/' + idLogin);

      setResults(response.data);
    } catch (error) {
      setErrorMessage('Algo de errado ocorreu.');
    }
  };

  useEffect(() => {
    resultsApi();
  }, []);

  const converteData = data => {
    const dataIso = parseISO(data);
    return format(dataIso, 'dd/MM/yyyy');
  };

  return (
    <SafeAreaView style={styles.container}>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Card>
        <CardItem bordered>
          {results.map(item => {
            return (
              <Body key={item.cpf}>
                <Text style={styles.dadosTexto}>Nome: {item.nome}</Text>
                <Text style={styles.dadosTexto}>
                  Data de nascimento: {converteData(item.data_nascimento)}
                </Text>
                <Text style={styles.dadosTexto}>Gênero: {item.genero}</Text>
                <Text style={styles.dadosTexto}>CPF: {item.cpf}</Text>
                <Text style={styles.dadosTexto}>CNS: {item.num_sus}</Text>
                <Text style={styles.dadosTexto}>Email: {item.email}</Text>
                <Text style={styles.dadosTexto}>Telefone: {item.telefone}</Text>
                <Text style={styles.dadosTexto}>Endereço: {item.rua}</Text>
                <Text style={styles.dadosTexto}>Número: {item.numero}</Text>
                <Text style={styles.dadosTexto}>CEP: {item.cep}</Text>
                <Text style={styles.dadosTexto}>Cidade: {item.cidade}</Text>
              </Body>
            );
          })}
        </CardItem>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  itemTexto: {
    marginVertical: 5,
  },
  dadosTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
});

export default Outros;
