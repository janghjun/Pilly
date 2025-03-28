import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserInfo } from '../../context/UserInfoContext';

export default function Step1Nickname({ navigation }) {
  const [nickname, setNicknameInput] = useState('');
  const { setUserInfo } = useUserInfo();

  const handleNext = () => {
    if (nickname.trim() === '') return;
    setUserInfo(prev => ({ ...prev, nickname }));
    navigation.navigate('Step2');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>어떻게 불러드리면 될까요?</Text>
      <TextInput
        style={styles.input}
        value={nickname}
        onChangeText={setNicknameInput}
        placeholder="닉네임 입력 (최대 5자)"
        maxLength={5}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ddd', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, marginBottom: 20 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 24 },
  button: { backgroundColor: '#000', borderRadius: 8, padding: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
