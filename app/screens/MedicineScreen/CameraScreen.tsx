// CameraScreen.tsx - OCR 사진 촬영 화면
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const cameraRef = useRef<Camera | null>(null);
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (!cameraRef.current) return;
    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });

      // TODO: 실제 OCR API 연동 필요
      const dummyOCRResult = {
        name: '타이레놀',
        dosage: '500mg',
        usage: '식후 30분',
        times: ['아침'],
      };

      navigation.navigate('MedicationRegister', { ocrData: dummyOCRResult });
    } catch (e) {
      Alert.alert('촬영 오류', '사진 촬영에 실패했습니다.');
    }
    setIsCapturing(false);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}><Text>카메라 권한 요청 중...</Text></View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}><Text>카메라 접근이 거부되었습니다.</Text></View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back} // 안정적 사용
      />
      <TouchableOpacity
        style={styles.captureButton}
        onPress={handleCapture}
        disabled={isCapturing}
      >
        <Text style={styles.buttonText}>{isCapturing ? '처리 중...' : '촬영 후 등록'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    left: '20%',
    right: '20%',
    backgroundColor: '#F05636',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
