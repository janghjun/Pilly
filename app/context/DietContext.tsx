import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const DietContext = createContext();

export const DietProvider = ({ children }) => {
  const [meals, setMeals] = useState({});
  const [manualFoods, setManualFoods] = useState([]);
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [goals, setGoalsState] = useState({
    kcal: 2000,
    carb: 220,
    protein: 140,
    fat: 80,
  });

  useEffect(() => {
    loadMeals();
    loadManualFoods();
    loadFavoriteFoods();
    loadGoals();
  }, []);

  const loadMeals = async () => {
    try {
      const saved = await AsyncStorage.getItem('meals');
      if (saved) setMeals(JSON.parse(saved));
    } catch (e) {
      console.error('loadMeals error:', e);
    }
  };

  const loadManualFoods = async () => {
    try {
      const saved = await AsyncStorage.getItem('manualFoods');
      if (saved) setManualFoods(JSON.parse(saved));
    } catch (e) {
      console.error('loadManualFoods error:', e);
    }
  };

  const loadFavoriteFoods = async () => {
    try {
      const saved = await AsyncStorage.getItem('favoriteFoods');
      if (saved) setFavoriteFoods(JSON.parse(saved));
    } catch (e) {
      console.error('loadFavoriteFoods error:', e);
    }
  };

  const loadGoals = async () => {
    try {
      const saved = await AsyncStorage.getItem('dietGoals');
      if (saved) setGoalsState(JSON.parse(saved));
    } catch (e) {
      console.error('loadGoals error:', e);
    }
  };

  const saveMeals = async (data) => {
    try {
      setMeals(data);
      await AsyncStorage.setItem('meals', JSON.stringify(data));
    } catch (e) {
      console.error('saveMeals error:', e);
    }
  };

  const saveManualFoods = async (data) => {
    try {
      setManualFoods(data);
      await AsyncStorage.setItem('manualFoods', JSON.stringify(data));
    } catch (e) {
      console.error('saveManualFoods error:', e);
    }
  };

  const saveFavoriteFoods = async (data) => {
    try {
      setFavoriteFoods(data);
      await AsyncStorage.setItem('favoriteFoods', JSON.stringify(data));
    } catch (e) {
      console.error('saveFavoriteFoods error:', e);
    }
  };

  const saveGoals = async (data) => {
    try {
      setGoalsState(data);
      await AsyncStorage.setItem('dietGoals', JSON.stringify(data));
    } catch (e) {
      console.error('saveGoals error:', e);
    }
  };

  const addFood = async (dateStr, time, item) => {
    try {
      const requiredKeys = ['name', 'weight', 'kcal', 'carb', 'protein', 'fat', 'sodium'];
      for (const key of requiredKeys) {
        if (!(key in item)) throw new Error(`addFood: ${key} 누락됨`);
      }

      const newItem = {
        id: uuid.v4(),
        createdAt: new Date().toISOString(),
        ...item,
      };

      const updated = {
        ...meals,
        [dateStr]: {
          ...(meals[dateStr] || {}),
          [time]: [...(meals[dateStr]?.[time] || []), newItem],
        },
      };

      await saveMeals(updated);
    } catch (e) {
      console.error('addFood error:', e);
      throw e;
    }
  };

  const addManualFood = async (item) => {
    try {
      const exists = manualFoods.some((f) => f.name === item.name);
      if (exists) return;
      const newItem = {
        id: uuid.v4(),
        createdAt: new Date().toISOString(),
        ...item,
      };
      const updated = [...manualFoods, newItem];
      await saveManualFoods(updated);
    } catch (e) {
      console.error('addManualFood error:', e);
    }
  };

  const addFavoriteFood = async (item) => {
    try {
      const exists = favoriteFoods.some((f) => f.name === item.name);
      if (exists) return;
      const newItem = {
        id: uuid.v4(),
        createdAt: new Date().toISOString(),
        ...item,
      };
      const updated = [...favoriteFoods, newItem];
      await saveFavoriteFoods(updated);
    } catch (e) {
      console.error('addFavoriteFood error:', e);
    }
  };

  const removeFavoriteFood = async (name) => {
    try {
      const updated = favoriteFoods.filter((item) => item.name !== name);
      await saveFavoriteFoods(updated);
    } catch (e) {
      console.error('removeFavoriteFood error:', e);
    }
  };

  const updateFood = async (dateStr, time, id, updatedItem) => {
    try {
      const updatedList = meals[dateStr]?.[time]?.map((f) =>
        f.id === id ? { ...f, ...updatedItem } : f
      ) || [];

      const updated = {
        ...meals,
        [dateStr]: {
          ...meals[dateStr],
          [time]: updatedList,
        },
      };

      await saveMeals(updated);
    } catch (e) {
      console.error('updateFood error:', e);
    }
  };

  const deleteFood = async (dateStr, time, id) => {
    try {
      const filtered = meals[dateStr]?.[time]?.filter((f) => f.id !== id) || [];

      const updated = {
        ...meals,
        [dateStr]: {
          ...meals[dateStr],
          [time]: filtered,
        },
      };

      await saveMeals(updated);
    } catch (e) {
      console.error('deleteFood error:', e);
    }
  };

  const getMealsByDate = (dateStr) => meals[dateStr] || {};
  const getFoodsByDateAndTime = (dateStr, time) => meals[dateStr]?.[time] || [];

  return (
    <DietContext.Provider
      value={{
        meals,
        manualFoods,
        favoriteFoods,
        goals,
        setGoals: saveGoals,
        addFood,
        addManualFood,
        addFavoriteFood,
        removeFavoriteFood,
        updateFood,
        deleteFood,
        getMealsByDate,
        getFoodsByDateAndTime,
        setManualFoods,
      }}
    >
      {children}
    </DietContext.Provider>
  );
};

export const useDiet = () => useContext(DietContext);