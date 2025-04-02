import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserInfo } from '../../context/UserInfoContext';

export default function OnboardingScreen({ navigation }) {
  const { setUserInfo } = useUserInfo();
  const [step, setStep] = useState(1);

  // 상태 값 관리
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const services = ['수면 관리', '운동 관리', '식단 관리', '복약 관리'];

  // 다음 단계 이동 처리
  const handleNext = () => {
    if (step === 1 && nickname.trim()) {
      setUserInfo(prev => ({ ...prev, nickname }));
      setStep(2);
    } else if (
      step === 2 &&
      birth.trim() && gender.trim() && height.trim() && weight.trim()
    ) {
      setUserInfo(prev => ({ ...prev, birth, gender, height, weight }));
      setStep(3);
    } else if (step === 3 && selectedService) {
      setUserInfo(prev => ({ ...prev, mainService: selectedService }));
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });


    }
  };

  // 이전 단계 이동 처리
  const handlePrev = () => setStep(prev => Math.max(1, prev - 1));

  return (
    <View style={styles.container}>
      <Text style={styles.stepIndicator}>{step}/3</Text>

      {step === 1 && (
        <>
          <Text style={styles.title}>반갑습니다!{"\n"}어떻게 불러드리면 될까요?</Text>
          <TextInput
            style={styles.input}
            placeholder="5글자 내로 입력해주세요"
            maxLength={5}
            value={nickname}
            onChangeText={setNickname}
          />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>{nickname}님의 신체정보를{"\n"}알려주세요.</Text>
          <TextInput
            style={styles.input}
            placeholder="생년월일 (예: 2001/08/04)"
            value={birth}
            onChangeText={setBirth}
          />
          <TextInput
            style={styles.input}
            placeholder="성별 : 남 / 여"
            value={gender}
            onChangeText={setGender}
          />
          <TextInput
            style={styles.input}
            placeholder="키 : cm"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <TextInput
            style={styles.input}
            placeholder="몸무게 : kg"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.title}>가장 필요한 서비스가{"\n"}무엇인가요?</Text>
          {services.map(service => (
            <TouchableOpacity
              key={service}
              style={[
                styles.option,
                selectedService === service && styles.selectedOption,
              ]}
              onPress={() => setSelectedService(service)}
            >
              <Text style={[
                styles.optionText,
                selectedService === service && styles.selectedOptionText
              ]}>
                {service}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>다 음</Text>
      </TouchableOpacity>

      {step > 1 && (
        <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
          <Text style={styles.prevButtonText}>이 전</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F4F9',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  stepIndicator: {
    position: 'absolute',
    top: 50,
    right: 30,
    fontSize: 16,
    color: '#6199F7',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    lineHeight: 32,
    color: '#121212',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 15,
    color: '#121212',
    elevation: 2,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 14,
    alignItems: 'center',
    elevation: 2,
  },
  selectedOption: {
    backgroundColor: '#6199F7',
  },
  optionText: {
    fontSize: 16,
    color: '#B0B0B0',
  },
  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#2F80ED',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  nextButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  prevButton: {
    backgroundColor: '#EB5757',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    elevation: 2,
  },
  prevButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
