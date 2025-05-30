
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoalSettingScreen() {
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('goals');
      if (stored) {
        const goal = JSON.parse(stored);
        setCalories(goal.calories);
        setCarbs(goal.carbs);
        setProtein(goal.protein);
        setFat(goal.fat);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (!calories || !carbs || !protein || !fat) {
      Alert.alert('오류', '모든 항목을 입력해주세요.');
      return;
    }

    const goal = { calories, carbs, protein, fat };
    await AsyncStorage.setItem('goals', JSON.stringify(goal));
    Alert.alert('저장 완료', '건강 목표가 저장되었습니다.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>🎯 건강 목표 설정</Text>

        <TextInput
          placeholder="하루 섭취 목표 칼로리 (kcal)"
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
          style={styles.input}
        />
        <TextInput
          placeholder="탄수화물 (g)"
          keyboardType="numeric"
          value={carbs}
          onChangeText={setCarbs}
          style={styles.input}
        />
        <TextInput
          placeholder="단백질 (g)"
          keyboardType="numeric"
          value={protein}
          onChangeText={setProtein}
          style={styles.input}
        />
        <TextInput
          placeholder="지방 (g)"
          keyboardType="numeric"
          value={fat}
          onChangeText={setFat}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>목표 저장하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
