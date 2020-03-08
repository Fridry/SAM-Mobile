import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api/api';

import Icon from 'react-native-vector-icons/FontAwesome';

const { width: WIDTH } = Dimensions.get('window');

const mostrarAlertaSenha = () => {
  Alert.alert('Esqueceu a senha!', 'Para recuperar sua senha acesse ...!');
};

const mostrarAlertaCadastro = () => {
  Alert.alert(
    'Cadastrar-se no SAM!',
    'Para realizar seu cadastro, compareça ao ESF ou centro de atendimento mais próximo de sua residência!',
  );
};

const Login = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const login = async () => {
    if (usuario && senha) {
      try {
        let dados = {
          usuario,
          senha,
        };
        const response = await api.post('/login', dados);

        const resultado = response.data;

        if (resultado.length === 1) {
          setSenha('');
          setUsuario('');
          const idLogin = resultado[0].id_pessoa;
          const nome = resultado[0].nome;
          await AsyncStorage.setItem('@idLogin', idLogin.toString());
          await AsyncStorage.setItem('@nome', nome);
          navigation.navigate('Home');
        } else {
          Alert.alert(resultado);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert(
        'Usuário ou senha inválidos!',
        'Digite o usuário e/ou senha!',
      );
      setSenha('');
      setUsuario('');
    }
  };

  return (
    <SafeAreaView style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoTexto}>Sistema de agendamentos médicos</Text>
      </View>
      <View style={styles.inputContainer}>
        <Icon name="user" size={28} color="#FFF" style={styles.inputIcon} />
        <TextInput
          style={styles.inputText}
          placeholder="Usuário"
          placeholderTextColor="#FFF"
          underlineColorAndroid="transparent"
          value={usuario}
          onChangeText={setUsuario}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={28} color="#FFF" style={styles.inputIcon} />
        <TextInput
          style={styles.inputText}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor="#FFF"
          underlineColorAndroid="transparent"
          value={senha}
          onChangeText={setSenha}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity onPress={mostrarAlertaSenha}>
        <Text style={styles.esqueceuSenha}>Esqueceu a senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogin} onPress={login}>
        <Text style={styles.loginTexto}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={mostrarAlertaCadastro}
        style={styles.alertaCadastro}>
        <Text style={styles.esqueceuSenha}>Ainda não é cadastrado?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
    width: null,
    backgroundColor: '#2E76BB',
  },
  logo: {
    height: 100,
    width: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  logoTexto: {
    //color: "#2E76BB",
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  inputText: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#FFF',
    marginHorizontal: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  inputContainer: {
    marginTop: 10,
  },
  btnOlho: {
    position: 'absolute',
    top: 8,
    right: 37,
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    marginTop: 20,
    borderColor: '#FFF',
  },
  loginTexto: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  esqueceuSenha: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 10,
  },
  alertaCadastro: {
    marginTop: 20,
  },
});

console.disableYellowBox = true;

export default Login;
