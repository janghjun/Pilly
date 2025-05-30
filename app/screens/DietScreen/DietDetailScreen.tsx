// DietDetailScreen.tsx - 소수점 제거 반영 통합 개선 버전
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDiet } from '../../context/DietContext';
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const MacroRatioBar = ({ carb, protein, fat }) => {
  const total = carb + protein + fat;
  const safe = (v) => total === 0 ? 1 : v;

  return (
    <View style={styles.macroBarContainer}>
      <View style={[styles.macroBar, { flex: safe(carb), backgroundColor: '#fcbf49' }]}>
        <Text style={styles.macroBarText}>탄 {Math.round(carb)}g</Text>
      </View>
      <View style={[styles.macroBar, { flex: safe(protein), backgroundColor: '#90be6d' }]}>
        <Text style={styles.macroBarText}>단 {Math.round(protein)}g</Text>
      </View>
      <View style={[styles.macroBar, { flex: safe(fat), backgroundColor: '#577590' }]}>
        <Text style={styles.macroBarText}>지 {Math.round(fat)}g</Text>
      </View>
    </View>
  );
};

export default function DietDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { getMealsByDate } = useDiet();

  const initialDate = typeof route.params?.date === 'string'
    ? new Date(route.params.date)
    : route.params?.date ?? new Date();

  const [activeTab, setActiveTab] = useState<'nutrition' | 'food'>('nutrition');
  const [activeRange, setActiveRange] = useState<'일간' | '주간' | '월간'>('일간');
  const [currentDate, setCurrentDate] = useState(initialDate);

  const getDateRange = () => {
    if (activeRange === '일간') return [currentDate, currentDate];
    if (activeRange === '주간') return [startOfWeek(currentDate, { weekStartsOn: 1 }), endOfWeek(currentDate, { weekStartsOn: 1 })];
    return [startOfMonth(currentDate), endOfMonth(currentDate)];
  };

  const formatDateText = () => {
    const [start, end] = getDateRange();
    if (activeRange === '일간') return format(start, 'yyyy.MM.dd (EEE)');
    if (activeRange === '주간') return `${format(start, 'yyyy.MM.dd')} ~ ${format(end, 'MM.dd')}`;
    return format(start, 'yyyy.MM');
  };

  const daysInRange = eachDayOfInterval({ start: getDateRange()[0], end: getDateRange()[1] });

  const allMeals = useMemo(() => {
    let combined = [];
    daysInRange.forEach(d => {
      const key = d.toISOString().split('T')[0];
      const meals = getMealsByDate(key);
      Object.values(meals).forEach(arr => combined = combined.concat(arr));
    });
    return combined;
  }, [daysInRange, getMealsByDate]);

  const summary = useMemo(() => {
    const sum = (key) => allMeals.reduce((a, b) => a + parseFloat(b[key] || '0'), 0);
    return {
      kcal: Math.round(sum('kcal')),
      carb: Math.round(sum('carb')),
      protein: Math.round(sum('protein')),
      fat: Math.round(sum('fat')),
      sodium: Math.round(sum('sodium')),
    };
  }, [allMeals]);

  const allFoods = useMemo(() => {
    const countMap = {};
    allMeals.forEach(f => {
      if (!countMap[f.name]) countMap[f.name] = 0;
      countMap[f.name]++;
    });
    return Object.entries(countMap).map(([name, count]) => ({ name, count }));
  }, [allMeals]);

  const moveDate = (direction) => {
    const delta = direction === 'prev' ? -1 : 1;
    const newDate = new Date(currentDate);
    if (activeRange === '일간') newDate.setDate(newDate.getDate() + delta);
    if (activeRange === '주간') newDate.setDate(newDate.getDate() + delta * 7);
    if (activeRange === '월간') newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const exportToCSV = async () => {
    let csv = '음식명,횟수\n';
    allFoods.forEach(f => {
      csv += `${f.name},${f.count}\n`;
    });
    csv += `\n총 섭취량,칼로리,탄수화물,단백질,지방,나트륨\n`;
    csv += `,${summary.kcal},${summary.carb},${summary.protein},${summary.fat},${summary.sodium}`;

    const fileUri = FileSystem.documentDirectory + 'diet_summary.csv';
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });
    await Sharing.shareAsync(fileUri);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F3F6' }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backBtn}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>상세 식단</Text>
        </View>

        <View style={styles.rangeTabs}>
          {['일간', '주간', '월간'].map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setActiveRange(label)}
              style={[styles.rangeTab, activeRange === label && styles.activeRangeTab]}
            >
              <Text style={activeRange === label ? styles.activeRangeText : styles.rangeText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.dateRow}>
          <TouchableOpacity onPress={() => moveDate('prev')}><Text style={styles.arrow}>{'<'}</Text></TouchableOpacity>
          <Text style={styles.dateText}>{formatDateText()}</Text>
          <TouchableOpacity onPress={() => moveDate('next')}><Text style={styles.arrow}>{'>'}</Text></TouchableOpacity>
        </View>

        <MacroRatioBar carb={summary.carb} protein={summary.protein} fat={summary.fat} />

        <TouchableOpacity style={styles.csvBtn} onPress={exportToCSV}>
          <Text style={styles.csvText}>CSV 저장 및 공유</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          {activeTab === 'nutrition' ? (
            <View>
              <Text style={styles.nutritionText}>총 열량: {summary.kcal} kcal</Text>
              <Text style={styles.nutritionText}>● 탄수화물: {summary.carb} g</Text>
              <Text style={styles.nutritionText}>● 단백질: {summary.protein} g</Text>
              <Text style={styles.nutritionText}>● 지방: {summary.fat} g</Text>
              <Text style={styles.nutritionText}>총 나트륨: {summary.sodium} mg</Text>
            </View>
          ) : (
            allFoods.length > 0 ? allFoods.map((f, i) => (
              <Text key={i} style={styles.foodItem}>・{f.name} <Text style={styles.foodCount}>{f.count}회</Text></Text>
            )) : <Text style={styles.emptyText}>등록된 음식이 없습니다.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: 16, paddingBottom: 32 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backBtn: { fontSize: 20, color: '#F05636', marginRight: 6 },
  title: { fontSize: 18, fontWeight: '700', color: '#2678E4' },
  rangeTabs: { flexDirection: 'row', marginVertical: 12 },
  rangeTab: { paddingVertical: 6, paddingHorizontal: 14, backgroundColor: 'white', borderRadius: 8, marginRight: 8 },
  activeRangeTab: { backgroundColor: '#F05636' },
  rangeText: { color: '#666' },
  activeRangeText: { color: 'white', fontWeight: '600' },
  dateRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  arrow: { fontSize: 20, color: '#F05636', paddingHorizontal: 12 },
  dateText: { fontSize: 16, fontWeight: '600' },
  macroBarContainer: { flexDirection: 'row', height: 40, borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
  macroBar: { justifyContent: 'center', alignItems: 'center' },
  macroBarText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  csvBtn: { backgroundColor: '#2678E4', padding: 10, borderRadius: 6, marginBottom: 12 },
  csvText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 16 },
  nutritionText: { fontSize: 14, marginBottom: 4 },
  foodItem: { fontSize: 14, marginBottom: 8 },
  foodCount: { color: '#2678E4', fontWeight: '600' },
  emptyText: { color: '#999', textAlign: 'center', padding: 20 },
});