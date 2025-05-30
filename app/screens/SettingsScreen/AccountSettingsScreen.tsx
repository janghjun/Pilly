// AccountSettingsScreen.tsx - 계정 설정 화면
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AccountSettingsScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: () => {
          // TODO: 토큰 제거 및 상태 초기화
          // 예: AsyncStorage.removeItem('token') 등
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
      }
    ]);
  };

  const handleWithdraw = () => {
    Alert.alert('회원 탈퇴', '정말 탈퇴하시겠습니까? 탈퇴 시 모든 데이터가 삭제됩니다.', [
      { text: '취소', style: 'cancel' },
      {
        text: '탈퇴',
        style: 'destructive',
        onPress: () => {
          // TODO: 회원 탈퇴 API 호출 및 상태 초기화
          Alert.alert('탈퇴 완료', '계정이 삭제되었습니다.');
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>🔐 계정 설정</Text>

        <TouchableOpacity style={styles.itemRow} onPress={() => navigation.navigate('EditAccount')}>
          <Text style={styles.label}>비밀번호 변경</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemRow} onPress={handleLogout}>
          <Text style={styles.label}>로그아웃</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemRow} onPress={handleWithdraw}>
          <Text style={[styles.label, { color: '#F05636' }]}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0F3F6' },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' },
  itemRow: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  label: { fontSize: 16, fontWeight: '600', color: '#000' },
});
