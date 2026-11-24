import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

interface Clinic {
  id: string;
  name: string;
  address: string;
  hours: string;
  latitude: number;
  longitude: number;
}

const CLINICS: Clinic[] = [
  {
    id: '1',
    name: 'AZD Орталық Клиника',
    address: 'Абай даңғылы, 45',
    hours: '08:00 – 20:00',
    latitude: 43.2415,
    longitude: 76.9254,
  },
  {
    id: '2',
    name: 'AZD Диагностика Орталығы',
    address: 'Достық даңғылы, 92',
    hours: '08:00 – 21:00',
    latitude: 43.2565,
    longitude: 76.9574,
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

      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 43.2485,
            longitude: 76.941,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
        >
          {CLINICS.map((c) => (
            <Marker
              key={c.id}
              coordinate={{ latitude: c.latitude, longitude: c.longitude }}
              title={c.name}
              description={c.address}
            />
          ))}
        </MapView>
      </View>

      <ScrollView style={styles.list}>
        {CLINICS.map((c) => (
          <View key={c.id} style={styles.clinicCard}>
            <Text style={styles.clinicName}>{c.name}</Text>
            <Text style={styles.clinicInfo}>Мекенжайы: {c.address}</Text>
            <Text style={styles.clinicInfo}>Жұмыс уақыты: {c.hours}</Text>
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
    paddingTop: 44,
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
  mapWrapper: {
    height: 260,
    margin: 16,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  list: {
    paddingHorizontal: 16,
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
});