import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserInfo } from '../../context/UserInfoContext';

// 복약 관리 및 알람 상태를 관리하기 위한 데이터 예시
const initialMedicationData = [
  { id: 1, name: '유산균', quantity: 2, taken: false },
  { id: 2, name: '마그네슘', quantity: 1, taken: false },
];

const initialAlarmData = [
  { id: 1, time: '07:00', enabled: true },
  { id: 2, time: '08:00', enabled: false },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { userInfo } = useUserInfo();
  const [medications, setMedications] = useState(initialMedicationData);
  const [alarms, setAlarms] = useState(initialAlarmData);

  const handleMedicationCheck = (id: number) => {
    setMedications(prev =>
      prev.map(item =>
        item.id === id ? { ...item, taken: !item.taken } : item
      )
    );
  };

  const handleAlarmToggle = (id: number) => {
    setAlarms(prev =>
      prev.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const handleDoubleClick = (target: string) => {
    navigation.navigate(target);
  };

  return (
    <View style={styles.container}>
      {/* 상단 로고 및 사용자 설정 버튼 */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('UserSettings')}>
          <Image
              source={require('../../assets/images/profile.png')}
              style={styles.profile}
          />
        </TouchableOpacity>
      </View>

      {/* 홈 화면 콘텐츠 */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => handleDoubleClick('식단')}>
          <Text style={styles.sectionTitle}>식단</Text>
          <Text>오늘의 식단: 햇반 210g, 닭가슴살 200g</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => handleDoubleClick('복약')}>
          <Text style={styles.sectionTitle}>복약</Text>
          {medications.map((medication) => (
            <View key={medication.id} style={styles.medicationItem}>
              <Text>{medication.name} {medication.quantity}개</Text>
              <Switch
                value={medication.taken}
                onValueChange={() => handleMedicationCheck(medication.id)}
              />
            </View>
          ))}
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => handleDoubleClick('운동')}>
          <Text style={styles.sectionTitle}>운동</Text>
          <Text>오늘의 운동: 8개 운동, 32세트, 698kcal</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => handleDoubleClick('수면')}>
          <Text style={styles.sectionTitle}>알람</Text>
          {alarms.map((alarm) => (
            <View key={alarm.id} style={styles.alarmItem}>
              <Text>{alarm.time}</Text>
              <Switch
                value={alarm.enabled}
                onValueChange={() => handleAlarmToggle(alarm.id)}
              />
            </View>
          ))}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { width: 40, height: 40, resizeMode: "contain"},
  profile: {width: 26, height: 26},
  settingsButton: { fontSize: 16, color: '#000', textDecorationLine: 'underline' },
  section: { marginVertical: 10, backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  medicationItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  alarmItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
