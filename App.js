import "react-native"; // React Native globally required by some Firebase dependencies
import React, { useState, useEffect, useRef } from "react";
import Slider from "@react-native-community/slider";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import WelcomeScreen from "./Welcome";
import useStore from "./zustand";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Animated,
  Pressable,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, update, get } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import axios from "axios";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as Speech from "expo-speech";
import Voice from "@react-native-voice/voice";
import Tts from "react-native-tts";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

import * as WebBrowser from "expo-web-browser";
import ChatBoat from "./Screen/ChatBoat";
import RadarTrackingPage from "./Screen/RadarTrackingPage";
import { StatusBar } from "expo-status-bar";
WebBrowser.maybeCompleteAuthSession();
const { width } = Dimensions.get("window");
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const firebaseConfig = {
  apiKey: "AIzaSyBI7V3iJilUPsIp7aIhThzUfn0pNIqvhRY",
  authDomain: "practice-7b48d.firebaseapp.com",
  databaseURL: "https://practice-7b48d-default-rtdb.firebaseio.com",
  projectId: "practice-7b48d",
  storageBucket: "practice-7b48d.firebasestorage.app",
  //storageBucket: "practice-7b48d.appspot.com",
  messagingSenderId: "770897099311",
  appId: "1:770897099311:web:9855d61b7685b261c624da",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { app, db };

{
  /* function Main() {
  const [lightsOn, setLightsOn] = useState(false);
  const [fanOn, setFanOn] = useState(false);

  // Listen for changes from Firebase
  useEffect(() => {
    const lightsRef = ref(db, 'devices/lights');
    const fanRef = ref(db, 'devices/fan');

    const lightsListener = onValue(lightsRef, (snapshot) => {
      if (snapshot.exists()) setLightsOn(snapshot.val());
    });

    const fanListener = onValue(fanRef, (snapshot) => {
      if (snapshot.exists()) setFanOn(snapshot.val());
    });

    return () => {
      lightsListener();
      fanListener();
    };
  }, []);

  // Update Firebase when toggled
  const handleLightsToggle = (value) => {
    setLightsOn(value);
    set(ref(db, 'devices/lights'), value);
  };

  const handleFanToggle = (value) => {
    setFanOn(value);
    set(ref(db, 'devices/fan'), value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home Automation</Text>
      <View style={styles.deviceRow}>
        <Text style={styles.deviceLabel}>Lights</Text>
        <Switch
          value={lightsOn}
          onValueChange={handleLightsToggle}
        />
      </View>
      <View style={styles.deviceRow}>
        <Text style={styles.deviceLabel}>Fan</Text>
        <Switch
          value={fanOn}
          onValueChange={handleFanToggle}
        />
      </View>
       <WebView 
          source={{ uri: 'http://192.168.1.200/stream' }} 
          style={{ flex: 1 }} 
        />
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f6fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  deviceLabel: {
    fontSize: 20,
  },
});
export default Main;*/
}
<StatusBar hidden />;

// Enhanced RoomButton Component
// Enhanced RoomButton Component
// Enhanced RoomButton Component - Clean and Minimal
// Enhanced RoomButton Component - Clean and Minimal
const RoomButton = ({ navigation, screen, iconType, iconName, label }) => {
  const renderIcon = () => {
    switch (iconType) {
      case "fontawesome":
        return <FontAwesome name={iconName} size={24} color="#2E7D32" />;
      case "material":
        return <MaterialIcons name={iconName} size={24} color="#2E7D32" />;
      case "materialcommunity":
        return (
          <MaterialCommunityIcons name={iconName} size={24} color="#2E7D32" />
        );
      case "ionicons":
        return <Ionicons name={iconName} size={24} color="#2E7D32" />;
      default:
        return <MaterialIcons name="home" size={24} color="#2E7D32" />;
    }
  };

  return (
    <Pressable
      onPress={() => navigation.navigate(screen)}
      style={({ pressed }) => [
        {
          alignItems: "center",
          justifyContent: "center",
          width: width * 0.3,
          height: width * 0.3,
          marginBottom: 12,
          backgroundColor: pressed ? "#F5FBF5" : "#FFFFFF",
          borderRadius: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 1,
          elevation: 1,
          borderWidth: 1,
          borderColor: "#E8F0E8",
          padding: 12,
        },
      ]}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: "#F0F9F0",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
      >
        {renderIcon()}
      </View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#1B5E20",
          textAlign: "center",
          marginTop: 4,
        }}
        numberOfLines={2}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const AutomationCategory = ({ navigation }) => {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeather = async (showLoading = true) => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    if (showLoading) setLoading(true);
    setError(null);

    //const API_KEY_WEATHER = "75a7fd65f8355d9a32c3a2a066adedd0";
    const API_KEY_WEATHER = process.env.EXPO_PUBLIC_API_KEY_WEATHER;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`;

    try {
      const response = await fetch(URL);
      const data = await response.json();

      if (data.cod !== 200) {
        setError("City not found");
      } else {
        setWeatherData({
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          windDirection: getWindDirection(data.wind.deg),
          pressure: data.main.pressure,
          weatherCondition: data.weather[0].description,
          sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          city: data.name,
          icon: data.weather[0].icon,
        });
      }
    } catch (error) {
      setError("No internet connection");
    } finally {
      if (showLoading) setLoading(false);
      setRefreshing(false);
    }
  };

  const getWindDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchWeather(false);
  };

  // Weather Metric Component - Minimal Design
  const WeatherMetric = ({ icon, value, label, unit = "" }) => (
    <View style={{ alignItems: "center", flex: 1, paddingHorizontal: 4 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name={icon} size={16} color="white" />
        <Text
          style={{
            color: "white",
            fontSize: 12,
            fontWeight: "500",
            marginLeft: 4,
          }}
        >
          {label}
        </Text>
      </View>
      <Text
        style={{
          color: "white",
          marginTop: 4,
          fontSize: 14,
          fontWeight: "600",
        }}
      >
        {value}
        {unit}
      </Text>
    </View>
  );

  // VALID ICON NAMES for all icon libraries
  const roomControls = [
    {
      screen: "kichenRoom",
      iconType: "materialcommunity",
      iconName: "silverware-fork-knife",
      label: "Kitchen",
    },
    {
      screen: "BathRoomPage",
      iconType: "materialcommunity",
      iconName: "shower",
      label: "Bathroom",
    },
    {
      screen: "BedRoom",
      iconType: "material",
      iconName: "bed",
      label: "Bedroom",
    },
    {
      screen: "LivingRoom",
      iconType: "materialcommunity",
      iconName: "sofa",
      label: "Living Room",
    },
    {
      screen: "StudyRoom",
      iconType: "materialcommunity",
      iconName: "book-education",
      label: "Study Room",
    },
    {
      screen: "SolarPanelControl",
      iconType: "materialcommunity",
      iconName: "solar-panel",
      label: "Solar Panel",
    },
    {
      screen: "DoorControl",
      iconType: "material",
      iconName: "lock",
      label: "Door Control",
    },
    {
      screen: "ChatBoat",
      iconType: "materialcommunity",
      iconName: "robot",
      label: "Chat Assistant",
    },
    {
      screen: "RadarMonitoring",
      iconType: "materialcommunity",
      iconName: "radar",
      label: "Radar",
    },
    {
      screen: "ClothDryingSystem",
      iconType: "materialcommunity",
      iconName: "tshirt-crew",
      label: "Drying System",
    },
  ];

  // Fallback function for invalid icons
  const getFallbackIcon = (iconType) => {
    switch (iconType) {
      case "fontawesome":
        return "home";
      case "material":
        return "home";
      case "materialcommunity":
        return "home";
      case "ionicons":
        return "home";
      default:
        return "home";
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      {/* Main Scroll View */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Section */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#F8F9FA",
                borderRadius: 4,
                paddingHorizontal: 12,
                paddingVertical: 10,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons
                name="location-outline"
                size={18}
                color="#666"
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: "#333",
                  padding: 0,
                }}
                placeholder="Search city..."
                placeholderTextColor="#999"
                value={city}
                onChangeText={setCity}
                onSubmitEditing={() => fetchWeather()}
                returnKeyType="search"
              />
            </View>
            <TouchableOpacity
              onPress={() => fetchWeather()}
              style={{
                backgroundColor: "#1B5E20",
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 4,
                marginLeft: 8,
                justifyContent: "center",
                alignItems: "center",
                elevation: 1,
              }}
            >
              <Ionicons name="search" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Weather Section */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          {loading ? (
            <View
              style={{
                backgroundColor: "#F8F9FA",
                borderRadius: 4,
                padding: 32,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <ActivityIndicator size="small" color="#1B5E20" />
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  color: "#666",
                }}
              >
                Getting weather...
              </Text>
            </View>
          ) : error ? (
            <View
              style={{
                backgroundColor: "#FEF2F2",
                borderRadius: 4,
                padding: 20,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#FECACA",
              }}
            >
              <Ionicons name="warning-outline" size={24} color="#DC2626" />
              <Text
                style={{
                  color: "#DC2626",
                  marginTop: 8,
                  fontSize: 12,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {error}
              </Text>
              <TouchableOpacity
                onPress={() => fetchWeather()}
                style={{
                  marginTop: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: "#1B5E20",
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 12, fontWeight: "500" }}
                >
                  Retry
                </Text>
              </TouchableOpacity>
            </View>
          ) : weatherData ? (
            <View
              style={{
                backgroundColor: "#1B5E20",
                borderRadius: 4,
                padding: 16,
                elevation: 1,
              }}
            >
              {/* City and Temperature */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    {weatherData.city}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.9)",
                      marginTop: 2,
                      textTransform: "capitalize",
                    }}
                  >
                    {weatherData.weatherCondition}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 36,
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  {Math.round(weatherData.temperature)}°
                </Text>
              </View>

              {/* Weather Metrics Grid */}
              <View style={{ marginBottom: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <WeatherMetric
                    icon="water-outline"
                    value={weatherData.humidity}
                    label="Humidity"
                    unit="%"
                  />
                  <WeatherMetric
                    icon="speedometer-outline"
                    value={Math.round(weatherData.windSpeed * 3.6)}
                    label="Wind"
                    unit=" km/h"
                  />
                  <WeatherMetric
                    icon="compass-outline"
                    value={weatherData.windDirection}
                    label="Direction"
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <WeatherMetric
                    icon="thermometer-outline"
                    value={weatherData.pressure}
                    label="Pressure"
                    unit=" mb"
                  />
                  <WeatherMetric
                    icon="sunny-outline"
                    value={weatherData.sunrise}
                    label="Sunrise"
                  />
                  <WeatherMetric
                    icon="moon-outline"
                    value={weatherData.sunset}
                    label="Sunset"
                  />
                </View>
              </View>

              <Text
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.8)",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                Updated just now
              </Text>
            </View>
          ) : null}
        </View>

        {/* Room Controls Header */}
        <View
          style={{ paddingHorizontal: 16, marginTop: 24, marginBottom: 12 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1B5E20",
              }}
            >
              Room Controls
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: "#666",
              }}
            >
              {roomControls.length} devices
            </Text>
          </View>
          <Text
            style={{
              fontSize: 11,
              color: "#666",
              marginTop: 2,
            }}
          >
            Tap to control devices
          </Text>
        </View>

        {/* Room Controls Grid */}
        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {roomControls.map((room, index) => (
              <RoomButton
                key={index}
                navigation={navigation}
                screen={room.screen}
                iconType={room.iconType}
                iconName={room.iconName}
                label={room.label}
              />
            ))}
          </View>
        </View>

        {/* Status Section */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#10B981",
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{ fontSize: 12, fontWeight: "500", color: "#333" }}
                >
                  All systems operational
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="wifi" size={12} color="#666" />
                <Text style={{ fontSize: 11, color: "#666", marginLeft: 4 }}>
                  Online
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 12,
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  Last updated
                </Text>
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  2 min ago
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  Response time
                </Text>
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  50ms
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  Devices
                </Text>
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  24 active
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions Footer */}
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          <Text style={{ fontSize: 11, color: "#666", marginBottom: 8 }}>
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 10,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 8,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <MaterialIcons
                name="power-settings-new"
                size={16}
                color="#2E7D32"
              />
              <Text style={{ fontSize: 11, color: "#2E7D32", marginTop: 4 }}>
                All Off
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 10,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 4,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <MaterialIcons name="nights-stay" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 11, color: "#2E7D32", marginTop: 4 }}>
                Sleep
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 10,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 8,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <MaterialIcons name="location-off" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 11, color: "#2E7D32", marginTop: 4 }}>
                Away
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

///export default AutomationCategory;

const KichenRoom = ({ navigation }) => {
  const [CylenderStatus, setCylenderStatus] = useState("OFF");
  const [LightStatus, setLightStatus] = useState("OFF");
  const [smokeStatus, setSmokeStatus] = useState("OFF");
  const [MicrowaveStatus, setMicrowaveStatus] = useState("OFF");
  const [BlenderStatus, setBlenderStatus] = useState("OFF");
  const [TapStatus, setTapStatus] = useState("OFF");
  const [CoffeeMakerStatus, setCoffeeMakerStatus] = useState("OFF");
  const [ExaustStatus, setExaustStatus] = useState("OFF");

  // Fetch data from Firebase (keep your existing code)
  const fetchStatus = (device, setStatus) => {
    const deviceRef = ref(db, `esp1/devices/${device}/status`);
    onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        setStatus(snapshot.val());
      }
    });
  };

  useEffect(() => {
    fetchStatus("cylender", setCylenderStatus);
    fetchStatus("light", setLightStatus);
    fetchStatus("smoke", setSmokeStatus);
    fetchStatus("microwave", setMicrowaveStatus);
    fetchStatus("blender", setBlenderStatus);
    fetchStatus("tap", setTapStatus);
    fetchStatus("coffeeMaker", setCoffeeMakerStatus);
    fetchStatus("ExaustFan", setExaustStatus);
  }, []);

  // Function to toggle device status
  const toggleDevice = (device, currentStatus, setStatus) => {
    const newStatus = currentStatus === "ON" ? "OFF" : "ON";
    set(ref(db, `esp1/devices/${device}/status`), newStatus);
    setStatus(newStatus);
  };

  // Device Card Component
  const DeviceCard = ({
    iconName,
    deviceName,
    subtitle,
    status,
    consumption,
    onToggle,
  }) => (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        marginBottom: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
        borderWidth: 1,
        borderColor: "#E8F0E8",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#F0F9F0",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons name={iconName} size={22} color="#2E7D32" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}>
              {deviceName}
            </Text>
            {subtitle && (
              <Text style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        <Switch
          value={status === "ON"}
          onValueChange={onToggle}
          trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
          thumbColor={status === "ON" ? "#1B5E20" : "#FAFAFA"}
          ios_backgroundColor="#E0E0E0"
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
        }}
      >
        <Ionicons name="flash-outline" size={14} color="#666" />
        <Text style={{ fontSize: 11, color: "#666", marginLeft: 6 }}>
          Consumption: {consumption}
        </Text>
        <View
          style={{
            marginLeft: "auto",
            paddingHorizontal: 8,
            paddingVertical: 2,
            backgroundColor: status === "ON" ? "#E8F5E8" : "#F5F5F5",
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              color: status === "ON" ? "#1B5E20" : "#666",
            }}
          >
            {status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Kitchen Controls
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Smart kitchen devices management
          </Text>
        </View>

        {/* Stats Section - Similar to Weather Section */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#1B5E20",
              borderRadius: 4,
              padding: 12,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="water-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  38%
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Humidity
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="thermometer-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  20°C
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Temperature
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="flash-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  6.9kwh
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Total Usage
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="speedometer-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  3/8
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Active Devices
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              Updated just now
            </Text>
          </View>
        </View>

        {/* Devices Header */}
        <View style={{ paddingHorizontal: 12, marginTop: 20, marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 2,
            }}
          >
            Kitchen Devices
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#666",
            }}
          >
            Tap to toggle device status
          </Text>
        </View>

        {/* Device Cards - Consistent with Dashboard Style */}
        <View style={{ paddingHorizontal: 12 }}>
          <DeviceCard
            iconName="gas-cylinder"
            deviceName="Cylinder"
            subtitle="Gas Leakage: 0%"
            status={CylenderStatus}
            consumption="0.5kwh"
            onToggle={() =>
              toggleDevice("cylender", CylenderStatus, setCylenderStatus)
            }
          />

          <DeviceCard
            iconName="ceiling-light"
            deviceName="Ceiling Light"
            status={LightStatus}
            consumption="1kwh"
            onToggle={() => toggleDevice("light", LightStatus, setLightStatus)}
          />

          <DeviceCard
            iconName="weather-fog"
            deviceName="Smoke Detector"
            subtitle="Smoke QTY: 5%"
            status={smokeStatus}
            consumption="0.2kwh"
            onToggle={() => toggleDevice("smoke", smokeStatus, setSmokeStatus)}
          />

          <DeviceCard
            iconName="microwave"
            deviceName="Microwave"
            status={MicrowaveStatus}
            consumption="1.5kwh"
            onToggle={() =>
              toggleDevice("microwave", MicrowaveStatus, setMicrowaveStatus)
            }
          />

          <DeviceCard
            iconName="blender"
            deviceName="Blender"
            status={BlenderStatus}
            consumption="0.8kwh"
            onToggle={() =>
              toggleDevice("blender", BlenderStatus, setBlenderStatus)
            }
          />

          <DeviceCard
            iconName="water-pump"
            deviceName="Kitchen Tap"
            status={TapStatus}
            consumption="0.3kwh"
            onToggle={() => toggleDevice("tap", TapStatus, setTapStatus)}
          />

          <DeviceCard
            iconName="coffee-maker"
            deviceName="Coffee Maker"
            status={CoffeeMakerStatus}
            consumption="1.2kwh"
            onToggle={() =>
              toggleDevice(
                "coffeeMaker",
                CoffeeMakerStatus,
                setCoffeeMakerStatus,
              )
            }
          />

          <DeviceCard
            iconName="fan"
            deviceName="Exhaust Fan"
            status={ExaustStatus}
            consumption="0.6kwh"
            onToggle={() =>
              toggleDevice("ExaustFan", ExaustStatus, setExaustStatus)
            }
          />
        </View>

        {/* Quick Actions - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="power" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                All Off
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
              onPress={() =>
                navigation.navigate("PowerConsumptionBedRoomScreen")
              }
            >
              <Ionicons name="analytics-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Analytics
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="settings-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#10B981",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  All systems operational
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="wifi" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  Connected
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            Last updated: Just now • Devices: 8 • Active: 3
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const BedRoom = ({ navigation }) => {
  const [brightness, setBrightness] = useState(0);
  const [shoketStatus, setShoketStatus] = useState("OFF");
  const [ceilingLightStatus, setCeilingLightStatus] = useState("OFF");
  const [doorStatus, setDoorStatus] = useState("OFF");
  const [airConditionarStatus, setAirConditionarStatus] = useState("OFF");
  const [televisionStatus, setTelevisionStatus] = useState("OFF");
  const [bedroomCameraStatus, setBedroomCameraStatus] = useState("OFF");
  const [temperature, setTemperature] = useState(24);

  // Fetch data from Firebase (keep your existing code)
  const fetchStatus = (device, setStatus) => {
    const deviceRef = ref(db, `esp2/devices/${device}/status`);
    onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        setStatus(snapshot.val());
      }
    });
  };

  useEffect(() => {
    fetchStatus("shoket", setShoketStatus);
    fetchStatus("CeilingLight", setCeilingLightStatus);
    fetchStatus("bedroomDoor", setDoorStatus);
    fetchStatus("airConditionar", setAirConditionarStatus);
    fetchStatus("television", setTelevisionStatus);
    fetchStatus("bedRoomCamera", setBedroomCameraStatus);
  }, []);

  // Function to toggle device status
  const toggleDevice = (device, currentStatus, setStatus) => {
    const newStatus = currentStatus === "ON" ? "OFF" : "ON";
    set(ref(db, `esp2/devices/${device}/status`), newStatus);
    setStatus(newStatus);
  };

  // Device Card Component with Slider
  const DeviceCard = ({
    iconName,
    deviceName,
    subtitle,
    status,
    consumption,
    onToggle,
    showSlider = false,
    sliderValue,
    onSliderChange,
    sliderMin = 0,
    sliderMax = 100,
    sliderStep = 1,
    sliderUnit = "",
    extraButton = null,
  }) => (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        marginBottom: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
        borderWidth: 1,
        borderColor: "#E8F0E8",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#F0F9F0",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons name={iconName} size={22} color="#2E7D32" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}>
              {deviceName}
            </Text>
            {subtitle && (
              <Text style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        <Switch
          value={status === "ON"}
          onValueChange={onToggle}
          trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
          thumbColor={status === "ON" ? "#1B5E20" : "#FAFAFA"}
          ios_backgroundColor="#E0E0E0"
        />
      </View>

      {showSlider && (
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 11, color: "#666" }}>
              Adjust {sliderUnit}
            </Text>
            <Text style={{ fontSize: 11, fontWeight: "600", color: "#1B5E20" }}>
              {sliderValue}
              {sliderUnit}
            </Text>
          </View>
          <Slider
            style={{ width: "100%", height: 30 }}
            minimumValue={sliderMin}
            maximumValue={sliderMax}
            step={sliderStep}
            value={sliderValue}
            onValueChange={onSliderChange}
            minimumTrackTintColor="#1B5E20"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#1B5E20"
          />
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
        }}
      >
        <Ionicons name="flash-outline" size={14} color="#666" />
        <Text style={{ fontSize: 11, color: "#666", marginLeft: 6 }}>
          {consumption}
        </Text>

        {extraButton && (
          <TouchableOpacity
            onPress={extraButton.onPress}
            style={{
              marginLeft: "auto",
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: "#1B5E20",
              borderRadius: 4,
              marginRight: 8,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: "500", color: "white" }}>
              {extraButton.text}
            </Text>
          </TouchableOpacity>
        )}

        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            backgroundColor: status === "ON" ? "#E8F5E8" : "#F5F5F5",
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              color: status === "ON" ? "#1B5E20" : "#666",
            }}
          >
            {status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Bedroom Controls
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Smart bedroom devices management
          </Text>
        </View>

        {/* Stats Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#1B5E20",
              borderRadius: 4,
              padding: 12,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="water-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  38%
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Humidity
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="thermometer-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  24°C
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Temperature
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="flash-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  6kwh
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Total Usage
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="bed-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  2/6
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Active Devices
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              Updated just now
            </Text>
          </View>
        </View>

        {/* Devices Header */}
        <View style={{ paddingHorizontal: 12, marginTop: 20, marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 2,
            }}
          >
            Bedroom Devices
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#666",
            }}
          >
            Tap to toggle device status
          </Text>
        </View>

        {/* Device Cards */}
        <View style={{ paddingHorizontal: 12 }}>
          <DeviceCard
            iconName="power-plug-outline"
            deviceName="Socket"
            status={shoketStatus}
            consumption="Consumption: 1kwh"
            onToggle={() =>
              toggleDevice("shoket", shoketStatus, setShoketStatus)
            }
          />

          <DeviceCard
            iconName="ceiling-light"
            deviceName="Ceiling Light"
            status={ceilingLightStatus}
            consumption="Consumption: 1kwh"
            onToggle={() =>
              toggleDevice(
                "CeilingLight",
                ceilingLightStatus,
                setCeilingLightStatus,
              )
            }
            showSlider={true}
            sliderValue={brightness}
            onSliderChange={setBrightness}
            sliderMin={0}
            sliderMax={255}
            sliderUnit=""
          />

          <DeviceCard
            iconName="lock-outline"
            deviceName="Bedroom Door"
            subtitle="Last open/close: 12:00 PM"
            status={doorStatus}
            consumption="Status: Locked"
            onToggle={() =>
              toggleDevice("bedroomDoor", doorStatus, setDoorStatus)
            }
          />

          <DeviceCard
            iconName="air-conditioner"
            deviceName="Air Conditioner"
            status={airConditionarStatus}
            consumption="Consumption: 1kwh"
            onToggle={() =>
              toggleDevice(
                "airConditionar",
                airConditionarStatus,
                setAirConditionarStatus,
              )
            }
            showSlider={true}
            sliderValue={temperature}
            onSliderChange={setTemperature}
            sliderMin={16}
            sliderMax={30}
            sliderStep={1}
            sliderUnit="°C"
          />

          <DeviceCard
            iconName="television"
            deviceName="Television"
            status={televisionStatus}
            consumption="Consumption: 1kwh"
            onToggle={() =>
              toggleDevice("television", televisionStatus, setTelevisionStatus)
            }
            extraButton={{
              text: "Remote",
              onPress: () => navigation.navigate("TVRemote"),
            }}
          />

          <DeviceCard
            iconName="cctv"
            deviceName="Bedroom Camera"
            status={bedroomCameraStatus}
            consumption="Consumption: 0.5kwh"
            onToggle={() =>
              toggleDevice(
                "bedRoomCamera",
                bedroomCameraStatus,
                setBedroomCameraStatus,
              )
            }
            extraButton={{
              text: "View Camera",
              onPress: () => navigation.navigate("ESP32CamStream"),
            }}
          />
        </View>

        {/* Quick Actions - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="power" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                All Off
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="moon" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Sleep Mode
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="settings-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#10B981",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  All systems operational
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="wifi" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  Connected
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            Last updated: Just now • Devices: 6 • Active: 2
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const BathRoom = ({ navigation }) => {
  const [bathroomLightStatus, setBathroomLightStatus] = useState("OFF");
  const [bathroomExaustStatus, setBathroomExaustStatus] = useState("OFF");
  const [heaterStatus, setHeaterStatus] = useState("OFF");
  const [shawarStatus, setShawarStatus] = useState("OFF");
  const [bathroomTapStatus, setBathroomTapStatus] = useState("OFF");
  const [toiletTapStatus, setToiletTapStatus] = useState("OFF");

  // Fetch data from Firebase (keep your existing code)
  const fetchStatus = (device, setStatus) => {
    const deviceRef = ref(db, `esp3/devices/${device}/status`);
    onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        setStatus(snapshot.val());
      }
    });
  };

  useEffect(() => {
    fetchStatus("bathroomLight", setBathroomLightStatus);
    fetchStatus("bathroomExaust", setBathroomExaustStatus);
    fetchStatus("heater", setHeaterStatus);
    fetchStatus("bathroomTap", setBathroomTapStatus);
    fetchStatus("shawar", setShawarStatus);
    fetchStatus("toiletTap", setToiletTapStatus);
  }, []);

  // Function to toggle device status
  const toggleDevice = (device, currentStatus, setStatus) => {
    const newStatus = currentStatus === "ON" ? "OFF" : "ON";
    set(ref(db, `esp3/devices/${device}/status`), newStatus);
    setStatus(newStatus);
  };

  // Device Card Component
  const DeviceCard = ({
    iconName,
    deviceName,
    subtitle,
    status,
    consumption,
    onToggle,
    iconType = "materialcommunity",
  }) => {
    const renderIcon = () => {
      if (iconType === "ionicons") {
        return <Ionicons name={iconName} size={22} color="#2E7D32" />;
      }
      return (
        <MaterialCommunityIcons name={iconName} size={22} color="#2E7D32" />
      );
    };

    return (
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          marginBottom: 12,
          padding: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 1,
          elevation: 1,
          borderWidth: 1,
          borderColor: "#E8F0E8",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F0F9F0",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              {renderIcon()}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
              >
                {deviceName}
              </Text>
              {subtitle && (
                <Text style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
          <Switch
            value={status === "ON"}
            onValueChange={onToggle}
            trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
            thumbColor={status === "ON" ? "#1B5E20" : "#FAFAFA"}
            ios_backgroundColor="#E0E0E0"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: "#F0F0F0",
          }}
        >
          <Ionicons name="flash-outline" size={14} color="#666" />
          <Text style={{ fontSize: 11, color: "#666", marginLeft: 6 }}>
            Consumption: {consumption}
          </Text>
          <View
            style={{
              marginLeft: "auto",
              paddingHorizontal: 8,
              paddingVertical: 2,
              backgroundColor: status === "ON" ? "#E8F5E8" : "#F5F5F5",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "500",
                color: status === "ON" ? "#1B5E20" : "#666",
              }}
            >
              {status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Bathroom Controls
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Smart bathroom devices management
          </Text>
        </View>

        {/* Stats Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#1B5E20",
              borderRadius: 4,
              padding: 12,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="water-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  48%
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Humidity
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="thermometer-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  24°C
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Temperature
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="water" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  120L
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Water Usage
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="flash-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  8.9kwh
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Total Usage
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              Updated just now
            </Text>
          </View>
        </View>

        {/* Devices Header */}
        <View style={{ paddingHorizontal: 12, marginTop: 20, marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 2,
            }}
          >
            Bathroom Devices
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#666",
            }}
          >
            Tap to toggle device status
          </Text>
        </View>

        {/* Device Cards */}
        <View style={{ paddingHorizontal: 12 }}>
          <DeviceCard
            iconName="bulb-outline"
            deviceName="Bathroom Light"
            status={bathroomLightStatus}
            consumption="0.5kwh"
            onToggle={() =>
              toggleDevice(
                "bathroomLight",
                bathroomLightStatus,
                setBathroomLightStatus,
              )
            }
            iconType="ionicons"
          />

          <DeviceCard
            iconName="fan"
            deviceName="Exhaust Fan"
            status={bathroomExaustStatus}
            consumption="1kwh"
            onToggle={() =>
              toggleDevice(
                "bathroomExaust",
                bathroomExaustStatus,
                setBathroomExaustStatus,
              )
            }
          />

          <DeviceCard
            iconName="water-boiler"
            deviceName="Water Heater"
            status={heaterStatus}
            consumption="5kwh"
            onToggle={() =>
              toggleDevice("heater", heaterStatus, setHeaterStatus)
            }
          />

          <DeviceCard
            iconName="shower-head"
            deviceName="Shower"
            status={shawarStatus}
            consumption="0.4kwh"
            onToggle={() =>
              toggleDevice("shawar", shawarStatus, setShawarStatus)
            }
          />

          <DeviceCard
            iconName="faucet"
            deviceName="Bathroom Tap"
            status={bathroomTapStatus}
            consumption="1kwh"
            onToggle={() =>
              toggleDevice(
                "bathroomTap",
                bathroomTapStatus,
                setBathroomTapStatus,
              )
            }
          />

          <DeviceCard
            iconName="toilet"
            deviceName="Smart Toilet"
            status={toiletTapStatus}
            consumption="1kwh"
            onToggle={() =>
              toggleDevice("toiletTap", toiletTapStatus, setToiletTapStatus)
            }
          />
        </View>

        {/* Water Conservation Tips */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#E3F2FD",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#BBDEFB",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Ionicons name="leaf-outline" size={16} color="#1976D2" />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#1976D2",
                  marginLeft: 8,
                }}
              >
                Water Conservation Tips
              </Text>
            </View>
            <Text style={{ fontSize: 10, color: "#1976D2", lineHeight: 14 }}>
              • Shorter showers save water • Fix leaky faucets • Turn off tap
              when brushing
            </Text>
          </View>
        </View>

        {/* Quick Actions - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="power" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                All Off
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
              onPress={() =>
                navigation?.navigate("PowerConsumptionBedRoomScreen")
              }
            >
              <Ionicons name="analytics-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Analytics
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="water-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Water Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#10B981",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  All systems operational
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="wifi" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  Connected
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            Last updated: Just now • Devices: 6 • Water Saved: 15L today
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const LivingRoom = ({ navigation }) => {
  const [fanStatus, setFanStatus] = useState("OFF");
  const [tvStatus, settvStatus] = useState("OFF");
  const [acStatus, setacStatus] = useState("OFF");
  const [fridgeStatus, setfridgeStatus] = useState("OFF");
  const [light1Status, setlight1Status] = useState("OFF");
  const [light2Status, setlight2Status] = useState("OFF");
  const [coolerStatus, setCoolerStatus] = useState("OFF");
  const [dustbinStatus, setDustbinStatus] = useState("OFF");
  const [doorStatus, setDoorStatus] = useState("OFF");

  // Fetch data from Firebase (keep your existing code)
  const fetchStatus = (device, setStatus) => {
    const deviceRef = ref(db, `esp4/devices/${device}/status`);
    onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        setStatus(snapshot.val());
      }
    });
  };

  useEffect(() => {
    fetchStatus("fan", setFanStatus);
    fetchStatus("tv", settvStatus);
    fetchStatus("ac", setacStatus);
    fetchStatus("fridge", setfridgeStatus);
    fetchStatus("light1", setlight1Status);
    fetchStatus("light2", setlight2Status);
    fetchStatus("cooler", setCoolerStatus);
    fetchStatus("dustbin", setDustbinStatus);
    fetchStatus("door", setDoorStatus);
  }, []);

  // Function to toggle device status
  const toggleDevice = (device, currentStatus, setStatus) => {
    const newStatus = currentStatus === "ON" ? "OFF" : "ON";
    set(ref(db, `esp4/devices/${device}/status`), newStatus);
    setStatus(newStatus);
  };

  // Device Card Component with Extra Button
  const DeviceCard = ({
    iconName,
    deviceName,
    subtitle,
    status,
    consumption,
    onToggle,
    extraButton = null,
    iconType = "materialcommunity",
  }) => {
    const renderIcon = () => {
      if (iconType === "ionicons") {
        return <Ionicons name={iconName} size={22} color="#2E7D32" />;
      }
      return (
        <MaterialCommunityIcons name={iconName} size={22} color="#2E7D32" />
      );
    };

    return (
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          marginBottom: 12,
          padding: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 1,
          elevation: 1,
          borderWidth: 1,
          borderColor: "#E8F0E8",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F0F9F0",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              {renderIcon()}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
              >
                {deviceName}
              </Text>
              {subtitle && (
                <Text style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
          <Switch
            value={status === "ON"}
            onValueChange={onToggle}
            trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
            thumbColor={status === "ON" ? "#1B5E20" : "#FAFAFA"}
            ios_backgroundColor="#E0E0E0"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: "#F0F0F0",
          }}
        >
          <Ionicons name="flash-outline" size={14} color="#666" />
          <Text style={{ fontSize: 11, color: "#666", marginLeft: 6 }}>
            Consumption: {consumption}
          </Text>

          {extraButton && (
            <TouchableOpacity
              onPress={extraButton.onPress}
              style={{
                marginLeft: "auto",
                paddingHorizontal: 10,
                paddingVertical: 4,
                backgroundColor: "#1B5E20",
                borderRadius: 4,
                marginRight: 8,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: "500", color: "white" }}>
                {extraButton.text}
              </Text>
            </TouchableOpacity>
          )}

          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 2,
              backgroundColor: status === "ON" ? "#E8F5E8" : "#F5F5F5",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "500",
                color: status === "ON" ? "#1B5E20" : "#666",
              }}
            >
              {status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Living Room Controls
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Entertainment & Comfort Zone
          </Text>
        </View>

        {/* Stats Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#1B5E20",
              borderRadius: 4,
              padding: 12,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="water-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  38%
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Humidity
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="thermometer-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  24°C
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Temperature
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="people-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  3
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Occupants
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="flash-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  10.5kwh
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Total Usage
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              Updated just now • Most used: Television
            </Text>
          </View>
        </View>

        {/* Devices Header */}
        <View style={{ paddingHorizontal: 12, marginTop: 20, marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 2,
            }}
          >
            Living Room Devices
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#666",
            }}
          >
            Entertainment, cooling, and lighting controls
          </Text>
        </View>

        {/* Device Cards */}
        <View style={{ paddingHorizontal: 12 }}>
          <DeviceCard
            iconName="bulb-outline"
            deviceName="Door Light"
            status={light1Status}
            consumption="0.8kwh"
            onToggle={() =>
              toggleDevice("light1", light1Status, setlight1Status)
            }
            iconType="ionicons"
          />

          <DeviceCard
            iconName="bulb-outline"
            deviceName="Main Light"
            status={light2Status}
            consumption="1kwh"
            onToggle={() =>
              toggleDevice("light2", light2Status, setlight2Status)
            }
            iconType="ionicons"
          />

          <DeviceCard
            iconName="fan"
            deviceName="Ceiling Fan"
            status={fanStatus}
            consumption="0.6kwh"
            onToggle={() => toggleDevice("fan", fanStatus, setFanStatus)}
          />

          <DeviceCard
            iconName="air-conditioner"
            deviceName="Air Cooler"
            status={coolerStatus}
            consumption="1.2kwh"
            onToggle={() =>
              toggleDevice("cooler", coolerStatus, setCoolerStatus)
            }
          />

          <DeviceCard
            iconName="television"
            deviceName="Television"
            status={tvStatus}
            consumption="1.5kwh"
            onToggle={() => toggleDevice("tv", tvStatus, settvStatus)}
            extraButton={{
              text: "Remote",
              onPress: () => navigation?.navigate("TVRemote"),
            }}
          />

          <DeviceCard
            iconName="air-conditioner"
            deviceName="Air Conditioner"
            status={acStatus}
            consumption="2.5kwh"
            onToggle={() => toggleDevice("ac", acStatus, setacStatus)}
            extraButton={{
              text: "Temp Control",
              onPress: () => navigation?.navigate("Airconditionar"),
            }}
          />

          <DeviceCard
            iconName="fridge"
            deviceName="Refrigerator"
            subtitle="Always ON"
            status={fridgeStatus}
            consumption="2kwh"
            onToggle={() =>
              toggleDevice("fridge", fridgeStatus, setfridgeStatus)
            }
          />

          <DeviceCard
            iconName="delete-empty"
            deviceName="Smart Dustbin"
            subtitle="Capacity: 65%"
            status={dustbinStatus}
            consumption="0.3kwh"
            onToggle={() =>
              toggleDevice("dustbin", dustbinStatus, setDustbinStatus)
            }
          />

          <DeviceCard
            iconName="door"
            deviceName="Main Door"
            subtitle="Last opened: 2:30 PM"
            status={doorStatus}
            consumption="0.5kwh"
            onToggle={() => toggleDevice("door", doorStatus, setDoorStatus)}
          />
        </View>

        {/* Entertainment Quick Actions */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#FFF3E0",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#FFE0B2",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Ionicons name="tv-outline" size={16} color="#E65100" />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#E65100",
                  marginLeft: 8,
                }}
              >
                Entertainment Quick Start
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View
                  style={{
                    padding: 8,
                    backgroundColor: "#FFE0B2",
                    borderRadius: 20,
                  }}
                >
                  <Ionicons name="film-outline" size={20} color="#E65100" />
                </View>
                <Text style={{ fontSize: 9, color: "#E65100", marginTop: 4 }}>
                  Movie Mode
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: "center" }}>
                <View
                  style={{
                    padding: 8,
                    backgroundColor: "#FFE0B2",
                    borderRadius: 20,
                  }}
                >
                  <Ionicons
                    name="musical-notes-outline"
                    size={20}
                    color="#E65100"
                  />
                </View>
                <Text style={{ fontSize: 9, color: "#E65100", marginTop: 4 }}>
                  Music Mode
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: "center" }}>
                <View
                  style={{
                    padding: 8,
                    backgroundColor: "#FFE0B2",
                    borderRadius: 20,
                  }}
                >
                  <Ionicons
                    name="game-controller-outline"
                    size={20}
                    color="#E65100"
                  />
                </View>
                <Text style={{ fontSize: 9, color: "#E65100", marginTop: 4 }}>
                  Gaming Mode
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: "center" }}>
                <View
                  style={{
                    padding: 8,
                    backgroundColor: "#FFE0B2",
                    borderRadius: 20,
                  }}
                >
                  <Ionicons name="sunny-outline" size={20} color="#E65100" />
                </View>
                <Text style={{ fontSize: 9, color: "#E65100", marginTop: 4 }}>
                  Day Mode
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="power" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                All Off
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
              onPress={() =>
                navigation?.navigate("PowerConsumptionBedRoomScreen")
              }
            >
              <Ionicons name="analytics-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Analytics
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="settings-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#10B981",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  All systems operational
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="wifi" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  Connected
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            Last updated: Just now • Devices: 9 • Active: 4 • Power: 10.5kwh
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const StudyRoom = ({ navigation }) => {
  const [lamb1Status, setLamb1Status] = useState("OFF");
  const [lamb2Status, setLamb2Status] = useState("OFF");
  const [studyFanStatus, setStudyFanStatus] = useState("OFF");
  const [DrapeStatus, setDrapeStatus] = useState("OFF");
  const [doorStatus, setDoorStatus] = useState("OFF");

  // Fetch data from Firebase (keep your existing code)
  const fetchStatus = (device, setStatus) => {
    const deviceRef = ref(db, `esp5/devices/${device}/status`);
    onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        setStatus(snapshot.val());
      }
    });
  };

  useEffect(() => {
    fetchStatus("lamb1", setLamb1Status);
    fetchStatus("lamb2", setLamb2Status);
    fetchStatus("StudyFan", setStudyFanStatus);
    fetchStatus("Drape", setDrapeStatus);
    fetchStatus("studyroomdoor", setDoorStatus);
  }, []);

  // Function to toggle device status
  const toggleDevice = (device, currentStatus, setStatus) => {
    const newStatus = currentStatus === "ON" ? "OFF" : "ON";
    set(ref(db, `esp5/devices/${device}/status`), newStatus);
    setStatus(newStatus);
  };

  // Device Card Component
  const DeviceCard = ({
    iconName,
    deviceName,
    subtitle,
    status,
    consumption,
    onToggle,
    iconType = "materialcommunity",
  }) => {
    const renderIcon = () => {
      if (iconType === "ionicons") {
        return <Ionicons name={iconName} size={22} color="#2E7D32" />;
      }
      return (
        <MaterialCommunityIcons name={iconName} size={22} color="#2E7D32" />
      );
    };

    return (
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          marginBottom: 12,
          padding: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 1,
          elevation: 1,
          borderWidth: 1,
          borderColor: "#E8F0E8",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F0F9F0",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              {renderIcon()}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
              >
                {deviceName}
              </Text>
              {subtitle && (
                <Text style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
          <Switch
            value={status === "ON"}
            onValueChange={onToggle}
            trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
            thumbColor={status === "ON" ? "#1B5E20" : "#FAFAFA"}
            ios_backgroundColor="#E0E0E0"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: "#F0F0F0",
          }}
        >
          <Ionicons name="flash-outline" size={14} color="#666" />
          <Text style={{ fontSize: 11, color: "#666", marginLeft: 6 }}>
            Consumption: {consumption}
          </Text>
          <View
            style={{
              marginLeft: "auto",
              paddingHorizontal: 8,
              paddingVertical: 2,
              backgroundColor: status === "ON" ? "#E8F5E8" : "#F5F5F5",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "500",
                color: status === "ON" ? "#1B5E20" : "#666",
              }}
            >
              {status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Study Room Controls
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Focus & Productivity Space
          </Text>
        </View>

        {/* Stats Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#1B5E20",
              borderRadius: 4,
              padding: 12,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="water-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  35%
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Humidity
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="thermometer-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  22°C
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Temperature
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="bulb-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  450 Lx
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Light Level
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="flash-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  1.9kwh
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Total Usage
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              Ideal study conditions • Updated just now
            </Text>
          </View>
        </View>

        {/* Study Modes */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>
            Study Modes
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 10,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="book-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 4 }}>
                Reading
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 10,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="desktop-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 4 }}>
                Computer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 10,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="moon-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 4 }}>
                Night
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Devices Header */}
        <View style={{ paddingHorizontal: 12, marginTop: 20, marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 2,
            }}
          >
            Study Room Devices
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#666",
            }}
          >
            Control lighting, ventilation, and privacy
          </Text>
        </View>

        {/* Device Cards */}
        <View style={{ paddingHorizontal: 12 }}>
          <DeviceCard
            iconName="lamp"
            deviceName="Study Lamp 1"
            subtitle="Desk position"
            status={lamb1Status}
            consumption="0.4kwh"
            onToggle={() => toggleDevice("lamb1", lamb1Status, setLamb1Status)}
          />

          <DeviceCard
            iconName="lamp"
            deviceName="Study Lamp 2"
            subtitle="Reading corner"
            status={lamb2Status}
            consumption="0.4kwh"
            onToggle={() => toggleDevice("lamb2", lamb2Status, setLamb2Status)}
          />

          <DeviceCard
            iconName="fan"
            deviceName="Study Fan"
            subtitle="Speed: Medium"
            status={studyFanStatus}
            consumption="0.6kwh"
            onToggle={() =>
              toggleDevice("StudyFan", studyFanStatus, setStudyFanStatus)
            }
          />

          <DeviceCard
            iconName="blinds"
            deviceName="Window Drapes"
            subtitle="Position: 75% open"
            status={DrapeStatus}
            consumption="0.2kwh"
            onToggle={() => toggleDevice("Drape", DrapeStatus, setDrapeStatus)}
          />

          <DeviceCard
            iconName="door"
            deviceName="Study Room Door"
            subtitle="Last access: 1:45 PM"
            status={doorStatus}
            consumption="0.3kwh"
            onToggle={() =>
              toggleDevice("studyroomdoor", doorStatus, setDoorStatus)
            }
          />
        </View>

        {/* Study Tips */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F3E5F5",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E1BEE7",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Ionicons name="bulb-outline" size={16} color="#7B1FA2" />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#7B1FA2",
                  marginLeft: 8,
                }}
              >
                Study Tips
              </Text>
            </View>
            <Text style={{ fontSize: 10, color: "#7B1FA2", lineHeight: 14 }}>
              • Optimal lighting: 450-750 Lx • Temperature: 20-24°C • Take
              breaks every 45 mins
            </Text>
          </View>
        </View>

        {/* Quick Actions - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="power" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                All Off
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
              onPress={() =>
                navigation?.navigate("PowerConsumptionBedRoomScreen")
              }
            >
              <Ionicons name="analytics-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Analytics
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="timer-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Study Timer
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#10B981",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  Focus environment ready
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="wifi" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  Connected
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            Last updated: Just now • Devices: 5 • Active: 2 • Study time today:
            2h 15m
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const MainAppliances = ({ navigation }) => {
  const [devices, setDevices] = useState({});

  useEffect(() => {
    const deviceNames = [
      "HomeDevices",
      "LivingRoomDevice",
      "KitchenDevice",
      "BathroomDevice",
      "GardenAreaDevice",
      "HomeDoors",
    ];

    deviceNames.forEach((device) => {
      const deviceRef = ref(db, `esp7/devices/${device}`);
      onValue(deviceRef, (snapshot) => {
        if (snapshot.exists()) {
          setDevices((prev) => ({
            ...prev,
            [device]: snapshot.val(),
          }));
        }
      });
    });
  }, []);

  const toggleDevice = async (device) => {
    const user = "ubaid shekh"; // dummy user
    const currentStatus = devices[device]?.status || "OFF";
    const newStatus = currentStatus === "ON" ? "OFF" : "ON";
    const now = new Date().toISOString();

    const today = new Date().toISOString().split("T")[0];
    const countRef = ref(db, `esp7/devices/${device}/dailyUsage/${today}`);
    const snapshot = await get(countRef);
    const newCount = snapshot.exists() ? snapshot.val() + 1 : 1;

    await update(ref(db, `esp7/devices/${device}`), {
      status: newStatus,
      lastControlledBy: user,
      lastControlledAt: now,
      dailyCount: newCount,
    });

    await set(countRef, newCount);
  };

  // Device icons and descriptions
  const deviceInfo = {
    HomeDevices: {
      icon: "home-outline",
      description: "Main home systems and infrastructure",
      color: "#1B5E20",
    },
    LivingRoomDevice: {
      icon: "tv-outline",
      description: "Living room entertainment and lighting",
      color: "#2E7D32",
    },
    KitchenDevice: {
      icon: "fast-food-outline",
      description: "Kitchen appliances and cooking systems",
      color: "#388E3C",
    },
    BathroomDevice: {
      icon: "water-outline",
      description: "Bathroom fixtures and water systems",
      color: "#43A047",
    },
    GardenAreaDevice: {
      icon: "leaf-outline",
      description: "Garden irrigation and outdoor lighting",
      color: "#4CAF50",
    },
    HomeDoors: {
      icon: "lock-closed-outline",
      description: "Main doors and security access",
      color: "#66BB6A",
    },
  };

  // Device Card Component
  const DeviceCard = ({ device, data }) => {
    const isOn = data?.status === "ON";
    const lastTime = data?.lastControlledAt
      ? new Date(data.lastControlledAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Never used";

    const info = deviceInfo[device] || {
      icon: "hardware-chip-outline",
      description: "",
      color: "#666",
    };
    const deviceName = device.replace(/([A-Z])/g, " $1").trim();

    return (
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          marginBottom: 12,
          padding: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 1,
          elevation: 1,
          borderWidth: 1,
          borderColor: "#E8F0E8",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: isOn ? "#E8F5E8" : "#F0F9F0",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Ionicons
                name={info.icon}
                size={22}
                color={isOn ? info.color : "#666"}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
              >
                {deviceName}
              </Text>
              <Text style={{ fontSize: 10, color: "#666", marginTop: 2 }}>
                {info.description}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => toggleDevice(device)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: isOn ? "#1B5E20" : "#F0F9F0",
              borderRadius: 4,
              borderWidth: 1,
              borderColor: isOn ? "#1B5E20" : "#E8F0E8",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: isOn ? "white" : "#1B5E20",
              }}
            >
              {isOn ? "TURN OFF" : "TURN ON"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Status Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: "#F0F0F0",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: isOn ? "#10B981" : "#666",
                marginRight: 6,
              }}
            />
            <Text style={{ fontSize: 11, color: isOn ? "#10B981" : "#666" }}>
              {isOn ? "Active" : "Inactive"}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="person-outline" size={12} color="#666" />
            <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
              {data?.lastControlledBy || "No user"}
            </Text>
          </View>
        </View>

        {/* Details Row */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: "#F0F0F0",
          }}
        >
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 9, color: "#666", marginBottom: 2 }}>
              Last Used
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "500", color: "#333" }}>
              {lastTime}
            </Text>
          </View>

          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 9, color: "#666", marginBottom: 2 }}>
              Today
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "500", color: "#333" }}>
              {data?.dailyCount || 0} times
            </Text>
          </View>

          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 9, color: "#666", marginBottom: 2 }}>
              Status
            </Text>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 2,
                backgroundColor: isOn ? "#E8F5E8" : "#F5F5F5",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "500",
                  color: isOn ? "#1B5E20" : "#666",
                }}
              >
                {isOn ? "ON" : "OFF"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Main Appliances
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Central control for home systems
          </Text>
        </View>

        {/* Stats Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#1B5E20",
              borderRadius: 4,
              padding: 12,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="power-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {
                    Object.values(devices).filter((d) => d?.status === "ON")
                      .length
                  }
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Active Now
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="today-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {Object.values(devices).reduce(
                    (sum, d) => sum + (d?.dailyCount || 0),
                    0,
                  )}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Uses Today
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="people-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  1
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Active User
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="time-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Current Time
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              Last update: Just now • User: ubaid shekh
            </Text>
          </View>
        </View>

        {/* Devices Header */}
        <View style={{ paddingHorizontal: 12, marginTop: 20, marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 2,
            }}
          >
            Home Systems
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#666",
            }}
          >
            Central control for all main home appliances
          </Text>
        </View>

        {/* Device Cards */}
        <View style={{ paddingHorizontal: 12 }}>
          {Object.keys(devices).map((device) => (
            <DeviceCard key={device} device={device} data={devices[device]} />
          ))}
        </View>

        {/* Quick Actions - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
              onPress={() => {
                // Turn all devices off
                Object.keys(devices).forEach((device) => {
                  if (devices[device]?.status === "ON") {
                    toggleDevice(device);
                  }
                });
              }}
            >
              <Ionicons name="power" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                All Off
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="refresh-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Refresh
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="settings-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#10B981",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  Central systems operational
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="wifi" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  Connected
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* User Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <View
            style={{
              backgroundColor: "#E3F2FD",
              borderRadius: 4,
              padding: 10,
              borderWidth: 1,
              borderColor: "#BBDEFB",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="person-circle-outline"
                size={16}
                color="#1976D2"
              />
              <Text
                style={{
                  fontSize: 11,
                  color: "#1976D2",
                  marginLeft: 8,
                  flex: 1,
                }}
              >
                Logged in as:{" "}
                <Text style={{ fontWeight: "600" }}>ubaid shekh</Text>
              </Text>
              <Text style={{ fontSize: 9, color: "#1976D2" }}>
                Admin Access
              </Text>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            Last updated: Just now • Systems: {Object.keys(devices).length} •
            Active:{" "}
            {Object.values(devices).filter((d) => d?.status === "ON").length}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const TVRemote = () => {
  const [ipAddress, setIpAddress] = useState("");

  const sendCommand = (command) => {
    if (!ipAddress.trim()) {
      Alert.alert("Error", "Please enter TV IP address first");
      return;
    }

    const url = `http://${ipAddress}/keypress/${command}`;
    axios
      .post(url)
      .then((response) => {
        Alert.alert("Success", `${command} command sent successfully!`);
      })
      .catch((error) => {
        Alert.alert("Error", `Failed to send ${command} command`);
      });
  };

  const RemoteButton = ({
    title,
    command,
    color = "#1B5E20",
    icon = null,
    style = {},
    isLarge = false,
  }) => (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        paddingVertical: isLarge ? 10 : 8,
        paddingHorizontal: isLarge ? 16 : 12,
        margin: 4,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
        borderWidth: 1,
        borderColor: "#E8F0E8",
        ...style,
      }}
      onPress={() => sendCommand(command)}
    >
      {icon ? (
        <Ionicons name={icon} size={isLarge ? 20 : 16} color="#FFFFFF" />
      ) : (
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: isLarge ? 14 : 12,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Samsung TV Remote
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Control your TV from your phone
          </Text>
        </View>

        {/* Setup Steps - Compact Version */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#F0F9F0",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: "#1B5E20",
                marginBottom: 8,
              }}
            >
              🔧 Setup Required
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "48%", marginBottom: 8 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  1. Enable Dev Mode
                </Text>
                <Text style={{ fontSize: 9, color: "#999" }}>
                  Settings → Developer Mode
                </Text>
              </View>
              <View style={{ width: "48%", marginBottom: 8 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  2. Find IP Address
                </Text>
                <Text style={{ fontSize: 9, color: "#999" }}>
                  Network → Status
                </Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  3. Same Network
                </Text>
                <Text style={{ fontSize: 9, color: "#999" }}>
                  Both on same Wi-Fi
                </Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  4. Enter IP Below
                </Text>
                <Text style={{ fontSize: 9, color: "#999" }}>
                  Type TV IP address
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* IP Address Input */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <Text style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
            TV IP Address
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#F8F9FA",
                borderRadius: 4,
                paddingHorizontal: 10,
                paddingVertical: 8,
                alignItems: "center",
                borderWidth: 1,
                borderColor: ipAddress ? "#1B5E20" : "#E8F0E8",
              }}
            >
              <Ionicons
                name="tv-outline"
                size={16}
                color="#666"
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: "#333",
                  padding: 0,
                }}
                placeholder="192.168.1.100"
                placeholderTextColor="#999"
                value={ipAddress}
                onChangeText={setIpAddress}
                keyboardType="numbers-and-punctuation"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (ipAddress) {
                  Alert.alert("Connected", `Connected to TV: ${ipAddress}`);
                } else {
                  Alert.alert("Error", "Please enter IP address");
                }
              }}
              style={{
                backgroundColor: ipAddress ? "#1B5E20" : "#F0F9F0",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 4,
                marginLeft: 8,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: ipAddress ? "#1B5E20" : "#E8F0E8",
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: ipAddress ? "white" : "#1B5E20",
                }}
              >
                Test
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 10,
              color: "#999",
              marginTop: 4,
              textAlign: "center",
            }}
          >
            Enter your Samsung TV's IP address
          </Text>
        </View>

        {/* Remote Controls */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 8,
            }}
          >
            Remote Control
          </Text>

          {/* Power Button */}
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <RemoteButton
              title="POWER"
              command="Power"
              color="#DC2626"
              style={{ minWidth: 100, paddingVertical: 10 }}
              isLarge={true}
            />
          </View>

          {/* Volume and Channel Section */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 11,
                  color: "#666",
                  marginBottom: 6,
                  fontWeight: "500",
                }}
              >
                VOLUME
              </Text>
              <RemoteButton title="+" command="VolumeUp" icon="add-outline" />
              <RemoteButton
                title="-"
                command="VolumeDown"
                icon="remove-outline"
              />
              <RemoteButton
                title="MUTE"
                command="Mute"
                icon="volume-mute-outline"
              />
            </View>

            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 11,
                  color: "#666",
                  marginBottom: 6,
                  fontWeight: "500",
                }}
              >
                CHANNEL
              </Text>
              <RemoteButton
                title="+"
                command="ChannelUp"
                icon="chevron-up-outline"
              />
              <RemoteButton
                title="-"
                command="ChannelDown"
                icon="chevron-down-outline"
              />
            </View>
          </View>

          {/* Navigation D-Pad */}
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 11,
                color: "#666",
                marginBottom: 8,
                fontWeight: "500",
              }}
            >
              NAVIGATION
            </Text>
            <View style={{ alignItems: "center" }}>
              <RemoteButton
                title="▲"
                command="Up"
                style={{ width: 60, height: 40, borderRadius: 4 }}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RemoteButton
                  title="◀"
                  command="Left"
                  style={{ width: 40, height: 60, borderRadius: 4 }}
                />
                <RemoteButton
                  title="OK"
                  command="Enter"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 4,
                    backgroundColor: "#2E7D32",
                    marginHorizontal: 8,
                  }}
                />
                <RemoteButton
                  title="▶"
                  command="Right"
                  style={{ width: 40, height: 60, borderRadius: 4 }}
                />
              </View>
              <RemoteButton
                title="▼"
                command="Down"
                style={{ width: 60, height: 40, borderRadius: 4 }}
              />
            </View>
          </View>

          {/* Media Control Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 12,
            }}
          >
            <RemoteButton
              title="Home"
              command="Home"
              icon="home-outline"
              color="#1B5E20"
            />
            <RemoteButton
              title="Back"
              command="Return"
              icon="arrow-back-outline"
              color="#1B5E20"
            />
            <RemoteButton
              title="Menu"
              command="Menu"
              icon="menu-outline"
              color="#1B5E20"
            />
          </View>

          {/* Function Buttons Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 12,
            }}
          >
            <RemoteButton
              title="Source"
              command="Source"
              icon="layers-outline"
              color="#2E7D32"
            />
            <RemoteButton
              title="Settings"
              command="Settings"
              icon="settings-outline"
              color="#2E7D32"
            />
            <RemoteButton
              title="Info"
              command="Info"
              icon="information-circle-outline"
              color="#2E7D32"
            />
          </View>

          {/* Playback Control Row */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <RemoteButton
              title="⏪"
              command="Rewind"
              icon="play-back-outline"
              color="#388E3C"
            />
            <RemoteButton
              title="⏸"
              command="Play"
              icon="pause-outline"
              color="#388E3C"
            />
            <RemoteButton
              title="⏩"
              command="FastForward"
              icon="play-forward-outline"
              color="#388E3C"
            />
          </View>
        </View>

        {/* Quick Presets */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
            Quick Presets
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="film-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Netflix
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="logo-youtube" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                YouTube
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons
                name="musical-notes-outline"
                size={16}
                color="#2E7D32"
              />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Music
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: ipAddress ? "#10B981" : "#F59E0B",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  {ipAddress ? "Connected to TV" : "Not connected"}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="wifi" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  {ipAddress ? "Connected" : "Required"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Connection Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <View
            style={{
              backgroundColor: "#E3F2FD",
              borderRadius: 4,
              padding: 10,
              borderWidth: 1,
              borderColor: "#BBDEFB",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="information-circle-outline"
                size={14}
                color="#1976D2"
              />
              <Text
                style={{
                  fontSize: 10,
                  color: "#1976D2",
                  marginLeft: 8,
                  flex: 1,
                }}
              >
                Ensure TV and phone are on same Wi-Fi network. IP can be found
                in TV's network settings.
              </Text>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            {ipAddress
              ? `Connected to: ${ipAddress}`
              : "Enter TV IP to enable controls"}{" "}
            • Samsung TV Remote
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const Airconditionar = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [temperature, setTemperature] = useState(22);

  const apiBaseUrl = `http://${ipAddress}/ac`;

  const sendCommand = (newTemperature) => {
    if (!ipAddress.trim()) {
      Alert.alert("Error", "Please enter AC IP address first");
      return;
    }

    const url = `${apiBaseUrl}/setTemperature`;
    axios
      .post(url, { temperature: newTemperature })
      .then((response) => {
        Alert.alert("Success", `Temperature set to ${newTemperature}°C`);
        setTemperature(newTemperature);
      })
      .catch((error) => {
        Alert.alert("Error", `Failed to set temperature: ${error.message}`);
      });
  };

  const quickTempButtons = [16, 18, 20, 22, 24, 26];

  const ModeButton = ({ icon, label, active = false, onPress }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: active ? "#1B5E20" : "#F0F9F0",
        paddingVertical: 10,
        borderRadius: 4,
        alignItems: "center",
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: active ? "#1B5E20" : "#E8F0E8",
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={16} color={active ? "white" : "#2E7D32"} />
      <Text
        style={{
          fontSize: 10,
          color: active ? "white" : "#2E7D32",
          marginTop: 4,
          fontWeight: active ? "600" : "500",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Air Conditioner Control
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Smart temperature control
          </Text>
        </View>

        {/* Setup Steps - Compact Version */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#F0F9F0",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: "#1B5E20",
                marginBottom: 8,
              }}
            >
              🔧 Connection Setup
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "48%", marginBottom: 8 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Ionicons name="wifi-outline" size={10} color="#666" />
                  <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                    Same Wi-Fi
                  </Text>
                </View>
                <Text style={{ fontSize: 9, color: "#999" }}>
                  AC & phone same network
                </Text>
              </View>
              <View style={{ width: "48%", marginBottom: 8 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Ionicons name="settings-outline" size={10} color="#666" />
                  <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                    Dev Mode ON
                  </Text>
                </View>
                <Text style={{ fontSize: 9, color: "#999" }}>
                  Enable in AC settings
                </Text>
              </View>
              <View style={{ width: "48%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Ionicons name="search-outline" size={10} color="#666" />
                  <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                    Find IP
                  </Text>
                </View>
                <Text style={{ fontSize: 9, color: "#999" }}>
                  Check AC network settings
                </Text>
              </View>
              <View style={{ width: "48%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Ionicons
                    name="phone-portrait-outline"
                    size={10}
                    color="#666"
                  />
                  <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                    Enter IP
                  </Text>
                </View>
                <Text style={{ fontSize: 9, color: "#999" }}>
                  Type below to connect
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* IP Address Input */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <Text style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
            AC IP Address
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#F8F9FA",
                borderRadius: 4,
                paddingHorizontal: 10,
                paddingVertical: 8,
                alignItems: "center",
                borderWidth: 1,
                borderColor: ipAddress ? "#1B5E20" : "#E8F0E8",
              }}
            >
              <Ionicons
                name="snow-outline"
                size={16}
                color="#666"
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: "#333",
                  padding: 0,
                }}
                placeholder="192.168.1.100"
                placeholderTextColor="#999"
                value={ipAddress}
                onChangeText={setIpAddress}
                keyboardType="numbers-and-punctuation"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (ipAddress) {
                  Alert.alert("Connected", `Connected to AC: ${ipAddress}`);
                } else {
                  Alert.alert("Error", "Please enter IP address");
                }
              }}
              style={{
                backgroundColor: ipAddress ? "#1B5E20" : "#F0F9F0",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 4,
                marginLeft: 8,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: ipAddress ? "#1B5E20" : "#E8F0E8",
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: ipAddress ? "white" : "#1B5E20",
                }}
              >
                Connect
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 10,
              color: "#999",
              marginTop: 4,
              textAlign: "center",
            }}
          >
            Enter your AC's IP address to connect
          </Text>
        </View>

        {/* Temperature Control */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 12,
            }}
          >
            Temperature Control
          </Text>

          {/* Current Temperature Display */}
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <View
              style={{
                backgroundColor: "#1B5E20",
                borderRadius: 4,
                padding: 20,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: 8,
                }}
              >
                CURRENT TEMPERATURE
              </Text>
              <Text style={{ fontSize: 48, fontWeight: "800", color: "white" }}>
                {temperature}°
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.9)",
                  marginTop: 4,
                }}
              >
                Celsius
              </Text>
            </View>
          </View>

          {/* Temperature Slider */}
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 12, color: "#666" }}>
                Adjust Temperature
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "600", color: "#1B5E20" }}
              >
                {temperature}°C
              </Text>
            </View>
            <Slider
              style={{ width: "100%", height: 30 }}
              minimumValue={16}
              maximumValue={30}
              step={1}
              value={temperature}
              onValueChange={setTemperature}
              onSlidingComplete={(value) => sendCommand(Math.round(value))}
              minimumTrackTintColor="#1B5E20"
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor="#1B5E20"
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 10, color: "#999" }}>16°C</Text>
              <Text style={{ fontSize: 10, color: "#999" }}>Cool</Text>
              <Text style={{ fontSize: 10, color: "#999" }}>30°C</Text>
            </View>
          </View>

          {/* Quick Temperature Buttons */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
              Quick Set
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {quickTempButtons.map((temp) => (
                <TouchableOpacity
                  key={temp}
                  style={{
                    backgroundColor:
                      temperature === temp ? "#1B5E20" : "#F0F9F0",
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: temperature === temp ? "#1B5E20" : "#E8F0E8",
                  }}
                  onPress={() => sendCommand(temp)}
                >
                  <Text
                    style={{
                      color: temperature === temp ? "white" : "#1B5E20",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    {temp}°
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Temperature Adjustment Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 12,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 8,
                borderWidth: 1,
                borderColor: "#E8F0E8",
                flexDirection: "row",
                justifyContent: "center",
              }}
              onPress={() => sendCommand(temperature - 1)}
            >
              <Ionicons name="remove-outline" size={16} color="#1B5E20" />
              <Text
                style={{
                  color: "#1B5E20",
                  fontSize: 12,
                  fontWeight: "600",
                  marginLeft: 8,
                }}
              >
                Decrease 1°
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 12,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 8,
                borderWidth: 1,
                borderColor: "#E8F0E8",
                flexDirection: "row",
                justifyContent: "center",
              }}
              onPress={() => sendCommand(temperature + 1)}
            >
              <Ionicons name="add-outline" size={16} color="#1B5E20" />
              <Text
                style={{
                  color: "#1B5E20",
                  fontSize: 12,
                  fontWeight: "600",
                  marginLeft: 8,
                }}
              >
                Increase 1°
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AC Modes */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
            AC Modes
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <ModeButton icon="snow-outline" label="Cool" active={true} />
            <ModeButton icon="sunny-outline" label="Heat" />
            <ModeButton icon="water-outline" label="Dry" />
            <ModeButton icon="leaf-outline" label="Fan" />
          </View>
        </View>

        {/* Fan Speed */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
            Fan Speed
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity style={{ alignItems: "center" }}>
              <View
                style={{
                  padding: 8,
                  backgroundColor: "#F0F9F0",
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
              >
                <Ionicons
                  name="speedometer-outline"
                  size={16}
                  color="#2E7D32"
                />
              </View>
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 4 }}>
                Low
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center" }}>
              <View
                style={{
                  padding: 8,
                  backgroundColor: "#1B5E20",
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#1B5E20",
                }}
              >
                <Ionicons name="speedometer-outline" size={16} color="white" />
              </View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  color: "#1B5E20",
                  marginTop: 4,
                }}
              >
                Med
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center" }}>
              <View
                style={{
                  padding: 8,
                  backgroundColor: "#F0F9F0",
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
              >
                <Ionicons
                  name="speedometer-outline"
                  size={16}
                  color="#2E7D32"
                />
              </View>
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 4 }}>
                High
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center" }}>
              <View
                style={{
                  padding: 8,
                  backgroundColor: "#F0F9F0",
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
              >
                <Ionicons name="sync-outline" size={16} color="#2E7D32" />
              </View>
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 4 }}>
                Auto
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="power" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Power
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="timer-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Timer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="settings-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                More
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: ipAddress ? "#10B981" : "#F59E0B",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  {ipAddress ? "Connected to AC" : "Not connected"}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="thermometer-outline" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  {temperature}°C
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Connection Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <View
            style={{
              backgroundColor: "#E3F2FD",
              borderRadius: 4,
              padding: 10,
              borderWidth: 1,
              borderColor: "#BBDEFB",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="information-circle-outline"
                size={14}
                color="#1976D2"
              />
              <Text
                style={{
                  fontSize: 10,
                  color: "#1976D2",
                  marginLeft: 8,
                  flex: 1,
                }}
              >
                Optimal temperature: 22-24°C. Energy saving mode recommended for
                extended use.
              </Text>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            {ipAddress
              ? `Connected to: ${ipAddress}`
              : "Enter AC IP to enable controls"}{" "}
            • Set: {temperature}°C
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

// staart from PowerConsumptionBedRoomScreen

const PowerConsumptionBedRoomScreen = () => {
  const [powerData, setPowerData] = useState({
    power: 245.67,
    current: 2.15,
    voltage: 230.4,
    energyToday: 3.2,
    energyThisMonth: 45.8,
    costToday: 1.28,
    costThisMonth: 18.32,
    powerFactor: 0.92,
    peakPower: 320.5,
    avgDaily: 4.1,
  });

  const StatCard = ({ icon, value, label, unit, color = "#1B5E20" }) => (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        padding: 12,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
        borderWidth: 1,
        borderColor: "#E8F0E8",
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#F0F9F0",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
          }}
        >
          <Ionicons name={icon} size={14} color={color} />
        </View>
        <Text style={{ fontSize: 11, color: "#666", fontWeight: "500" }}>
          {label}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: "#1B5E20",
          marginBottom: 2,
        }}
      >
        {value}
      </Text>
      <Text style={{ fontSize: 10, color: "#666" }}>{unit}</Text>
    </View>
  );

  const ConsumptionBar = ({
    label,
    value,
    maxValue = 100,
    unit = "kWh",
    color = "#1B5E20",
  }) => {
    const percentage = Math.min((value / maxValue) * 100, 100);

    return (
      <View style={{ marginBottom: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <Text style={{ fontSize: 11, color: "#666" }}>{label}</Text>
          <Text style={{ fontSize: 11, fontWeight: "600", color: "#1B5E20" }}>
            {value} {unit}
          </Text>
        </View>
        <View
          style={{
            height: 6,
            backgroundColor: "#F0F0F0",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              height: "100%",
              width: `${percentage}%`,
              backgroundColor: color,
              borderRadius: 3,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 9,
            color: "#999",
            marginTop: 2,
            textAlign: "right",
          }}
        >
          {percentage.toFixed(1)}%
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Power Consumption
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Bedroom energy usage analytics
          </Text>
        </View>

        {/* Live Power Stats - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#1B5E20",
              borderRadius: 4,
              padding: 16,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="flash-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {powerData.power.toFixed(1)}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Current Power
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="calendar-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {powerData.energyToday}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Today (kWh)
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="cash-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  ${powerData.costToday}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Today's Cost
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="trending-up-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  +5%
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  vs Yesterday
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              Updated just now • Live monitoring active
            </Text>
          </View>
        </View>

        {/* Detailed Power Stats */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 12,
            }}
          >
            Electrical Parameters
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <StatCard
              icon="flash-outline"
              value={powerData.current}
              label="Current"
              unit="A"
              color="#1B5E20"
            />
            <View style={{ width: 8 }} />
            <StatCard
              icon="pulse-outline"
              value={powerData.voltage}
              label="Voltage"
              unit="V"
              color="#2E7D32"
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <StatCard
              icon="speedometer-outline"
              value={powerData.powerFactor}
              label="Power Factor"
              unit=""
              color="#388E3C"
            />
            <View style={{ width: 8 }} />
            <StatCard
              icon="analytics-outline"
              value={powerData.peakPower}
              label="Peak Power"
              unit="W"
              color="#43A047"
            />
          </View>
        </View>

        {/* Consumption Analysis */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 12,
            }}
          >
            Consumption Analysis
          </Text>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1,
              elevation: 1,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <ConsumptionBar
              label="Today's Usage"
              value={powerData.energyToday}
              maxValue={5}
              unit="kWh"
              color="#1B5E20"
            />

            <ConsumptionBar
              label="Monthly Usage"
              value={powerData.energyThisMonth}
              maxValue={60}
              unit="kWh"
              color="#2E7D32"
            />

            <ConsumptionBar
              label="Average Daily"
              value={powerData.avgDaily}
              maxValue={6}
              unit="kWh"
              color="#388E3C"
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  Budget Used
                </Text>
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#1B5E20" }}
                >
                  65%
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  Projected Month
                </Text>
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#1B5E20" }}
                >
                  {powerData.energyThisMonth * 1.1}kWh
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  Est. Cost
                </Text>
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#1B5E20" }}
                >
                  ${(powerData.costThisMonth * 1.1).toFixed(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Cost Breakdown */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 12,
            }}
          >
            Cost Breakdown
          </Text>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1,
              elevation: 1,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 4 }}>
                  Today
                </Text>
                <View
                  style={{
                    backgroundColor: "#F0F9F0",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: "#E8F0E8",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#1B5E20",
                    }}
                  >
                    ${powerData.costToday}
                  </Text>
                </View>
                <Text style={{ fontSize: 9, color: "#999", marginTop: 4 }}>
                  ${(powerData.costToday / powerData.energyToday).toFixed(2)}
                  /kWh
                </Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 4 }}>
                  This Month
                </Text>
                <View
                  style={{
                    backgroundColor: "#E8F5E8",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: "#1B5E20",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#1B5E20",
                    }}
                  >
                    ${powerData.costThisMonth}
                  </Text>
                </View>
                <Text style={{ fontSize: 9, color: "#999", marginTop: 4 }}>
                  $
                  {(
                    powerData.costThisMonth / powerData.energyThisMonth
                  ).toFixed(2)}
                  /kWh
                </Text>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 4 }}>
                  Avg Daily
                </Text>
                <View
                  style={{
                    backgroundColor: "#F0F9F0",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: "#E8F0E8",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#1B5E20",
                    }}
                  >
                    ${(powerData.costThisMonth / 30).toFixed(2)}
                  </Text>
                </View>
                <Text style={{ fontSize: 9, color: "#999", marginTop: 4 }}>
                  per day
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "#666",
                textAlign: "center",
                marginTop: 8,
              }}
            >
              Electricity rate: $0.12 per kWh
            </Text>
          </View>
        </View>

        {/* Energy Saving Tips */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
            Energy Saving Tips
          </Text>
          <View
            style={{
              backgroundColor: "#F3F7FF",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#D4E2FF",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Ionicons name="bulb-outline" size={14} color="#1976D2" />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: "#1976D2",
                  marginLeft: 8,
                }}
              >
                Efficiency Recommendations
              </Text>
            </View>
            <View style={{ marginLeft: 22 }}>
              <Text
                style={{
                  fontSize: 10,
                  color: "#1976D2",
                  marginBottom: 4,
                  lineHeight: 14,
                }}
              >
                • Turn off lights when leaving room
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: "#1976D2",
                  marginBottom: 4,
                  lineHeight: 14,
                }}
              >
                • Use LED bulbs instead of incandescent
              </Text>
              <Text style={{ fontSize: 10, color: "#1976D2", lineHeight: 14 }}>
                • Unplug chargers when not in use
              </Text>
            </View>
          </View>
        </View>

        {/* Comparison */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
            Comparison
          </Text>
          <View
            style={{
              backgroundColor: "#F0F9F0",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="arrow-up-outline" size={12} color="#10B981" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  vs Yesterday:
                </Text>
              </View>
              <Text
                style={{ fontSize: 11, fontWeight: "600", color: "#10B981" }}
              >
                +5% increase
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 6,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="arrow-down-outline" size={12} color="#EF4444" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  vs Avg House:
                </Text>
              </View>
              <Text
                style={{ fontSize: 11, fontWeight: "600", color: "#10B981" }}
              >
                12% more efficient
              </Text>
            </View>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#10B981",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  Power monitoring active
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="flash-outline" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  {powerData.power.toFixed(1)}W live
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            Last updated: Just now • Rate: $0.12/kWh • Efficiency: Good
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const ESP32CamStream = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [streamUrl, setStreamUrl] = useState("http://192.168.1.200/stream");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraControls, setCameraControls] = useState({
    flash: false,
    quality: "high",
    motionDetection: true,
  });

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleFlash = () => {
    setCameraControls((prev) => ({ ...prev, flash: !prev.flash }));
    // Send command to ESP32-CAM
    // You would implement this based on your ESP32-CAM API
  };

  const toggleMotionDetection = () => {
    setCameraControls((prev) => ({
      ...prev,
      motionDetection: !prev.motionDetection,
    }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      {/* Header */}
      {!isFullscreen && (
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 20 }}>
          <View
            style={{
              paddingHorizontal: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Ionicons name="camera" size={22} color="white" />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    color: "white",
                    marginBottom: 2,
                  }}
                >
                  Security Camera
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Live surveillance feed
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.2)",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#10B981",
                  marginRight: 6,
                }}
              />
              <Text style={{ color: "white", fontSize: 12, fontWeight: "500" }}>
                Live
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Stream Container */}
      <View
        style={{
          flex: 1,
          margin: isFullscreen ? 0 : 16,
          borderRadius: isFullscreen ? 0 : 4,
          overflow: "hidden",
          backgroundColor: "#000",
          borderWidth: isFullscreen ? 0 : 1,
          borderColor: "#E8F0E8",
        }}
      >
        {/* Loading/Error States */}
        {isLoading && !hasError && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#1a1a1a",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <ActivityIndicator size="large" color="#1B5E20" />
              <Text
                style={{
                  color: "white",
                  marginTop: 12,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                Connecting to camera...
              </Text>
            </View>
          </View>
        )}

        {hasError && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#1a1a1a",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <View style={{ alignItems: "center", padding: 20 }}>
              <Ionicons name="wifi-outline" size={48} color="#DC2626" />
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                  marginTop: 16,
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                Connection Failed
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.8)",
                  textAlign: "center",
                  fontSize: 12,
                  lineHeight: 18,
                  marginBottom: 20,
                }}
              >
                Unable to connect to ESP32-CAM
                {"\n"}
                Please check the IP address and network connection
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: "#1B5E20",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 4,
                  alignItems: "center",
                }}
                onPress={handleRefresh}
              >
                <Ionicons
                  name="refresh"
                  size={16}
                  color="white"
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "500" }}
                >
                  Retry Connection
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* WebView Stream */}
        <WebView
          source={{ uri: streamUrl }}
          style={{ flex: 1 }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          allowsFullscreenVideo={true}
        />

        {/* Controls Overlay */}
        {!isLoading && !hasError && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "space-between",
              padding: 16,
            }}
          >
            <View style={{ alignItems: "flex-end" }}>
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="wifi"
                  size={12}
                  color="white"
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={{ color: "white", fontSize: 11, fontWeight: "500" }}
                >
                  192.168.1.200
                </Text>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 11,
                    marginLeft: 8,
                  }}
                >
                  ● Live
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 8,
                  elevation: 4,
                }}
                onPress={handleRefresh}
              >
                <Ionicons name="refresh" size={20} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 8,
                  elevation: 4,
                }}
                onPress={handleFullscreen}
              >
                <Ionicons
                  name={isFullscreen ? "contract" : "expand"}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 8,
                  elevation: 4,
                }}
                onPress={toggleFlash}
              >
                <Ionicons
                  name={cameraControls.flash ? "flash" : "flash-outline"}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Configuration Panel */}
      {!isFullscreen && (
        <View
          style={{
            backgroundColor: "#FFFFFF",
            margin: 16,
            borderRadius: 4,
            padding: 16,
            borderWidth: 1,
            borderColor: "#E8F0E8",
            elevation: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#1B5E20" }}>
              Camera Settings
            </Text>
            <Text style={{ fontSize: 11, color: "#666" }}>
              Adjust stream settings
            </Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "#333",
                marginBottom: 8,
              }}
            >
              Camera IP Address
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#E8F0E8",
                borderRadius: 4,
                paddingHorizontal: 12,
                backgroundColor: "#F8F9FA",
              }}
            >
              <Ionicons
                name="server-outline"
                size={18}
                color="#666"
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  fontSize: 14,
                  color: "#333",
                }}
                value={streamUrl}
                onChangeText={setStreamUrl}
                placeholder="http://192.168.1.200/stream"
                placeholderTextColor="#999"
                onSubmitEditing={handleRefresh}
              />
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                padding: 12,
                borderRadius: 4,
                backgroundColor: cameraControls.flash ? "#F0F9F0" : "#F8F9FA",
                flex: 1,
                marginHorizontal: 4,
                borderWidth: 1,
                borderColor: cameraControls.flash ? "#2E7D32" : "#E8F0E8",
              }}
              onPress={toggleFlash}
            >
              <Ionicons
                name={cameraControls.flash ? "flash" : "flash-outline"}
                size={20}
                color={cameraControls.flash ? "#2E7D32" : "#666"}
              />
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  color: cameraControls.flash ? "#2E7D32" : "#666",
                  fontWeight: "500",
                }}
              >
                Flash
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                padding: 12,
                borderRadius: 4,
                backgroundColor: "#F8F9FA",
                flex: 1,
                marginHorizontal: 4,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="settings-outline" size={20} color="#666" />
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  color: "#666",
                  fontWeight: "500",
                }}
              >
                Quality
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                padding: 12,
                borderRadius: 4,
                backgroundColor: cameraControls.motionDetection
                  ? "#F0F9F0"
                  : "#F8F9FA",
                flex: 1,
                marginHorizontal: 4,
                borderWidth: 1,
                borderColor: cameraControls.motionDetection
                  ? "#2E7D32"
                  : "#E8F0E8",
              }}
              onPress={toggleMotionDetection}
            >
              <Ionicons
                name={
                  cameraControls.motionDetection
                    ? "alert-circle"
                    : "alert-circle-outline"
                }
                size={20}
                color={cameraControls.motionDetection ? "#2E7D32" : "#666"}
              />
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  color: cameraControls.motionDetection ? "#2E7D32" : "#666",
                  fontWeight: "500",
                }}
              >
                Motion
              </Text>
            </TouchableOpacity>
          </View>

          {/* Camera Status */}
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              marginTop: 16,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#10B981",
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{ fontSize: 12, fontWeight: "500", color: "#333" }}
                >
                  Camera connected
                </Text>
              </View>
              <Text style={{ fontSize: 11, color: "#666" }}>1080p • 30fps</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 12,
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  Latency
                </Text>
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  120ms
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  Bitrate
                </Text>
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  2.5 Mbps
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  Uptime
                </Text>
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  5h 22m
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const SolarPanelControl = () => {
  const [solarPanelStatus, setSolarPanelStatus] = useState("OFF");
  const [solarConnectionStatus, setSolarConnectionStatus] = useState("OFF");
  const [inverterOn, setInverterOn] = useState(false);
  const [gridMode, setGridMode] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(80);
  const [currentPower, setCurrentPower] = useState(240);

  // Fetch data from Firebase
  const fetchStatus = (device, setStatus) => {
    const deviceRef = ref(db, `esp6/devices/${device}/status`);
    onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        setStatus(snapshot.val());
      }
    });
  };

  useEffect(() => {
    fetchStatus("solarPanel", setSolarPanelStatus);
    fetchStatus("SolarConnection", setSolarConnectionStatus);
  }, []);

  // Function to toggle device status
  const toggleDevice = (device, currentStatus, setStatus) => {
    const newStatus = currentStatus === "ON" ? "OFF" : "ON";
    set(ref(db, `esp6/devices/${device}/status`), newStatus);
    setStatus(newStatus);
  };

  const SolarStat = ({ icon, value, label, color = "#1B5E20" }) => (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        padding: 12,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
        borderWidth: 1,
        borderColor: "#E8F0E8",
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#F0F9F0",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
          }}
        >
          <Ionicons name={icon} size={14} color={color} />
        </View>
        <Text style={{ fontSize: 11, color: "#666", fontWeight: "500" }}>
          {label}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: "#1B5E20",
          marginBottom: 2,
        }}
      >
        {value}
      </Text>
    </View>
  );

  const SolarControlCard = ({
    title,
    status,
    onToggle,
    icon,
    description,
    isGrid = false,
  }) => (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        marginBottom: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
        borderWidth: 1,
        borderColor: "#E8F0E8",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: status === "ON" ? "#E8F5E8" : "#F0F9F0",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <Ionicons
              name={icon}
              size={22}
              color={status === "ON" ? "#2E7D32" : "#666"}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}>
              {title}
            </Text>
            <Text style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
              {description}
            </Text>
          </View>
        </View>
        <Switch
          value={status === "ON"}
          onValueChange={onToggle}
          trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
          thumbColor={status === "ON" ? "#1B5E20" : "#FAFAFA"}
          ios_backgroundColor="#E0E0E0"
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 12,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
        }}
      >
        <Ionicons
          name={status === "ON" ? "checkmark-circle" : "close-circle"}
          size={14}
          color={status === "ON" ? "#10B981" : "#666"}
        />
        <Text
          style={{
            fontSize: 11,
            color: status === "ON" ? "#10B981" : "#666",
            marginLeft: 6,
          }}
        >
          {status === "ON" ? "Active" : "Inactive"}
        </Text>
        <Text style={{ fontSize: 10, color: "#666", marginLeft: "auto" }}>
          {isGrid ? (status === "ON" ? "Grid Connected" : "Island Mode") : ""}
        </Text>
      </View>
    </View>
  );

  const BatteryIndicator = ({ level }) => (
    <View style={{ alignItems: "center", marginVertical: 12 }}>
      <Text style={{ fontSize: 11, color: "#666", marginBottom: 8 }}>
        Battery Level
      </Text>
      <View
        style={{
          width: "100%",
          height: 20,
          backgroundColor: "#F0F0F0",
          borderRadius: 10,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#E0E0E0",
          position: "relative",
        }}
      >
        <View
          style={{
            width: `${level}%`,
            height: "100%",
            backgroundColor:
              level > 70 ? "#10B981" : level > 30 ? "#F59E0B" : "#EF4444",
            borderRadius: 10,
          }}
        />
        <Text
          style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            fontSize: 10,
            fontWeight: "600",
            color: level > 50 ? "#FFFFFF" : "#333",
            lineHeight: 20,
          }}
        >
          {level}%
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 4,
        }}
      >
        <Text style={{ fontSize: 9, color: "#999" }}>0%</Text>
        <Text style={{ fontSize: 9, color: "#999" }}>50%</Text>
        <Text style={{ fontSize: 9, color: "#999" }}>100%</Text>
      </View>
    </View>
  );

  const PowerChart = ({ data }) => (
    <View style={{ marginTop: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "600", color: "#1B5E20" }}>
          Today's Production
        </Text>
        <Text style={{ fontSize: 10, color: "#666" }}>Peak: 500W</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: 120,
        }}
      >
        {data.map((item, index) => (
          <View key={index} style={{ alignItems: "center", flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "flex-end", width: 20 }}>
              <View
                style={{
                  height: `${(item.power / 600) * 100}%`,
                  backgroundColor: item.peak ? "#FFA726" : "#4CAF50",
                  borderRadius: 4,
                  width: 20,
                  marginBottom: 4,
                }}
              />
            </View>
            <Text style={{ fontSize: 9, color: "#666", marginTop: 4 }}>
              {item.time}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "600", color: "#333" }}>
              {item.power}W
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Solar Panel Control
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Renewable energy management
          </Text>
        </View>

        {/* Live Stats - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#1B5E20",
              borderRadius: 4,
              padding: 12,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="flash-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {currentPower}W
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Current Output
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons
                  name="battery-charging-outline"
                  size={20}
                  color="white"
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {batteryLevel}%
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Battery
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="sunny-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  3.2 kWh
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Today
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="trending-up-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  Optimal
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Efficiency
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              Updated just now • Solar generation active
            </Text>
          </View>
        </View>

        {/* Electrical Parameters */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 12,
            }}
          >
            System Parameters
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <SolarStat
              icon="flash-outline"
              value="24V"
              label="Voltage"
              color="#1B5E20"
            />
            <View style={{ width: 8 }} />
            <SolarStat
              icon="pulse-outline"
              value="10A"
              label="Current"
              color="#2E7D32"
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <SolarStat
              icon="git-network-outline"
              value="240W"
              label="Power"
              color="#388E3C"
            />
            <View style={{ width: 8 }} />
            <SolarStat
              icon="analytics-outline"
              value="95%"
              label="Efficiency"
              color="#43A047"
            />
          </View>
        </View>

        {/* Battery Indicator */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <BatteryIndicator level={batteryLevel} />
        </View>

        {/* Solar Controls */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 12,
            }}
          >
            System Controls
          </Text>

          <SolarControlCard
            title="Solar Panels"
            status={solarPanelStatus}
            onToggle={() =>
              toggleDevice("solarPanel", solarPanelStatus, setSolarPanelStatus)
            }
            icon="solar-panel-outline"
            description="Photovoltaic solar panels"
          />

          <SolarControlCard
            title="Grid Connection"
            status={solarConnectionStatus}
            onToggle={() =>
              toggleDevice(
                "SolarConnection",
                solarConnectionStatus,
                setSolarConnectionStatus,
              )
            }
            icon="git-network-outline"
            description="Main power grid connection"
            isGrid={true}
          />
        </View>

        {/* Power Chart */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1,
              elevation: 1,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <PowerChart
              data={[
                { time: "10 AM", power: 200, peak: false },
                { time: "11 AM", power: 350, peak: false },
                { time: "12 PM", power: 400, peak: false },
                { time: "1 PM", power: 450, peak: true },
                { time: "2 PM", power: 500, peak: true },
                { time: "3 PM", power: 480, peak: false },
                { time: "4 PM", power: 320, peak: false },
              ]}
            />
          </View>
        </View>

        {/* Energy Production */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
            Energy Production
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ alignItems: "center", flex: 1 }}>
              <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                Today
              </Text>
              <View
                style={{
                  backgroundColor: "#E8F5E8",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#1B5E20",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
                >
                  3.2 kWh
                </Text>
              </View>
            </View>

            <View style={{ alignItems: "center", flex: 1 }}>
              <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                This Month
              </Text>
              <View
                style={{
                  backgroundColor: "#F0F9F0",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
                >
                  45.8 kWh
                </Text>
              </View>
            </View>

            <View style={{ alignItems: "center", flex: 1 }}>
              <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                Savings
              </Text>
              <View
                style={{
                  backgroundColor: "#F0F9F0",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
                >
                  $18.50
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Environmental Impact */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <View
            style={{
              backgroundColor: "#F3F7FF",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#D4E2FF",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Ionicons name="leaf-outline" size={14} color="#1976D2" />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: "#1976D2",
                  marginLeft: 8,
                }}
              >
                Environmental Impact
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#1976D2" }}
                >
                  12.4 kg
                </Text>
                <Text style={{ fontSize: 9, color: "#1976D2" }}>
                  CO₂ Reduced
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#1976D2" }}
                >
                  8 Trees
                </Text>
                <Text style={{ fontSize: 9, color: "#1976D2" }}>
                  Equivalent
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#1976D2" }}
                >
                  45 km
                </Text>
                <Text style={{ fontSize: 9, color: "#1976D2" }}>
                  Car Emissions
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="refresh-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Optimize
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="analytics-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Analytics
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="settings-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor:
                      solarPanelStatus === "ON" ? "#10B981" : "#F59E0B",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  {solarPanelStatus === "ON"
                    ? "Solar generation active"
                    : "Solar panels offline"}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="sunny-outline" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  {currentPower}W output
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            Last updated: Just now • Battery: {batteryLevel}% • Today: 3.2 kWh
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const RobotControl = () => {
  const [isOn, setIsOn] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [robotStatus, setRobotStatus] = useState("Ready");
  const [connectionStatus, setConnectionStatus] = useState("Connected");
  const [activityLog, setActivityLog] = useState([
    "Robot powered ON",
    "System check completed",
    "Sensors calibrated",
    "Ready for operation",
  ]);

  // Read initial status from Firebase
  useEffect(() => {
    const statusRef = ref(db, "robot/status");
    onValue(statusRef, (snapshot) => {
      setIsOn(snapshot.val() === "ON");
    });

    const batteryInterval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(10, prev - 0.1));
    }, 10000);

    return () => clearInterval(batteryInterval);
  }, []);

  const toggleRobot = (value) => {
    const newStatus = value ? "ON" : "OFF";
    setIsOn(value);
    set(ref(db, "robot/status"), newStatus);

    setActivityLog((prev) => [
      `Robot powered ${newStatus}`,
      ...prev.slice(0, 5),
    ]);

    setRobotStatus(value ? "Active" : "Standby");
  };

  const controlButtons = [
    { icon: "arrow-up", label: "Forward", command: "FWD" },
    { icon: "arrow-down", label: "Back", command: "BWD" },
    { icon: "arrow-back", label: "Left", command: "LEFT" },
    { icon: "arrow-forward", label: "Right", command: "RIGHT" },
    { icon: "camera", label: "Camera", command: "CAM" },
    { icon: "scan", label: "Scan", command: "SCAN" },
  ];

  const sendCommand = (command) => {
    setActivityLog((prev) => [`Command sent: ${command}`, ...prev.slice(0, 5)]);
  };

  const RobotControlButton = ({ icon, label, onPress }) => (
    <TouchableOpacity
      style={{
        width: width * 0.28,
        height: width * 0.28,
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
        borderWidth: 1,
        borderColor: "#E8F0E8",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: "#F0F9F0",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        <Ionicons name={icon} size={24} color="#2E7D32" />
      </View>
      <Text style={{ fontSize: 12, fontWeight: "600", color: "#1B5E20" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const ActivityLogItem = ({ log, index }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        borderBottomWidth: index < activityLog.length - 1 ? 1 : 0,
        borderBottomColor: "#F0F0F0",
      }}
    >
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: "#1B5E20",
          marginRight: 8,
        }}
      />
      <Text style={{ fontSize: 11, color: "#666", flex: 1 }}>{log}</Text>
      <Text style={{ fontSize: 9, color: "#999" }}>just now</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Robot Control
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Autonomous assistant v2.0
          </Text>
        </View>

        {/* Status Stats - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#1B5E20",
              borderRadius: 4,
              padding: 12,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="power-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {isOn ? "ON" : "OFF"}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Power
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons
                  name="battery-charging-outline"
                  size={20}
                  color="white"
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {batteryLevel}%
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Battery
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="wifi-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {connectionStatus === "Connected" ? "Yes" : "No"}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Connected
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="speedometer-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {robotStatus}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Status
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              Updated just now • Autonomous system ready
            </Text>
          </View>
        </View>

        {/* Robot Status Card */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1,
              elevation: 1,
              borderWidth: 1,
              borderColor: "#E8F0E8",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: isOn ? "#E8F5E8" : "#F0F9F0",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Ionicons
                  name="robot-outline"
                  size={22}
                  color={isOn ? "#2E7D32" : "#666"}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
                >
                  Robot Assistant
                </Text>
                <Text style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
                  {isOn ? "Active and ready" : "Currently offline"}
                </Text>
              </View>
              <Switch
                value={isOn}
                onValueChange={toggleRobot}
                trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
                thumbColor={isOn ? "#1B5E20" : "#FAFAFA"}
                ios_backgroundColor="#E0E0E0"
              />
            </View>

            {/* Battery Indicator */}
            <View style={{ width: "100%", marginBottom: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text style={{ fontSize: 11, color: "#666" }}>
                  Battery Level
                </Text>
                <Text
                  style={{ fontSize: 11, fontWeight: "600", color: "#1B5E20" }}
                >
                  {batteryLevel}%
                </Text>
              </View>
              <View
                style={{
                  height: 6,
                  backgroundColor: "#F0F0F0",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: `${batteryLevel}%`,
                    backgroundColor:
                      batteryLevel > 70
                        ? "#10B981"
                        : batteryLevel > 30
                          ? "#F59E0B"
                          : "#EF4444",
                    borderRadius: 3,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 2,
                }}
              >
                <Text style={{ fontSize: 9, color: "#999" }}>0%</Text>
                <Text style={{ fontSize: 9, color: "#999" }}>50%</Text>
                <Text style={{ fontSize: 9, color: "#999" }}>100%</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: "#F0F0F0",
                width: "100%",
              }}
            >
              <Ionicons
                name={isOn ? "checkmark-circle" : "close-circle"}
                size={14}
                color={isOn ? "#10B981" : "#666"}
              />
              <Text
                style={{
                  fontSize: 11,
                  color: isOn ? "#10B981" : "#666",
                  marginLeft: 6,
                }}
              >
                {isOn ? "Operational" : "Standby"}
              </Text>
              <View
                style={{
                  marginLeft: "auto",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="wifi" size={12} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  {connectionStatus}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Manual Controls - Only show when robot is ON */}
        {isOn && (
          <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1B5E20",
                marginBottom: 12,
              }}
            >
              Manual Controls
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {controlButtons.map((button) => (
                <RobotControlButton
                  key={button.command}
                  icon={button.icon}
                  label={button.label}
                  onPress={() => sendCommand(button.command)}
                />
              ))}
            </View>
          </View>
        )}

        {/* Movement Controls */}
        {isOn && (
          <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
            <Text style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
              Movement Controls
            </Text>
            <View style={{ alignItems: "center" }}>
              {/* Up Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: 16,
                  borderRadius: 4,
                  marginBottom: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 1,
                  elevation: 1,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                  width: 80,
                  alignItems: "center",
                }}
                onPress={() => sendCommand("FWD")}
              >
                <Ionicons name="arrow-up" size={24} color="#2E7D32" />
              </TouchableOpacity>

              {/* Left/Right/OK Buttons */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: 16,
                    borderRadius: 4,
                    marginRight: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 1,
                    elevation: 1,
                    borderWidth: 1,
                    borderColor: "#E8F0E8",
                    width: 60,
                    alignItems: "center",
                  }}
                  onPress={() => sendCommand("LEFT")}
                >
                  <Ionicons name="arrow-back" size={24} color="#2E7D32" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#1B5E20",
                    padding: 16,
                    borderRadius: 4,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                    width: 60,
                    alignItems: "center",
                  }}
                  onPress={() => sendCommand("STOP")}
                >
                  <Ionicons name="stop" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: 16,
                    borderRadius: 4,
                    marginLeft: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 1,
                    elevation: 1,
                    borderWidth: 1,
                    borderColor: "#E8F0E8",
                    width: 60,
                    alignItems: "center",
                  }}
                  onPress={() => sendCommand("RIGHT")}
                >
                  <Ionicons name="arrow-forward" size={24} color="#2E7D32" />
                </TouchableOpacity>
              </View>

              {/* Down Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: 16,
                  borderRadius: 4,
                  marginTop: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 1,
                  elevation: 1,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                  width: 80,
                  alignItems: "center",
                }}
                onPress={() => sendCommand("BWD")}
              >
                <Ionicons name="arrow-down" size={24} color="#2E7D32" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Activity Log */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 12,
            }}
          >
            Activity Log
          </Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1,
              elevation: 1,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <ScrollView style={{ maxHeight: 150 }}>
              {activityLog.map((log, index) => (
                <ActivityLogItem key={index} log={log} index={index} />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="refresh-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Reboot
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="settings-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Settings
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#FEF2F2",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#FECACA",
              }}
              onPress={() => toggleRobot(false)}
            >
              <Ionicons name="stop-circle-outline" size={16} color="#DC2626" />
              <Text style={{ fontSize: 10, color: "#DC2626", marginTop: 2 }}>
                Emergency Stop
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Robot Status */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <View
            style={{
              backgroundColor: "#F3F7FF",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#D4E2FF",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Ionicons
                name="information-circle-outline"
                size={14}
                color="#1976D2"
              />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: "#1976D2",
                  marginLeft: 8,
                }}
              >
                Robot Status
              </Text>
            </View>
            <Text style={{ fontSize: 10, color: "#1976D2", lineHeight: 14 }}>
              {isOn
                ? "Robot is operational. Battery level adequate. All systems normal."
                : "Robot is in standby mode. Ready to activate when needed."}
            </Text>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: isOn ? "#10B981" : "#F59E0B",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  {isOn ? "Robot active" : "Robot in standby"}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="robot-outline" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  {batteryLevel}% battery
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            Last updated: Just now • Battery: {batteryLevel}% • Status:{" "}
            {robotStatus}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const RadarMonitoring = () => {
  const [autoMode, setAutoMode] = useState(false);
  const [radarActive, setRadarActive] = useState(false);
  const [radarData, setRadarData] = useState({
    objectsDetected: 3,
    nearestObject: "3.5m",
    weather: "Clear",
    temperature: "28°C",
    range: "50m",
    lastUpdate: "Just now",
  });

  const toggleRadar = () => {
    setRadarActive(!radarActive);
    setRadarData((prev) => ({
      ...prev,
      objectsDetected: !radarActive ? 3 : 0,
      nearestObject: !radarActive ? "3.5m" : "No objects",
      lastUpdate: "Just now",
    }));
  };

  const RadarStat = ({ icon, value, label, color = "#1B5E20" }) => (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        padding: 12,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
        borderWidth: 1,
        borderColor: "#E8F0E8",
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#F0F9F0",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
          }}
        >
          <Ionicons name={icon} size={14} color={color} />
        </View>
        <Text style={{ fontSize: 11, color: "#666", fontWeight: "500" }}>
          {label}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: "#1B5E20",
          marginBottom: 2,
        }}
      >
        {value}
      </Text>
    </View>
  );

  const DetectionIndicator = () => (
    <View style={{ alignItems: "center", marginVertical: 20 }}>
      <Text style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        Detection Status
      </Text>
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: radarActive ? "#F0F9F0" : "#F5F5F5",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: radarActive ? "#1B5E20" : "#E0E0E0",
          position: "relative",
        }}
      >
        <Ionicons
          name={radarActive ? "radar" : "radar-outline"}
          size={48}
          color={radarActive ? "#1B5E20" : "#666"}
        />

        {/* Detection dots */}
        {radarActive && radarData.objectsDetected > 0 && (
          <>
            <View
              style={{
                position: "absolute",
                top: 20,
                right: 30,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#EF4444",
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 30,
                right: 20,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#F59E0B",
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 40,
                left: 30,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#3B82F6",
              }}
            />
          </>
        )}
      </View>
      <Text
        style={{
          fontSize: 11,
          color: radarActive ? "#1B5E20" : "#666",
          marginTop: 8,
          fontWeight: "600",
        }}
      >
        {radarActive ? "Scanning Active" : "Radar Inactive"}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Radar Monitoring
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Perimeter security and detection system
          </Text>
        </View>

        {/* Live Stats - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#1B5E20",
              borderRadius: 4,
              padding: 12,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="scan-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {radarData.objectsDetected}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Objects
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="locate-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {radarData.nearestObject}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Nearest
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="thermometer-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {radarData.temperature}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Temp
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="speedometer-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {radarData.range}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Range
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              {radarActive ? "Active scanning" : "Monitoring inactive"} •{" "}
              {radarData.lastUpdate}
            </Text>
          </View>
        </View>

        {/* Detection Visualization */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <DetectionIndicator />
        </View>

        {/* Mode Toggle */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1,
              elevation: 1,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#F0F9F0",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Ionicons name="settings-outline" size={22} color="#2E7D32" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#1B5E20",
                    }}
                  >
                    Operation Mode
                  </Text>
                  <Text style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
                    {autoMode ? "Automatic scanning" : "Manual control"}
                  </Text>
                </View>
              </View>
              <Switch
                value={autoMode}
                onValueChange={setAutoMode}
                trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
                thumbColor={autoMode ? "#1B5E20" : "#FAFAFA"}
                ios_backgroundColor="#E0E0E0"
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: "#F0F0F0",
              }}
            >
              <Ionicons
                name={autoMode ? "checkmark-circle" : "alert-circle-outline"}
                size={14}
                color={autoMode ? "#10B981" : "#666"}
              />
              <Text
                style={{
                  fontSize: 11,
                  color: autoMode ? "#10B981" : "#666",
                  marginLeft: 6,
                }}
              >
                {autoMode ? "Auto mode enabled" : "Manual mode active"}
              </Text>
            </View>
          </View>
        </View>

        {/* Detection Parameters */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 12,
            }}
          >
            Detection Parameters
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <RadarStat
              icon="location-outline"
              value={radarData.nearestObject}
              label="Nearest"
              color="#1B5E20"
            />
            <View style={{ width: 8 }} />
            <RadarStat
              icon="git-compare-outline"
              value={radarData.range}
              label="Range"
              color="#2E7D32"
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <RadarStat
              icon="pulse-outline"
              value={radarData.objectsDetected}
              label="Objects"
              color="#388E3C"
            />
            <View style={{ width: 8 }} />
            <RadarStat
              icon="analytics-outline"
              value={radarData.weather}
              label="Weather"
              color="#43A047"
            />
          </View>
        </View>

        {/* Radar Control */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: radarActive ? "#DC2626" : "#1B5E20",
              paddingVertical: 14,
              borderRadius: 4,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={toggleRadar}
          >
            <Ionicons
              name={radarActive ? "stop-circle" : "play-circle"}
              size={20}
              color="white"
            />
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "600",
                marginLeft: 8,
              }}
            >
              {radarActive ? "STOP RADAR" : "START RADAR"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sensitivity Settings */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
            Sensitivity Level
          </Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              padding: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1,
              elevation: 1,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 11, color: "#666" }}>Low</Text>
              <Text style={{ fontSize: 11, color: "#666" }}>Medium</Text>
              <Text style={{ fontSize: 11, color: "#666" }}>High</Text>
            </View>
            <View
              style={{
                height: 6,
                backgroundColor: "#F0F0F0",
                borderRadius: 3,
                marginVertical: 8,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "75%",
                  backgroundColor: "#1B5E20",
                  borderRadius: 3,
                }}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 9, color: "#999" }}>Fewer alerts</Text>
              <Text style={{ fontSize: 9, color: "#999" }}>Balanced</Text>
              <Text style={{ fontSize: 9, color: "#999" }}>More alerts</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="refresh-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Rescan
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="alert-circle-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Test Alert
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="settings-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Security Status */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <View
            style={{
              backgroundColor: "#F3F7FF",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#D4E2FF",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color="#1976D2"
              />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: "#1976D2",
                  marginLeft: 8,
                }}
              >
                Security Status
              </Text>
            </View>
            <Text style={{ fontSize: 10, color: "#1976D2", lineHeight: 14 }}>
              {radarActive
                ? "Perimeter monitoring active. All systems operational."
                : "Perimeter monitoring inactive. Enable radar for security."}
            </Text>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: radarActive ? "#10B981" : "#F59E0B",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  {radarActive ? "Monitoring active" : "Monitoring inactive"}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="radar-outline" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  {radarData.objectsDetected} objects
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            Last scan: {radarData.lastUpdate} • Objects:{" "}
            {radarData.objectsDetected} • Range: {radarData.range}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const ClothDryingSystem = () => {
  const [position, setPosition] = useState("inside");
  const [systemActive, setSystemActive] = useState(false);
  const [fanSpeed, setFanSpeed] = useState("Medium");
  const [temperature, setTemperature] = useState(35);
  const [timer, setTimer] = useState(60); // minutes
  const [humidity, setHumidity] = useState(45); // percentage

  const updatePosition = (newPosition) => {
    set(ref(db, "esp8/dryingSystem/position"), newPosition);
    setPosition(newPosition);
  };

  const toggleSystem = () => {
    setSystemActive(!systemActive);
    set(ref(db, "esp8/dryingSystem/active"), !systemActive);
  };

  const DryingStat = ({ icon, value, label, color = "#1B5E20" }) => (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        padding: 12,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
        borderWidth: 1,
        borderColor: "#E8F0E8",
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#F0F9F0",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
          }}
        >
          <Ionicons name={icon} size={14} color={color} />
        </View>
        <Text style={{ fontSize: 11, color: "#666", fontWeight: "500" }}>
          {label}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: "#1B5E20",
          marginBottom: 2,
        }}
      >
        {value}
      </Text>
    </View>
  );

  const FanSpeedButton = ({ speed, selected }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: selected ? "#1B5E20" : "#F0F9F0",
        paddingVertical: 10,
        borderRadius: 4,
        alignItems: "center",
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: selected ? "#1B5E20" : "#E8F0E8",
      }}
      onPress={() => setFanSpeed(speed)}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: selected ? "white" : "#1B5E20",
        }}
      >
        {speed}
      </Text>
    </TouchableOpacity>
  );

  const PositionButton = ({ pos, icon }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: position === pos ? "#E8F5E8" : "#FFFFFF",
        padding: 16,
        borderRadius: 4,
        alignItems: "center",
        marginHorizontal: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
        borderWidth: 1,
        borderColor: position === pos ? "#1B5E20" : "#E8F0E8",
      }}
      onPress={() => updatePosition(pos)}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: position === pos ? "#1B5E20" : "#F0F9F0",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        <Ionicons
          name={icon}
          size={24}
          color={position === pos ? "white" : "#2E7D32"}
        />
      </View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: position === pos ? "#1B5E20" : "#333",
        }}
      >
        {pos === "inside" ? "Inside" : "Outside"}
      </Text>
      <Text
        style={{
          fontSize: 11,
          color: position === pos ? "#1B5E20" : "#666",
          marginTop: 2,
          textAlign: "center",
        }}
      >
        {pos === "inside" ? "Indoor drying" : "Outdoor drying"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Same as Dashboard */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Cloth Drying System
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Smart laundry drying control
          </Text>
        </View>

        {/* Live Stats - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
          <View
            style={{
              backgroundColor: "#1B5E20",
              borderRadius: 4,
              padding: 12,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="thermometer-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {temperature}°C
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Temperature
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="water-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {humidity}%
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Humidity
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="timer-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {timer}m
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Time Left
                </Text>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Ionicons name="speedometer-outline" size={20} color="white" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "white",
                    marginTop: 4,
                  }}
                >
                  {fanSpeed}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 1,
                  }}
                >
                  Fan Speed
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
              }}
            >
              {systemActive ? "Drying in progress" : "System ready"} • Position:{" "}
              {position}
            </Text>
          </View>
        </View>

        {/* System Control */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1,
              elevation: 1,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: systemActive ? "#E8F5E8" : "#F0F9F0",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Ionicons
                    name={systemActive ? "flash" : "flash-outline"}
                    size={22}
                    color={systemActive ? "#2E7D32" : "#666"}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#1B5E20",
                    }}
                  >
                    Drying System
                  </Text>
                  <Text style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
                    {systemActive
                      ? "Active - drying clothes"
                      : "Inactive - ready to start"}
                  </Text>
                </View>
              </View>
              <Switch
                value={systemActive}
                onValueChange={toggleSystem}
                trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
                thumbColor={systemActive ? "#1B5E20" : "#FAFAFA"}
                ios_backgroundColor="#E0E0E0"
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: "#F0F0F0",
              }}
            >
              <Ionicons
                name={systemActive ? "checkmark-circle" : "close-circle"}
                size={14}
                color={systemActive ? "#10B981" : "#666"}
              />
              <Text
                style={{
                  fontSize: 11,
                  color: systemActive ? "#10B981" : "#666",
                  marginLeft: 6,
                }}
              >
                {systemActive ? "System running" : "System idle"}
              </Text>
              <Text style={{ fontSize: 10, color: "#666", marginLeft: "auto" }}>
                Power: {systemActive ? "ON" : "OFF"}
              </Text>
            </View>
          </View>
        </View>

        {/* Position Control */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 12,
            }}
          >
            Drying Position
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <PositionButton pos="inside" icon="home-outline" />
            <PositionButton pos="outside" icon="sunny-outline" />
          </View>
        </View>

        {/* Drying Parameters */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1B5E20",
              marginBottom: 12,
            }}
          >
            Drying Parameters
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <DryingStat
              icon="thermometer-outline"
              value={`${temperature}°C`}
              label="Temperature"
              color="#1B5E20"
            />
            <View style={{ width: 8 }} />
            <DryingStat
              icon="water-outline"
              value={`${humidity}%`}
              label="Humidity"
              color="#2E7D32"
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <DryingStat
              icon="timer-outline"
              value={`${timer}m`}
              label="Timer"
              color="#388E3C"
            />
            <View style={{ width: 8 }} />
            <DryingStat
              icon="time-outline"
              value="3.5h"
              label="Est. Time"
              color="#43A047"
            />
          </View>
        </View>

        {/* Temperature Control */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1,
              elevation: 1,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 12, color: "#666" }}>
                Drying Temperature
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "600", color: "#1B5E20" }}
              >
                {temperature}°C
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#F0F9F0",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
                onPress={() => setTemperature(Math.max(20, temperature - 5))}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
                >
                  -5°
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#F0F9F0",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
                onPress={() => setTemperature(Math.max(20, temperature - 1))}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
                >
                  -1°
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#E8F5E8",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#1B5E20",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
                >
                  Set
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#F0F9F0",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
                onPress={() => setTemperature(Math.min(60, temperature + 1))}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
                >
                  +1°
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#F0F9F0",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
                onPress={() => setTemperature(Math.min(60, temperature + 5))}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}
                >
                  +5°
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 9, color: "#999" }}>20°C (Low)</Text>
              <Text style={{ fontSize: 9, color: "#999" }}>40°C (Normal)</Text>
              <Text style={{ fontSize: 9, color: "#999" }}>60°C (High)</Text>
            </View>
          </View>
        </View>

        {/* Fan Speed Control */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
            Fan Speed
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <FanSpeedButton speed="Low" selected={fanSpeed === "Low"} />
            <FanSpeedButton speed="Medium" selected={fanSpeed === "Medium"} />
            <FanSpeedButton speed="High" selected={fanSpeed === "High"} />
            <FanSpeedButton speed="Auto" selected={fanSpeed === "Auto"} />
          </View>
        </View>

        {/* Timer Control */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
            Timer Settings
          </Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              padding: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1,
              elevation: 1,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 11, color: "#666" }}>
                Drying Duration
              </Text>
              <Text
                style={{ fontSize: 11, fontWeight: "600", color: "#1B5E20" }}
              >
                {timer} minutes
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#F0F9F0",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
                onPress={() => setTimer(Math.max(30, timer - 30))}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#1B5E20" }}
                >
                  -30m
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#F0F9F0",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
                onPress={() => setTimer(Math.max(30, timer - 10))}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#1B5E20" }}
                >
                  -10m
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#E8F5E8",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#1B5E20",
                }}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#1B5E20" }}
                >
                  Set Timer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#F0F9F0",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
                onPress={() => setTimer(Math.min(180, timer + 10))}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#1B5E20" }}
                >
                  +10m
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#F0F9F0",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#E8F0E8",
                }}
                onPress={() => setTimer(Math.min(180, timer + 30))}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "#1B5E20" }}
                >
                  +30m
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>
            Quick Programs
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginRight: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="shirt-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Cotton
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="time-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Quick Dry
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#F0F9F0",
                paddingVertical: 8,
                borderRadius: 4,
                alignItems: "center",
                marginLeft: 6,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons name="snow-outline" size={16} color="#2E7D32" />
              <Text style={{ fontSize: 10, color: "#2E7D32", marginTop: 2 }}>
                Delicate
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Drying Tips */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <View
            style={{
              backgroundColor: "#F3F7FF",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#D4E2FF",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Ionicons name="bulb-outline" size={14} color="#1976D2" />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: "#1976D2",
                  marginLeft: 8,
                }}
              >
                Drying Tips
              </Text>
            </View>
            <Text style={{ fontSize: 10, color: "#1976D2", lineHeight: 14 }}>
              • Separate heavy and light fabrics • Don't overload • Clean lint
              filter regularly
            </Text>
          </View>
        </View>

        {/* Status Section - Same as Dashboard */}
        <View style={{ paddingHorizontal: 12, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 12,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: systemActive ? "#10B981" : "#F59E0B",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  {systemActive ? "Drying active" : "System ready"}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="shirt-outline" size={14} color="#666" />
                <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
                  {position} • {temperature}°C
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <Text style={{ fontSize: 9, color: "#999", textAlign: "center" }}>
            Position: {position} • Temp: {temperature}°C • Time: {timer}m •
            Status: {systemActive ? "Active" : "Idle"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

function Practice() {
  const [status, setStatus] = useState("OFF");
  const user = "ubaid shekh"; //dummy user
  const now = new Date();
  const currentTime = now.toLocaleString();
  // const auth = getAuth();
  async function handleButton() {
    const newStatus = status === "ON" ? "OFF" : "ON";
    setStatus(newStatus);
    await set(ref(db, "practice/status"), newStatus);
    await set(ref(db, "practicess/lastControlTime"), currentTime);
  }

  async function getDatabase() {
    const getMethod = await get(ref(db, "practice/status"));
    const data = getMethod.val();
    setStatus(data);
  }
  useEffect(() => {
    getDatabase();
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text>Door Control System</Text>
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          marginTop: 20,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Main Door
        </Text>
        <Text style={{ fontSize: 16 }}>
          status:{" "}
          <Text
            style={{
              fontWeight: "bold",
              color: status === "ON" ? "#228B22" : "red",
            }}
          >
            {status === "ON" ? "UNLOCKED" : "LOCKED"}
          </Text>{" "}
        </Text>
        <Text style={{ fontSize: 16 }}>
          Last Controlled Time:{" "}
          <Text style={{ fontWeight: "bold" }}>{currentTime}</Text>
        </Text>

        {user ? (
          <Text style={{ fontSize: 16 }}>
            Last Controlled By:
            {/*} <Text style={{color: '#228B22'}}> {user.email} </Text>*/}
            <Text style={{ color: "#228B22" }}> {user} </Text> {/* dummy user*/}
          </Text>
        ) : (
          <Text style={{ fontSize: 16 }}>
            Last Controlled By:
            <Text style={{ color: "#228B22" }}> Guest</Text>
          </Text>
        )}
        <TouchableOpacity
          onPress={handleButton}
          style={{
            backgroundColor: status === "ON" ? "#4CAF50" : "red",
            padding: 16,
            borderRadius: 8,
            marginTop: 20,
            color: "white",
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            {status === "ON" ? "UNLOCK" : "LOCK"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AppInfoScreen() {
  const sections = [
    {
      title: "Features",
      icon: "🚀",
      content: `• Control lights, fans, AC, TV, cooler\n• Room-wise control\n• Weather & solar monitoring\n• Voice + Chatbot support\n• Location-based automation\n• Multi-user roles\n• Robot & radar integration`,
    },
    {
      title: "Quick Start",
      icon: "⚡",
      content: `1. Login via Google\n2. Select room\n3. Tap device to control\n4. Use chatbot/voice for smart control\n5. Monitor sensors in real-time`,
    },
    {
      title: "Network Requirements",
      icon: "🌐",
      content: `• Active internet connection\n• Devices on same Wi-Fi (ESP8266)\n• Firebase Database connectivity\n• Optional MQTT for advanced use`,
    },
    {
      title: "Communication Protocols",
      icon: "📡",
      content: `• HTTPS (Firebase Realtime DB)\n• REST API (Weather & Dialogflow)\n• MQTT (optional)\n• WebSocket (future use)`,
    },
    {
      title: "API Endpoints",
      icon: "🔗",
      content: `• Firebase: https://<project>.firebaseio.com/devices.json\n• Weather: https://api.openweathermap.org/...\n• Dialogflow: https://dialogflow.googleapis.com/...`,
    },
    {
      title: "Data Flow",
      icon: "🔄",
      content: `User → App UI → Firebase DB → ESP8266 → Device\n\nSensors → ESP8266 → Firebase DB → App\n\nReal-time sync with cloud for instant control.`,
    },
    {
      title: "Status Check",
      icon: "📊",
      content: `• Device status from Firebase\n• Door activity logs (last opened, frequency)\n• Toggle switches reflect real-time status`,
    },
    {
      title: "Error Handling",
      icon: "❗",
      content: `• City not found → Alert popup\n• No internet → Offline banner\n• Firebase fail → Retry logic\n• API error → Toast message`,
    },
  ];

  return (
    <ScrollView
      style={{
        backgroundColor: "#f0fdf4",
        paddingVertical: 24,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "800",
          textAlign: "center",
          marginBottom: 24,
          color: "#228B22",
        }}
      >
        🏠 Home Automation - App Overview
      </Text>

      {sections.map((section, index) => (
        <View
          key={index}
          style={{
            marginBottom: 24,
            padding: 16,
            backgroundColor: "#fff",
            borderRadius: 12,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>
            {section.icon} {section.title}
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#333" }}>
            {section.content}
          </Text>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function SensorDataScreen() {
  const [voltage, setVoltage] = useState(null);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  const voltageAnim = useRef(new Animated.Value(0)).current;
  const currentAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const voltageSnapshot = await get(ref(db, "/sensors/voltage"));
        const currentSnapshot = await get(ref(db, "/sensors/current"));

        if (voltageSnapshot.exists()) {
          const voltageValue = voltageSnapshot.val();
          setVoltage(voltageValue);
          animateBar(voltageAnim, voltageValue);
        }

        if (currentSnapshot.exists()) {
          const currentValue = currentSnapshot.val();
          setCurrent(currentValue);
          animateBar(currentAnim, currentValue);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
  }, []);

  const animateBar = (bar, value) => {
    Animated.timing(bar, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#e8f5e9",
        }}
      >
        <ActivityIndicator size="large" color="#228B22" />
      </SafeAreaView>
    );
  }

  const MAX_VOLTAGE = 250;
  const MAX_CURRENT = 50;

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "#e8f5e9" }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
          color: "#228B22",
        }}
      >
        Consumption Details
      </Text>

      {/* Voltage Card */}
      <View
        style={{
          backgroundColor: "#ffffff",
          padding: 25,
          marginVertical: 15,
          borderRadius: 16,
          elevation: 6,
        }}
      >
        <Text style={{ fontSize: 20, color: "#555", marginBottom: 10 }}>
          Voltage
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#228B22" }}>
          {voltage} V
        </Text>
        <View
          style={{
            height: 15,
            backgroundColor: "#c8e6c9",
            borderRadius: 10,
            overflow: "hidden",
            marginTop: 15,
          }}
        >
          <Animated.View
            style={{
              height: "100%",
              width: voltageAnim.interpolate({
                inputRange: [0, MAX_VOLTAGE],
                outputRange: ["0%", "100%"],
                extrapolate: "clamp",
              }),
              backgroundColor: "#228B22",
            }}
          />
        </View>
      </View>

      {/* Current Card */}
      <View
        style={{
          backgroundColor: "#ffffff",
          padding: 25,
          marginVertical: 15,
          borderRadius: 16,
          elevation: 6,
        }}
      >
        <Text style={{ fontSize: 20, color: "#555", marginBottom: 10 }}>
          Current
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#228B22" }}>
          {current} A
        </Text>
        <View
          style={{
            height: 15,
            backgroundColor: "#c8e6c9",
            borderRadius: 10,
            overflow: "hidden",
            marginTop: 15,
          }}
        >
          <Animated.View
            style={{
              height: "100%",
              width: currentAnim.interpolate({
                inputRange: [0, MAX_CURRENT],
                outputRange: ["0%", "100%"],
                extrapolate: "clamp",
              }),
              backgroundColor: "#228B22",
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function SettningsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#1B5E20",
        }}
      >
        Settings
      </Text>

      {/* Notifications Toggle */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          padding: 15,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          elevation: 2,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color="#1B5E20"
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 16 }}>Enable Notifications</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
          thumbColor={notificationsEnabled ? "#1B5E20" : "#ccc"}
        />
      </View>

      {/* About Button */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          marginBottom: 20,
          elevation: 2,
        }}
      >
        <Ionicons
          name="information-circle-outline"
          size={22}
          color="#1B5E20"
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontSize: 16 }}>About</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          elevation: 2,
        }}
      >
        <Ionicons
          name="log-out-outline"
          size={22}
          color="#1B5E20"
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const MoreScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F5F5",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#1B5E20",
        }}
      >
        More Options
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("SettingsScreen")}
        style={{
          backgroundColor: "#C8E6C9",
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 18, color: "#1B5E20" }}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(AppInfoScreen)}
        style={{
          backgroundColor: "#C8E6C9",
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 18, color: "#1B5E20" }}>App Info</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        style={{
          backgroundColor: "#C8E6C9",
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 18, color: "#1B5E20" }}>Login / Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const WeatherAutomationScreen = () => {
  const [city, setCity] = useState("Delhi");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [windSpeed, setWindSpeed] = useState(null);
  const [windDirection, setWindDirection] = useState("");
  const [pressure, setPressure] = useState(null);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoMode, setAutoMode] = useState(true);
  const [automationLogs, setAutomationLogs] = useState([]);
  const API_KEY_WEATHER = process.env.EXPO_PUBLIC_API_KEY_WEATHER;

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY_WEATHER}`,
      );

      const data = response.data;

      setTemperature(data.main.temp);
      setHumidity(data.main.humidity);
      setWeatherCondition(data.weather[0].main);
      setWindSpeed(data.wind.speed);
      setWindDirection(getDirection(data.wind.deg));
      setPressure(data.main.pressure);
      setSunrise(convertUnixToTime(data.sys.sunrise));
      setSunset(convertUnixToTime(data.sys.sunset));

      if (autoMode) {
        autoWeatherControl(
          data.main.temp,
          data.main.humidity,
          data.weather[0].main,
          convertUnixToTime(data.sys.sunrise),
          convertUnixToTime(data.sys.sunset),
        );
      }
    } catch (err) {
      setError("City not found or network error");
    } finally {
      setLoading(false);
    }
  };

  const convertUnixToTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDirection = (degree) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    const index = Math.round(degree / 45);
    return directions[index];
  };

  const autoWeatherControl = (temp, hum, cond, rise, setTime) => {
    const logs = [];
    const currentTime = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (temp > 30) {
      set(ref(db, "devices/AC"), { status: "ON" });
      logs.push({
        icon: "🌡️",
        message: "Temperature high → turning ON AC",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "temperature",
      });
    } else if (temp < 18) {
      set(ref(db, "devices/Heater"), { status: "ON" });
      logs.push({
        icon: "❄️",
        message: "It's cold → turning ON Heater",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "temperature",
      });
    }

    if (hum > 70) {
      set(ref(db, "devices/ExhaustFan"), { status: "ON" });
      logs.push({
        icon: "💧",
        message: "Humidity high → turning ON Exhaust Fan",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "humidity",
      });
    } else if (hum < 30) {
      set(ref(db, "devices/Humidifier"), { status: "ON" });
      logs.push({
        icon: "💨",
        message: "Humidity low → turning ON Humidifier",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "humidity",
      });
    }

    if (currentTime === setTime) {
      set(ref(db, "devices/Lights"), { status: "ON" });
      set(ref(db, "devices/Curtains"), { status: "CLOSED" });
      logs.push({
        icon: "🌆",
        message: "Sunset → turning ON lights and closing curtains",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "time",
      });
    }

    if (currentTime === rise) {
      set(ref(db, "devices/Lights"), { status: "OFF" });
      set(ref(db, "devices/Curtains"), { status: "OPEN" });
      logs.push({
        icon: "🌅",
        message: "Sunrise → turning OFF lights and opening curtains",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "time",
      });
    }

    if (cond.toLowerCase().includes("rain")) {
      set(ref(db, "/devices/Window/"), "CLOSED");
      set(ref(db, "/esp8/dryingSystem/position"), "inside");
      logs.push({
        icon: "🌧️",
        message: "Rain → closing windows and stopping drying system",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "weather",
      });
    }

    setAutomationLogs((prev) => [logs[logs.length - 1], ...prev.slice(0, 4)]);
  };

  useEffect(() => {
    let interval;
    if (autoMode && city) {
      interval = setInterval(
        () => {
          fetchWeather();
        },
        5 * 60 * 1000,
      ); // every 5 minutes
    }
    return () => clearInterval(interval);
  }, [autoMode, city]);

  // Weather Metric Component - Consistent with theme
  const WeatherMetric = ({ icon, value, label, unit = "" }) => (
    <View style={{ alignItems: "center", flex: 1, paddingHorizontal: 4 }}>
      <Text style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>
        {label}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 14, color: "#333", marginRight: 2 }}>
          {icon}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#1B5E20" }}>
          {value}
          {unit}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ backgroundColor: "#1B5E20", paddingVertical: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            Weather Automation
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Smart climate control based on weather
          </Text>
        </View>

        {/* Search Section */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#F8F9FA",
                borderRadius: 4,
                paddingHorizontal: 12,
                paddingVertical: 10,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <Ionicons
                name="location-outline"
                size={18}
                color="#666"
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: "#333",
                  padding: 0,
                }}
                placeholder="Enter city name..."
                placeholderTextColor="#999"
                value={city}
                onChangeText={setCity}
                onSubmitEditing={fetchWeather}
                returnKeyType="search"
              />
            </View>
            <TouchableOpacity
              onPress={fetchWeather}
              style={{
                backgroundColor: "#1B5E20",
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 4,
                marginLeft: 8,
                justifyContent: "center",
                alignItems: "center",
                elevation: 1,
              }}
            >
              <Ionicons name="search" size={18} color="white" />
            </TouchableOpacity>
          </View>

          {/* Auto Mode Toggle */}
          <TouchableOpacity
            onPress={() => {
              setAutoMode(!autoMode);
              if (!autoMode) fetchWeather();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: autoMode ? "#F0F9F0" : "#F8F9FA",
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 4,
              marginTop: 12,
              borderWidth: 1,
              borderColor: autoMode ? "#2E7D32" : "#E8F0E8",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name={autoMode ? "toggle" : "toggle-outline"}
              size={18}
              color={autoMode ? "#2E7D32" : "#666"}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: autoMode ? "#1B5E20" : "#666",
              }}
            >
              {autoMode ? "Auto Mode: ON" : "Auto Mode: OFF"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Weather Card */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          {loading ? (
            <View
              style={{
                backgroundColor: "#F8F9FA",
                borderRadius: 4,
                padding: 32,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <ActivityIndicator size="small" color="#1B5E20" />
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  color: "#666",
                }}
              >
                Fetching weather data...
              </Text>
            </View>
          ) : error ? (
            <View
              style={{
                backgroundColor: "#FEF2F2",
                borderRadius: 4,
                padding: 20,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#FECACA",
              }}
            >
              <Ionicons name="warning-outline" size={24} color="#DC2626" />
              <Text
                style={{
                  color: "#DC2626",
                  marginTop: 8,
                  fontSize: 12,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {error}
              </Text>
              <TouchableOpacity
                onPress={() => fetchWeather()}
                style={{
                  marginTop: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: "#1B5E20",
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 12, fontWeight: "500" }}
                >
                  Retry
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            temperature !== null && (
              <View
                style={{
                  backgroundColor: "#1B5E20",
                  borderRadius: 4,
                  padding: 16,
                  elevation: 1,
                }}
              >
                {/* City and Temperature */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      {city.toUpperCase()}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.9)",
                        marginTop: 2,
                        textTransform: "capitalize",
                      }}
                    >
                      {weatherCondition}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 36,
                      fontWeight: "600",
                      color: "white",
                    }}
                  >
                    {Math.round(temperature)}°
                  </Text>
                </View>

                {/* Weather Metrics Grid */}
                <View style={{ marginBottom: 12 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <WeatherMetric
                      icon="💧"
                      value={humidity}
                      label="Humidity"
                      unit="%"
                    />
                    <WeatherMetric
                      icon="🌬️"
                      value={Math.round(windSpeed * 3.6)}
                      label="Wind"
                      unit=" km/h"
                    />
                    <WeatherMetric
                      icon="🧭"
                      value={windDirection}
                      label="Direction"
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <WeatherMetric
                      icon="🌡️"
                      value={pressure}
                      label="Pressure"
                      unit=" mb"
                    />
                    <WeatherMetric icon="🌅" value={sunrise} label="Sunrise" />
                    <WeatherMetric icon="🌇" value={sunset} label="Sunset" />
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.8)",
                    textAlign: "center",
                    marginTop: 8,
                  }}
                >
                  Real-time weather data
                </Text>
              </View>
            )
          )}
        </View>

        {/* Automation Logs */}
        {automationLogs.length > 0 && (
          <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#1B5E20",
                }}
              >
                Automation Logs
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: "#666",
                }}
              >
                Latest actions
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#F8F9FA",
                borderRadius: 4,
                padding: 16,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              {automationLogs.map((log, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: 12,
                    paddingBottom: 12,
                    borderBottomWidth:
                      index === automationLogs.length - 1 ? 0 : 1,
                    borderBottomColor: "#E8F0E8",
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: getLogColor(log.type),
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>{log.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "#333",
                        marginBottom: 2,
                      }}
                    >
                      {log.message}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#666",
                      }}
                    >
                      {log.time}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Automation Status */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 4,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E8F0E8",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: autoMode ? "#10B981" : "#666",
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{ fontSize: 12, fontWeight: "500", color: "#333" }}
                >
                  {autoMode ? "Automation active" : "Automation paused"}
                </Text>
              </View>
              <Text style={{ fontSize: 11, color: "#666" }}>
                {autoMode ? "Monitoring" : "Manual"}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 12,
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  Refresh interval
                </Text>
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  5 min
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  Last updated
                </Text>
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  Just now
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>
                  Logs
                </Text>
                <Text
                  style={{ fontSize: 11, fontWeight: "500", color: "#333" }}
                >
                  {automationLogs.length} recent
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Helper function for log colors
const getLogColor = (type) => {
  switch (type) {
    case "temperature":
      return "#FEF3C7"; // Light yellow
    case "humidity":
      return "#DBEAFE"; // Light blue
    case "weather":
      return "#E0E7FF"; // Light purple
    case "time":
      return "#D1FAE5"; // Light green
    default:
      return "#F3F4F6"; // Light gray
  }
};

function Screen() {
  return (
    <Stack.Navigator initialRouteName="AutomationCategory">
      <Stack.Screen
        name="TopTabDevices"
        component={TopTabDevice}
        options={{
          tabBarLabel: "home",
        }}
      />

      {/* <Stack.Screen name="DeviceControl" component={DeviceControl} options={{headerShown:false}}/>*/}
      <Stack.Screen
        name="RadarTrackingPage"
        component={RadarTrackingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettningsScreen"
        component={SettningsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Practice"
        component={Practice}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatBoat"
        component={ChatBoat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClothDryingSystem"
        component={ClothDryingSystem}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RadarMonitoring"
        component={RadarMonitoring}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RobotControl"
        component={RobotControl}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MainAppliances"
        component={MainAppliances}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SolarPanelControl"
        component={SolarPanelControl}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PowerConsumptionBedRoomScreen"
        component={PowerConsumptionBedRoomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ESP32CamStream"
        component={ESP32CamStream}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TVRemote"
        component={TVRemote}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StudyRoom"
        component={StudyRoom}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AppInfoScreen"
        component={AppInfoScreen}
        options={{
          tabBarLabel: "About",
        }}
      />
      <Stack.Screen
        name="LivingRoom"
        component={LivingRoom}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BedRoom"
        component={BedRoom}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="kichenRoom"
        component={KichenRoom}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BathRoomPage"
        component={BathRoom}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AutomationCategory"
        component={AutomationCategory}
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

// For the Screen component (Dashboard), you should set header options separately
// In your Screen component or in a Stack Navigator wrapper:

function TopTabDevice({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          headerShown: true,
          title: "Smart Home",

          headerStyle: {
            backgroundColor: "#1B5E20",
            elevation: 0,
            shadowColor: "transparent",
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 18,
            fontWeight: "600",
          },

          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1B5E20",
          height: 50,
          elevation: 4,
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(255,255,255,0.7)",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          textTransform: "capitalize",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#81C784",
          height: 3,
        },
      }}
    >
      <TopTab.Screen
        name="Dashboard"
        component={Screen}
        options={{
          title: "Dashboard",
        }}
      />
      <TopTab.Screen
        name="TV Remote"
        component={TVRemote}
        options={{
          title: "TV Remote",
        }}
      />
      <TopTab.Screen
        name="AC Control"
        component={Airconditionar}
        options={{
          title: "AC Control",
        }}
      />
      <TopTab.Screen
        name="Weather"
        component={WeatherAutomationScreen}
        options={{
          title: "Weather",
        }}
      />
    </TopTab.Navigator>
  );
}

function NewScreen() {
  const { token, setToken } = useStore();

  if (token == true) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={WelcomeScreen}
            name="Welcome"
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#E8F0E8",
            paddingBottom: Platform.OS === "ios" ? 20 : 5,
            paddingTop: 8,
            height: Platform.OS === "ios" ? 85 : 70,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
          },
          tabBarActiveTintColor: "#1B5E20",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginTop: 2,
          },
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            let iconSize = 22;

            switch (route.name) {
              case "Home":
                iconName = focused ? "home" : "home-outline";
                break;
              case "Appliances":
                iconName = focused ? "flash" : "flash-outline";
                break;
              case "Camera":
                iconName = focused ? "camera" : "camera-outline";
                break;
              case "Radar":
                iconName = focused ? "radar" : "radar-outline";
                break;
              case "Assistant":
                iconName = focused
                  ? "chatbubble-ellipses"
                  : "chatbubble-ellipses-outline";
                break;
              case "DoorControl":
                iconName = focused ? "lock-closed" : "lock-closed-outline";
                break;
              case "Info":
                iconName = focused
                  ? "information-circle"
                  : "information-circle-outline";
                break;
              case "Sensors":
                iconName = focused ? "stats-chart" : "stats-chart-outline";
                break;
              case "Menu":
                iconName = focused ? "menu" : "menu-outline";
                break;
              default:
                iconName = "ellipse-outline";
                break;
            }

            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: focused ? "#F0F9F0" : "transparent",
                }}
              >
                <Ionicons name={iconName} size={iconSize} color={color} />
              </View>
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={TopTabDevice}
          options={{
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name="Appliances"
          component={MainAppliances}
          options={{
            tabBarLabel: "Appliances",
          }}
        />
        <Tab.Screen
          name="Camera"
          component={ESP32CamStream}
          options={{
            tabBarLabel: "Camera",
          }}
        />
        <Tab.Screen
          name="Radar"
          component={RadarTrackingPage}
          options={{
            tabBarLabel: "Radar",
          }}
        />
        <Tab.Screen
          name="Assistant"
          component={ChatBoat}
          options={{
            tabBarLabel: "Assistant",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  statusBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    marginBottom: 20,
  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginRight: 115,
  },

  text: {
    marginVertical: 1,
    paddingTop: 50,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "#FFA500",
    padding: 20,
    paddingHorizontal: 76,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  kichenBathroom: {
    flexDirection: "row",
    marginBottom: 0,
    marginTop: 2,
  },
  kichen: {
    margin: 10,
    paddingHorizontal: 68,
    paddingVertical: 50,
    borderRadius: 10,
    fontWeight: "bold",
    backgroundColor: "white", //#B2AC88
    elevation: 9,
  },
  bathRoom: {
    margin: 10,
    paddingHorizontal: 60,
    paddingVertical: 50,
    borderRadius: 10,
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    elevation: 9,
  },
  BedLiving: {
    flexDirection: "row",
    marginBottom: 0,
  },
  Bed: {
    margin: 10,
    paddingVertical: 50,
    paddingHorizontal: 58,
    borderRadius: 10,
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    elevation: 9,
  },
  Living: {
    margin: 10,
    paddingVertical: 50,
    paddingHorizontal: 54,

    borderRadius: 10,
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    elevation: 9,
  },
  studyUtility: {
    flexDirection: "row",
  },
  study: {
    margin: 10,
    paddingVertical: 50,
    paddingHorizontal: 62,
    borderRadius: 10,
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    elevation: 9,
  },
  utility: {
    margin: 10,
    paddingVertical: 50,
    paddingHorizontal: 62,
    borderRadius: 10,
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    elevation: 9,
  },

  textInput: {
    backgroundColor: "#660000",
    marginHorizontal: 50,
    marginVertical: 10,
    borderRadius: 10,
    marginTop: 50,
    alignItems: "center",
  },
  text: {
    padding: 10,
    paddingHorizontal: 80,
    paddingVertical: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    borderRadius: 80,
  },
  color: {
    backgroundColor: "#800000",
  },
  kichenRoomButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  kichenRoomText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginHorizontal: 50,
    color: "white",
  },
  kichenRoom: {
    margin: 10,
    borderRadius: 20,
  },
  on: {
    padding: 10,
    paddingHorizontal: 50,
    fontSize: 20,
    backgroundColor: "red",
    marginHorizontal: 30,
    borderRadius: 20,
    color: "white",
  },
  of: {
    padding: 10,
    paddingHorizontal: 50,
    fontSize: 20,
    backgroundColor: "red",
    marginHorizontal: 30,
    borderRadius: 20,
    color: "white",
  },

  parkingAreaContainer: {
    flex: 1,
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  status: { fontSize: 18, color: "#fff", marginHorizontal: 20 },
  button: {
    backgroundColor: "#228B22",
    height: "9%",
    padding: 10,
    margin: 5,
    borderRadius: 8,
  },
  powerButton: { backgroundColor: "red" },
  buttonText: { color: "#fff", fontSize: 15 },
  navigation: { alignItems: "center", marginTop: 20 },

  container2: {
    padding: 20,
  },
  weatherContainer: {
    flexDirection: "row",
    backgroundColor: "#4682B4",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  weatherInfo: {
    flex: 1,
  },
  weatherText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
  },
  weatherLocation: {
    color: "white",
  },
  weatherIcon: {
    marginLeft: 20,
  },
  roomRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  room: {
    alignItems: "center",
  },
  label: {
    color: "white",
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  container4: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F8FF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4682B4",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4682B4",
    marginTop: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container5: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  container6: {
    padding: 16,
    marginTop: 20,
    backgroundColor: "#f4f4f4",
  },
  card: {
    marginBottom: 16,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  headerMargin: {
    marginTop: 10,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  statusText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 8,
  },
  highlight: {
    fontWeight: "bold",
    color: "#007bff",
  },
  deviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  deviceText: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
  modeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 4,
  },

  container7: {
    elevation: 5,
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  card: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  headerMargin: {
    marginTop: 10,
  },
  doorRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locked: {
    backgroundColor: "#ffebee",
  },
  unlocked: {
    backgroundColor: "#e8f5e9",
  },
  doorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  doorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B5E20",
    marginBottom: 2,
  },
  deviceSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  consumptionContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  consumptionText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#1B5E20",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginTop: 10,
    flexDirection: "row",
    shadowColor: "#1B5E20",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B5E20",
    marginBottom: 2,
  },
  deviceSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  consumptionContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  consumptionText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#1B5E20",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginTop: 10,
    flexDirection: "row",
    shadowColor: "#1B5E20",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  trendText: {
    fontSize: 14,
    color: "#FF6B6B",
    fontWeight: "600",
    marginLeft: 4,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  costCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  costTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 16,
    textAlign: "center",
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  costItem: {
    alignItems: "center",
    flex: 1,
  },
  costLabel: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 4,
  },
  costValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#27AE60",
  },
  costDivider: {
    width: 1,
    backgroundColor: "#ECF0F1",
    marginHorizontal: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#ECF0F1",
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#27AE60",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#7F8C8D",
    textAlign: "center",
  },
  tipsCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 6,
  },
  tipText: {
    fontSize: 14,
    color: "#5D6D7E",
    marginLeft: 8,
    flex: 1,
  },
  header: {
    backgroundColor: "linear-gradient(135deg, #228B22, #32CD32)",
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginTop: 2,
  },
  connectionStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  streamContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 3,
    borderColor: "rgba(34, 139, 34, 0.3)",
    backgroundColor: "#000",
  },
  fullscreenContainer: {
    margin: 0,
    borderRadius: 0,
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    alignItems: "center",
    padding: 20,
  },
  errorTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  retryButton: {
    flexDirection: "row",
    backgroundColor: "#228B22",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  retryText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
  webview: {
    flex: 1,
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    padding: 16,
  },
  controlsTop: {
    alignItems: "flex-end",
  },
  streamInfo: {
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  infoText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  controlsBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButton: {
    backgroundColor: "rgba(0,0,0,0.7)",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  configPanel: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  configTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f8f9fa",
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  quickButton: {
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
    minWidth: 80,
  },
  quickButtonText: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  header: {
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#FFA726",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2c3e50",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 2,
  },
  connectionStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  mainStatusCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  powerOutput: {
    alignItems: "center",
    marginBottom: 20,
  },
  powerLabel: {
    fontSize: 16,
    color: "#7f8c8d",
    fontWeight: "600",
    marginBottom: 8,
  },
  powerValue: {
    fontSize: 48,
    fontWeight: "800",
    color: "#2c3e50",
    marginBottom: 8,
  },
  powerTrend: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fff0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
    marginLeft: 4,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    fontWeight: "600",
    textAlign: "center",
  },
  batteryContainer: {
    width: 40,
    height: 20,
    backgroundColor: "#ecf0f1",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 8,
  },
  batteryFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 2,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statCardValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2c3e50",
    marginBottom: 4,
  },
  statCardLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    fontWeight: "600",
    textAlign: "center",
  },
  controlsContainer: {
    marginBottom: 16,
  },
  controlButton: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  controlButtonActive: {
    borderLeftWidth: 6,
    borderLeftColor: "#4CAF50",
  },
  controlButtonInactive: {
    borderLeftWidth: 6,
    borderLeftColor: "#ff6b6b",
  },
  gridConnected: {
    borderLeftWidth: 6,
    borderLeftColor: "#FFA726",
  },
  gridDisconnected: {
    borderLeftWidth: 6,
    borderLeftColor: "#95a5a6",
  },
  controlButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  controlText: {
    marginLeft: 12,
    flex: 1,
  },
  controlButtonTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 4,
  },
  controlButtonSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 50,
    alignItems: "center",
  },
  statusOn: {
    backgroundColor: "#4CAF50",
  },
  statusOff: {
    backgroundColor: "#ff6b6b",
  },
  chartContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c3e50",
  },
  chartSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    fontWeight: "600",
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 200,
    paddingHorizontal: 10,
  },
  chartBarContainer: {
    alignItems: "center",
    flex: 1,
  },
  chartBarWrapper: {
    height: 120,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 8,
  },
  chartBar: {
    width: 20,
    borderRadius: 10,
    minHeight: 4,
  },
  chartTime: {
    fontSize: 10,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 4,
  },
  chartPower: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2c3e50",
  },
  environmentCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  environmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  environmentTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
    marginLeft: 8,
  },
  environmentStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  environmentStat: {
    alignItems: "center",
    flex: 1,
  },
  environmentValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4CAF50",
    marginBottom: 4,
  },
  environmentLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default NewScreen;
