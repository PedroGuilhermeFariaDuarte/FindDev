import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";

// Map
import MapView, { Marker, Callout } from "react-native-maps";

// Location
import {
  getCurrentPositionAsync,
  requestPermissionsAsync
} from "expo-location";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Styles
import { Container, Title } from "./styles";

// Config
import "../../config/ReactotronConfig.js";

// Services
import api from "../../services/api";

// Socket-Client
import io from "../../socket-client";

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState("");

  function setupSocketClient() {
    io.disconnect();
    const { latitude, longitude } = currentRegion;
    io.connect(latitude, longitude, techs);
  }

  async function loadDevs() {
    try {
      const { latitude, longitude } = currentRegion;
      const response = await api.get("/search", {
        params: {
          latitude,
          longitude,
          techs: techs
        }
      });

      if (!response.data.length) {
        console.log("Nenhum dev cadastro!");
        return;
      }

      setDevs(response.data);
      setupSocketClient();
    } catch (error) {
      console.log(error);
    }
  }

  function handlerRegionChanged(region) {
    setCurrentRegion(region);
    console.log(currentRegion);
  }

  useEffect(() => {
    async function getPermissionForLocation() {
      const { granted } = await requestPermissionsAsync();

      if (!granted) {
        return;
      }

      return true;
    }

    async function getInitialPosition() {
      setLoading(true);
      if (!(await getPermissionForLocation())) {
        return;
      }

      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true
      });

      const { latitude, longitude } = coords;

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0027487905209362395,
        longitudeDelta: 0.0017042085528373718
      });

      setLoading(false);
    }

    getInitialPosition();
  }, []);

  useEffect(() => {
    io.subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  return (
    <>
      <MapView
        onRegionChangeComplete={handlerRegionChanged}
        initialRegion={currentRegion}
        style={styleMap.mapStyle}
      >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1]
            }}
          >
            <Image source={{ uri: dev.avatar_url }} style={styleMap.avatar} />
            <Callout
              onPress={() => {
                navigation.navigate("Profile", {
                  github_username: dev.github_username
                });
              }}
            >
              <View style={styleMap.callout}>
                <Text style={styleMap.name}>{dev.username}</Text>
                <Text style={styleMap.bio}>{dev.bio}</Text>
                <Text style={styleMap.techs}>{dev.techs.join(", ")}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styleMap.searchForm}>
        <TextInput
          style={styleMap.searcInput}
          placeholder="Buscar devs por techs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity onPress={loadDevs} style={styleMap.loadingButton}>
          <MaterialIcons name="gps-fixed" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styleMap = StyleSheet.create({
  mapStyle: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#eee"
  },
  callout: { width: 260 },
  name: { fontWeight: "bold", fontSize: 16 },
  bio: { color: "#666", marginTop: 5 },
  techs: {
    marginTop: 5
  },
  searchForm: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row"
  },
  searcInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  loadingButton: {
    width: 50,
    height: 50,
    backgroundColor: "#8e4dff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  }
});

export default Main;
