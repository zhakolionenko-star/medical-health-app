import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { COLORS } from '../theme/colors';

interface Props {
  onBack: () => void;
  onGoLogin: () => void;
  onRegisterSuccess: () => void;
}

export const RegisterScreen: React.FC<Props> = ({
  onBack,
  onGoLogin,
  onRegisterSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+7 ');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!fullName.trim() || phone.trim().length < 10 || !password.trim()) {
      setError('Аты-жөнін, телефон нөмірін және құпиясөзді толтырыңыз');
      return;
    }
    setError('');
    onRegisterSuccess();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Жаңа аккаунт</Text>
        <View style={{ width: 24 }} />
      </View>

      <CustomInput
        label="Толық аты-жөні"
        placeholder="Айдар Нұрланов"
        value={fullName}
        onChangeText={setFullName}
      />
      <CustomInput
        label="Телефон нөмірі"
        placeholder="+7 777 123 45 67"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <CustomInput
        label="Email (міндетті емес)"
        placeholder="example@mail.kz"
        value={email}
        onChangeText={setEmail}
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

      <CustomButton title="Тіркелу" onPress={handleRegister} style={{ marginTop: 12 }} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Аккаунтыңыз бар ма? </Text>
        <TouchableOpacity onPress={onGoLogin}>
          <Text style={styles.linkText}>Кіру</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 44,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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