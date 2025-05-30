import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMedication } from '../../context/MedicationContext';

export default function FavoriteMedicationTab() {
  const navigation = useNavigation();
  const route = useRoute();
  const { favorites = [], removeFavorite } = useMedication();
  const passedTimeSlot = route.params?.timeSlot || '';

  const handleRegister = (item) => {
    navigation.navigate('MedicationRegister', {
      selectedMedication: {
        name: item.name || '',
        dosage: item.dosage || '',
        usage: item.usage || '',
      },
      timeSlot: passedTimeSlot,
    });
  };

  const handleRemove = (item) => {
    Alert.alert(
      '즐겨찾기 삭제',
      `${item.name}을(를) 즐겨찾기에서 삭제할까요?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => removeFavorite(item.name),
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>즐겨찾기된 약이 없습니다.</Text>
      ) : (
        favorites.map((item, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            {item.dosage && <Text style={styles.meta}>용량: {item.dosage}</Text>}
            {item.usage && <Text style={styles.meta}>복용법: {item.usage}</Text>}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.registerBtn}
                onPress={() => handleRegister(item)}
              >
                <Text style={styles.btnText}>선택 등록</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleRemove(item)}
              >
                <Text style={styles.btnText}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: '#fff7f4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F05636',
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#151515' },
  meta: { fontSize: 14, color: '#555', marginTop: 6 },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 14,
    justifyContent: 'space-between',
  },
  registerBtn: {
    backgroundColor: '#2678E4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: '#F05636',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 14,
  },
});