// SettingsScreen.tsx - 설정 메뉴 홈 화면
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const settings = [
    { label: '계정 설정', icon: '🔒', screen: 'AccountSettings' },
    { label: '건강 목표 설정', icon: '🎯', screen: 'GoalSetting' },
    { label: '알림 설정', icon: '🔔', screen: 'NotificationSettings' },
    { label: '데이터 백업 및 기기연동', icon: '💾', screen: 'BackupAndDevice' },
    { label: '고객지원 및 정책', icon: '📄', screen: 'SupportAndPolicy' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>⚙️ 설정</Text>

        {settings.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemRow}
            onPress={() => navigation.navigate(item.screen)}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.versionText}>앱 버전 v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0F3F6' },
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  icon: { fontSize: 24, marginRight: 16 },
  label: { fontSize: 16, fontWeight: '600', color: '#000' },
  versionText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
  },
});
