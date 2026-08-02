import { useRef, useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Platform,
  StatusBar,
  FlatList
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useAppStore } from '../../../store/useAppStore';
import { COLORS } from '../../../constants/colors';

import MapControls from '../../../components/MapControls';
import CardHeader from '../../../components/CardHeader';
import FloatingFacilityCard from '../../../components/FloatingFacilityCard';

const CardStateView = () => {
  const { 
    facilities, 
    selectedCategory, 
    resetToStart,
    setAppState
  } = useAppStore();

  const mapRef = useRef<MapView>(null);
  const flatListRef = useRef<FlatList>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (mapRef.current && facilities && facilities.length > 0) {
      const coordinates = facilities
        .filter(fac => fac.location?.latitude && fac.location?.longitude) 
        .map(fac => ({
          latitude: fac.location.latitude,
          longitude: fac.location.longitude,
        }));

      if (coordinates.length === 0) return;

      if (coordinates.length === 1) {
        mapRef.current.animateToRegion({
          ...coordinates[0],
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      } else {
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 70, right: 50, bottom: 250, left: 50 },
          animated: true,
        });
      }
    }
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

  const centerMapToActiveFacility = () => {
    if (!mapRef.current || facilities.length === 0) return;
    
    const activeFacility = facilities[activeIndex];
    
    if (activeFacility && activeFacility.location?.latitude && activeFacility.location?.longitude) {
      mapRef.current.animateToRegion({
        latitude: activeFacility.location.latitude,
        longitude: activeFacility.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 500);
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setActiveIndex(index);
      
      const activeFacility = facilities[index];
      
      if (activeFacility && activeFacility.location?.latitude && activeFacility.location?.longitude && mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: activeFacility.location.latitude,
          longitude: activeFacility.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 500);
      }
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <CardHeader 
        title={`${facilities.length} ${selectedCategory || 'POSKO'}`}
        onBack={() => setAppState('LIST')}
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
            const isActive = index === activeIndex;

            return (
              <Marker 
                key={fac.id || index} 
                coordinate={{ latitude: fac.location.latitude, longitude: fac.location.longitude }}
                zIndex={isActive ? 999 : 1}
              >
                <View style={[styles.markerContainer, isActive && { transform: [{ scale: 1.2 }] }]}>
                  <View style={[styles.markerBubble, isActive && { backgroundColor: COLORS.primary }]}>
                    <MaterialCommunityIcons name="police-badge" size={isActive ? 20 : 18} color={COLORS.white} />
                  </View>
                  <View style={[styles.markerTriangle, isActive && { borderBottomColor: COLORS.primary }]} />
                </View>
              </Marker>
            );
          })}
        </MapView>

       <MapControls 
          onZoomIn={handleZoomIn} 
          onZoomOut={handleZoomOut} 
          onMyLocationPress={centerMapToActiveFacility}
          style={{ top: 20 }}
        />
      </View>

      <View style={styles.floatingListWrapper}>
        <FlatList
          ref={flatListRef}
          data={facilities}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => <FloatingFacilityCard item={item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={styles.flatListContent}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>

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
  floatingListWrapper: {
    position: 'absolute',
    bottom: 40, 
    left: 0,
    right: 0,
    zIndex: 10,
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  }
});

export default CardStateView;