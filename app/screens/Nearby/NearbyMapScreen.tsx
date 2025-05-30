import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, Alert, Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

const KAKAO_API_KEY = 'YOUR_KAKAO_API_KEY';

const generateMapHtml = (lat, lng, keyword) => `
<!DOCTYPE html>
<html>
  <head><meta charset="utf-8" /><style>html, body, #map {margin:0;height:100%;}</style>
  <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services"></script>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(${lat}, ${lng}), level: 4 });
      var ps = new kakao.maps.services.Places();
      ps.keywordSearch("${keyword}", (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          data.forEach(place => {
            new kakao.maps.Marker({
              map,
              position: new kakao.maps.LatLng(place.y, place.x),
            });
          });
        }
      });
    </script>
  </body>
</html>`;

export default function NearbyMapScreen() {
  const [location, setLocation] = useState(null);
  const [keyword, setKeyword] = useState('헬스장');
  const [input, setInput] = useState('');
  const [mapHtml, setMapHtml] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState('');

  const categories = ['헬스장', '병원 및 약국', '마트'];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } else {
        Alert.alert('위치 권한이 필요합니다.');
      }
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const html = generateMapHtml(location.latitude, location.longitude, keyword);
      setMapHtml(html);
    }
  }, [location, keyword]);

  const handleSearch = () => {
    if (input.trim()) {
      setKeyword(input.trim());
      setInput('');
    }
  };

  const addFavorite = () => {
    if (keyword && !favorites.includes(keyword)) {
      setFavorites([...favorites, keyword]);
    }
  };

  const removeFavorite = (item) => {
    setFavorites(favorites.filter(fav => fav !== item));
  };

  const showDetail = (place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="장소를 입력하세요"
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchText}>검색</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        {categories.map((label) => (
          <TouchableOpacity
            key={label}
            style={[styles.categoryBtn, keyword === label && styles.categoryActive]}
            onPress={() => setKeyword(label)}
            onLongPress={() => showDetail(label)}
          >
            <Text style={[styles.categoryText, keyword === label && styles.activeText]}>{label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.favoriteBtn} onPress={addFavorite}>
          <Text style={styles.favoriteText}>⭐ 즐겨찾기</Text>
        </TouchableOpacity>
      </ScrollView>

      <WebView originWhitelist={['*']} source={{ html: mapHtml }} style={{ flex: 1 }} javaScriptEnabled />

      {favorites.length > 0 && (
        <View style={styles.favoritesContainer}>
          <Text style={styles.favTitle}>⭐ 즐겨찾기</Text>
          {favorites.map((f, i) => (
            <View key={i} style={styles.favRow}>
              <TouchableOpacity onPress={() => setKeyword(f)}>
                <Text style={styles.favItem}>{f}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeFavorite(f)}>
                <Text style={styles.removeBtn}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selectedPlace}</Text>
            <Text style={styles.modalText}>이 장소에 대한 상세 정보를 구성할 수 있습니다.</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 8,
    height: 44,
    backgroundColor: '#f9f9f9',
  },
  searchBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 10,
    height: 44,
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  categoryScroll: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryActive: {
    backgroundColor: '#2563eb',
  },
  categoryText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
  },
  activeText: {
    color: '#fff',
  },
  favoriteBtn: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  favoriteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  favoritesContainer: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 14,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 6,
  },
  favTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 6,
  },
  favRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favItem: {
    paddingVertical: 4,
    fontSize: 14,
    color: '#2563eb',
  },
  removeBtn: {
    fontSize: 14,
    color: '#999',
    marginLeft: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalClose: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});