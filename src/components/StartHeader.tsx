import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const StartHeader = () => {
  return (
    <SafeAreaView style={styles.headerSafeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Feather name="menu" size={28} color={COLORS.white} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>HEADER</Text>
        
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Feather name="bell" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerSafeArea: { 
    backgroundColor: COLORS.primary, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  headerContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 16 
  },
  headerTitle: { 
    color: COLORS.white, 
    fontSize: 18, 
    fontWeight: '700', 
    letterSpacing: 1 
  },
});

export default StartHeader;