import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserInfo } from '../../context/UserInfoContext';

export default function Step1Nickname({ navigation }) {
  const [nickname, setNickname] = useState('');
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
        placeholder="닉네임 입력"
        maxLength={8}
        value={nickname}
        onChangeText={setNickname}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 20, marginBottom: 16 },
  input: { backgroundColor: '#eee', borderRadius: 8, padding: 12, marginBottom: 20 },
  button: { backgroundColor: '#000', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
