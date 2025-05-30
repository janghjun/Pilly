import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Alert, SafeAreaView, Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMedication } from '../../context/MedicationContext';
import uuid from 'react-native-uuid';

export default function MedicationRegisterScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addMedicine, addFavorite, removeFavorite, isFavorite } = useMedication();

  const selected = route.params?.selectedMedication || {};
  const passedTimeSlot = route.params?.timeSlot;
  const ocrData = route.params?.ocrData;

  const [name, setName] = useState(ocrData?.name || selected.name || '');
  const [type, setType] = useState('의약품');
  const [dosage, setDosage] = useState(selected.dosage || '');
  const [usage, setUsage] = useState(selected.usage || '');
  const [times, setTimes] = useState([]);
  const [memo, setMemo] = useState('');
  const [favorite, setFavorite] = useState(false);

  const timeOptions = ['아침', '점심', '저녁', '자기 전'];

  useEffect(() => {
    if (passedTimeSlot && timeOptions.includes(passedTimeSlot)) {
      setTimes([passedTimeSlot]);
    }
  }, [passedTimeSlot]);

  useEffect(() => {
    if (name) {
      setFavorite(isFavorite(name));
    }
  }, [name]);

  const toggleTime = (t: string) => {
    setTimes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const toggleFavorite = () => {
    if (!name.trim()) {
      Alert.alert('오류', '약 이름을 입력한 후 즐겨찾기를 설정할 수 있습니다.');
      return;
    }

    if (favorite) {
      removeFavorite(name);
    } else {
      addFavorite({ name, dosage, usage });
    }
    setFavorite(!favorite);
  };

  const handleSubmit = () => {
    if (!name.trim() || times.length === 0) {
      Alert.alert('입력 오류', '약 이름과 복약 시간은 필수입니다.');
      return;
    }

    try {
      const newMed = {
        id: uuid.v4(),
        name: name.trim(),
        type,
        dosage: dosage.trim(),
        usage: usage.trim(),
        times,
        memo: memo.trim(),
        checked: false,
        createdAt: new Date().toISOString(),
      };

      const date = new Date().toISOString().split('T')[0];
      addMedicine(date, newMed);

      Alert.alert('등록 완료', '복약 정보가 저장되었습니다.');
      navigation.popToTop(); // UX 개선
    } catch (e) {
      Alert.alert('에러', '저장 중 문제가 발생했습니다.');
      console.error('Save error:', e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {(ocrData || Object.keys(selected).length > 0) && (
          <View style={styles.ocrBanner}>
            <Text style={styles.ocrBannerText}>
              {ocrData ? 'OCR에서 추출한 정보를 불러왔습니다.' : '검색한 약품 정보를 불러왔습니다. 확인 후 수정해주세요.'}
            </Text>
          </View>
        )}

        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backBtn}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>복약 정보 입력</Text>
          <TouchableOpacity onPress={toggleFavorite} style={{ marginLeft: 'auto' }}>
            <Image
              source={
                favorite
                  ? require('../../assets/images/star_filled.png')
                  : require('../../assets/images/star_empty.png')
              }
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>약 이름 *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="예: 타이레놀"
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>약 종류</Text>
          <View style={styles.row}>
            {['의약품', '영양제'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.chip, type === t && styles.chipSelected]}
                onPress={() => setType(t)}
              >
                <Text style={type === t ? styles.chipTextSelected : styles.chipText}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>용량</Text>
          <TextInput
            style={styles.input}
            value={dosage}
            onChangeText={setDosage}
            placeholder="예: 500mg"
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>복용 방법</Text>
          <TextInput
            style={styles.input}
            value={usage}
            onChangeText={setUsage}
            placeholder="예: 식후 30분"
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>복약 시간 *</Text>
          <View style={styles.row}>
            {timeOptions.map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.chip, times.includes(t) && styles.chipSelected]}
                onPress={() => toggleTime(t)}
              >
                <Text style={times.includes(t) ? styles.chipTextSelected : styles.chipText}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>메모</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={memo}
            onChangeText={setMemo}
            placeholder="예: 감기 심할 때만 복용"
            multiline
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>저장하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { fontSize: 20, color: '#F05636', marginRight: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#151515' },
  group: { marginBottom: 20 },
  label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    marginTop: 8,
  },
  chipSelected: { backgroundColor: '#F05636', borderColor: '#F05636' },
  chipText: { color: '#333', fontSize: 14 },
  chipTextSelected: { color: '#fff', fontWeight: 'bold' },
  button: {
    backgroundColor: '#2678E4',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  ocrBanner: {
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  ocrBannerText: {
    color: '#92400e',
    fontSize: 13,
    textAlign: 'center',
  },
});