import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('유효한 이메일을 입력해주세요');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Step1');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* 제목 */}
      <Text style={styles.title}>
        <Text style={styles.orange}>바디</Text>
        <Text style={styles.blue}>케어</Text>
        <Text style={styles.span}>와 함께{'\n'}건강 관리 시작해요!</Text>
      </Text>

      {/* 부가 설명 */}
      <Text style={styles.subtext}>빠른 가입으로 시작해보세요</Text>

      <View style={styles.inputGroup}>
        {/* 이메일 */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="이메일"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* 비밀번호 */}
        <View style={[styles.inputBox, { marginTop: 20 }]}>
          <TextInput
            placeholder="비밀번호"
            placeholderTextColor="#999"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>로 그 인</Text>
        )}
      </TouchableOpacity>

      {/* 회원가입 버튼 */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('Signup1')}
      >
        <Text style={styles.buttonText}>회 원 가 입</Text>
      </TouchableOpacity>

      {/* 소셜 로그인 텍스트 */}
      <Text style={styles.socialText}>소셜로그인</Text>

      {/* 소셜 아이콘 */}
      <View style={styles.socialRow}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/apple.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/google.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* 비밀번호 찾기 */}
      <TouchableOpacity onPress={() => navigation.navigate('PasswordResetScreen')}>
        <Text style={styles.forgotText}>비밀번호를 잊으셨나요?</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 852,
    width: 393,
    backgroundColor: '#F0F3F6',
    position: 'relative',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: 127,
    left: 22,
    width: 311,
    fontSize: 32,
    fontWeight: '600',
    fontFamily: 'Roboto-SemiBold',
    lineHeight: 40,
  },
  span: {
    color: '#151515',
    letterSpacing: -0.16,
  },
  orange: {
    color: '#F05636',
    letterSpacing: -0.16,
  },
  blue: {
    color: '#2678E4',
    letterSpacing: -0.16,
  },
  subtext: {
    position: 'absolute',
    top: 211,
    left: 22,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto-SemiBold',
    lineHeight: 40,
    color: '#F05636B2',
  },
  inputGroup: {
    position: 'absolute',
    top: 311, // 이메일 입력창 시작 위치
    left: 22,
    width: 292,
    height: 55,

  },
  inputBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
  },
  input: {
    fontSize: 16,
    color: '#151515',
  },
  loginButton: {
    position: 'absolute',
    top: 501,
    left: 21,
    width: 348,
    height: 48,
    borderRadius: 5,
    backgroundColor: '#2678E4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButton: {
    position: 'absolute',
    top: 569,
    left: 21,
    width: 348,
    height: 48,
    borderRadius: 5,
    backgroundColor: '#F05636',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  socialText: {
    //position: 'absolute',
    top: 640,
    fontSize: 12,
    color: '#2678E4',
  },
  socialRow: {
    position: 'absolute',
    top: 685,
    flexDirection: 'row',
    //gap: 20,
  },
  socialIcon: {
    width: 45,
    height: 45,
    marginHorizontal: 20,
    resizeMode: 'contain',
  },
  forgotText: {
    //position: 'absolute',
    top: 740,
    fontSize: 12,
    color: '#F05636',
    textAlign: 'center'
  },
});
