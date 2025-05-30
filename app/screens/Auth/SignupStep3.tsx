import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignupStep3({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 회원가입이 완료되었습니다!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Step1')}>
        <Text style={styles.buttonText}>온보딩 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
  button: { backgroundColor: '#000', padding: 16, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
