import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'react-native';
import HomeScreen from '../screens/Main/HomeScreen';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#D9D9D9',
                    width: 390,
                    height: 80,
                    justifyContent: 'center',
                    paddingLeft: 25, paddingRight: 25,
                    paddingTop: 14, paddingBottom: 14
                },
                tabBarLabelStyle: { fontSize: 12, fontWeight: '600', color: '#AAAAAA' }
            }}
            lazy={true}
        >
            {/* 각 Tab.Screen을 Navigator에 자식으로 추가 */}
            <Tab.Screen
                name="식단"
                component={() => null}
                options={{
                    tabBarIcon: ({focused}) =>(
                        <View style={{alignItems: 'center'}}>
                            <Image
                                source={require('../assets/images/bottom_diet.png')}
                                style={{ width: 26, height: 26, marginBottom: 3 }}
                            />
                         </View>
                    ),
                }}
            />
            <Tab.Screen
                name="복약"
                component={() => null}
                options={{
                    tabBarIcon: () => (
                        <View style={{alignItems: 'center'}}>
                            <Image
                                source={require('../assets/images/bottom_medicine.png')}
                                style={{ width: 26, height: 26, marginBottom: 3 }}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="홈"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => (
                        <View style={{alignItems: 'center'}}>
                            <Image
                                source={require('../assets/images/bottom_home.png')}
                                style={{ width: 26, height: 26, marginBottom: 3 }}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="운동"
                component={() => null}
                options={{
                    tabBarIcon: () => (
                        <View style={{alignItems: 'center'}}>
                            <Image
                                source={require('../assets/images/bottom_exercise.png')}
                                style={{ width: 26, height: 26, marginBottom: 3 }}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="수면"
                component={() => null}
                options={{
                    tabBarIcon: () => (
                        <View style={{alignItems: 'center'}}>
                            <Image
                                source={require('../assets/images/bottom_sleep.png')}
                                style={{ width: 26, height: 26, marginBottom: 3 }}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomNavigation;