import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, subMonths, addMonths } from 'date-fns';

export default function MonthlyCalendar({ currentMonth, onPrevMonth, onNextMonth, selectedDate, onSelectDate }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dates = [];
  let day = startDate;
  while (day <= endDate) {
    dates.push(day);
    day = addDays(day, 1);
  }

  return (
    <View style={styles.container}>
      {/* 헤더 (월 표시 및 좌우 이동) */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onPrevMonth}><Text style={styles.arrow}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>{format(currentMonth, 'yyyy년 MM월')}</Text>
        <TouchableOpacity onPress={onNextMonth}><Text style={styles.arrow}>{'>'}</Text></TouchableOpacity>
      </View>

      {/* 요일 */}
      <View style={styles.weekRow}>
        {['월','화','수','목','금','토','일'].map((day, i) => (
          <Text key={i} style={styles.weekday}>{day}</Text>
        ))}
      </View>

      {/* 날짜 셀 */}
      <View style={styles.grid}>
        {dates.map((date, idx) => {
          const isCurrentMonth = isSameMonth(date, monthStart);
          const isSelected = isSameDay(date, selectedDate);
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.cell, isSelected && styles.selectedCell]}
              onPress={() => onSelectDate(date)}
              disabled={!isCurrentMonth}
            >
              <Text style={[styles.cellText, !isCurrentMonth && styles.dimmed, isSelected && styles.selectedText]}>
                {format(date, 'd')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginTop: 12 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#151515' },
  arrow: { fontSize: 20, fontWeight: 'bold', color: '#2678E4' },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 6,
  },
  weekday: { fontSize: 12, color: '#888', textAlign: 'center', flex: 1 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 2,
  },
  selectedCell: {
    backgroundColor: '#F05636',
  },
  cellText: {
    fontSize: 14,
    color: '#151515',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dimmed: {
    color: '#ccc',
  },
});
