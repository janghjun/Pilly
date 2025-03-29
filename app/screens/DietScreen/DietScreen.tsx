import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

// 기본 식단 데이터
const foods = [
  { id: '1', name: '햇반 210g', calories: 315, protein: 6, carbs: 77, fat: 5, image: require('../../assets/images/food.png') },
  { id: '2', name: '맛있닭 소프트 닭가슴살 200g', calories: 230, protein: 44, carbs: 4.4, fat: 4.4, image: require('../../assets/images/food.png') },
];

export default function DietScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState(foods);
  const [favorites, setFavorites] = useState([]);
  const [image, setImage] = useState(null);

  // 식단 검색 함수
  const handleSearch = () => {
    const result = foods.filter(food => food.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredFoods(result);
  };

  // 음식 클릭 시 상세 화면으로 이동
  const handleFoodPress = (food) => {
    navigation.navigate('FoodDetail', { food });
  };

  // 음식 사진 첨부 함수
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // 즐겨찾기 추가/삭제 함수
  const toggleFavorite = (food) => {
    if (favorites.includes(food)) {
      setFavorites(favorites.filter(item => item !== food));
    } else {
      setFavorites([...favorites, food]);
    }
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

      {/* 음식 리스트 */}
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.foodItem} onPress={() => handleFoodPress(item)}>
            <Image source={item.image} style={styles.foodImage} />
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <Text style={styles.favoriteButton}>
                {favorites.includes(item) ? '❤️ 즐겨찾기 취소' : '🤍 즐겨찾기'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* 사진 첨부 기능 */}
      <TouchableOpacity onPress={handlePickImage} style={styles.pickImageButton}>
        <Text style={styles.pickImageButtonText}>음식 사진 첨부하기</Text>
      </TouchableOpacity>

      {/* 선택한 이미지 미리보기 */}
      {image && <Image source={{ uri: image }} style={styles.previewImage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f8f8' },
  input: { padding: 10, backgroundColor: '#eee', borderRadius: 8, marginBottom: 10 },
  searchButton: { backgroundColor: '#000', padding: 10, borderRadius: 8, marginBottom: 10 },
  searchButtonText: { color: '#fff', fontWeight: 'bold' },
  foodItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#fff', padding: 12, borderRadius: 8 },
  foodImage: { width: 50, height: 50, marginRight: 12 },
  favoriteButton: { color: 'blue', marginTop: 5 },
  pickImageButton: { backgroundColor: '#000', padding: 12, borderRadius: 8, marginTop: 20 },
  pickImageButtonText: { color: '#fff', fontWeight: 'bold' },
  previewImage: { width: 200, height: 200, marginTop: 10 },
});
