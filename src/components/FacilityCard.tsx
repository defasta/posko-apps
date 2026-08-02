import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface FacilityCardProps {
  item: any;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardIconWrapper}>
        <MaterialCommunityIcons name={item.icon || 'shield-star'} size={40} color={COLORS.text.secondary} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.officer_name} - {item.rank}</Text>
        <Text style={styles.cardAddress}>{item.address || 'Alamat tidak tersedia'}</Text>
        <View style={styles.phoneContainer}>
          <MaterialIcons name="phone" size={16} color={COLORS.text.secondary} />
          <Text style={styles.phoneText}>{item.phone_number || 'No phone number'}</Text>
        </View>
        <TouchableOpacity style={styles.contactButton}>
          <MaterialIcons name="phone" size={18} color={COLORS.primaryLight} />
          <Text style={styles.contactButtonText}>Hubungi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.background },
  cardIconWrapper: { width: 60, height: 60, borderWidth: 2, borderColor: COLORS.text.secondary, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text.primary, marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: COLORS.text.secondary, marginBottom: 6 },
  cardAddress: { fontSize: 12, color: COLORS.text.address, marginBottom: 8, lineHeight: 18 },
  phoneContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  phoneText: { fontSize: 13, color: COLORS.text.secondary, marginLeft: 6 },
  contactButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.borderDark, borderRadius: 6, paddingVertical: 8, width: 110 },
  contactButtonText: { color: COLORS.primaryLight, fontSize: 14, fontWeight: '600', marginLeft: 6 },
});

export default FacilityCard;