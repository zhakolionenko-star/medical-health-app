import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { COLORS } from '../theme/colors';

interface Props {
  onLoginPress: () => void;
  onRegisterPress: () => void;
}

export const WelcomeScreen: React.FC<Props> = ({ onLoginPress, onRegisterPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBlock}>
        <Image
          source={require('../../assets/azd-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brand}>AZD Медициналық Орталығы</Text>
        <Text style={styles.desc}>
          Дәрігерге онлайн жазылу, бос уақытты таңдау және жақын маңдағы клиникалар картасы.
        </Text>
      </View>

      <View style={styles.bottomBlock}>
        <CustomButton title="Кіру" onPress={onLoginPress} />
        <CustomButton
          title="Тіркелу"
          variant="secondary"
          onPress={onRegisterPress}
          style={{ marginTop: 12 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
    padding: 24,
    paddingVertical: 48,
  },
  topBlock: {
    alignItems: 'center',
    marginTop: 32,
  },
  logo: {
    width: 210,
    height: 110,
    marginBottom: 20,
  },
  brand: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  bottomBlock: {
    width: '100%',
  },
});