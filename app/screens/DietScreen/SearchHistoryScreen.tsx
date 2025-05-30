import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function SearchHistoryScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearch = () => {
    if (searchQuery) {
      setSearchHistory((prev) => [searchQuery, ...prev]);
      setSearchQuery('');
    }
  };

  const handleHistoryItemClick = (query: string) => {
    setSearchQuery(query); // 검색어 클릭 시 검색창에 채워지도록
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="식품명으로 검색"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>검색</Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>검색 기록</Text>
      <FlatList
        data={searchHistory}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleHistoryItemClick(item)} style={styles.historyItem}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { padding: 10, backgroundColor: '#eee', borderRadius: 8, marginBottom: 10 },
  searchButton: { backgroundColor: '#000', padding: 10, borderRadius: 8, alignItems: 'center' },
  searchButtonText: { color: '#fff', fontWeight: 'bold' },
  historyTitle: { fontSize: 18, marginVertical: 10, fontWeight: 'bold' },
  historyItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});
