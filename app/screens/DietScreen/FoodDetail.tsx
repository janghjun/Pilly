import React from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';

export default function FoodDetail({ route, navigation }) {
  const { food } = route.params;

  const handleAddToMeal = () => {
    // 식사에 추가하는 로직 (예: 백엔드 연동 시, 식사 기록에 추가)
    Alert.alert(`${food.name}이 식사에 추가되었습니다!`);
    navigation.goBack(); // 이전 화면으로 돌아가기
  };

  return (
    <View style={styles.container}>
      <Image source={food.image} style={styles.foodImage} />
      <Text style={styles.foodName}>{food.name}</Text>
      <Text style={styles.foodDetails}>칼로리: {food.calories}kcal</Text>
      <Text style={styles.foodDetails}>단백질: {food.protein}g</Text>
      <Text style={styles.foodDetails}>탄수화물: {food.carbs}g</Text>
      <Text style={styles.foodDetails}>지방: {food.fat}g</Text>

      <Button title="식사에 추가" onPress={handleAddToMeal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  foodImage: { width: 150, height: 150, marginBottom: 16 },
  foodName: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  foodDetails: { fontSize: 16, marginBottom: 8, color: '#555' },
});
