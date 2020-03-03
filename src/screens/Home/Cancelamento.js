import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  CheckBox,
} from 'native-base';

const { width: WIDTH } = Dimensions.get('window');

import api from '../../services/api/api';

const Cancelamento = ({ navigation }) => {
  const [check, setCheck] = useState(false);

  const checkBox = () => {
    check === false ? setCheck(true) : setCheck(false);
  };

  const id = navigation.state.params.id;

  const cancelar = async () => {
    try {
      const response = await api.patch('/cancelamento/' + id);

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Atendimento cancelado com sucesso!');
        navigation.navigate('Home');
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Content style={styles.cardContainer}>
        <Card>
          <CardItem header>
            <Text style={styles.agendaTexto}>
              Deseja realmente cancelar esse atendimento?
            </Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                Para realizar o cancelamento do atendimento marque a caixa
                abaixo.
              </Text>
              <View style={styles.boxCheck}>
                <CheckBox
                  checked={check}
                  onPress={checkBox}
                  color={'#eb1527'}
                  style={styles.checkCancela}
                />
                <Text>
                  Confirmo que estou ciente de que desejo realizar o
                  cancelamento do atendimento.
                </Text>
              </View>
              {check === true ? (
                <TouchableOpacity style={styles.btnCancela} onPress={cancelar}>
                  <Text style={styles.cancelaTexto}>Cancelar</Text>
                </TouchableOpacity>
              ) : null}
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 15,
  },
  agendaTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  btnCancela: {
    width: WIDTH - 70,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#eb1527',
    justifyContent: 'center',
    borderColor: '#FFF',
  },
  checkBoxView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
  },
  cancelaTexto: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  boxCheck: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  checkCancela: {
    marginRight: 20,
    marginTop: 10,
  },
});

export default Cancelamento;
