
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BackupAndDeviceScreen() {
  const handleBackup = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const entries = await AsyncStorage.multiGet(keys);
      const data = Object.fromEntries(entries);
      const json = JSON.stringify(data, null, 2);

      console.log("📦 백업 데이터:", json); // 향후 파일 저장 또는 서버 전송 가능

      Alert.alert('백업 완료', '데이터가 안전하게 백업되었습니다.');
    } catch (error) {
      Alert.alert('백업 실패', '백업 중 오류가 발생했습니다.');
    }
  };

  const handleRestore = async () => {
    Alert.alert('데이터 복원', '기존 데이터를 복원하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: async () => {
          try {
            // 예시 복원 데이터 (일반적으로 외부 파일 또는 서버에서 로드됨)
            const exampleRestore = {
              medications: [],
              exercises: [],
              goals: { calories: '2000', carbs: '250', protein: '100', fat: '50' },
            };
            await AsyncStorage.multiSet(
              Object.entries(exampleRestore).map(([k, v]) => [k, JSON.stringify(v)])
            );
            Alert.alert('복원 완료', '데이터가 복원되었습니다.');
          } catch (e) {
            Alert.alert('복원 실패', '복원 중 오류가 발생했습니다.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>💾 백업 및 기기 정보</Text>

        <TouchableOpacity style={styles.button} onPress={handleBackup}>
          <Text style={styles.buttonText}>데이터 백업하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRestore}>
          <Text style={styles.buttonText}>데이터 복원하기</Text>
        </TouchableOpacity>

        <Text style={styles.deviceInfo}>기기 모델: {Device.modelName}</Text>
        <Text style={styles.deviceInfo}>앱 버전: {app?.version || '확인 불가'}</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  deviceInfo: { fontSize: 14, color: '#555', marginTop: 8 },
});
