import React from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onMyLocationPress: () => void;
  style?: StyleProp<ViewStyle>; 
}

const MapControls: React.FC<MapControlsProps> = ({ 
  onZoomIn, 
  onZoomOut, 
  onMyLocationPress,
  style
}) => {
  return (
    <View style={[styles.controlsContainer, style]}>
      {/* Zoom Controls */}
      <View style={styles.zoomGroup}>
        <TouchableOpacity style={styles.controlBtn} onPress={onZoomIn} activeOpacity={0.7}>
          <Feather name="plus" size={22} color={COLORS.iconDark} />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.controlBtn} onPress={onZoomOut} activeOpacity={0.7}>
          <Feather name="minus" size={22} color={COLORS.iconDark} />
        </TouchableOpacity>
      </View>

      {/* My Location Control */}
      <TouchableOpacity 
        style={[styles.controlBtn, styles.myLocationBtn]} 
        onPress={onMyLocationPress}
        activeOpacity={0.7}
      >
        <MaterialIcons name="my-location" size={22} color={COLORS.iconDark} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: { 
    position: 'absolute', 
    right: 16, 
    alignItems: 'center', 
    zIndex: 2 
  },
  zoomGroup: { backgroundColor: COLORS.white, borderRadius: 8, elevation: 4, marginBottom: 12, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  controlBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  divider: { height: 1, backgroundColor: COLORS.border, marginHorizontal: 8 },
  myLocationBtn: { backgroundColor: COLORS.white, borderRadius: 8, elevation: 4, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
});

export default MapControls;