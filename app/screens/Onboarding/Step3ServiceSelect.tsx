import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserInfo } from '../../context/UserInfoContext';

const services = ['식단 관리', '복약 관리', '운동 관리', '수면 관리'];

export default function Step3ServiceSelect({ navigation }) {
  const [selected, setSelected] = useState<string | null>(null);
  const { setUserInfo } = useUserInfo();

  const handleStart = () => {
    if (!selected) return;

    setUserInfo(prev => ({
      ...prev,
      mainService: selected
    }));

    // 🚀 온보딩 종료 후 Main 화면 진입
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }]
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>가장 필요한 서비스를 선택해주세요</Text>

      {services.map(service => (
        <TouchableOpacity
          key={service}
          style={[styles.option, selected === service && styles.selected]}
          onPress={() => setSelected(service)}
        >
          <Text style={selected === service ? styles.selectedText : styles.optionText}>
            {service}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' },
  option: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  optionText: { color: '#333', fontSize: 16 },
  selectedText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
