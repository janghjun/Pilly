import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MedicineScreen() {
  return (
    <View style={styles.container}>
      <Text>복약 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
