import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  AlertTriangle,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Edit2,
  FileText,
  Image as ImageIcon,
  Pill,
  Stethoscope,
  Syringe,
  User,
} from "lucide-react-native";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function MemberProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleOpenInfo = () => {
    router.push(`/members/${id}/info`);
  };

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.8}
              onPress={() => router.back()}
            >
              <ChevronLeft size={18} color="#4B5563" />
            </TouchableOpacity>
            <View style={styles.headerTitleBlock}>
              <ThemedText style={styles.headerTitle}>Emma Johnson</ThemedText>
            </View>
            <TouchableOpacity style={styles.editBtn} activeOpacity={0.9}>
              <Edit2 size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <TouchableOpacity
            style={styles.profileCard}
            activeOpacity={0.85}
            onPress={handleOpenInfo}
          >
            <View style={styles.profileRow}>
              <View style={styles.avatarCircle}>
                <User size={32} color="#6B7280" />
              </View>
              <View style={styles.profileTextBlock}>
                <View style={styles.nameRow}>
                  <ThemedText style={styles.nameText}>Emma Johnson</ThemedText>
                </View>
                <ThemedText style={styles.metaText}>
                  Género: Femenino
                </ThemedText>
                <ThemedText style={styles.metaText}>
                  Nacida: 15 de Marzo, 2016
                </ThemedText>
                <ThemedText style={styles.metaText}>
                  Tipo de Sangre: O+
                </ThemedText>
              </View>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <ThemedText style={styles.statValue}>8 años</ThemedText>
                <ThemedText style={styles.statLabel}>Edad</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statValue}>25 kg</ThemedText>
                <ThemedText style={styles.statLabel}>Peso</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statValue}>127 cm</ThemedText>
                <ThemedText style={styles.statLabel}>Altura</ThemedText>
              </View>
            </View>

            {/* Chevron Indicator */}
            <TouchableOpacity
              style={styles.cardChevronBtn}
              onPress={handleOpenInfo}
              activeOpacity={0.7}
            >
              <ChevronRight size={18} color="#6B7280" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Health Summary */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Resumen de Salud</ThemedText>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: "#E9EEF6" }]}>
                <Check size={18} color="#455581" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.cardTitle}>Vacunas al Día</ThemedText>
                <ThemedText style={styles.cardMeta}>
                  Próxima: Vacuna anual de gripe
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: "#F6E8F0" }]}>
                <AlertTriangle size={18} color="#CB4E8B" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.cardTitle}>
                  Alergia: Cacahuetes
                </ThemedText>
                <ThemedText style={styles.cardMeta}>
                  Reacción severa - llevar EpiPen
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: "#E9EEF6" }]}>
                <Calendar size={18} color="#455581" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.cardTitle}>
                  Próximo Chequeo
                </ThemedText>
                <ThemedText style={styles.cardMeta}>
                  15 de Abril, 2024 a las 2:00 PM
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Registros Favoritos */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Registros Favoritos
          </ThemedText>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: "#F3F4F6" }]}>
                <FileText size={18} color="#455581" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.recordTitle}>
                  Plan de Tratamiento
                </ThemedText>
                <ThemedText style={styles.recordMeta}>
                  Medicina General • 12 de Mar, 2024
                </ThemedText>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: "#F3F4F6" }]}>
                <ImageIcon size={18} color="#455581" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.recordTitle}>
                  Resultados Hematología
                </ThemedText>
                <ThemedText style={styles.recordMeta}>
                  Hematología • 5 de Mar, 2024
                </ThemedText>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </View>
          </View>
        </View>

        {/* Registros Crónicos / Permanentes */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Registros Crónicos / Permanentes
          </ThemedText>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: "#F6E8F0" }]}>
                <AlertTriangle size={18} color="#CB4E8B" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.recordTitle}>
                  Alergia: Cacahuetes
                </ThemedText>
                <ThemedText style={styles.recordMeta}>
                  Alergología • Permanente
                </ThemedText>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: "#E9EEF6" }]}>
                <Pill size={18} color="#455581" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.recordTitle}>
                  Asma — Plan de Acción
                </ThemedText>
                <ThemedText style={styles.recordMeta}>
                  Neumología • Revisión: 20 de Feb, 2024
                </ThemedText>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </View>
          </View>
        </View>

        {/* Recent Records */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <ThemedText style={styles.sectionTitle}>
              Registros Recientes
            </ThemedText>
            <TouchableOpacity activeOpacity={0.8}>
              <ThemedText style={styles.linkButton}>Ver Todos</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View
                style={[styles.iconCircleSm, { backgroundColor: "#E9EEF6" }]}
              >
                <Syringe size={16} color="#455581" />
              </View>
              <View>
                <ThemedText style={styles.recordTitle}>
                  Vacunación Anual
                </ThemedText>
                <ThemedText style={styles.recordMeta}>
                  1 de Marzo, 2024
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View
                style={[styles.iconCircleSm, { backgroundColor: "#E9EEF6" }]}
              >
                <Stethoscope size={16} color="#455581" />
              </View>
              <View>
                <ThemedText style={styles.recordTitle}>
                  Chequeo de Rutina
                </ThemedText>
                <ThemedText style={styles.recordMeta}>
                  20 de Febrero, 2024
                </ThemedText>
              </View>
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
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F3F4F6",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleBlock: {
    flex: 1,
    marginHorizontal: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 14,
    color: "#4B5563",
  },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FD8006",
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    position: "relative",
  },
  cardChevronBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  profileTextBlock: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#455581",
  },
  metaText: {
    fontSize: 14,
    color: "#4B5563",
  },
  statsGrid: {
    marginTop: 12,
    flexDirection: "row",
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  linkButton: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FD8006",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleSm: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardTextBlock: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  cardMeta: {
    fontSize: 12,
    color: "#6B7280",
  },
  recordTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  recordMeta: {
    fontSize: 12,
    color: "#6B7280",
  },
});
