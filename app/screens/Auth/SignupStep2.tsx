import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserInfo } from '../../context/UserInfoContext';

export default function SignupStep2({ navigation }) {
  const { userInfo, setUserInfo } = useUserInfo();
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    // 기존 정보가 있다면 미리 채우기
    setName(userInfo.nickname || '');
    setBirth(userInfo.birth || '');
    setGender(userInfo.gender || '');
  }, [userInfo]);

  const handleNext = () => {
    setUserInfo((prev) => ({
      ...prev,
      nickname: name,
      birth,
      gender,
    }));
    navigation.navigate('Signup3');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입 - 2단계</Text>
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="생년월일 (예: 2001/08/04)"
        value={birth}
        onChangeText={setBirth}
      />
      <TextInput
        style={styles.input}
        placeholder="성별 (남 / 여)"
        value={gender}
        onChangeText={setGender}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#eee', padding: 12, borderRadius: 8, marginBottom: 16 },
  button: { backgroundColor: '#000', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
