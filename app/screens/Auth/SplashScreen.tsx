import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }: any) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // 2~3초 후 로그인 화면으로 이동
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  logo: { width: 200, height: 200 },
});
