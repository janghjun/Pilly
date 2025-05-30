import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { eachDayOfInterval, endOfWeek, format, isSameDay, isToday, startOfWeek } from 'date-fns';

export default function WeeklyCalendar({ selectedDate, onSelectDate, markedDates = {} }) {
  const start = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const end = endOfWeek(selectedDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start, end });

  return (
    <View style={styles.row}>
      {days.map((day, idx) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const marked = markedDates[dateStr];
        return (
          <TouchableOpacity
            key={idx}
            style={[styles.day, isSameDay(day, selectedDate) && styles.selectedDay]}
            onPress={() => onSelectDate(day)}
          >
            <Text style={[styles.dayText, isSameDay(day, selectedDate) && styles.selectedText]}>
              {format(day, 'E')}
            </Text>
            <Text style={[styles.dateText, isSameDay(day, selectedDate) && styles.selectedText]}>
              {format(day, 'd')}
            </Text>
            {marked && <View style={styles.dot} />}
            {isToday(day) && <View style={styles.todayOutline} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  day: {
    alignItems: 'center',
    paddingVertical: 10,
    width: 40,
    position: 'relative'
  },
  dayText: { fontSize: 12, color: '#666' },
  dateText: { fontSize: 16, fontWeight: '600', color: '#000' },
  selectedDay: {
    backgroundColor: '#F05636',
    borderRadius: 12,
    paddingVertical: 10,
    width: 40,
  },
  selectedText: { color: '#fff' },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2678E4',
    position: 'absolute',
    bottom: 4,
  },
  todayOutline: {
    borderWidth: 1,
    borderColor: '#2678E4',
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
