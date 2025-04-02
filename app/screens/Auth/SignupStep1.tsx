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
      <View style={styles.stepIndicatorContainer}>
        <Text style={styles.stepIndicator}>{step}/2</Text>
      </View>

      <View>
        <Text style={styles.welcomeText}>환영합니다</Text>
        <Text style={styles.fastSignupText}>빠른 가입으로 시작해봐요</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="사용자 이메일을 입력해주세요"
          value={email}
          onChangeText={setEmail}
        />

        {step === 2 && (
          <TextInput
            style={styles.input}
            placeholder="사용하실 비밀번호 6자 이상 입력해주세요"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        )}
      </View>

      <View style={{ gap: 12 }}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>다 음</Text>
        </TouchableOpacity>

        {step === 2 && (
          <TouchableOpacity style={styles.prevButton} onPress={handleBack}>
            <Text style={styles.buttonText}>이 전</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    backgroundColor: '#F1F5F9',
  },
  stepIndicatorContainer: {
    alignItems: 'flex-end',
  },
  stepIndicator: {
    color: '#93C5FD',
    fontWeight: '600',
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fastSignupText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },
  formContainer: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    width: '100%',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
    color: '#94A3B8',
  },
  nextButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  prevButton: {
    backgroundColor: '#F87171',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
