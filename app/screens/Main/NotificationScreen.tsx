// NotificationSettingsScreen.tsx - 알림 수신 설정 UI 연동 완료
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView, Alert } from 'react-native';
import {
  scheduleMedicationNotification,
  scheduleDietNotification,
  scheduleExerciseNotification,
  cancelNotification,
  registerForPushNotificationsAsync
} from '../../utils/notifications';

export default function NotificationSettingsScreen() {
  const [medicationEnabled, setMedicationEnabled] = useState(true);
  const [exerciseEnabled, setExerciseEnabled] = useState(true);
  const [dietEnabled, setDietEnabled] = useState(true);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleToggle = async (type, enabled) => {
    try {
      if (type === 'medication') {
        setMedicationEnabled(enabled);
        if (enabled) {
          await scheduleMedicationNotification({ title: '복약 시간', body: '복약 시간입니다.', hour: 9, minute: 0 });
          await scheduleMedicationNotification({ title: '복약 시간', body: '저녁 복약 시간입니다.', hour: 18, minute: 0 });
        } else {
          await cancelNotification('medication-9-0');
          await cancelNotification('medication-18-0');
        }
      }
      if (type === 'exercise') {
        setExerciseEnabled(enabled);
        if (enabled) {
          await scheduleExerciseNotification({ title: '운동 시간', body: '오늘 운동 잊지 마세요!', hour: 19, minute: 0 });
        } else {
          await cancelNotification('exercise-19-0');
        }
      }
      if (type === 'diet') {
        setDietEnabled(enabled);
        if (enabled) {
          await scheduleDietNotification({ title: '식사 시간', body: '아침 식사 하셨나요?', hour: 8, minute: 0 });
          await scheduleDietNotification({ title: '식사 시간', body: '점심 식사 하셨나요?', hour: 12, minute: 0 });
          await scheduleDietNotification({ title: '식사 시간', body: '저녁 식사 하셨나요?', hour: 18, minute: 0 });
        } else {
          await cancelNotification('diet-8-0');
          await cancelNotification('diet-12-0');
          await cancelNotification('diet-18-0');
        }
      }
    } catch (err) {
      Alert.alert('알림 설정 오류', '알림 설정에 실패했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🔔 알림 설정</Text>

      <View style={styles.itemRow}>
        <Text style={styles.label}>복약 알림</Text>
        <Switch
          value={medicationEnabled}
          onValueChange={(v) => handleToggle('medication', v)}
          trackColor={{ false: '#ccc', true: '#2678E4' }}
        />
      </View>

      <View style={styles.itemRow}>
        <Text style={styles.label}>운동 알림</Text>
        <Switch
          value={exerciseEnabled}
          onValueChange={(v) => handleToggle('exercise', v)}
          trackColor={{ false: '#ccc', true: '#2678E4' }}
        />
      </View>

      <View style={styles.itemRow}>
        <Text style={styles.label}>식단 알림</Text>
        <Switch
          value={dietEnabled}
          onValueChange={(v) => handleToggle('diet', v)}
          trackColor={{ false: '#ccc', true: '#2678E4' }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F0F3F6' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  label: { fontSize: 16, color: '#000' },
});