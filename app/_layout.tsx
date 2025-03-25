import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ title: "홈" }} />
      <Stack.Screen name="health" options={{ title: "운동 기록" }} />
      <Stack.Screen name="meal" options={{ title: "식단 관리" }} />
    </Stack>
  );
}
