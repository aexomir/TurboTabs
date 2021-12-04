//  #1

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ActivityScreen,
  ExploreScreen,
  HomeScreen,
  ProfileScreen,
} from '../Screens';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddButton from '../Components/AddButton';

const Tab = createBottomTabNavigator();

export default function TabBar() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fe4a49',
        tabBarInactiveTintColor: '#ead5dc',
        tabBarVisibilityAnimationConfig: {
          visible: true,
          active: true,
          inactive: true,
          style: {
            opacity: 1,
            transform: [
              {
                translateY: 0,
              },
            ],
          },
        },
      })}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={route => ({
          tabBarIcon: ({focused, color, size}) => {
            return <FontAwesome name="home" size={size} color={color} />;
          },
        })}
      />
      <Tab.Screen
        name="explore"
        component={ExploreScreen}
        options={route => ({
          tabBarIcon: ({focused, color, size}) => {
            return <FontAwesome name="search" size={size} color={color} />;
          },
        })}
      />
      <Tab.Screen
        name="add"
        component={AddButton}
        options={route => ({
          tabBarIcon: ({focused, color, size}) => {
            return <AddButton />;
          },
        })}
      />
      <Tab.Screen
        name="activity"
        component={ActivityScreen}
        options={route => ({
          tabBarIcon: ({focused, color, size}) => {
            return <FontAwesome name="heart" size={size} color={color} />;
          },
        })}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={route => ({
          tabBarIcon: ({focused, color, size}) => {
            return <FontAwesome name="user" size={size} color={color} />;
          },
        })}
      />
    </Tab.Navigator>
  );
}
