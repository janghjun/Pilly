// SupportAndPolicyScreen.tsx - 고객지원 및 정책 화면
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, SafeAreaView, Alert } from 'react-native';

export default function SupportAndPolicyScreen() {
  const handleOpenURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('오류', '링크를 열 수 없습니다.');
        }
      })
      .catch(() => Alert.alert('오류', '링크를 여는 중 문제가 발생했습니다.'));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>📄 고객지원 및 정책</Text>

        <TouchableOpacity
          style={styles.itemRow}
          onPress={() => handleOpenURL('mailto:support@example.com')}
        >
          <Text style={styles.label}>고객센터 문의</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemRow}
          onPress={() => handleOpenURL('https://example.com/terms')}
        >
          <Text style={styles.label}>이용약관</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemRow}
          onPress={() => handleOpenURL('https://example.com/privacy')}
        >
          <Text style={styles.label}>개인정보 처리방침</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0F3F6' },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#000' },
  itemRow: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  label: { fontSize: 16, fontWeight: '600', color: '#000' },
});
