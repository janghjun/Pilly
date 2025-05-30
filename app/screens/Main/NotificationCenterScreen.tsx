
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationCenterScreen() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const stored = await AsyncStorage.getItem('notificationLogs');
        if (stored) {
          setNotifications(JSON.parse(stored));
        } else {
          setNotifications([]);
        }
      } catch (e) {
        Alert.alert('오류', '알림 데이터를 불러오지 못했습니다.');
      }
    };
    loadNotifications();
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const upcoming = notifications.filter((n) => n.date === today);
  const past = notifications.filter((n) => n.date !== today);

  const renderItem = ({ item }) => (
    <View style={styles.notifCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>{item.type} • {item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>🔔 예정된 알림</Text>
        {upcoming.length === 0 ? (
          <Text style={styles.empty}>오늘 예정된 알림이 없습니다.</Text>
        ) : (
          <FlatList data={upcoming} renderItem={renderItem} keyExtractor={(item) => item.id} />
        )}

        <Text style={styles.header}>📜 지난 알림</Text>
        {past.length === 0 ? (
          <Text style={styles.empty}>과거 알림 내역이 없습니다.</Text>
        ) : (
          <FlatList data={past} renderItem={renderItem} keyExtractor={(item) => item.id} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  notifCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  meta: { fontSize: 14, color: '#555', marginTop: 4 },
  empty: { fontSize: 14, color: '#aaa', marginVertical: 10 },
});
