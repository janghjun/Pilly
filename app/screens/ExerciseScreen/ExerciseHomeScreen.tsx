import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useExercise } from '../../context/ExerciseContext';
import WeeklyCalendar from '../../components/common/Calendar/WeeklyCalendar';
import MonthlyCalendar from '../../components/common/Calendar/MonthlyCalendar';
import { addMonths, subMonths } from 'date-fns';
import { BarChart } from 'react-native-chart-kit';

export default function ExerciseHomeScreen() {
  const navigation = useNavigation();
  const { getExerciseByDate } = useExercise();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMonthView, setIsMonthView] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const partList = ['가슴', '등', '하체', '어깨', '복근', '유산소'];

  useEffect(() => {
    setCurrentMonth(new Date(selectedDate));
  }, [selectedDate]);

  const { todayTotalTime, groupedByPart, weeklyStats } = useMemo(() => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const todayRecords = getExerciseByDate(dateKey);
    const total = todayRecords.reduce((sum, r) => sum + Number(r.duration || 0), 0);

    const grouped = {};
    partList.forEach((p) => (grouped[p] = []));
    todayRecords.forEach((r) => {
      if (grouped[r.part]) grouped[r.part].push(r);
    });

    const stats = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toISOString().split('T')[0];
      const y = getExerciseByDate(key).reduce((sum, r) => sum + Number(r.duration || 0), 0);
      return { x: key.slice(5), y };
    });

    return { todayTotalTime: total, groupedByPart: grouped, weeklyStats: stats };
  }, [selectedDate]);

  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(87, 119, 204, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 0,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <View style={styles.topButtonRow}>
          <TouchableOpacity onPress={() => navigation.navigate('ExerciseDetail')}>
            <Text style={styles.detailButton}>상세</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ExerciseSummary')}>
            <Text style={styles.summaryButton}>한눈에</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendar */}
      {isMonthView ? (
        <MonthlyCalendar
          currentMonth={currentMonth}
          onPrevMonth={() => setCurrentMonth(prev => subMonths(prev, 1))}
          onNextMonth={() => setCurrentMonth(prev => addMonths(prev, 1))}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      ) : (
        <WeeklyCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      )}
      <TouchableOpacity onPress={() => setIsMonthView(prev => !prev)} style={styles.expandToggle}>
        <Text style={styles.expandText}>{isMonthView ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Summary Card */}
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>나의 운동 🏋️‍♀️</Text>
      </View>
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>오늘 총 운동 시간</Text>
        <Text style={styles.totalValue}>{todayTotalTime}분</Text>
      </View>

      {/* Part-wise Cards */}
      {partList.map((part) => {
        const records = groupedByPart[part];
        const total = records.reduce((sum, r) => sum + Number(r.duration || 0), 0);
        return (
          <View key={part} style={styles.timeSlotCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{part}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ExerciseSearch', { selectedPart: part })}>
                <Image source={require('../../assets/images/edit_icon.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
            {records.length === 0 ? (
              <Text style={styles.emptyText}>아직 기록되지 않았어요</Text>
            ) : (
              <>
                <Text style={styles.totalPartTime}>총 {total}분</Text>
                {records.map((item, i) => (
                  <Text key={i} style={styles.recordText}>• {item.name} ({item.duration}분)</Text>
                ))}
              </>
            )}
          </View>
        );
      })}

      {/* Weekly Bar Chart */}
      <Text style={styles.chartTitle}>주간 운동 시간</Text>
      <BarChart
        data={{
          labels: weeklyStats.map(d => d.x),
          datasets: [{ data: weeklyStats.map(d => d.y) }],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        style={{ marginVertical: 16, borderRadius: 12 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F3F6', padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 60 },
  logo: { width: 64, height: 22, resizeMode: 'contain' },
  topButtonRow: { flexDirection: 'row', alignItems: 'center' },
  detailButton: { fontSize: 16, color: '#2678E4', fontWeight: '600', marginRight: 16 },
  summaryButton: { fontSize: 16, color: '#F05636', fontWeight: '600' },
  expandToggle: { marginTop: 4, marginBottom: 12, alignSelf: 'center' },
  expandText: { fontSize: 18, color: '#F05636', fontWeight: 'bold' },
  sectionTitleRow: { marginBottom: 12 },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#151515' },
  totalCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: { fontSize: 14, color: '#888' },
  totalValue: { fontSize: 24, fontWeight: '700', color: '#2678E4', marginTop: 6 },
  timeSlotCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#151515' },
  icon: { width: 20, height: 20 },
  emptyText: { fontSize: 14, color: '#999', marginTop: 6 },
  totalPartTime: { fontSize: 14, fontWeight: '600', color: '#2678E4', marginTop: 6, marginBottom: 6 },
  recordText: { fontSize: 14, color: '#333', marginBottom: 2 },
  chartTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
});