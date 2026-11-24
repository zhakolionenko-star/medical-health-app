import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { COLORS } from '../theme/colors';

interface Props {
  onBack: () => void;
  onSendOtp: (phone: string) => void;
}

export const ForgotPasswordScreen: React.FC<Props> = ({ onBack, onSendOtp }) => {
  const [phone, setPhone] = useState('+7 ');
  const [error, setError] = useState('');

  const handleSend = () => {
    if (phone.replace(/\D/g, '').length < 11) {
      setError('Қазақстан нөмірін дұрыс енгізіңіз (мысалы, +7 701 123 45 67)');
      return;
    }
    setError('');
    onSendOtp(phone.trim());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Құпиясөзді қалпына келтіру</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.desc}>
        Телефон нөміріңізді енгізіңіз — біз растау кодын (SMS OTP) жібереміз.
      </Text>

      <CustomInput
        label="Телефон нөмірі"
        placeholder="+7 701 000 00 00"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        error={error}
      />

      <CustomButton title="SMS код жіберу" onPress={handleSend} style={{ marginTop: 10 }} />
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
  },
  desc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
});