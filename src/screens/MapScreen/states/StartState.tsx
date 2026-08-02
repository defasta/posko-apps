import { useEffect, useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  StatusBar, 
  Platform,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useAppStore } from '../../../store/useAppStore';
import { COLORS } from '../../../constants/colors';

import MapControls from '../../../components/MapControls';
import StartHeader from '../../../components/StartHeader';
import SearchBar from '../../../components/SearchBar';
import FilterButton from '../../../components/FilterButton';

const StartState = () => {
  const setAppState = useAppStore((state) => state.setAppState);
  
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Izin lokasi ditolak');
        setLocation({ latitude: -6.2365, longitude: 106.8524 });
        return;
      }

      let currentLoc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLoc.coords.latitude,
        longitude: currentLoc.coords.longitude,
      });
    })();
  }, []);

  const handleZoomIn = async () => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.zoom = (camera.zoom || 15) + 1;
      camera.altitude = (camera.altitude || 1000) / 2;
      mapRef.current?.animateCamera(camera, { duration: 500 });
    }
  };

  const handleZoomOut = async () => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.zoom = (camera.zoom || 15) - 1;
      camera.altitude = (camera.altitude || 1000) * 2;
      mapRef.current?.animateCamera(camera, { duration: 500 });
    }
  };

  const handleRecenter = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
    }
  };

  if (!location) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Menemukan lokasi...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <StartHeader />

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          ...location,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        zoomControlEnabled={false}
      >
        <Marker coordinate={location} title="Lokasiku Saat Ini">
          <View style={styles.markerContainer}>
            <View style={styles.markerBubble}>
              <MaterialCommunityIcons name="police-badge" size={18} color={COLORS.white} />
            </View>
            <View style={styles.markerTriangle} />
          </View>
        </Marker>
      </MapView>

      <SearchBar />

      <MapControls 
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onMyLocationPress={handleRecenter}
        style={{ top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 140 : 180 }}
      />

      <FilterButton onPress={() => setAppState('OPTION')} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  loadingContainer: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 16, color: COLORS.text.secondary, fontWeight: '500' },
  map: { flex: 1 },
  markerContainer: { alignItems: 'center' },
  markerBubble: { backgroundColor: COLORS.primaryDark, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  markerTriangle: { width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 6, borderRightWidth: 6, borderBottomWidth: 10, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: COLORS.primaryDark, transform: [{ rotate: '180deg' }], marginTop: -2 },
});

export default StartState;