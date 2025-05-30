import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useExercise } from '../../context/ExerciseContext';

export default function ExerciseFavoritesTab() {
  const { exercises, addExercise } = useExercise();
  const favorites = exercises.filter(e => e.favorite);

  const handleAdd = async (item) => {
    const today = new Date().toISOString().split('T')[0];

    const data = {
      exerciseId: Date.now().toString(),
      name: item.name,
      description: item.description ?? '',
      category: item.category ?? '일반운동',
      duration: item.duration ?? 30,
      kcal: item.kcal ?? 100,
    };

    await addExercise(today, data);
    Alert.alert('운동 기록 완료', `${item.name} 운동이 저장되었습니다.`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleAdd(item)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.kcal}>{item.kcal ?? 0} kcal / {item.duration ?? 0}분</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>즐겨찾기된 운동이 없습니다.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  item: {
    padding: 16,
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  kcal: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 14,
  },
});