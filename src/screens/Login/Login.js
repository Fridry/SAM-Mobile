import React from 'react';
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

const Login = () => {
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
        />
      </View>

      <TouchableOpacity onPress={mostrarAlertaSenha}>
        <Text style={styles.esqueceuSenha}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnLogin}>
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

export default Login;
