import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';

export default function MealReminderScreen() {
  const [reminderTime, setReminderTime] = useState('08:00');
  const [reminderEnabled, setReminderEnabled] = useState(false);

  const handleToggleReminder = () => {
    setReminderEnabled(!reminderEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>식사 알림 설정</Text>
      <Text style={styles.subtitle}>알림 시간: {reminderTime}</Text>
      <View style={styles.switchContainer}>
        <Text>알림 받기</Text>
        <Switch value={reminderEnabled} onValueChange={handleToggleReminder} />
      </View>

      {reminderEnabled && (
        <Text style={styles.info}>알림을 설정했습니다. 설정된 시간에 알림을 받습니다.</Text>
      )}

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, color: '#555', marginBottom: 20 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  info: { fontSize: 16, color: '#888' },
  saveButton: { backgroundColor: '#000', padding: 10, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
});
