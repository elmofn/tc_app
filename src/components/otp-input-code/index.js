import React, { useState, useRef } from 'react';
import { View, TextInput, Text } from 'react-native';

import { styles } from './styles'

const OtpInputCode = (props) => {
  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [inputThree, setInputThree] = useState('');
  const [inputFour, setInputFour] = useState('');

  // Referências para cada campo
  const pin1 = useRef();
  const pin2 = useRef();
  const pin3 = useRef();
  const pin4 = useRef();

  // Função para lidar com a tecla pressionada
  const handleKeyPress = (e, setInput, nextField, prevField) => {
    const key = e.nativeEvent.key; // Captura a tecla pressionada
    if (key === 'Backspace') {
      if (setInput === setInputOne && inputOne === '') {
        // Se o primeiro campo estiver vazio e Backspace for pressionado, não faz nada
        return;
      }
      // Se o campo estiver vazio e o backspace for pressionado, mova o foco para o anterior
      if (setInput === setInputTwo && inputTwo === '') {
        prevField.current.focus();
      } else if (setInput === setInputThree && inputThree === '') {
        prevField.current.focus();
      } else if (setInput === setInputFour && inputFour === '') {
        prevField.current.focus();
      }
    }
  };


  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 250 }}>
      <TextInput
        ref={pin1}
        style={styles.input}
        value={inputOne}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^0-9]/g, '');
          setInputOne(filteredText)
          if (filteredText !== '') {
            props.code(filteredText + inputTwo + inputThree + inputFour);
            pin2.current.focus(); // Foco no próximo campo
          } 
        }}
        onKeyPress={(e) => handleKeyPress(e, setInputOne, pin2, pin1)} // Captura a tecla pressionada
        maxLength={1}
        keyboardType="numeric"
      />
      <TextInput
        ref={pin2}
        style={styles.input}
        value={inputTwo}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^0-9]/g, '');
          setInputTwo(filteredText)
          if (filteredText !== '') {
            props.code(inputOne + filteredText + inputThree + inputFour);
            pin3.current.focus(); // Foco no próximo campo
          } 
        }}
        onKeyPress={(e) => handleKeyPress(e, setInputTwo, pin3, pin1)} // Captura a tecla pressionada
        maxLength={1}
        keyboardType="numeric"
      />
      <TextInput
        ref={pin3}
        style={styles.input}
        value={inputThree}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^0-9]/g, '');
          setInputThree(filteredText)
          if (filteredText !== '') {
            props.code(inputOne + inputTwo + filteredText + inputFour);
            pin4.current.focus(); // Foco no próximo campo
          } 
        }}
        onKeyPress={(e) => handleKeyPress(e, setInputThree, pin4, pin2)} // Captura a tecla pressionada
        maxLength={1}
        keyboardType="numeric"
      />
      <TextInput
        ref={pin4}
        style={styles.input}
        value={inputFour}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^0-9]/g, '');
          setInputFour(filteredText)
          if (filteredText !== '') {
            props.code(inputOne + inputTwo + inputThree + filteredText);
          } 
        }}
        onKeyPress={(e) => handleKeyPress(e, setInputFour, null, pin3)} // Captura a tecla pressionada
        maxLength={1}
        keyboardType="numeric"
      />
    </View>
  );
};

export default OtpInputCode;
