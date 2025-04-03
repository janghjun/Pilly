import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'react-native';

import HomeScreen from '../screens/Main/HomeScreen';
import DietScreen from '../screens/DietScreen/DietScreen';
import MedicineScreen from '../screens/MedicineScreen';
import ExerciseScreen from '../screens/ExerciseScreen/ExerciseScreen';
import SleepScreen from '../screens/SleepScreen/SleepScreen';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#F0F3F6',
          width: 390,
          height: 80,
          justifyContent: 'center',
          paddingLeft: 25,
          paddingRight: 25,
          paddingTop: 14,
          paddingBottom: 14,
        },
      }}
      lazy={true}
    >
      <Tab.Screen
        name="식단"
        component={DietScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/images/bottom_diet_active.png')
                  : require('../assets/images/bottom_diet_inactive.png')
              }
              style={{ width: 26, height: 26, marginBottom: -4 }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, fontWeight: '600', color: focused ? '#F05636' : '#AAAAAA' }}>
              식단
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="복약"
        component={MedicineScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/images/bottom_medicine_active.png')
                  : require('../assets/images/bottom_medicine_inactive.png')
              }
              style={{ width: 26, height: 26, marginBottom: -4 }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, fontWeight: '600', color: focused ? '#F05636' : '#AAAAAA' }}>
              복약
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/images/bottom_home_active.png')
                  : require('../assets/images/bottom_home_inactive.png')
              }
              style={{ width: 26, height: 26, marginBottom: -4 }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, fontWeight: '600', color: focused ? '#F05636' : '#AAAAAA' }}>
              홈
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="운동"
        component={ExerciseScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/images/bottom_exercise_active.png')
                  : require('../assets/images/bottom_exercise_inactive.png')
              }
              style={{ width: 26, height: 26, marginBottom: -4 }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, fontWeight: '600', color: focused ? '#F05636' : '#AAAAAA' }}>
              운동
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="수면"
        component={SleepScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/images/bottom_sleep_active.png')
                  : require('../assets/images/bottom_sleep_inactive.png')
              }
              style={{ width: 26, height: 26, marginBottom: -4 }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, fontWeight: '600', color: focused ? '#F05636' : '#AAAAAA' }}>
              수면
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
