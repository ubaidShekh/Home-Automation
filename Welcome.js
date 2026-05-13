import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import useStore from "./zustand";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
  const { token, setToken } = useStore();
  const [activeTab, setActiveTab] = useState("home");
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm your SmartHome AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const chatAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const features = [
    {
      icon: "ios-home",
      title: "Smart Control",
      description: "Control all devices from one place",
    },
    {
      icon: "ios-shield-checkmark",
      title: "Home Security",
      description: "Monitor with advanced security",
    },
    {
      icon: "ios-flash",
      title: "Energy Saving",
      description: "Reduce consumption automatically",
    },
    {
      icon: "ios-chatbubble",
      title: "AI Assistant",
      description: "Control through natural language",
    },
  ];

  const devices = [
    {
      id: "1",
      name: "Living Room Lights",
      icon: "lightbulb",
      type: "light",
      status: true,
      room: "Living Room",
    },
    {
      id: "2",
      name: "Thermostat",
      icon: "thermostat",
      type: "climate",
      status: false,
      room: "Living Room",
    },
    {
      id: "3",
      name: "Security Camera",
      icon: "videocam",
      type: "security",
      status: true,
      room: "Front Door",
    },
    {
      id: "4",
      name: "Smart Lock",
      icon: "lock",
      type: "security",
      status: false,
      room: "Main Entrance",
    },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (showChat) {
      Animated.timing(chatAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(chatAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showChat]);

  const toggleDevice = (deviceId) => {
    // In a real app, this would call your IoT API
    Alert.alert("Device Control", "Device status updated!");
  };

  const processAIMessage = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("turn on") ||
      lowerMessage.includes("switch on")
    ) {
      if (lowerMessage.includes("light") || lowerMessage.includes("lights")) {
        return "I've turned on the living room lights for you.";
      }
      if (lowerMessage.includes("thermostat") || lowerMessage.includes("ac")) {
        return "I've activated the thermostat. Setting to 72°F.";
      }
      if (
        lowerMessage.includes("camera") ||
        lowerMessage.includes("security")
      ) {
        return "Security cameras are now active.";
      }
    }

    if (
      lowerMessage.includes("turn off") ||
      lowerMessage.includes("switch off")
    ) {
      if (lowerMessage.includes("light") || lowerMessage.includes("lights")) {
        return "I've turned off the living room lights.";
      }
      if (lowerMessage.includes("thermostat") || lowerMessage.includes("ac")) {
        return "Thermostat has been turned off.";
      }
    }

    if (
      lowerMessage.includes("temperature") ||
      lowerMessage.includes("thermostat")
    ) {
      return "Current temperature is 72°F. Say 'set to 68°F' to adjust.";
    }

    if (lowerMessage.includes("status") || lowerMessage.includes("devices")) {
      const activeDevices = devices.filter((d) => d.status).length;
      return `${activeDevices} of ${devices.length} devices active. Lights and cameras are on.`;
    }

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! I'm your SmartHome AI assistant. I can help you control devices.";
    }

    return "I can help control your smart home. Try 'turn on lights' or 'check status'.";
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setMessage("");

    setTimeout(() => {
      const aiResponse = processAIMessage(message);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const renderFeature = (feature, index) => (
    <Animated.View
      key={index}
      style={[
        styles.featureCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.featureIconContainer}>
        <Ionicons name={feature.icon} size={24} color="#2E7D32" />
      </View>
      <Text style={styles.featureTitle}>{feature.title}</Text>
      <Text style={styles.featureDescription}>{feature.description}</Text>
    </Animated.View>
  );

  const renderDevice = (device, index) => (
    <TouchableOpacity
      key={device.id}
      style={styles.deviceCard}
      onPress={() => toggleDevice(device.id)}
    >
      <View
        style={[
          styles.deviceIconContainer,
          { backgroundColor: device.status ? "#E8F5E9" : "#F8F9FA" },
        ]}
      >
        <MaterialIcons
          name={device.icon}
          size={20}
          color={device.status ? "#2E7D32" : "#666"}
        />
      </View>
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{device.name}</Text>
        <Text style={styles.deviceRoom}>{device.room}</Text>
      </View>
      <View
        style={[
          styles.statusIndicator,
          { backgroundColor: device.status ? "#10B981" : "#DC2626" },
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Smart Home</Text>
        <View style={styles.logoContainer}>
          <Entypo name="leaf" size={16} color="#81C784" />
          <Text style={styles.logoSubtext}>EcoSmart</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Welcome Home</Text>
          <Text style={styles.heroSubtitle}>
            Control, automate, and monitor your smart home
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{devices.length}</Text>
            <Text style={styles.statLabel}>Devices</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Rooms</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>23%</Text>
            <Text style={styles.statLabel}>Energy Saved</Text>
          </View>
        </View>

        {/* Device Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Devices</Text>
            <Text style={styles.seeAllText}>All devices</Text>
          </View>
          <View style={styles.devicesGrid}>{devices.map(renderDevice)}</View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart Features</Text>
          <View style={styles.featuresGrid}>{features.map(renderFeature)}</View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <View
                style={[styles.quickActionIcon, { backgroundColor: "#E8F5E9" }]}
              >
                <Ionicons name="power" size={20} color="#2E7D32" />
              </View>
              <Text style={styles.quickActionText}>All On</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton}>
              <View
                style={[styles.quickActionIcon, { backgroundColor: "#FEF3C7" }]}
              >
                <Ionicons name="moon" size={20} color="#D97706" />
              </View>
              <Text style={styles.quickActionText}>Sleep Mode</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton}>
              <View
                style={[styles.quickActionIcon, { backgroundColor: "#DBEAFE" }]}
              >
                <Ionicons name="location" size={20} color="#1D4ED8" />
              </View>
              <Text style={styles.quickActionText}>Away</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton}>
              <View
                style={[styles.quickActionIcon, { backgroundColor: "#FCE7F3" }]}
              >
                <Ionicons name="snow" size={20} color="#BE185D" />
              </View>
              <Text style={styles.quickActionText}>Eco Mode</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Go Fully Smart?</Text>
          <Text style={styles.ctaDescription}>
            Experience the future of home automation with AI-powered control
          </Text>

          <TouchableOpacity style={styles.primaryButton} onPress={setToken}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color="white"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#1B5E20",
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    paddingTop: 60,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginBottom: 4,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoSubtext: {
    fontSize: 12,
    color: "#81C784",
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1B5E20",
    marginBottom: 8,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    marginHorizontal: 16,
    borderRadius: 4,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E8F0E8",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E8F0E8",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B5E20",
  },
  seeAllText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },
  devicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  deviceCard: {
    width: (Dimensions.get("window").width - 48) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8F0E8",
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  deviceIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  deviceRoom: {
    fontSize: 10,
    color: "#666",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: (Dimensions.get("window").width - 48) / 2,
    backgroundColor: "#F8F9FA",
    borderRadius: 4,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8F0E8",
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F9F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1B5E20",
    textAlign: "center",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    lineHeight: 14,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionButton: {
    alignItems: "center",
    flex: 1,
    padding: 12,
    borderRadius: 4,
    backgroundColor: "#F8F9FA",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E8F0E8",
  },
  quickActionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 10,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
  ctaSection: {
    backgroundColor: "#F8F9FA",
    marginHorizontal: 16,
    borderRadius: 4,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8F0E8",
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B5E20",
    textAlign: "center",
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: "#1B5E20",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default WelcomeScreen;
