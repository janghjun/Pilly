import { View, Text, StyleSheet } from "react-native";

export default function MealScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ 식단 관리</Text>
      <Text style={styles.text}>여기에 식단 관리 기능이 추가될 예정입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, color: "gray" },
});
