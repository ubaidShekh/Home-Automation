import "react-native"; // React Native globally required by some Firebase dependencies
import React, { useState, useEffect, useRef } from "react";

import { Ionicons } from "@expo/vector-icons";

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

import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import axios from "axios";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import * as WebBrowser from "expo-web-browser";
import { StatusBar } from "expo-status-bar";
WebBrowser.maybeCompleteAuthSession();
const { width } = Dimensions.get("window");

const ChatBoat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const flatListRef = useRef(null);

  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

  // Currently working and reliable models
  const WORKING_MODELS = [
    {
      name: "mistralai/Mistral-7B-Instruct-v0.2",
      endpoint:
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      format: (prompt) => `<s>[INST] ${prompt} [/INST]`,
    },
    {
      name: "google/gemma-7b-it",
      endpoint:
        "https://api-inference.huggingface.co/models/google/gemma-7b-it",
      format: (prompt) =>
        `<start_of_turn>user\n${prompt}<end_of_turn>\n<start_of_turn>model\n`,
    },
    {
      name: "microsoft/DialoGPT-large",
      endpoint:
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large",
      format: (prompt) => prompt,
    },
  ];

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleDeviceCommand = async (command) => {
    const lowerCommand = command.toLowerCase();

    try {
      if (lowerCommand.includes("open gate")) {
        await set(ref(db, "/practice/status"), "ON");
        return "🚪 Gate opened and practice status set to ON.";
      } else if (lowerCommand.includes("close gate")) {
        await set(ref(db, "/practice/status"), "OFF");
        return "🚪 Gate closed and practice status set to OFF.";
      } else if (lowerCommand.includes("outside drying")) {
        await set(ref(db, "/esp8/dryingSystem/position"), "outside");
        return "🌞 Drying system moved outside.";
      } else if (lowerCommand.includes("inside drying")) {
        await set(ref(db, "/esp8/dryingSystem/position"), "inside");
        return "🏠 Drying system moved inside.";
      } else if (lowerCommand.includes("turn on door light")) {
        await set(ref(db, "/esp4/devices/light1/status"), "ON");
        return "💡 Door light turned ON.";
      } else if (lowerCommand.includes("turn off door light")) {
        await set(ref(db, "/esp4/devices/light1/status"), "OFF");
        return "💡 Door light turned OFF.";
      } else if (lowerCommand.includes("turn on roof light")) {
        await set(ref(db, "/esp2/devices/bedroomdoor/status"), "ON");
        return "🔦 Roof light turned ON.";
      } else if (lowerCommand.includes("turn off roof light")) {
        await set(ref(db, "/esp2/devices/bedroomdoor/status"), "OFF");
        return "🔦 Roof light turned OFF.";
      }

      return null;
    } catch (error) {
      console.error("Device command error:", error);
      throw new Error("❌ Failed to execute device command.");
    }
  };

  const getAIResponse = async (textToSend) => {
    // Try current model first
    const model = WORKING_MODELS[currentModelIndex];

    try {
      console.log(`Trying model: ${model.name}`);

      const formattedPrompt = model.format(textToSend);

      const response = await axios.post(
        model.endpoint,
        {
          inputs: formattedPrompt,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            do_sample: true,
            top_p: 0.9,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        },
      );

      console.log("API Response received:", response.data);

      let replyText = "";

      if (response.data && response.data[0]?.generated_text) {
        replyText = response.data[0].generated_text;
        // Clean up the response based on model
        if (model.name.includes("mistralai")) {
          replyText = replyText.replace(/\[INST\].*?\[\/INST\]/gs, "").trim();
          replyText = replyText.replace(/<\/?s>/g, "").trim();
        } else if (model.name.includes("gemma")) {
          replyText = replyText
            .replace(/<start_of_turn>.*?<end_of_turn>/gs, "")
            .trim();
        }
      } else if (response.data?.generated_text) {
        replyText = response.data.generated_text;
      } else {
        throw new Error("Unexpected response format");
      }

      return (
        replyText.trim() ||
        "I received your message but couldn't generate a proper response."
      );
    } catch (error) {
      console.log(
        `Model ${model.name} failed:`,
        error.response?.status || error.message,
      );

      // Try next model in rotation
      const nextModelIndex = (currentModelIndex + 1) % WORKING_MODELS.length;
      setCurrentModelIndex(nextModelIndex);

      // If all models failed, use local responses
      if (nextModelIndex === 0) {
        return getLocalAIResponse(textToSend);
      }

      // Retry with next model
      return await getAIResponse(textToSend);
    }
  };

  // Local fallback responses when API fails
  const getLocalAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    const responses = {
      greeting: ["Hello! 👋", "Hi there!", "Hey! How can I help you today?"],
      howAreYou: [
        "I'm doing great! Ready to help with your devices.",
        "I'm functioning well! What can I do for you?",
      ],
      help: [
        "I can help you control devices like gates, lights, and drying systems. Try saying 'open gate' or 'turn on lights'!",
        "I'm your smart home assistant! I can control gates, lights, and drying systems for you.",
      ],
      thanks: [
        "You're welcome! 😊",
        "Happy to help!",
        "Anytime! Let me know if you need anything else.",
      ],
      default: [
        "I understand you're asking something, but I'm currently having trouble accessing my AI brain. You can try device commands like 'open gate' or 'turn on lights'!",
        "I apologize, but I'm experiencing technical difficulties with my AI service right now. I can still help you control your smart home devices though!",
        "It seems my AI capabilities are temporarily unavailable. I can still execute device commands if you need to control anything!",
        "I'm having trouble processing that request at the moment. Try asking me to control your devices instead!",
      ],
    };

    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      return responses.greeting[
        Math.floor(Math.random() * responses.greeting.length)
      ];
    }
    if (message.includes("how are you")) {
      return responses.howAreYou[
        Math.floor(Math.random() * responses.howAreYou.length)
      ];
    }
    if (message.includes("help") || message.includes("what can you do")) {
      return responses.help[Math.floor(Math.random() * responses.help.length)];
    }
    if (message.includes("thank")) {
      return responses.thanks[
        Math.floor(Math.random() * responses.thanks.length)
      ];
    }

    return responses.default[
      Math.floor(Math.random() * responses.default.length)
    ];
  };

  const sendMessage = async (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      text: textToSend,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const deviceResponse = await handleDeviceCommand(textToSend);

      if (deviceResponse) {
        setMessages((prev) => [
          ...prev,
          {
            text: deviceResponse,
            isUser: false,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      } else {
        const aiResponse = await getAIResponse(textToSend);
        setMessages((prev) => [
          ...prev,
          {
            text: aiResponse,
            isUser: false,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }
    } catch (error) {
      console.error("Send message error:", error);
      const fallbackResponse = getLocalAIResponse(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          text: fallbackResponse,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={{
        padding: 12,
        borderRadius: 16,
        marginVertical: 4,
        maxWidth: "80%",
        backgroundColor: item.isUser ? "#F0F9F0" : "#FFFFFF",
        alignSelf: item.isUser ? "flex-end" : "flex-start",
        borderBottomRightRadius: item.isUser ? 4 : 16,
        borderBottomLeftRadius: item.isUser ? 16 : 4,
        borderWidth: 1,
        borderColor: item.isUser ? "#C8E6C9" : "#E8F0E8",
        marginHorizontal: 16,
      }}
    >
      <Text style={{ fontSize: 14, lineHeight: 20, color: "#333" }}>
        {item.text}
      </Text>
      <Text
        style={{
          fontSize: 10,
          color: "#666",
          marginTop: 4,
          alignSelf: "flex-end",
        }}
      >
        {item.timestamp}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

      {/* Header */}
      <View style={{ backgroundColor: "#1B5E20", paddingVertical: 20 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            Smart Assistant
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            Control devices and get help with AI
          </Text>
        </View>
      </View>

      {/* Quick Commands */}
      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#1B5E20" }}>
            Quick Commands
          </Text>
          <Text style={{ fontSize: 11, color: "#666" }}>Tap to send</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 16 }}
        >
          {[
            { text: "Open gate", icon: "🚪" },
            { text: "Outside drying", icon: "🌞" },
            { text: "Turn on lights", icon: "💡" },
            { text: "Inside drying", icon: "🏠" },
            { text: "Hello", icon: "👋" },
          ].map((command, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: "#F0F9F0",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 4,
                marginRight: 8,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
              onPress={() => sendMessage(command.text)}
              disabled={isLoading}
            >
              <Text style={{ fontSize: 14, marginRight: 4 }}>
                {command.icon}
              </Text>
              <Text
                style={{ fontSize: 12, color: "#1B5E20", fontWeight: "500" }}
              >
                {command.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMessage}
          contentContainerStyle={{
            paddingVertical: 16,
            paddingBottom: isLoading ? 60 : 100,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 40,
              }}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={48}
                color="#E8F0E8"
              />
              <Text
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  color: "#999",
                  textAlign: "center",
                }}
              >
                Start a conversation with your smart assistant
              </Text>
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  color: "#999",
                  textAlign: "center",
                }}
              >
                Try saying "Hello" or use quick commands above
              </Text>
            </View>
          }
        />

        {/* Loading Indicator */}
        {isLoading && (
          <View
            style={{
              position: "absolute",
              bottom: 80,
              left: 0,
              right: 0,
              alignItems: "center",
              padding: 12,
              backgroundColor: "rgba(255,255,255,0.9)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F8F9FA",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#E8F0E8",
              }}
            >
              <ActivityIndicator size="small" color="#1B5E20" />
              <Text
                style={{
                  marginLeft: 8,
                  color: "#666",
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Assistant is thinking...
              </Text>
            </View>
          </View>
        )}

        {/* Input Area */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderColor: "#E8F0E8",
            padding: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "#F8F9FA",
                borderWidth: 1,
                borderColor: "#E8F0E8",
                borderRadius: 4,
                paddingHorizontal: 16,
                paddingVertical: 10,
                marginRight: 8,
                fontSize: 14,
                maxHeight: 80,
                color: "#333",
              }}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message or device command..."
              placeholderTextColor="#999"
              multiline
              maxLength={500}
              editable={!isLoading}
              returnKeyType="send"
              onSubmitEditing={() => inputText.trim() && sendMessage()}
            />
            <TouchableOpacity
              onPress={() => sendMessage()}
              disabled={isLoading || !inputText.trim()}
              style={{
                backgroundColor:
                  isLoading || !inputText.trim() ? "#E8F0E8" : "#1B5E20",
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 4,
                minWidth: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="send"
                size={18}
                color={isLoading || !inputText.trim() ? "#999" : "white"}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <Text style={{ fontSize: 10, color: "#999" }}>
              Press Enter to send • {500 - inputText.length} chars left
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#10B981",
                  marginRight: 4,
                }}
              />
              <Text style={{ fontSize: 10, color: "#666" }}>
                {WORKING_MODELS[currentModelIndex].name.split("/")[1]}
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Model Status */}
      {!isLoading && (
        <View
          style={{
            position: "absolute",
            top: 80,
            right: 16,
            backgroundColor: "#F8F9FA",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#E8F0E8",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="hardware-chip" size={12} color="#2E7D32" />
          <Text style={{ fontSize: 10, color: "#666", marginLeft: 4 }}>
            AI Model {currentModelIndex + 1}/{WORKING_MODELS.length}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ChatBoat;

// Add this import at the top with others:
