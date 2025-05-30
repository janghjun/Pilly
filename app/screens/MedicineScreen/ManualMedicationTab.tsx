import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function ManualMedicationTab() {
  const navigation = useNavigation();

  // 직접 등록 버튼 핸들러
  const handleManualRegister = () => {
    navigation.navigate('MedicationRegister');
  };

  // OCR 등록 버튼 클릭 시 선택지 Alert
  const handleOCRChoice = async () => {
    Alert.alert('약 봉투 OCR', '입력 방법을 선택해주세요.', [
      { text: '카메라', onPress: handleCamera },
      { text: '사진 선택', onPress: handleImagePicker },
      { text: '취소', style: 'cancel' },
    ]);
  };

  // 앨범에서 이미지 선택
  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      navigation.navigate('MedicationRegister', {
        ocrData: {
          name: '',      // OCR 결과 텍스트로 채워질 부분
          dosage: '',
          usage: '',
          imageUri: result.assets[0].uri,
        },
      });
    }
  };

  // 카메라로 촬영하여 OCR 진행
  const handleCamera = () => {
    navigation.navigate('CameraScreen', {
      from: 'MedicationRegister',
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.manualBtn} onPress={handleManualRegister}>
        <Text style={styles.manualText}>직접 등록하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ocrBtn} onPress={handleOCRChoice}>
        <Image
          source={require('../../assets/images/ocr_icon.png')}
          style={styles.icon}
        />
        <Text style={styles.ocrText}>OCR로 등록하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  manualBtn: {
    backgroundColor: '#2678E4',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginBottom: 20,
  },
  manualText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ocrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F05636',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  ocrText: {
    marginLeft: 10,
    color: '#F05636',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 24,
    height: 24,
  },
});