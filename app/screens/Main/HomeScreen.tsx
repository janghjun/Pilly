
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import WeeklyCalendar from '../../components/common/Calendar/WeeklyCalendar';
import MonthlyCalendar from '../../components/common/Calendar/MonthlyCalendar';
import { addMonths, subMonths, isToday } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { useDiet } from '../../context/DietContext';
import { useMedication } from '../../context/MedicationContext';
import { useExercise } from '../../context/ExerciseContext';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMonthView, setIsMonthView] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigation = useNavigation();

  const { getSummaryByDate: getDietSummary, hasRecordOnDate: hasDiet } = useDiet();
  const { getSummaryByDate: getMedicationSummary, hasRecordOnDate: hasMedication } = useMedication();
  const { getSummaryByDate: getExerciseSummary, hasRecordOnDate: hasExercise } = useExercise();

  const dietSummary = getDietSummary?.(selectedDate) || {
    totalKcal: 0,
    macros: [
      { percent: 0, current: 0, goal: 0, color: '#F2C94C' },
      { percent: 0, current: 0, goal: 0, color: '#F05636' },
      { percent: 0, current: 0, goal: 0, color: '#2678E4' }
    ],
    meals: {}
  };

  const medicationSummary = getMedicationSummary?.(selectedDate) || { 영양제: '', 의약물: '' };
  const exerciseSummary = getExerciseSummary?.(selectedDate) || {
    운동: { desc: '', percent: 0 },
    '걸음 수': { desc: '', percent: 0 }
  };

  const handleTodayPress = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
  };

  const markedDates = {
    ...(hasDiet?.() || {}),
    ...(hasMedication?.() || {}),
    ...(hasExercise?.() || {}),
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <TouchableOpacity onPress={() => navigation.navigate('NotificationCenter')}>
            <Image source={require('../../assets/images/icon_alarm.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {isMonthView ? (
          <MonthlyCalendar
            currentMonth={currentMonth}
            onPrevMonth={() => setCurrentMonth(prev => subMonths(prev, 1))}
            onNextMonth={() => setCurrentMonth(prev => addMonths(prev, 1))}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            markedDates={markedDates}
          />
        ) : (
          <WeeklyCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            markedDates={markedDates}
          />
        )}

        <View style={styles.calendarControls}>
          <TouchableOpacity onPress={() => setIsMonthView(prev => !prev)}>
            <Text style={styles.expandText}>{isMonthView ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {!isToday(selectedDate) && (
            <TouchableOpacity onPress={handleTodayPress}>
              <Text style={styles.todayText}>오늘</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>나의 하루</Text>
          </View>
          <View style={styles.nutritionBox}>
            <Text style={styles.totalKcal}>총 섭취량 {dietSummary.totalKcal} Kcal</Text>
            <View style={styles.macroRow}>
              {['탄수', '단백', '지방'].map((label, idx) => (
                <View key={idx} style={styles.macroItem}>
                  <View style={styles.macroTopRow}>
                    <Text style={styles.macroLabel}>{label}</Text>
                    <Text style={styles.macroPercent}>{dietSummary.macros[idx].percent}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressInner, {
                      flex: dietSummary.macros[idx].percent / 100,
                      backgroundColor: dietSummary.macros[idx].color
                    }]} />
                  </View>
                  <Text style={styles.macroGrams}>
                    {dietSummary.macros[idx].current} / {dietSummary.macros[idx].goal}g
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>나의 식단</Text>
            <TouchableOpacity style={styles.recordButton} onPress={() => navigation.navigate('Diet')}>
              <Text style={styles.recordButtonText}>기록 하기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridRow}>
            {['아침', '점심', '저녁', '간식'].map((meal, idx) => (
              <View key={idx} style={styles.gridCard}>
                <Text style={styles.gridIcon}>🍴</Text>
                <Text style={styles.gridMealTitle}>{meal}</Text>
                <Text style={styles.gridMealContent}>{dietSummary.meals[meal] || '아직 안먹었어요'}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>나의 복약</Text>
            <TouchableOpacity style={styles.recordButton} onPress={() => navigation.navigate('Medication')}>
              <Text style={styles.recordButtonText}>기록 하기</Text>
            </TouchableOpacity>
          </View>
          {['영양제', '의약물'].map((type, idx) => (
            <View key={idx} style={styles.medicationCard}>
              <Text style={styles.pillIcon}>💊</Text>
              <Text style={styles.medicationTitle}>{type}</Text>
              <Text style={styles.medicationDesc}>{medicationSummary[type] || '아직 계획되지 않았어요'}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>나의 운동</Text>
            <TouchableOpacity style={styles.recordButton} onPress={() => navigation.navigate('Exercise')}>
              <Text style={styles.recordButtonText}>기록 하기</Text>
            </TouchableOpacity>
          </View>
          {['운동', '걸음 수'].map((type, idx) => (
            <View key={idx} style={styles.exerciseCard}>
              <Text style={styles.exerciseTitle}>{type}</Text>
              <Text style={styles.exerciseDesc}>{exerciseSummary[type]?.desc || '0분 0 kcal 소모'}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressInner, {
                  flex: (exerciseSummary[type]?.percent || 0) / 100,
                  backgroundColor: '#F05636'
                }]} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0F3F6' },
  container: { paddingBottom: 40, paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 },
  logo: { width: 64, height: 22, resizeMode: 'contain' },
  icon: { width: 32, height: 32 },
  calendarControls: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginBottom: 16 },
  expandText: { fontSize: 18, color: '#F05636', fontWeight: 'bold' },
  todayText: { fontSize: 16, color: '#2678E4', fontWeight: '600' },
  section: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginTop: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
  recordButton: { backgroundColor: '#F05636', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  recordButtonText: { color: '#fff', fontWeight: '600' },
  nutritionBox: { alignItems: 'center' },
  totalKcal: { fontSize: 20, fontWeight: '700', color: '#000', marginBottom: 12 },
  macroRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  macroItem: { flex: 1, alignItems: 'center', marginHorizontal: 4 },
  macroTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  macroLabel: { fontSize: 14, color: '#000', marginRight: 4 },
  macroPercent: { fontSize: 14, fontWeight: '700', color: '#F05636' },
  progressBar: { height: 6, backgroundColor: '#eee', width: '100%', borderRadius: 4 },
  progressInner: { height: '100%', borderRadius: 4 },
  macroGrams: { fontSize: 12, color: '#333', marginTop: 4 },
  gridRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridCard: { width: '48%', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  gridIcon: { fontSize: 24, marginBottom: 8 },
  gridMealTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  gridMealContent: { fontSize: 14, color: '#2678E4' },
  medicationCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  pillIcon: { fontSize: 24, marginBottom: 8 },
  medicationTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  medicationDesc: { fontSize: 14, color: '#2678E4' },
  exerciseCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  exerciseTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  exerciseDesc: { fontSize: 14, color: '#333', marginBottom: 8 }
});
