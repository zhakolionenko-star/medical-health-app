import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

interface Props {
  onFinish: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AZD MED</Text>
      <Text style={styles.subtitle}>Медициналық орталық • Қазақстан</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subtitle: {
    color: COLORS.primaryLight,
    fontSize: 14,
    marginTop: 6,
  },
});