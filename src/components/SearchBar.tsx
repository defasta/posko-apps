import React from 'react';
import { View, TextInput, StyleSheet, Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <Feather name="search" size={20} color={COLORS.icon} style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Cari lokasi"
        placeholderTextColor={COLORS.text.muted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: { 
    position: 'absolute', 
    top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 70 : 110, 
    left: 16, 
    right: 16, 
    backgroundColor: COLORS.white, 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    height: 48, 
    elevation: 4, 
    shadowColor: COLORS.shadow, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4 
  },
  searchIcon: { 
    marginRight: 8 
  },
  searchInput: { 
    flex: 1, 
    fontSize: 16, 
    color: COLORS.text.primary 
  },
});

export default SearchBar;