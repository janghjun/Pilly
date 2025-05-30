import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useExercise } from '../../context/ExerciseContext';
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExerciseDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { exercise } = route.params || {};
  const { records, toggleFavorite } = useExercise();
  const [tab, setTab] = useState<'설명' | '통계'>('설명');

  if (!exercise) return <Text style={styles.emptyText}>운동 정보를 찾을 수 없습니다.</Text>;

  const filtered = useMemo(
    () => records.filter(r => r.name === exercise.name),
    [records, exercise]
  );

  const total = filtered.length;
  const completed = filtered.filter(r => r.checked).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const topDates = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.forEach(r => {
      map[r.date] = (map[r.date] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([date, count]) => ({ date, count }));
  }, [filtered]);

  const handleAddToRoutine = () => {
    // 실제 루틴 추가 동작 필요 시 여기에 구현
    Alert.alert('루틴에 추가됨', `${exercise.name}이(가) 루틴에 추가되었습니다.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backBtn}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>운동 상세</Text>
        </View>

        {/* Thumbnail */}
        <Image
          source={{
            uri:
              exercise.thumbnail && exercise.thumbnail.startsWith('http')
                ? exercise.thumbnail
                : 'https://via.placeholder.com/300x180?text=Exercise',
          }}
          style={styles.image}
        />

        {/* Tabs */}
        <View style={styles.tabRow}>
          {['설명', '통계'].map(label => (
            <TouchableOpacity
              key={label}
              style={[styles.tabButton, tab === label && styles.activeTab]}
              onPress={() => setTab(label as '설명' | '통계')}
            >
              <Text style={tab === label ? styles.activeTabText : styles.tabText}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 설명 탭 */}
        {tab === '설명' && (
          <View style={styles.card}>
            <View style={styles.titleRow}>
              <Text style={styles.exerciseTitle}>{exercise.name}</Text>
              <TouchableOpacity onPress={() => toggleFavorite(exercise.id)}>
                <Image
                  source={
                    exercise.favorite
                      ? require('../../assets/images/star_filled.png')
                      : require('../../assets/images/star_empty.png')
                  }
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.part}>운동 부위: {exercise.part}</Text>
            <Text style={styles.desc}>
              이 운동은 {exercise.part} 부위를 강화하는 데 효과적인 운동입니다.
              정확한 자세로 반복 수행하는 것이 중요합니다.
            </Text>
          </View>
        )}

        {/* 통계 탭 */}
        {tab === '통계' && (
          <View style={styles.card}>
            <Text style={styles.statLabel}>
              총 수행 <Text style={styles.strong}>{total}</Text>회 중{' '}
              <Text style={styles.strong}>{completed}</Text>회 완료
            </Text>
            <View style={styles.progressCard}>
              <Progress.Bar
                progress={percent / 100}
                width={null}
                height={18}
                borderRadius={8}
                color="#3A70FF"
                unfilledColor="#eee"
              />
              <Text style={styles.percentText}>{percent}%</Text>
            </View>

            <Text style={styles.sectionTitle}>자주 수행한 날짜</Text>
            {topDates.length > 0 ? (
              topDates.map((item, idx) => (
                <Text key={idx} style={styles.medItem}>
                  {idx + 1}. {item.date} ({item.count}회)
                </Text>
              ))
            ) : (
              <Text style={styles.emptyText}>운동 기록이 없습니다.</Text>
            )}
          </View>
        )}

        {/* 루틴 추가 버튼 */}
        <TouchableOpacity style={styles.button} onPress={handleAddToRoutine}>
          <Text style={styles.buttonText}>+ 루틴에 추가하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { padding: 20, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  backBtn: { fontSize: 22, color: '#F05636', marginRight: 6 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#2678E4' },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 20 },
  tabRow: { flexDirection: 'row', marginBottom: 16 },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 8,
  },
  activeTab: { backgroundColor: '#2678E4' },
  tabText: { color: '#888', fontWeight: '500' },
  activeTabText: { color: '#fff', fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseTitle: { fontSize: 22, fontWeight: '700', color: '#151515' },
  starIcon: { width: 24, height: 24, tintColor: '#F05636' },
  part: { fontSize: 15, color: '#666', marginBottom: 16 },
  desc: { fontSize: 14, color: '#444', lineHeight: 22 },
  statLabel: { fontSize: 14, color: '#333', marginBottom: 10 },
  strong: { fontWeight: '700', color: '#3A70FF' },
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  percentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A70FF',
    width: 50,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#111',
  },
  medItem: { fontSize: 14, marginBottom: 6, color: '#444' },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2678E4',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});