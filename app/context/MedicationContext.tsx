import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const MedicationContext = createContext();

export const MedicationProvider = ({ children }) => {
  const [medications, setMedications] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadData();
    loadFavorites();
  }, []);

  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem('medications');
      if (stored) setMedications(JSON.parse(stored));
      const savedSymptoms = await AsyncStorage.getItem('symptoms');
      if (savedSymptoms) setSymptoms(JSON.parse(savedSymptoms));
    } catch (e) {
      console.error('복약 데이터 불러오기 실패:', e);
    }
  };

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favoriteMeds');
      if (stored) setFavorites(JSON.parse(stored));
    } catch (e) {
      console.error('즐겨찾기 불러오기 실패:', e);
    }
  };

  const saveData = async (data) => {
    try {
      setMedications(data);
      await AsyncStorage.setItem('medications', JSON.stringify(data));
    } catch (e) {
      console.error('복약 데이터 저장 실패:', e);
    }
  };

  const addMedicine = async (date, item) => {
    const newItem = {
      id: uuid.v4(),
      createdAt: new Date().toISOString(),
      checked: false,
      ...item,
    };
    const updated = {
      ...medications,
      [date]: [...(medications[date] || []), newItem],
    };
    await saveData(updated);
  };

  const updateMedicine = async (date, id, updates) => {
    const updated = {
      ...medications,
      [date]: (medications[date] || []).map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    };
    await saveData(updated);
  };

  const deleteMedicine = async (date, id) => {
    const filtered = (medications[date] || []).filter((m) => m.id !== id);
    const updated = { ...medications };
    if (filtered.length > 0) {
      updated[date] = filtered;
    } else {
      delete updated[date]; // ✅ 날짜별 데이터가 비면 해당 날짜 삭제
    }
    await saveData(updated);
  };

  const toggleChecked = async (date, id) => {
    const updated = {
      ...medications,
      [date]: (medications[date] || []).map((m) =>
        m.id === id ? { ...m, checked: !m.checked } : m
      ),
    };
    await saveData(updated);
  };

  const getMedicineByDate = (date) => medications[date] || [];

  const getMedicineByRange = (startDate, endDate) => {
    const result = [];
    const current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      const key = current.toISOString().split('T')[0];
      if (medications[key]) {
        result.push(...medications[key]);
      }
      current.setDate(current.getDate() + 1);
    }

    return result;
  };

  const recommendSupplements = (inputSymptoms) => {
    const recommendations = [];
    inputSymptoms.forEach((sym) => {
      if (sym.includes('피로')) recommendations.push('비타민B군');
      if (sym.includes('면역')) recommendations.push('아연');
      if (sym.includes('소화')) recommendations.push('프로바이오틱스');
    });
    return [...new Set(recommendations)];
  };

  const addFavorite = async (item) => {
    const updated = [...favorites, item];
    await saveFavorites(updated);
  };

  const removeFavorite = async (name) => {
    const updated = favorites.filter((f) => f.name !== name);
    await saveFavorites(updated);
  };

  const isFavorite = (name) => {
    return favorites.some((f) => f.name === name);
  };

  const saveSymptoms = async (data) => {
    try {
      setSymptoms(data);
      await AsyncStorage.setItem('symptoms', JSON.stringify(data));
    } catch (e) {
      console.error('증상 저장 실패:', e);
    }
  };

  const saveFavorites = async (data) => {
    try {
      setFavorites(data);
      await AsyncStorage.setItem('favoriteMeds', JSON.stringify(data));
    } catch (e) {
      console.error('즐겨찾기 저장 실패:', e);
    }
  };

  return (
    <MedicationContext.Provider
      value={{
        medications,
        symptoms,
        favorites,
        setSymptoms: saveSymptoms,
        addMedicine,
        updateMedicine,
        deleteMedicine,
        toggleChecked,
        getMedicineByDate,
        getMedicineByRange,
        recommendSupplements,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedication = () => useContext(MedicationContext);