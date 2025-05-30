import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useExercise } from '../../context/ExerciseContext';
import { logNotification } from '../../utils/logNotification';

export default function ExerciseRegisterScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addExercise } = useExercise();

  const [form, setForm] = useState({
    name: '',
    part: '가슴',
    sets: '',
    reps: '',
    weight: '',
    duration: '',
  });

  const partList = ['가슴', '등', '하체', '어깨', '복근', '유산소'];

  // ✅ route param에서 자동 입력
  useEffect(() => {
    const selected = route.params?.selectedExercise;
    if (selected) {
      setForm({
        name: selected.name || '',
        part: selected.part || '가슴',
        sets: selected.sets || '',
        reps: selected.reps || '',
        weight: selected.weight || '',
        duration: selected.duration?.toString() || '',
      });
    }
  }, [route.params]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.duration) {
      Alert.alert('입력 오류', '운동명과 시간을 입력해주세요.');
      return;
    }

    const dateKey = new Date().toISOString().split('T')[0];
    const item = {
      name: form.name,
      part: form.part,
      sets: form.sets,
      reps: form.reps,
      weight: form.weight,
      duration: parseFloat(form.duration) || 0,
      kcal: form.part === '유산소' ? 150 : 80,
    };

    try {
      await addExercise(dateKey, item);
      if (item.duration > 0) {
        await logNotification({
          title: `${item.name} 운동 알림`,
          date: dateKey,
          time: '18:00',
          type: '운동',
        });
      }
      Alert.alert('저장 완료', '운동 기록이 저장되었습니다.');
      navigation.goBack();
    } catch (e) {
      Alert.alert('오류', '저장에 실패했습니다.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backBtn}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>운동 기록 입력</Text>
        </View>

        {[
          { label: '운동명 *', key: 'name', placeholder: '예: 벤치프레스' },
          { label: '세트 수', key: 'sets', placeholder: '예: 3' },
          { label: '반복 수', key: 'reps', placeholder: '예: 10' },
          { label: '중량 (kg)', key: 'weight', placeholder: '예: 40' },
          { label: '운동 시간 (분) *', key: 'duration', placeholder: '예: 30' },
        ].map(({ label, key, placeholder }) => (
          <View key={key} style={styles.group}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              value={form[key]}
              onChangeText={(v) => handleChange(key, v)}
              placeholder={placeholder}
              keyboardType={['sets', 'reps', 'weight', 'duration'].includes(key) ? 'numeric' : 'default'}
            />
          </View>
        ))}

        <View style={styles.group}>
          <Text style={styles.label}>운동 부위</Text>
          <View style={styles.row}>
            {partList.map((p) => (
              <TouchableOpacity
                key={p}
                style={[styles.chip, form.part === p && styles.chipSelected]}
                onPress={() => handleChange('part', p)}
              >
                <Text style={form.part === p ? styles.chipTextSelected : styles.chipText}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
          <Text style={styles.saveText}>저장하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  backBtn: { fontSize: 22, marginRight: 12, color: '#2563eb' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  group: { marginBottom: 16 },
  label: { marginBottom: 4, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: { backgroundColor: '#60a5fa' },
  chipText: { color: '#333' },
  chipTextSelected: { color: '#fff', fontWeight: 'bold' },
  saveBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});