import React from 'react';
import { ScrollView, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 퀵메뉴 */}
      <View style={styles.quickMenu}>
        <Text style={styles.quickMenuText}>퀵 메뉴</Text>
      </View>

      {/* 한눈에 확인하기 타이틀 */}
      <Text style={styles.sectionTitle}>한눈에 확인하기</Text>
      <Text style={styles.date}>03/21 (금)</Text>

      {/* 식단 카드 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍽 오전 10:00</Text>
        <View style={styles.foodItem}>
          <Text>햇반 210g</Text>
          <Text>315 kcal</Text>
        </View>
        <View style={styles.foodItem}>
          <Text>닭가슴살 200g</Text>
          <Text>230 kcal</Text>
        </View>
      </View>

      {/* 복약 카드 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💊 복약</Text>
        <Text>유산균 ✅</Text>
        <Text>마그네슘 ✅</Text>
      </View>

      {/* 운동 카드 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💪 운동 부위</Text>
        <Text>가슴, 등 / 698kcal / 8개 운동</Text>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>자세히 보기</Text>
        </TouchableOpacity>
      </View>

      {/* 알람 카드 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>⏰ 기본 알람</Text>
        <View style={styles.alarmRow}>
          <Text>07:00</Text>
          <Switch value={true} />
        </View>
        <View style={styles.alarmRow}>
          <Text>07:00</Text>
          <Switch value={true} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  quickMenu: {
    backgroundColor: '#f2f2f2',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  quickMenuText: { fontSize: 16, color: '#888' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  date: { marginBottom: 12, color: '#666' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 1, // Android shadow
    shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, // iOS shadow
  },
  cardTitle: { fontWeight: 'bold', marginBottom: 8 },
  foodItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  alarmRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  detailButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  detailButtonText: { fontWeight: 'bold', color: '#444' },
});
