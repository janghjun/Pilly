import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import starEmpty from '../../assets/images/star_empty.png';
import starFilled from '../../assets/images/star_filled.png';
import defaultImage from '../../assets/images/med_placeholder.png'; // 기본 박스 이미지

const SearchMedicationTab = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem('favoriteMeds');
    if (stored) setFavorites(JSON.parse(stored));
  };

  const toggleFavorite = async (item) => {
    const exists = favorites.find((f) => f.ITEM_SEQ === item.ITEM_SEQ);
    let updated;
    if (exists) {
      updated = favorites.filter((f) => f.ITEM_SEQ !== item.ITEM_SEQ);
    } else {
      updated = [...favorites, item];
    }
    setFavorites(updated);
    await AsyncStorage.setItem('favoriteMeds', JSON.stringify(updated));
  };

  const normalize = (str: string) =>
    (str || '').toLowerCase().replace(/\s/g, '').replace(/[^\w\u3131-\uD79D]/g, '');

  const handleSearch = async () => {
    setLoading(true);
    let allItems: any[] = [];
    let currentPage = 1;
    const maxPages = 10;

    try {
      while (currentPage <= maxPages) {
        const response = await axios.get(
          'https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService06/getDrugPrdtPrmsnInq06',
          {
            params: {
              serviceKey: '5cWyKWHQGpmhdcKtwApnKT2BrSjLht330TRzM7cFG42eWPEKdkB7b1Z04QGpmSYWUt5T3cOjG6dHSj9V9LH6JQ==',
              type: 'json',
              numOfRows: 100,
              pageNo: currentPage,
            },
          }
        );

        const items = response.data?.body?.items || [];
        if (items.length === 0) break;
        allItems = [...allItems, ...items];
        currentPage++;
      }

      const keyword = normalize(searchTerm);
      const matched = allItems.filter((item) => {
        const name = normalize(item.ITEM_NAME || '');
        const eng = normalize(item.ITEM_ENG_NAME || '');
        const ingr = normalize(item.ITEM_INGR_NAME || '');
        return name.includes(keyword) || eng.includes(keyword) || ingr.includes(keyword);
      });

      setFilteredMedications(matched);
      setPage(1);
    } catch (error) {
      console.error('API 검색 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const paginatedItems = filteredMedications.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const renderMedication = ({ item }) => {
    const isFavorite = favorites.some((f) => f.ITEM_SEQ === item.ITEM_SEQ);

    return (
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image
            source={
              item.BIG_PRDT_IMG_URL
                ? { uri: item.BIG_PRDT_IMG_URL }
                : defaultImage
            }
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => toggleFavorite(item)}
            style={styles.favoriteIconWrapper}
          >
            <Image
              source={isFavorite ? starFilled : starEmpty}
              style={styles.starIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.ITEM_NAME}</Text>
          <Text style={styles.company}>{item.ENTP_NAME}</Text>
          <Text style={styles.ingredient}>{item.ITEM_INGR_NAME}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              navigation.navigate('MedicationRegister', {
                ocrData: {
                  name: item.ITEM_NAME || '',
                  dosage: item.CHART || '',
                  usage: item.ETC_OTC_NAME || '',
                  ingredient: item.ITEM_INGR_NAME || '',
                  company: item.ENTP_NAME || '',
                  image: item.BIG_PRDT_IMG_URL || '',
                },
                timeSlot: route.params?.timeSlot || '',
              })
            }
          >
            <Text style={styles.addButtonText}>+ 추가하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="의약품 이름/영문명/성분명을 입력하세요"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchText}>검색</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#F05636" />
      ) : (
        <FlatList
          data={paginatedItems}
          keyExtractor={(item) => item.ITEM_SEQ}
          renderItem={renderMedication}
          ListEmptyComponent={<Text style={styles.emptyText}>검색 결과가 없습니다.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchRow: { flexDirection: 'row', marginBottom: 12 },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchBtn: {
    marginLeft: 10,
    backgroundColor: '#F05636',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  searchText: { color: '#fff', fontWeight: 'bold' },
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  imageWrapper: {
    width: 80,
    height: 80,
    margin: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  favoriteIconWrapper: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 10,
  },
  starIcon: { width: 18, height: 18 },
  info: { flex: 1, padding: 10, paddingLeft: 0, justifyContent: 'center' },
  name: { fontWeight: 'bold', fontSize: 15, marginBottom: 2 },
  company: { fontSize: 13, color: '#666' },
  ingredient: { fontSize: 12, color: '#999', marginVertical: 2 },
  addButton: {
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  addButtonText: { color: '#fff', fontSize: 12 },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 15,
  },
});

export default SearchMedicationTab;