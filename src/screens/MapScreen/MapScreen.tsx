import { View, StyleSheet } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import StartState from './states/StartState';
import OptionStateModal from './states/OptionStateModal';
import ListState from './states/ListStateView';
import CardState from './states/CardStateView';
import BottomNav from '../../components/BottomNav';
import { COLORS } from '../../constants/colors';

const MapScreen = () => {
  const currentState = useAppStore((state) => state.currentState);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {(currentState === 'START' || currentState === 'OPTION') && <StartState />}
        {currentState === 'OPTION' && <OptionStateModal />}
        {currentState === 'LIST' && <ListState />}
        {currentState === 'CARD' && <CardState />}
      </View>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      content: {
        flex: 1,
        position: 'relative',
      }
});

export default MapScreen;