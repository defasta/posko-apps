import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface FloatingButtonProps {
  title: string;
  iconName: keyof typeof Feather.glyphMap;
  onPress: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Feather name={iconName} size={20} color={COLORS.text.primary} />
      <Text style={styles.floatingButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: { position: 'absolute', bottom: 20, right: 16, backgroundColor: COLORS.white, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8, elevation: 6, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, borderWidth: 1, borderColor: COLORS.border, zIndex: 20 },
  floatingButtonText: { fontSize: 14, fontWeight: '600', color: COLORS.text.primary, marginLeft: 8 },
});

export default FloatingButton;