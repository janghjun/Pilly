import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import SearchExerciseTab from './ExerciseSearchTab';
import FavoriteExerciseTab from './ExerciseFavoritesTab';
import ManualExerciseTab from './ExerciseManualTab'; // 명확한 네이밍

export default function ExerciseSearchScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = useState<'search' | 'favorite' | 'manual'>('search');

  const renderTabContent = () => {
    switch (tab) {
      case 'search':
        return <SearchExerciseTab />;
      case 'favorite':
        return <FavoriteExerciseTab />;
      case 'manual':
        return <ManualExerciseTab />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#FB6B5B" />
            <Text style={styles.backText}>홈</Text>
          </TouchableOpacity>
        </View>

        {/* 탭 선택 */}
        <View style={styles.tabGroup}>
          {[
            { key: 'search', label: '검색' },
            { key: 'favorite', label: '즐겨찾기' },
            { key: 'manual', label: '직접등록' },
          ].map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.tabBtn, tab === t.key && styles.activeTabBtn]}
              onPress={() => setTab(t.key as typeof tab)}
            >
              <Text style={tab === t.key ? styles.activeTabText : styles.tabText}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 탭 콘텐츠 */}
        <View style={styles.tabContent}>{renderTabContent()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    marginLeft: 4,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  tabGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E0E7FF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTabBtn: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    color: '#555',
    fontWeight: '500',
    fontSize: 15,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabContent: {
    flex: 1,
  },
});