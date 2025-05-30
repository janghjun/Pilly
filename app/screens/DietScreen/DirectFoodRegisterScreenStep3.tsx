import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DirectFoodRegisterScreenStep3() {
  const navigation = useNavigation();
  const route = useRoute();
  const { mealType, name, weight, editItem = null } = route.params || {};

  const [nutrition, setNutrition] = useState({
    kcal: '',
    carb: '',
    protein: '',
    fat: '',
    sodium: '',
  });

  useEffect(() => {
    if (editItem) {
      setNutrition({
        kcal: editItem.kcal?.toString() || '',
        carb: editItem.carb?.toString() || '',
        protein: editItem.protein?.toString() || '',
        fat: editItem.fat?.toString() || '',
        sodium: editItem.sodium?.toString() || '',
      });
    }
  }, [editItem]);

  const handleChange = (field, value) => {
    setNutrition(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const { kcal, carb, protein, fat, sodium } = nutrition;

    if (!weight || !kcal.trim()) {
      Alert.alert('입력 오류', '칼로리는 필수입니다.');
      return;
    }

    const totalNutrition = {
      weight: parseFloat(weight) || 0, // Step2에서 받은 값
      kcal: parseFloat(kcal) || 0,
      carb: parseFloat(carb) || 0,
      protein: parseFloat(protein) || 0,
      fat: parseFloat(fat) || 0,
      sodium: parseFloat(sodium) || 0,
    };

    navigation.navigate('Step3NutritionInfoScreen', {
      ingredients: [],
      totalNutrition,
      name: name || '직접입력',
      mealType,
      editItem,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.step}>2/2</Text>
        <Text style={styles.title}>영양 정보를{"\n"}입력해주세요</Text>

        <View style={styles.inputRow}>
          <Text style={styles.label}>칼로리(kcal)</Text>
          <TextInput
            style={styles.input}
            placeholder="예: 250"
            keyboardType="numeric"
            value={nutrition.kcal}
            onChangeText={(text) => handleChange('kcal', text)}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>탄수화물(g)</Text>
          <TextInput
            style={styles.input}
            placeholder="예: 30"
            keyboardType="numeric"
            value={nutrition.carb}
            onChangeText={(text) => handleChange('carb', text)}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>단백질(g)</Text>
          <TextInput
            style={styles.input}
            placeholder="예: 20"
            keyboardType="numeric"
            value={nutrition.protein}
            onChangeText={(text) => handleChange('protein', text)}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>지방(g)</Text>
          <TextInput
            style={styles.input}
            placeholder="예: 10"
            keyboardType="numeric"
            value={nutrition.fat}
            onChangeText={(text) => handleChange('fat', text)}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>나트륨(mg)</Text>
          <TextInput
            style={styles.input}
            placeholder="예: 500"
            keyboardType="numeric"
            value={nutrition.sodium}
            onChangeText={(text) => handleChange('sodium', text)}
          />
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>등록 완료</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>이 전</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F7FA' },
  container: { flexGrow: 1, padding: 24 },
  step: { alignSelf: 'flex-end', color: '#8FA1C3', fontWeight: '600' },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 24, color: '#1A1A1A', lineHeight: 32 },
  inputRow: { marginBottom: 16 },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 6 },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  nextBtn: {
    marginTop: 20,
    backgroundColor: '#2678E4',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  backBtn: {
    marginTop: 12,
    backgroundColor: '#F05636',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  backBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});