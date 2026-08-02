import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
  } from 'react-native';
  import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
  import { useAppStore } from '../../../store/useAppStore';
  import { COLORS } from '../../../constants/colors';
  
  const FILTER_OPTIONS = [
    { id: '1', title: 'POSKO 1', icon: 'shield-star-outline' },
    { id: '2', title: 'POSKO 2', icon: 'home-cog-outline' },
    { id: '3', title: 'POSKO 3', icon: 'office-building-outline' },
    { id: '4', title: 'POSKO 4', icon: 'video-outline' },
  ];
  
  const OptionStateModal = () => {
  
    const setAppState = useAppStore((state) => state.setAppState);
    const selectCategory = useAppStore((state) => state.selectCategory);
  
    return (
      <View style={styles.overlayContainer}>
        
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setAppState('START')}
        />
  
        <View style={styles.bottomSheet}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Pilih Filter</Text>
            <TouchableOpacity
              onPress={() => setAppState('START')}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <Feather name="x" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
          </View>
  
          {FILTER_OPTIONS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.filterItem} 
              activeOpacity={0.7}
              onPress={() => selectCategory(item.title as any)} 
            >
              <MaterialCommunityIcons name={item.icon as any} size={28} color={COLORS.text.gray} style={styles.filterIcon} />
              <Text style={styles.filterItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
  
      </View>
    );
  };
  
  const styles = StyleSheet.create({
      overlayContainer: {
          ...StyleSheet.absoluteFillObject,
          zIndex: 999, 
          justifyContent: 'flex-end',
      },
      backdrop: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: COLORS.backdrop,
      },
      bottomSheet: {
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingBottom: 10,
      },
      modalHeader: { 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingHorizontal: 20, 
          paddingVertical: 18 
      },
      modalTitle: { 
          fontSize: 16, 
          fontWeight: '600',
          color: COLORS.text.primary
      },
      filterItem: { 
          flexDirection: 'row', 
          alignItems: 'center', 
          paddingVertical: 16, 
          paddingHorizontal: 20, 
          borderBottomWidth: 1, 
          borderBottomColor: COLORS.background 
      },
      filterIcon: { 
          width: 32 
      },
      filterItemText: { 
          fontSize: 16, 
          color: COLORS.iconDark, 
          marginLeft: 12 
      },
  });
  
  export default OptionStateModal;