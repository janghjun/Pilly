import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // 아이콘 추가

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.logo}>Pilly</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => console.log("알림 클릭")}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 메인 기능 요약 */}
      <View style={styles.mainContent}>
        <Text style={styles.mainText}>건강을 위한 습관을 만들어 보세요!</Text>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/tracking")}>
          <Ionicons name="walk-outline" size={24} color="white" />
          <Text style={styles.buttonText}>운동 기록</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/meal")}>
          <Ionicons name="fast-food-outline" size={24} color="white" />
          <Text style={styles.buttonText}>식단 관리</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingHorizontal: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 50 },
  logo: { fontSize: 24, fontWeight: "bold" },
  icons: { flexDirection: "row" },
  mainContent: { flex: 1, justifyContent: "center", alignItems: "center" },
  mainText: { fontSize: 18 },
  footer: { flexDirection: "row", justifyContent: "space-around", paddingBottom: 30 },
  button: { flexDirection: "row", alignItems: "center", backgroundColor: "#007AFF", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  buttonText: { color: "white", fontSize: 16, marginLeft: 8 },
});
