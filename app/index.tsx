import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserInfoProvider } from './context/UserInfoContext';

import SplashScreen from './screens/Auth/SplashScreen';
import LoginHome from './screens/Auth/LoginHome';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupStep1 from './screens/Auth/SignupStep1';
import SignupStep2 from './screens/Auth/SignupStep2';
import SignupStep3 from './screens/Auth/SignupStep3';

import PasswordResetScreen from './screens/Auth/PasswordResetScreen';

import Step1Nickname from './screens/Onboarding/Step1Nickname';
import Step2Profile from './screens/Onboarding/Step2Profile';
import Step3ServiceSelect from './screens/Onboarding/Step3ServiceSelect';
import BottomNavigation from './navigation/BottomNavigation';
import HomeScreen from './screens/Main/HomeScreen';
import FoodDetail from './screens/DietScreen/FoodDetail';
import DietScreen from './screens/DietScreen/DietScreen';

import ExerciseCalendar from './screens/ExerciseScreen/ExerciseCalendar';
import ExerciseDetail from './screens/ExerciseScreen/ExerciseDetail';
import ExerciseGoal from './screens/ExerciseScreen/ExerciseGoal';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <UserInfoProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Splash & Auth */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="LoginHome" component={LoginHome} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup1" component={SignupStep1} />
          <Stack.Screen name="Signup2" component={SignupStep2} />
          <Stack.Screen name="Signup3" component={SignupStep3} />
          <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
          {/* Onboarding */}
          <Stack.Screen name="Step1" component={Step1Nickname} />
          <Stack.Screen name="Step2" component={Step2Profile} />
          <Stack.Screen name="Step3" component={Step3ServiceSelect} />

          {/* Main App */}
          <Stack.Screen name="Main" component={BottomNavigation} />

          <Stack.Screen name="Diet" component={DietScreen} />
          <Stack.Screen name="FoodDetail" component={FoodDetail} />

          <Stack.Screen name="ExerciseCalendar" component={ExerciseCalendar} />
          <Stack.Screen name="ExerciseDetail" component={ExerciseDetail} />
          <Stack.Screen name="ExerciseGoal" component={ExerciseGoal} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserInfoProvider>
  );
}

registerRootComponent(App);
