import "react-native"; // React Native globally required by some Firebase dependencies
import React, { useState, useEffect, useRef } from "react";
import Slider from "@react-native-community/slider";
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
} from "react-native";
import axios from "axios";

import Ionicons from "react-native-vector-icons/Ionicons";
import { RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
export default function RadarTrackingPage() {
  const [planes, setPlanes] = useState([]);
  const [satellites, setSatellites] = useState([]);
  const [drones, setDrones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const N2YO_API_KEY = "47EXM9-3C5FNC-EP5UEL-5GD8";
  const HOME_LAT = 28.6139;
  const HOME_LON = 77.209;

  const fetchObjects = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setRefreshing(true);

      // Fetch plane data from OpenSky Network
      const openskyResponse = await axios.get(
        `https://opensky-network.org/api/states/all?lamin=${
          HOME_LAT - 0.5
        }&lomin=${HOME_LON - 0.5}&lamax=${HOME_LAT + 0.5}&lomax=${
          HOME_LON + 0.5
        }`,
      );
      const planeData =
        openskyResponse.data.states?.map((item) => ({
          id: item[0],
          callsign: item[1],
          originCountry: item[2],
          lat: item[6],
          lon: item[5],
          altitude: item[7],
          velocity: item[9],
        })) || [];
      setPlanes(planeData);

      // Fetch satellite data from N2YO API
      const n2yoResponse = await axios.get(
        `https://api.n2yo.com/rest/v1/satellite/above/${HOME_LAT}/${HOME_LON}/0/70/0?apiKey=${N2YO_API_KEY}`,
      );
      setSatellites(n2yoResponse.data.above || []);

      // Mock drone data
      const droneMock = [
        {
          id: "DR001",
          name: "Surveillance Drone Alpha",
          lat: HOME_LAT + 0.01,
          lon: HOME_LON + 0.01,
          altitude: 200,
          speed: 25,
        },
        {
          id: "DR002",
          name: "Delivery Drone Beta",
          lat: HOME_LAT - 0.01,
          lon: HOME_LON - 0.02,
          altitude: 150,
          speed: 18,
        },
        {
          id: "DR003",
          name: "Survey Drone Gamma",
          lat: HOME_LAT + 0.02,
          lon: HOME_LON - 0.01,
          altitude: 180,
          speed: 22,
        },
      ];
      setDrones(droneMock);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (showLoading) setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  const handleRefresh = () => {
    fetchObjects(false);
  };

  const formatAltitude = (alt) => {
    if (alt > 1000) return `${(alt / 1000).toFixed(1)} km`;
    return `${alt} m`;
  };

  const formatSpeed = (speed) => {
    if (speed > 100) return `${Math.round(speed)} m/s`;
    return `${Math.round(speed * 3.6)} km/h`;
  };

  const getObjectColor = (type) => {
    switch (type) {
      case "plane":
        return "#4CAF50";
      case "satellite":
        return "#2196F3";
      case "drone":
        return "#FF9800";
      default:
        return "#666";
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />

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
          Radar Monitoring
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
          }}
        >
          Tracking objects above your location
        </Text>
      </View>

      {/* Refresh Button */}
      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        <TouchableOpacity
          onPress={handleRefresh}
          style={{
            flexDirection: "row",
            backgroundColor: "#F0F9F0",
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#E8F0E8",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="refresh"
            size={16}
            color="#2E7D32"
            style={{ marginRight: 8 }}
          />
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#1B5E20" }}>
            Refresh Data
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#1B5E20"]}
            tintColor="#1B5E20"
          />
        }
      >
        {loading ? (
          <View
            style={{
              padding: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="small" color="#1B5E20" />
            <Text style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
              Loading radar data...
            </Text>
          </View>
        ) : (
          <>
            {/* Stats Overview */}
            <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.statCard}>
                  <View
                    style={[styles.statIcon, { backgroundColor: "#E8F5E9" }]}
                  >
                    <Ionicons name="airplane" size={20} color="#4CAF50" />
                  </View>
                  <Text style={styles.statValue}>{planes.length}</Text>
                  <Text style={styles.statLabel}>Planes</Text>
                </View>

                <View style={styles.statCard}>
                  <View
                    style={[styles.statIcon, { backgroundColor: "#E3F2FD" }]}
                  >
                    <Ionicons name="planet" size={20} color="#2196F3" />
                  </View>
                  <Text style={styles.statValue}>{satellites.length}</Text>
                  <Text style={styles.statLabel}>Satellites</Text>
                </View>

                <View style={styles.statCard}>
                  <View
                    style={[styles.statIcon, { backgroundColor: "#FFF3E0" }]}
                  >
                    <Ionicons name="drone" size={20} color="#FF9800" />
                  </View>
                  <Text style={styles.statValue}>{drones.length}</Text>
                  <Text style={styles.statLabel}>Drones</Text>
                </View>
              </View>
            </View>

            {/* Planes Section */}
            <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="airplane"
                    size={20}
                    color="#4CAF50"
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#1B5E20",
                    }}
                  >
                    Planes
                  </Text>
                </View>
                <Text style={{ fontSize: 11, color: "#666" }}>
                  {planes.length} detected
                </Text>
              </View>

              {planes.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="airplane-outline" size={32} color="#999" />
                  <Text style={styles.emptyStateText}>
                    No planes detected in your area
                  </Text>
                </View>
              ) : (
                planes.slice(0, 3).map((plane) => (
                  <View key={plane.id} style={styles.objectCard}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <View
                        style={[
                          styles.objectIcon,
                          { backgroundColor: "#E8F5E9" },
                        ]}
                      >
                        <Ionicons name="airplane" size={16} color="#4CAF50" />
                      </View>
                      <Text style={styles.objectName}>
                        {plane.callsign || "Unknown"}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 4,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.objectLabel}>Origin</Text>
                        <Text style={styles.objectValue}>
                          {plane.originCountry || "Unknown"}
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={styles.objectLabel}>Altitude</Text>
                        <Text style={styles.objectValue}>
                          {formatAltitude(plane.altitude)}
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text style={styles.objectLabel}>Speed</Text>
                        <Text style={styles.objectValue}>
                          {formatSpeed(plane.velocity)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              )}

              {planes.length > 3 && (
                <View style={{ alignItems: "center", marginTop: 8 }}>
                  <Text style={{ fontSize: 11, color: "#666" }}>
                    + {planes.length - 3} more planes
                  </Text>
                </View>
              )}
            </View>

            {/* Satellites Section */}
            <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="planet"
                    size={20}
                    color="#2196F3"
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#1B5E20",
                    }}
                  >
                    Satellites
                  </Text>
                </View>
                <Text style={{ fontSize: 11, color: "#666" }}>
                  {satellites.length} detected
                </Text>
              </View>

              {satellites.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="planet-outline" size={32} color="#999" />
                  <Text style={styles.emptyStateText}>
                    No satellites detected
                  </Text>
                </View>
              ) : (
                satellites.slice(0, 3).map((sat) => (
                  <View key={sat.satid} style={styles.objectCard}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <View
                        style={[
                          styles.objectIcon,
                          { backgroundColor: "#E3F2FD" },
                        ]}
                      >
                        <Ionicons name="planet" size={16} color="#2196F3" />
                      </View>
                      <Text style={styles.objectName}>{sat.satname}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 4,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.objectLabel}>ID</Text>
                        <Text style={styles.objectValue}>{sat.satid}</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={styles.objectLabel}>Elevation</Text>
                        <Text style={styles.objectValue}>
                          {sat.elevation?.toFixed(1) || "N/A"}°
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text style={styles.objectLabel}>Launch</Text>
                        <Text style={styles.objectValue}>
                          {sat.launchDate || "N/A"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              )}

              {satellites.length > 3 && (
                <View style={{ alignItems: "center", marginTop: 8 }}>
                  <Text style={{ fontSize: 11, color: "#666" }}>
                    + {satellites.length - 3} more satellites
                  </Text>
                </View>
              )}
            </View>

            {/* Drones Section */}
            <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="drone"
                    size={20}
                    color="#FF9800"
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#1B5E20",
                    }}
                  >
                    Drones
                  </Text>
                </View>
                <Text style={{ fontSize: 11, color: "#666" }}>
                  {drones.length} detected
                </Text>
              </View>

              {drones.map((drone) => (
                <View key={drone.id} style={styles.objectCard}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <View
                      style={[
                        styles.objectIcon,
                        { backgroundColor: "#FFF3E0" },
                      ]}
                    >
                      <Ionicons name="drone" size={16} color="#FF9800" />
                    </View>
                    <Text style={styles.objectName}>{drone.name}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 4,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.objectLabel}>Altitude</Text>
                      <Text style={styles.objectValue}>
                        {formatAltitude(drone.altitude)}
                      </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <Text style={styles.objectLabel}>Speed</Text>
                      <Text style={styles.objectValue}>{drone.speed} km/h</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                      <Text style={styles.objectLabel}>Distance</Text>
                      <Text style={styles.objectValue}>
                        {Math.sqrt(
                          Math.pow((drone.lat - HOME_LAT) * 111, 2) +
                            Math.pow((drone.lon - HOME_LON) * 111, 2),
                        ).toFixed(1)}{" "}
                        km
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Location Info */}
            <View
              style={{ paddingHorizontal: 16, marginTop: 24, marginBottom: 8 }}
            >
              <View style={styles.infoCard}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <Ionicons
                    name="location"
                    size={18}
                    color="#1B5E20"
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#1B5E20",
                    }}
                  >
                    Monitoring Area
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.infoLabel}>Latitude</Text>
                    <Text style={styles.infoValue}>{HOME_LAT.toFixed(4)}°</Text>
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Longitude</Text>
                    <Text style={styles.infoValue}>{HOME_LON.toFixed(4)}°</Text>
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Radius</Text>
                    <Text style={styles.infoValue}>50 km</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Status Section */}
            <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
              <View style={styles.statusCard}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.statusDot} />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "#333",
                        marginLeft: 8,
                      }}
                    >
                      Radar active
                    </Text>
                  </View>
                  <Text style={{ fontSize: 11, color: "#666" }}>
                    Updated just now
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
                    <Text style={styles.statusLabel}>Total objects</Text>
                    <Text style={styles.statusValue}>
                      {planes.length + satellites.length + drones.length}
                    </Text>
                  </View>
                  <View style={{ alignItems: "center", flex: 1 }}>
                    <Text style={styles.statusLabel}>Max altitude</Text>
                    <Text style={styles.statusValue}>
                      {Math.max(
                        ...planes.map((p) => p.altitude || 0),
                        ...drones.map((d) => d.altitude || 0),
                        1000,
                      ) > 1000
                        ? "10+ km"
                        : "1-10 km"}
                    </Text>
                  </View>
                  <View style={{ alignItems: "center", flex: 1 }}>
                    <Text style={styles.statusLabel}>Refresh rate</Text>
                    <Text style={styles.statusValue}>5 min</Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

// Add these styles at the end
const styles = StyleSheet.create({
  statCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E8F0E8",
    elevation: 1,
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
    fontSize: 18,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  objectCard: {
    backgroundColor: "white",
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E8F0E8",
    elevation: 1,
  },
  objectIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  objectName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  objectLabel: {
    fontSize: 10,
    color: "#666",
    marginBottom: 2,
  },
  objectValue: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },
  emptyState: {
    backgroundColor: "#F8F9FA",
    borderRadius: 4,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E8F0E8",
  },
  emptyStateText: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  infoCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8F0E8",
  },
  infoLabel: {
    fontSize: 10,
    color: "#666",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  statusCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8F0E8",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  statusLabel: {
    fontSize: 10,
    color: "#666",
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 11,
    fontWeight: "500",
    color: "#333",
  },
});

// Don't forget to add this import at the top with others:
