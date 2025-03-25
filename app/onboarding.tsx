import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 중앙에 로고 이미지 표시 */}
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />

      {/* "시작하기" 버튼 */}
      <TouchableOpacity style={styles.button} onPress={() => router.replace("/login")}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" },
  logo: { width: 200, height: 200, resizeMode: "contain" }, // 로고 크기 조절
  button: { marginTop: 50, backgroundColor: "#007AFF", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" }
});

