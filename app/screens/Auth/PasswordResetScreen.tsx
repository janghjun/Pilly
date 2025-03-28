import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function PasswordResetScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      alert('이메일을 입력해주세요');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('유효한 이메일을 입력해주세요');
      return;
    }

    // 비밀번호 재설정 로직 (예시로 2초 후 메시지 표시)
    setTimeout(() => {
      Alert.alert('비밀번호 재설정 이메일을 보냈습니다.');
      navigation.navigate('Login');
    }, 2000); // 2초 후 로그인 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>비밀번호 재설정</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>재설정 링크 보내기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  input: { backgroundColor: '#eee', padding: 12, borderRadius: 8, marginBottom: 16 },
  button: { backgroundColor: '#000', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
