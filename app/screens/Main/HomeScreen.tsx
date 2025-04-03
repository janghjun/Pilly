import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  // 복약 상태
  const [medications, setMedications] = useState([
    { id: 1, name: '유산균', quantity: '2정', checked: true },
    { id: 2, name: '마그네슘', quantity: '1정', checked: false },
  ]);

  // 알람 상태
  const [alarms, setAlarms] = useState([
    { id: 1, time: '07:00', enabled: true },
    { id: 2, time: '07:00', enabled: false },
  ]);

  // 토글 함수
  const toggleCheck = (id: number) => {
    setMedications(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleAlarm = (id: number) => {
    setAlarms(prev =>
      prev.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* 상단 영역 */}
      <View style={styles.topBar}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <View style={styles.iconGroup}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/icon_user.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/icon_alarm.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 퀵 메뉴 안내 */}
      <View style={styles.quickMenu}>
        <Text style={styles.quickMenuText}>퀵 메뉴 (상세페이지 아이콘)_추가 삭제 가능</Text>
      </View>

      {/* 한눈에 확인하기 */}
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryTitle}>한눈에 확인하기</Text>
        <Text style={styles.summaryDate}>03/21(금)</Text>
      </View>

      {/* 식단 카드 */}
      <View style={styles.card}>
        <Text style={styles.cardTime}>오전 10:00</Text>
        <View style={styles.foodRow}>
          <View>
            <Text>햇반 210g</Text>
            <Text style={styles.foodDetail}>1.5&nbsp;&nbsp;&nbsp;70&nbsp;&nbsp;&nbsp;5</Text>
          </View>
          <Text style={styles.kcal}>315</Text>
        </View>
        <View style={styles.foodRow}>
          <View>
            <Text>맛있닭 소프트 닭가슴살 200g</Text>
            <Text style={styles.foodDetail}>4.4&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;44</Text>
          </View>
          <Text style={styles.kcal}>230</Text>
        </View>
      </View>

      {/* 복약 카드 */}
      <View style={styles.card}>
        {medications.map((item) => (
          <View key={item.id} style={styles.medicineRow}>
            <View>
              <Text>{item.name}</Text>
              <Text style={styles.medicineQty}>{item.quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleCheck(item.id)}>
              <Image
                source={
                  item.checked
                    ? require('../../assets/images/checkbox_checked.png')
                    : require('../../assets/images/checkbox_unchecked.png')
                }
                style={styles.checkbox}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* 운동 카드 */}
      <View style={styles.card}>
        <Text style={styles.exerciseTitle}>운동 부위 <Text style={styles.exerciseArea}>가슴, 등</Text></Text>
        <View style={styles.exerciseMetrics}>
          <Text style={styles.exerciseText}>🔥 698kcal</Text>
          <Text style={styles.exerciseText}>🏋️ 8개 운동</Text>
          <Text style={styles.exerciseText}>⏱ 32세트</Text>
        </View>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>자세히 보기</Text>
        </TouchableOpacity>
      </View>

      {/* 알람 카드 (이미지 슬라이더) */}
      <View style={styles.card}>
        <Text style={styles.alarmTitle}>기본 알람</Text>
        {alarms.map((alarm) => (
          <View key={alarm.id} style={styles.alarmRow}>
            <Text>{alarm.time}</Text>
            <TouchableOpacity onPress={() => toggleAlarm(alarm.id)}>
              <Image
                source={
                  alarm.enabled
                    ? require('../../assets/images/switch_on.png')
                    : require('../../assets/images/switch_off.png')
                }
                style={styles.switchImage}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F4F9' },

  topBar: {
    marginTop: 60,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { width: 48, height: 24, resizeMode: 'contain' },
  iconGroup: { flexDirection: 'row', gap: 16 },
  icon: { width: 24, height: 24, resizeMode: 'contain' },

  quickMenu: {
    marginTop: 24,
    backgroundColor: '#ECEFF1',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
  },
  quickMenuText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  summaryHeader: {
    marginTop: 24,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
  },
  summaryDate: {
    fontSize: 14,
    color: '#2678E4',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
    elevation: 2,
  },
  cardTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  foodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  foodDetail: {
    fontSize: 12,
    color: '#2678E4',
    marginTop: 4,
  },
  kcal: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  medicineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicineQty: {
    fontSize: 13,
    color: '#2678E4',
  },
  checkbox: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  exerciseTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  exerciseArea: {
    fontWeight: '400',
    color: '#2678E4',
  },
  exerciseMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  exerciseText: {
    fontSize: 14,
    color: '#333',
  },
  detailButton: {
    backgroundColor: '#F05636',
    paddingVertical: 10,
    borderRadius: 8,
  },
  detailButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  alarmTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  alarmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  switchImage: {
    width: 40,
    height: 24,
    resizeMode: 'contain',
  },
});
