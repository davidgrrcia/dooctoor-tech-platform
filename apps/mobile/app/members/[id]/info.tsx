import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Mail, MapPin, Phone, ShieldAlert } from 'lucide-react-native';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function MemberInfoScreen() {
  const router = useRouter();
  useLocalSearchParams<{ id: string }>();
  const displayId = '123456789123';

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backBtn} activeOpacity={0.8} onPress={() => router.back()}>
              <ChevronLeft size={18} color="#4B5563" />
            </TouchableOpacity>
            <View style={styles.headerTitleBlock}>
              <ThemedText style={styles.headerTitle}>Información de Emma Johnson</ThemedText>
              <ThemedText style={styles.headerSubtitle}>ID: {displayId}</ThemedText>
            </View>
            <View style={{ width: 40 }} />
          </View>
        </View>

        {/* Resumen de salud */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Resumen de salud</ThemedText>
          <View style={styles.card}>
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Apodo</ThemedText>
              <ThemedText style={styles.fieldValue}>Em</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Nombre</ThemedText>
              <ThemedText style={styles.fieldValue}>Maria</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Apellido</ThemedText>
              <ThemedText style={styles.fieldValue}>Lafuente</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Género</ThemedText>
              <ThemedText style={styles.fieldValue}>mujer</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Fecha de nacimiento</ThemedText>
              <ThemedText style={styles.fieldValue}>12-02-1976</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Grupo sanguíneo</ThemedText>
              <ThemedText style={styles.fieldValue}>O</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>RH</ThemedText>
              <ThemedText style={styles.fieldValue}>+</ThemedText>
            </View>

            <View style={styles.divider} />
            <View style={styles.textareaBlock}>
              <ThemedText style={styles.fieldLabel}>Alergias / Intolerancias</ThemedText>
              <ThemedText style={styles.textareaValue}>Cacahuetes — reacción severa (EpiPen)</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.textareaBlock}>
              <ThemedText style={styles.fieldLabel}>Medicación</ThemedText>
              <ThemedText style={styles.textareaValue}>
                Salbutamol inhalador 100 mcg según necesidad; Cetirizina 5 mg por la noche durante primavera.
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.textareaBlock}>
              <ThemedText style={styles.fieldLabel}>Enfermedades importantes</ThemedText>
              <ThemedText style={styles.textareaValue}>
                Asma leve persistente desde la infancia. Alergia alimentaria a cacahuetes.
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.textareaBlock}>
              <ThemedText style={styles.fieldLabel}>Antecedentes</ThemedText>
              <ThemedText style={styles.textareaValue}>
                Cesárea a término sin complicaciones. Hospitalización por bronquiolitis a los 2 años.
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Datos de contacto de la persona */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Datos de contacto de la persona</ThemedText>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: '#E9EEF6' }]}>
                <Mail size={18} color="#455581" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.cardTitle}>Correo</ThemedText>
                <ThemedText style={styles.cardMeta}>emma.johnson@example.com</ThemedText>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: '#E9EEF6' }]}>
                <Phone size={18} color="#455581" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.cardTitle}>Teléfono</ThemedText>
                <ThemedText style={styles.cardMeta}>+34 600 123 456</ThemedText>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: '#E9EEF6' }]}>
                <MapPin size={18} color="#455581" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.cardTitle}>Dirección</ThemedText>
                <ThemedText style={styles.cardMeta}>C/ Salud 123, Madrid</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Contactos de emergencia */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Contactos de emergencia</ThemedText>
          <View style={styles.card}>
            <View style={styles.rowSpaceBetween}>
              <View>
                <ThemedText style={styles.cardTitle}>Sofía Johnson (Madre)</ThemedText>
                <ThemedText style={styles.cardMeta}>+34 600 222 333</ThemedText>
              </View>
              <Phone size={18} color="#6B7280" />
            </View>
            <View style={styles.divider} />
            <View style={styles.rowSpaceBetween}>
              <View>
                <ThemedText style={styles.cardTitle}>Michael Johnson (Padre)</ThemedText>
                <ThemedText style={styles.cardMeta}>+34 600 444 555</ThemedText>
              </View>
              <Phone size={18} color="#6B7280" />
            </View>
          </View>
        </View>

        {/* Datos de los seguros */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Datos de los seguros</ThemedText>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: '#FFF3E6' }]}>
                <ShieldAlert size={18} color="#C2410C" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.cardTitle}>Aseguradora</ThemedText>
                <ThemedText style={styles.cardMeta}>SaludPlus — Póliza SP-001234</ThemedText>
              </View>
            </View>
            <View style={styles.divider} />
            <View>
              <ThemedText style={styles.cardTitle}>Coberturas</ThemedText>
              <ThemedText style={styles.cardMeta}>Consultas, Urgencias, Pediatría, Laboratorio</ThemedText>
            </View>
            <View style={styles.divider} />
            <View>
              <ThemedText style={styles.cardTitle}>Vigencia</ThemedText>
              <ThemedText style={styles.cardMeta}>01/01/2024 - 12/31/2025</ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F3F4F6',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleBlock: {
    flex: 1,
    marginHorizontal: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    gap: 12,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  textareaBlock: {
    gap: 6,
  },
  textareaValue: {
    fontSize: 14,
    color: '#111827',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextBlock: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  cardMeta: {
    fontSize: 12,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
});
