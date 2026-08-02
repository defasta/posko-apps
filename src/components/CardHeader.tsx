import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface CardHeaderProps {
  title: string;
  onBack: () => void;
  onClose: () => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({ title, onBack, onClose }) => {
  return (
    <SafeAreaView style={styles.headerSafeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} style={styles.headerLeft}>
          <Feather name="chevron-left" size={26} color={COLORS.text.primary} />
          <Text style={styles.headerTitle}>{title}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
          <Feather name="x" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerSafeArea: { 
    backgroundColor: COLORS.white, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
    zIndex: 10, 
    elevation: 5, 
    shadowColor: COLORS.shadow, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1,
    shadowRadius: 4 
  },
  headerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: COLORS.white, 
    paddingHorizontal: 12, 
    paddingVertical: 14, 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.border 
  },
  headerLeft: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  headerTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: COLORS.text.primary,
    marginLeft: 8 
  },
});

export default CardHeader;