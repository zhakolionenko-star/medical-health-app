import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

interface Clinic {
  id: string;
  name: string;
  address: string;
  hours: string;
  coords: string;
}

const CLINICS: Clinic[] = [
  {
    id: '1',
    name: 'AZD Орталық Клиника',
    address: 'Абай даңғылы, 45',
    hours: '08:00 – 20:00',
    coords: '43.2415, 76.9254',
  },
  {
    id: '2',
    name: 'AZD Диагностика Орталығы',
    address: 'Достық даңғылы, 92',
    hours: '08:00 – 21:00',
    coords: '43.2565, 76.9574',
  },
];

interface Props {
  onBack: () => void;
}

export const MapScreen: React.FC<Props> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Клиникалар картасы</Text>
        <View style={{ width: 24 }} />
      </View>

      {Platform.OS === 'web' && (
        <View style={styles.webNotice}>
          <Text style={styles.webNoticeText}>
            Веб-нұсқада клиникалардың мекенжайлары мен координаттары көрсетілген.
          </Text>
        </View>
      )}

      <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 24 }}>
        {CLINICS.map((c) => (
          <View key={c.id} style={styles.clinicCard}>
            <Text style={styles.clinicName}>{c.name}</Text>
            <Text style={styles.clinicInfo}>Мекенжайы: {c.address}</Text>
            <Text style={styles.clinicInfo}>Жұмыс уақыты: {c.hours}</Text>
            <Text style={styles.clinicCoords}>Координаттар: {c.coords}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surfaceBlue,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  webNotice: {
    backgroundColor: COLORS.primaryLight,
    margin: 16,
    marginBottom: 4,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  webNoticeText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  clinicCard: {
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  clinicName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },
  clinicInfo: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  clinicCoords: {
    fontSize: 12,
    color: COLORS.textPrimary,
    marginTop: 6,
    fontWeight: '600',
  },
});