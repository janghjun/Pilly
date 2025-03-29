import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function MealRecordScreen() {
  const [meal, setMeal] = useState('');
  const [mealRecords, setMealRecords] = useState<string[]>([]);

  const handleAddMeal = () => {
    if (meal) {
      setMealRecords((prev) => [meal, ...prev]);
      setMeal('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="오늘 먹은 음식 기록"
        value={meal}
        onChangeText={setMeal}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddMeal}>
        <Text style={styles.addButtonText}>식사 추가</Text>
      </TouchableOpacity>

      <Text style={styles.recordsTitle}>식사 기록</Text>
      <FlatList
        data={mealRecords}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { padding: 10, backgroundColor: '#eee', borderRadius: 8, marginBottom: 10 },
  addButton: { backgroundColor: '#000', padding: 10, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  recordsTitle: { fontSize: 18, marginVertical: 10, fontWeight: 'bold' },
  recordItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});
