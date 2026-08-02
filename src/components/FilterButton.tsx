import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface FilterButtonProps {
  onPress: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.filterButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <MaterialCommunityIcons name="filter-variant" size={22} color={COLORS.text.primary} />
      <Text style={styles.filterText}>Filter Peta</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: { 
    position: 'absolute', 
    bottom: 20, 
    alignSelf: 'center', 
    backgroundColor: COLORS.white, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: COLORS.primary, 
    elevation: 5, 
    shadowColor: COLORS.shadow, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84 
  },
  filterText: { 
    color: COLORS.text.primary, 
    fontWeight: '600', 
    fontSize: 15, 
    marginLeft: 8 
  },
});

export default FilterButton;