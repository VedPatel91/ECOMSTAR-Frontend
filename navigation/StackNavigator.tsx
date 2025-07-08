import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'
import LoginScreen from '@/screens/LoginScreen';
import AddAddressScreen from '@/screens/AddAddressScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProfileScreen from '@/screens/ProfileScreen';
import CartScreen from '@/screens/CartScreen';
import ProductInfoScreen from '@/screens/ProductInfoScreen';
import AddressScreen from '@/screens/AddressScreen';
import ConfirmationScreen from '@/screens/ConfirmationScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: 'orange',
      tabBarInactiveTintColor: 'white',
      tabBarStyle: {
        backgroundColor: 'black',
        height: 60,
      }
    }}>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={26} color={color} />
        }}
      >

      </Tab.Screen>
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={26} color={color} />
        }}
      >

      </Tab.Screen>
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          title: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="shopping-cart" size={26} color={color} />
        }}
      >

      </Tab.Screen>
    </Tab.Navigator>
  )
}

const StackNavigator = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }}>
      {/* <SafeAreaView> */}
      <Stack.Navigator>
        {/* Define your screens */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Info" component={ProductInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Address" component={AddAddressScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddAddress" component={AddressScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </SafeAreaView>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})