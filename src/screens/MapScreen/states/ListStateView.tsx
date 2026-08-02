import { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform, 
  StatusBar, 
  FlatList 
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStore } from '../../../store/useAppStore';
import { COLORS } from '../../../constants/colors';

import MapControls from '../../../components/MapControls';
import ListHeader from '../../../components/ListHeader';
import FacilityCard from '../../../components/FacilityCard';
import FloatingButton from '../../../components/FloatingButton';

const ListStateView = () => {
  const { 
    facilities, 
    selectedCategory, 
    searchQuery, 
    sortOrder, 
    setSearchQuery, 
    toggleSortOrder, 
    resetToStart, 
    setAppState
  } = useAppStore();

  const mapRef = useRef<MapView>(null);

  const centerMapToFacilities = () => {
    if (mapRef.current && facilities && facilities.length > 0) {
      const coordinates = facilities
        .filter(fac => fac.location?.latitude && fac.location?.longitude) 
        .map(fac => ({ 
          latitude: fac.location.latitude, 
          longitude: fac.location.longitude 
        }));
        
      if (coordinates.length === 0) return;
      
      mapRef.current.fitToCoordinates(coordinates, { 
        edgePadding: { top: 70, right: 50, bottom: 400, left: 50 }, 
        animated: true 
      });
    }
  };

  useEffect(() => { 
    centerMapToFacilities(); 
  }, [facilities]);

  const handleZoomIn = async () => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.zoom = (camera.zoom || 15) + 1;
      mapRef.current?.animateCamera(camera, { duration: 300 });
    }
  };

  const handleZoomOut = async () => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.zoom = (camera.zoom || 15) - 1;
      mapRef.current?.animateCamera(camera, { duration: 300 });
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ListHeader 
        totalFacilities={facilities.length}
        selectedCategory={selectedCategory || 'POSKO'}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        onClose={resetToStart}
      />

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={false}
          zoomControlEnabled={false}
          provider={Platform.OS === 'android' ? 'google' : undefined} 
        >
          {facilities.map((fac, index) => {
            if (!fac.location?.latitude || !fac.location?.longitude) return null;
            return (
              <Marker 
                key={fac.id || index} 
                coordinate={{ 
                  latitude: fac.location.latitude, 
                  longitude: fac.location.longitude 
                }}
              >
                <View style={styles.markerContainer}>
                  <View style={styles.markerBubble}>
                    <MaterialCommunityIcons name="police-badge" size={18} color={COLORS.white} />
                  </View>
                  <View style={styles.markerTriangle} />
                </View>
              </Marker>
            );
          })}
        </MapView>
        
        <MapControls 
          onZoomIn={handleZoomIn} 
          onZoomOut={handleZoomOut} 
          onMyLocationPress={centerMapToFacilities} 
          style={{ top: 20 }} 
        />
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.dragIndicator} />
        {facilities.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="map-marker-off-outline" size={48} color={COLORS.text.muted} />
            <Text style={styles.emptyText}>Tidak ada posko ditemukan</Text>
          </View>
        ) : (
          <FlatList
            data={facilities}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={({ item }) => <FacilityCard item={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <FloatingButton 
        title="Lihat Peta" 
        iconName="map" 
        onPress={() => setAppState('CARD')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  mapContainer: { 
    flex: 1, 
    position: 'relative' 
  },
  map: { 
    ...StyleSheet.absoluteFillObject 
  },
  markerContainer: { 
    alignItems: 'center' 
  },
  markerBubble: { 
    backgroundColor: COLORS.primaryDark, 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: COLORS.white 
  },
  markerTriangle: { 
    width: 0, 
    height: 0, 
    backgroundColor: 'transparent', 
    borderStyle: 'solid', 
    borderLeftWidth: 6, 
    borderRightWidth: 6, 
    borderBottomWidth: 10, 
    borderLeftColor: 'transparent', 
    borderRightColor: 'transparent', 
    borderBottomColor: COLORS.primaryDark, 
    transform: [{ rotate: '180deg' }], 
    marginTop: -2 
  },
  bottomSheet: { 
    height: '45%', 
    backgroundColor: COLORS.white, 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    elevation: 15, 
    shadowColor: COLORS.shadow, 
    shadowOffset: { width: 0, height: -3 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 8, 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0 
  },
  dragIndicator: { 
    width: 40, 
    height: 4, 
    backgroundColor: COLORS.borderDark, 
    borderRadius: 2, 
    alignSelf: 'center', 
    marginTop: 12, 
    marginBottom: 8 
  },
  listContent: { 
    paddingBottom: 20 
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 50 
  },
  emptyText: { 
    marginTop: 16, 
    fontSize: 14, 
    color: COLORS.text.muted, 
    fontWeight: '500' 
  },
});

export default ListStateView;