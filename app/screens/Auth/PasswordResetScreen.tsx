import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function PasswordResetScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('이메일을 입력해주세요.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('유효한 이메일을 입력해주세요.');
      return;
    }

    // 실제 이메일 발송 처리 (임시 예시)
    setTimeout(() => {
      Alert.alert('비밀번호 재설정 이메일을 보냈습니다.');
      navigation.navigate('Login');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.step}>1/1</Text>
      <Text style={styles.title}>비밀번호를 잊어버리셨나요?</Text>
      <Text style={styles.subtitle}>사용자 이메일로{"\n"}안내메일 발송 예정이에요~</Text>

      <TextInput
        style={styles.input}
        placeholder="사용자 이메일을 입력해주세요"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>보 내 기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#F1F4F9',
  },
  step: {
    position: 'absolute',
    top: 50,
    right: 30,
    fontSize: 16,
    color: '#6199F7',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#121212',
  },
  subtitle: {
    fontSize: 16,
    color: '#F57C73',
    marginBottom: 40,
    lineHeight: 24,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
    fontSize: 15,
    elevation: 2,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2F80ED',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
