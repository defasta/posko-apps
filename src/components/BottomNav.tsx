import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import { COLORS } from '../constants/colors';

const BottomNav = () => {
  const resetToStart = useAppStore((state) => state.resetToStart);

  return (
    <SafeAreaView style={styles.bottomSafeArea}>
      <View style={styles.bottomNavContainer}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={24} color={COLORS.text.muted} />
          <Text style={styles.navText}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={resetToStart}>
          <View style={styles.activeIndicator} />
          <Ionicons name="location-sharp" size={24} color={COLORS.primaryLight} />
          <Text style={[styles.navText, styles.navTextActive]}>Peta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="document-outline" size={24} color={COLORS.text.muted} />
          <Text style={styles.navText}>Rengiat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomSafeArea: { 
    backgroundColor: COLORS.white, 
    zIndex: 9999,
    elevation: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomNavContainer: { 
    flexDirection: 'row', 
    backgroundColor: COLORS.white, 
    height: 70, 
    borderTopWidth: 1, 
    borderTopColor: COLORS.border, 
    justifyContent: 'space-around', 
    alignItems: 'center' 
  },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%' },
  navText: { fontSize: 12, color: COLORS.text.muted, marginTop: 4, fontWeight: '500' },
  navTextActive: { color: COLORS.primaryLight, fontWeight: 'bold' },
  activeIndicator: { position: 'absolute', top: 0, width: 40, height: 3, backgroundColor: COLORS.primaryLight, borderRadius: 2 },
});

export default BottomNav;