import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../components/CustomButton';
import { COLORS } from '../theme/colors';

interface TimeSlot {
  time: string;
  isBusy: boolean; // true = бос емес (занято), false = бос (свободно)
}

const DAYS = ['Дүй', 'Сей', 'Сәр', 'Бей', 'Жұм', 'Сен'];

const INITIAL_SLOTS: TimeSlot[] = [
  { time: '09:00', isBusy: false },
  { time: '09:30', isBusy: true },
  { time: '10:00', isBusy: false },
  { time: '10:30', isBusy: true },
  { time: '11:00', isBusy: false },
  { time: '11:30', isBusy: false },
  { time: '14:00', isBusy: true },
  { time: '14:30', isBusy: false },
  { time: '15:00', isBusy: false },
  { time: '15:30', isBusy: true },
  { time: '16:00', isBusy: false },
  { time: '16:30', isBusy: false },
];

interface Props {
  doctorName: string;
  specialty: string;
  onBack: () => void;
}

export const ScheduleScreen: React.FC<Props> = ({
  doctorName,
  specialty,
  onBack,
}) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [slots, setSlots] = useState<TimeSlot[]>(INITIAL_SLOTS);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleConfirmBooking = () => {
    if (!selectedTime) return;

    setSlots((prev) =>
      prev.map((s) => (s.time === selectedTime ? { ...s, isBusy: true } : s))
    );

    Alert.alert(
      'Жазба расталды',
      `${doctorName} (${specialty})\nКүні: ${DAYS[selectedDay]}, Уақыты: ${selectedTime}\nСіз сәтті жазылдыңыз!`,
      [{ text: 'Жарайды', onPress: () => setSelectedTime(null) }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Қабылдауға жазылу</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.doctorBox}>
        <Text style={styles.docName}>{doctorName}</Text>
        <Text style={styles.docSpec}>{specialty}</Text>
      </View>

      <Text style={styles.label}>Күнді таңдаңыз</Text>
      <View style={styles.daysRow}>
        {DAYS.map((day, index) => {
          const active = index === selectedDay;
          return (
            <TouchableOpacity
              key={day}
              onPress={() => {
                setSelectedDay(index);
                setSelectedTime(null);
              }}
              style={[styles.dayChip, active && styles.dayChipActive]}
            >
              <Text style={[styles.dayText, active && styles.dayTextActive]}>{day}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>Уақытты таңдаңыз</Text>
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: COLORS.primary }]} />
          <Text style={styles.legendText}>Бос (таңдауға болады)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: COLORS.slotBusyText }]} />
          <Text style={styles.legendText}>Бос емес (бос емес)</Text>
        </View>
      </View>

      <View style={styles.slotsGrid}>
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.time;
          return (
            <TouchableOpacity
              key={slot.time}
              disabled={slot.isBusy}
              onPress={() => setSelectedTime(slot.time)}
              style={[
                styles.slotBtn,
                slot.isBusy && styles.slotBusy,
                isSelected && styles.slotSelected,
              ]}
            >
              <Text
                style={[
                  styles.slotTime,
                  slot.isBusy && styles.slotBusyText,
                  isSelected && styles.slotSelectedText,
                ]}
              >
                {slot.time}
              </Text>
              <Text
                style={[
                  styles.slotStatus,
                  slot.isBusy && styles.slotBusyText,
                  isSelected && styles.slotSelectedText,
                ]}
              >
                {slot.isBusy ? 'Бос емес' : 'Бос'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <CustomButton
        title={selectedTime ? `Жазылу (${selectedTime})` : 'Бос уақытты таңдаңыз'}
        disabled={!selectedTime}
        onPress={handleConfirmBooking}
        style={{ marginTop: 24 }}
      />
    </ScrollView>
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
  doctorBox: {
    backgroundColor: COLORS.surfaceBlue,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },
  docName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  docSpec: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayChip: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: COLORS.inputBg,
  },
  dayChipActive: {
    backgroundColor: COLORS.primary,
  },
  dayText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  dayTextActive: {
    color: COLORS.white,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slotBtn: {
    width: '31%',
    backgroundColor: COLORS.slotFreeBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  slotBusy: {
    backgroundColor: COLORS.slotBusyBg,
    borderColor: COLORS.slotBusyBg,
  },
  slotSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  slotTime: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.slotFreeText,
  },
  slotStatus: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.slotFreeText,
    marginTop: 2,
  },
  slotBusyText: {
    color: COLORS.slotBusyText,
  },
  slotSelectedText: {
    color: COLORS.white,
  },
});