import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useExercise } from '../../context/ExerciseContext';

const API_URL =
  'https://api.odcloud.kr/api/15068730/v1/uddi:2dd1a2cb-6030-48a2-980d-c31f0cc18b6c';
const SERVICE_KEY =
  '5cWyKWHQGpmhdcKtwApnKT2BrSjLht330TRzM7cFG42eWPEKdkB7b1Z04QGpmSYWUt5T3cOjG6dHSj9V9LH6JQ==';

export default function ExerciseSearchTab() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addExercise } = useExercise();

  const searchExercise = async () => {
    if (!query.trim()) {
      Alert.alert('입력 필요', '운동명을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}?page=1&perPage=100&serviceKey=${encodeURIComponent(SERVICE_KEY)}`
      );
      const data = await res.json();
      const filtered = data.data.filter((item) =>
        item['운동명'].toLowerCase().includes(query.trim().toLowerCase())
      );
      setResults(filtered);
    } catch (err) {
      console.error('운동 검색 오류:', err);
      Alert.alert('오류', '운동 정보를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (item) => {
    const name = item['운동명'];
    const description = item['운동설명'] || '설명 없음';
    const MET = parseFloat(item['MET계수']) || 1.0;

    const defaultDuration = 30; // 분
    const defaultWeight = 60; // 사용자 체중 반영 가능
    const kcal = Math.round((MET * defaultWeight * defaultDuration) / 60);

    const exerciseData = {
      exerciseId: Date.now().toString(),
      name,
      description,
      category: '일반운동',
      duration: defaultDuration,
      kcal,
    };

    const dateStr = new Date().toISOString().split('T')[0];
    await addExercise(dateStr, exerciseData);

    Alert.alert('운동 저장 완료', `${name} 운동이 기록되었습니다.`);
  };

  const highlightMatch = (text: string) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return <Text style={styles.name}>{text}</Text>;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <Text style={styles.name}>
        {before}
        <Text style={styles.highlight}>{match}</Text>
        {after}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchExercise}
        placeholder="운동명을 입력하세요"
        style={styles.input}
        returnKeyType="search"
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item, idx) => `${item['운동명']}_${idx}`}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleAdd(item)}>
              {highlightMatch(item['운동명'])}
              <Text style={styles.category}>
                MET 계수: {item['MET계수'] ?? 'N/A'}
              </Text>
              <Text style={styles.description}>
                {item['운동설명']?.slice(0, 60) ?? '설명 없음'}...
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        query && (
          <Text style={styles.empty}>
            "{query}"에 대한 검색 결과가 없습니다.
          </Text>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  item: {
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  highlight: {
    backgroundColor: '#fde047',
  },
  category: {
    fontSize: 14,
    color: '#2563eb',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#555',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
  },
});