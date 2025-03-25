import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      {/* 이름 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />

      {/* 이메일 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="이메일"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* 비밀번호 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 생년월일 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="생년월일 (YYYY-MM-DD)"
        keyboardType="numeric"
        value={birthdate}
        onChangeText={setBirthdate}
      />

      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.button} onPress={() => console.log("회원가입 완료")}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>

      {/* 로그인 화면 이동 버튼 */}
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.loginText}>이미 계정이 있으신가요? 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "80%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 10, marginBottom: 12 },
  button: { backgroundColor: "#007AFF", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, marginTop: 10 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  loginText: { color: "#007AFF", marginTop: 15, fontSize: 16 },
});
