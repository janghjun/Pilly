import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface ExerciseItem {
  id: string;
  name: string;
  part: string;
  date: string;
  duration: number;
  sets?: string;
  reps?: string;
  weight?: string;
  favorite?: boolean;
}

interface ExerciseContextType {
  addRecord: (record: Omit<ExerciseItem, 'id'> & Partial<Pick<ExerciseItem, 'id'>>) => void;
  toggleFavorite: (exerciseId: string) => void;
  getExerciseByDate: (date: string) => ExerciseItem[];
  getExerciseByRange: (startDate: string, endDate: string) => ExerciseItem[];
  getExerciseByPart: (date: string, part: string) => ExerciseItem[];
  records: ExerciseItem[];
  exercises: ExerciseItem[];
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export function ExerciseProvider({ children }: { children: React.ReactNode }) {
  const [exerciseData, setExerciseData] = useState<Record<string, ExerciseItem[]>>({});

  // 🔄 AsyncStorage 불러오기
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('exerciseData');
        if (saved) setExerciseData(JSON.parse(saved));
      } catch (e) {
        console.error('운동 데이터 로드 실패', e);
      }
    })();
  }, []);

  // 💾 상태 변경 시 저장
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('exerciseData', JSON.stringify(exerciseData));
      } catch (e) {
        console.error('운동 데이터 저장 실패', e);
      }
    })();
  }, [exerciseData]);

  // ✅ 운동 기록 추가
  const addRecord = (record: Omit<ExerciseItem, 'id'> & Partial<Pick<ExerciseItem, 'id'>>) => {
    const id = record.id || uuid.v4().toString();
    const dateKey = record.date;
    const newItem: ExerciseItem = { ...record, id } as ExerciseItem;

    setExerciseData(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newItem],
    }));
  };

  // ⭐ 즐겨찾기 토글
  const toggleFavorite = (exerciseId: string) => {
    setExerciseData(prev => {
      const newData: Record<string, ExerciseItem[]> = {};
      for (const date in prev) {
        newData[date] = prev[date].map(item =>
          item.id === exerciseId ? { ...item, favorite: !item.favorite } : item
        );
      }
      return newData;
    });
  };

  // 📅 날짜별 조회
  const getExerciseByDate = (date: string) => exerciseData[date] || [];

  // 📆 날짜 범위 조회
  const getExerciseByRange = (startDate: string, endDate: string) => {
    const result: ExerciseItem[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split('T')[0];
      if (exerciseData[key]) result.push(...exerciseData[key]);
    }
    return result;
  };

  // 🔍 특정 날짜 + 부위 필터
  const getExerciseByPart = (date: string, part: string) => {
    return getExerciseByDate(date).filter(item => item.part === part);
  };

  const records = Object.values(exerciseData).flat();
  const exercises = records; // 동일하게 사용

  return (
    <ExerciseContext.Provider
      value={{
        addRecord,
        toggleFavorite,
        getExerciseByDate,
        getExerciseByRange,
        getExerciseByPart,
        records,
        exercises,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExercise(): ExerciseContextType {
  const context = useContext(ExerciseContext);
  if (!context) throw new Error('useExercise must be used within an ExerciseProvider');
  return context;
}