
import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logNotification } from '../../utils/logNotification';

export default function NotificationSettingScreen() {
  const [settings, setSettings] = useState({
    diet: true,
    medication: true,
    exercise: true,
  });

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('notificationSettings');
      if (stored) setSettings(JSON.parse(stored));
    })();
  }, []);

  const toggleNotification = async (type) => {
    const newSettings = { ...settings, [type]: !settings[type] };
    setSettings(newSettings);
    await AsyncStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    if (newSettings[type]) {
      await logNotification({
        title: `${type === 'diet' ? '식단' : type === 'medication' ? '복약' : '운동'} 알림 설정`,
        date: new Date().toISOString().split('T')[0],
        time: '08:00',
        type: type === 'diet' ? '식단' : type === 'medication' ? '복약' : '운동',
      });
    }
    Alert.alert('저장 완료', '알림 설정이 변경되었습니다.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>🔔 알림 설정</Text>

        {['diet', 'medication', 'exercise'].map((type) => (
          <View key={type} style={styles.row}>
            <Text style={styles.label}>
              {type === 'diet' ? '식단 알림' : type === 'medication' ? '복약 알림' : '운동 알림'}
            </Text>
            <Switch
              value={settings[type]}
              onValueChange={() => toggleNotification(type)}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: { fontSize: 16, color: '#333' },
});
