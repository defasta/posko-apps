import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface ListHeaderProps {
  totalFacilities: number;
  selectedCategory: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOrder: 'asc' | 'desc';
  toggleSortOrder: () => void;
  onClose: () => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({
  totalFacilities,
  selectedCategory,
  searchQuery,
  setSearchQuery,
  sortOrder,
  toggleSortOrder,
  onClose,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <SafeAreaView style={styles.headerSafeArea}>
      <View style={styles.headerContainer}>
        {/* Top Row */}
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>
            {totalFacilities} {selectedCategory || 'POSKO'}
          </Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Feather name="x" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Bottom Row */}
        <View style={[styles.headerBottomRow, { zIndex: 999 }]}>
          <View style={styles.searchInputContainer}>
            <Feather name="search" size={20} color={COLORS.icon} style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput} 
              placeholder="Cari..." 
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={COLORS.text.muted}
            />
          </View>

          <View style={styles.sortWrapper}>
            <TouchableOpacity style={styles.sortButton} onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
              <Text style={styles.sortButtonText}>{sortOrder === 'asc' ? 'A ...' : 'Z ...'}</Text>
              <MaterialIcons name={isDropdownVisible ? "arrow-drop-up" : "arrow-drop-down"} size={24} color={COLORS.text.gray} />
            </TouchableOpacity>

            {isDropdownVisible && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => { if (sortOrder !== 'asc') toggleSortOrder(); setIsDropdownVisible(false); }}
                >
                  <Text style={[styles.dropdownItemText, sortOrder === 'asc' && styles.dropdownItemTextActive]}>A ...</Text>
                </TouchableOpacity>
                <View style={styles.dropdownDivider} />
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => { if (sortOrder !== 'desc') toggleSortOrder(); setIsDropdownVisible(false); }}
                >
                  <Text style={[styles.dropdownItemText, sortOrder === 'desc' && styles.dropdownItemTextActive]}>Z ...</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerSafeArea: { backgroundColor: COLORS.white, zIndex: 10, elevation: 5, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  headerContainer: { backgroundColor: COLORS.white, paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text.primary },
  headerBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  searchInputContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.borderDark, borderRadius: 6, paddingHorizontal: 10, height: 44, marginRight: 12 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.text.primary },
  sortWrapper: { position: 'relative', zIndex: 999 },
  sortButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.borderDark, borderRadius: 6, paddingHorizontal: 10, height: 44, width: 80 },
  sortButtonText: { fontSize: 14, color: COLORS.text.primary, fontWeight: '500' },
  dropdownMenu: { position: 'absolute', top: 50, right: 0, backgroundColor: COLORS.white, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, elevation: 5, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, width: 130, zIndex: 1000 },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 16 },
  dropdownItemText: { fontSize: 14, color: COLORS.text.gray },
  dropdownItemTextActive: { color: COLORS.primaryLight, fontWeight: 'bold' },
  dropdownDivider: { height: 1, backgroundColor: COLORS.border },
});

export default ListHeader;