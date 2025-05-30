// FavoriteFoodTab.tsx
import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Image, Alert, Modal
} from 'react-native';
import { useDiet } from '../../context/DietContext';

const checkbox_checked = require('../../assets/images/checkbox_checked.png');
const checkbox_unchecked = require('../../assets/images/checkbox_unchecked.png');
const star_filled = require('../../assets/images/star_filled.png');
const star_empty = require('../../assets/images/star_empty.png');

export default function FavoriteFoodTab({ time, date }) {
  const {
    favoriteFoods,
    addFood,
    removeFavoriteFood
  } = useDiet();

  const [selectedItems, setSelectedItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

  useEffect(() => {
    // reset selection on tab switch
    setSelectedItems({});
  }, [favoriteFoods]);

  const toggleSelect = (id) => {
    setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    const selected = favoriteFoods.filter(item => selectedItems[item.id]);
    if (selected.length === 0) {
      Alert.alert('선택된 항목이 없습니다.');
      return;
    }

    selected.forEach(item => {
      addFood(date, time, item);
    });

    Alert.alert('등록 완료', `${selected.length}개의 항목이 등록되었습니다.`);
    setSelectedItems({});
  };

  const openDetail = (item) => {
    setDetailItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {favoriteFoods.length === 0 ? (
          <Text style={styles.empty}>즐겨찾기된 음식이 없습니다.</Text>
        ) : (
          favoriteFoods.map((item) => (
            <TouchableOpacity
              key={item.id}
              onLongPress={() => openDetail(item)}
              delayLongPress={300}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => removeFavoriteFood(item.name)}>
                    <Image source={star_filled} style={styles.starIcon} />
                  </TouchableOpacity>
                  <Text style={styles.foodName}>{item.name}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleSelect(item.id)}>
                  <Image
                    source={selectedItems[item.id] ? checkbox_checked : checkbox_unchecked}
                    style={styles.checkboxIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.detail}>칼로리: {item.kcal || '-'} kcal</Text>
              <Text style={styles.detail}>탄수화물: {item.carb || '-'} g</Text>
              <Text style={styles.detail}>단백질: {item.protein || '-'} g</Text>
              <Text style={styles.detail}>지방: {item.fat || '-'} g</Text>
              <Text style={styles.detail}>나트륨: {item.sodium || '-'} mg</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {Object.values(selectedItems).some(Boolean) && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {Object.values(selectedItems).filter(v => v).length}개 항목 등록
          </Text>
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            {detailItem && (
              <>
                <Text style={styles.modalTitle}>{detailItem.name}</Text>
                <Text>칼로리: {detailItem.kcal} kcal</Text>
                <Text>탄수화물: {detailItem.carb} g</Text>
                <Text>단백질: {detailItem.protein} g</Text>
                <Text>지방: {detailItem.fat} g</Text>
                <Text>나트륨: {detailItem.sodium} mg</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  card: {
    backgroundColor: '#f9f9f9', borderRadius: 10, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: '#ddd'
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 4
  },
  foodName: { fontSize: 16, fontWeight: 'bold', marginLeft: 6 },
  detail: { fontSize: 14, color: '#555', marginTop: 2 },
  submitButton: {
    backgroundColor: '#f05636', padding: 16, borderRadius: 10,
    alignItems: 'center', marginTop: 10
  },
  submitText: { color: '#fff', fontWeight: 'bold' },
  starIcon: { width: 22, height: 22 },
  checkboxIcon: { width: 22, height: 22 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 15, color: '#888' },
  modalOverlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff', padding: 20, borderRadius: 10,
    width: '80%', alignItems: 'center'
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 }
});