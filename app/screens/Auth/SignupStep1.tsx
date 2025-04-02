import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserInfo } from '../../context/UserInfoContext';

export default function SignupStep1({ navigation }) {
  const { setUserInfo } = useUserInfo();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {
      if (!email) {
        alert('이메일을 입력해주세요');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!password || password.length < 6) {
        alert('비밀번호를 6자 이상 입력해주세요');
        return;
      }
      setUserInfo(prev => ({ ...prev, email, password }));
      navigation.navigate('OnboardingScreen');
    }
  };

  const handleBack = () => setStep(1);

  return (
    <View style={styles.container}>
      <Text style={styles.stepIndicator}>{step}/2</Text>
      <Text style={styles.welcomeText}>환영합니다{'\n'}빠른 가입으로 시작해봐요</Text>

      <TextInput
        style={styles.input}
        placeholder="사용자 이메일을 입력해주세요"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#aaa"
      />

      {step === 2 && (
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="사용하실 비밀번호 6자 이상 입력해주세요"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>다 음</Text>
      </TouchableOpacity>

      {step === 2 && (
        <TouchableOpacity style={styles.prevButton} onPress={handleBack}>
          <Text style={styles.buttonText}>이 전</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 393,
    height: 852,
    backgroundColor: '#F0F3F6',
    position: 'relative',
    alignItems: 'center',
  },
  stepIndicator: {
    position: 'absolute',
    top: 70,
    right: 30,
    fontSize: 20,
    color: '#6199F7',
    fontWeight: '600',
  },
  welcomeText: {
    position: 'absolute',
    top: 135,
    left: 21,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  input: {
    position: 'absolute',
    top: 346,
    left: 51,
    width: 292,
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius:8,
    paddingHorizontal: 16,
    fontSize: 16,
    elevation: 2,
    textAlign: 'left',
  },
  passwordInput: {
    top: 451, // step === 2 일 때 비밀번호 입력창 위치
  },
  nextButton: {
    position: 'absolute',
    bottom: 100,
    left: 24,
    width: 348,
    height: 48,
    backgroundColor: '#2678E4',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  prevButton: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    width: 348,
    height: 48,
    backgroundColor: '#F87171',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 8,
  },
});
