import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NutritionAnalysisScreen({ route }) {
  const { food } = route.params;

  const analyzeNutrition = () => {
    // 더 정교한 분석을 추가할 수 있습니다.
    return `단백질: ${food.protein}g, 칼로리: ${food.calories}kcal`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>영양소 분석</Text>
      <Text style={styles.analysisResult}>{analyzeNutrition()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  analysisResult: { fontSize: 18, color: '#333' },
});
