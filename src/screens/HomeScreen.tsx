import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

interface DoctorItem {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  rating: string;
}

const DOCTORS: DoctorItem[] = [
  {
    id: '1',
    name: 'Др. Әсел Серікқызы',
    specialty: 'Кардиолог',
    clinic: 'AZD Орталық Клиника (Абай даңғылы, 45)',
    rating: '4.9',
  },
  {
    id: '2',
    name: 'Др. Марат Төлеуов',
    specialty: 'Терапевт',
    clinic: 'AZD Сол жағалау (Қабанбай батыр, 18)',
    rating: '4.8',
  },
  {
    id: '3',
    name: 'Др. Динара Ахметова',
    specialty: 'Дерматолог',
    clinic: 'AZD Медеу филиалы (Достық даңғылы, 92)',
    rating: '5.0',
  },
];

interface Props {
  onSelectDoctor: (doctor: DoctorItem) => void;
  onOpenMap: () => void;
  onLogout: () => void;
}

export const HomeScreen: React.FC<Props> = ({
  onSelectDoctor,
  onOpenMap,
  onLogout,
}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.topBanner}>
        <View style={styles.rowBetween}>
          <View style={styles.brandRow}>
            <Image
              source={require('../../assets/azd-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.hello}>Сәлеметсіз бе!</Text>
              <Text style={styles.sub}>AZD Медициналық Портал</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.mapBanner} onPress={onOpenMap}>
          <Ionicons name="map" size={22} color={COLORS.primary} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.mapTitle}>Клиникалар картасы</Text>
            <Text style={styles.mapSub}>Жақын маңдағы AZD бөлімшелерін картадан қарау</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Дәрігерлерге жазылу</Text>

      {DOCTORS.map((doc) => (
        <View key={doc.id} style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={styles.docName}>{doc.name}</Text>
              <Text style={styles.docSpec}>{doc.specialty}</Text>
              <Text style={styles.docClinic}>{doc.clinic}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.ratingText}>{doc.rating}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() => onSelectDoctor(doc)}
          >
            <Text style={styles.bookBtnText}>Уақыт таңдау (Бос / Бос емес)</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surfaceBlue,
  },
  topBanner: {
    backgroundColor: COLORS.primary,
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 22,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  hello: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
  sub: {
    color: COLORS.primaryLight,
    fontSize: 12,
  },
  logoutBtn: {
    padding: 8,
    backgroundColor: COLORS.primaryDark,
    borderRadius: 12,
  },
  mapBanner: {
    marginTop: 18,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  mapSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  docName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  docSpec: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  docClinic: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceBlue,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '700',
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  bookBtn: {
    marginTop: 14,
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookBtnText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 13,
  },
});