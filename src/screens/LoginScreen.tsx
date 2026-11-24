import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { COLORS } from '../theme/colors';

interface Props {
  onBack: () => void;
  onForgotPassword: () => void;
  onGoRegister: () => void;
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<Props> = ({
  onBack,
  onForgotPassword,
  onGoRegister,
  onLoginSuccess,
}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!login.trim() || !password.trim()) {
      setError('Логин (телефон немесе пошта) және құпиясөзді енгізіңіз');
      return;
    }
    setError('');
    onLoginSuccess();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Кіру</Text>
        <View style={{ width: 24 }} />
      </View>

      <Image
        source={require('../../assets/azd-logo.png')}
        style={styles.smallLogo}
        resizeMode="contain"
      />

      <Text style={styles.welcome}>Қош келдіңіз!</Text>
      <Text style={styles.subtitle}>Жүйеге кіру үшін деректерді толтырыңыз</Text>

      <CustomInput
        label="Логин (Телефон нөмірі немесе Email)"
        placeholder="+7 777 000 00 00"
        value={login}
        onChangeText={setLogin}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <CustomInput
        label="Құпиясөз"
        placeholder="••••••••••••"
        value={password}
        onChangeText={setPassword}
        isPassword
        error={error}
      />

      <TouchableOpacity onPress={onForgotPassword} style={styles.forgotBtn}>
        <Text style={styles.forgotText}>Құпиясөзді ұмыттыңыз ба? (Телефон арқылы)</Text>
      </TouchableOpacity>

      <CustomButton title="Кіру" onPress={handleLogin} style={{ marginTop: 10 }} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Аккаунтыңыз жоқ па? </Text>
        <TouchableOpacity onPress={onGoRegister}>
          <Text style={styles.linkText}>Тіркелу</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 44,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  smallLogo: {
    width: 110,
    height: 55,
    alignSelf: 'center',
    marginBottom: 8,
  },
  welcome: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 20,
    marginTop: 4,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
});