import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserInfo } from '../../context/UserInfoContext';

export default function Step2Profile({ navigation }) {
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const { setUserInfo } = useUserInfo();

  const handleNext = () => {
    if (!birth || !gender || !height || !weight) return;

    setUserInfo(prev => ({
      ...prev,
      birth,
      gender,
      height,
      weight,
    }));

    navigation.navigate('Step3');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>신체 정보를 입력해주세요</Text>

      <TextInput
        style={styles.input}
        placeholder="생년월일 (예: 2001/08/04)"
        value={birth}
        onChangeText={setBirth}
      />
      <TextInput
        style={styles.input}
        placeholder="성별 (남/여)"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="키 (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="몸무게 (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' },
  input: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
