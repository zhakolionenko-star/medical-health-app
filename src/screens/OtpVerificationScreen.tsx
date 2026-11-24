import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { COLORS } from '../theme/colors';

interface Props {
  phone: string;
  onBack: () => void;
  onResetSuccess: () => void;
}

export const OtpVerificationScreen: React.FC<Props> = ({
  phone,
  onBack,
  onResetSuccess,
}) => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (code.trim().length < 4) {
      setError('4 таңбалы SMS кодын енгізіңіз');
      return;
    }
    if (newPassword.length < 6) {
      setError('Жаңа құпиясөз кемінде 6 таңбадан тұруы керек');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Құпиясөздер сәйкес келмейді');
      return;
    }
    setError('');
    onResetSuccess();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Кодты растау</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.desc}>
        Код <Text style={styles.phoneBold}>{phone}</Text> нөміріне жіберілді.
      </Text>

      <CustomInput
        label="SMS код (OTP)"
        placeholder="1234"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={6}
      />

      <CustomInput
        label="Жаңа құпиясөз"
        placeholder="••••••••"
        value={newPassword}
        onChangeText={setNewPassword}
        isPassword
      />

      <CustomInput
        label="Құпиясөзді растау"
        placeholder="••••••••"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        isPassword
        error={error}
      />

      <CustomButton title="Құпиясөзді жаңарту" onPress={handleConfirm} style={{ marginTop: 10 }} />
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  desc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 18,
  },
  phoneBold: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});