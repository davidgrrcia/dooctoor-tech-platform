import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  CalendarDays,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Pill,
  Plus,
  Search,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RecordsScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <ThemedText style={styles.headerTitle}>
                Registros Médicos
              </ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                Documentos de salud digitales
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.9}>
              <Plus size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {/* Search */}
          <View style={styles.searchBar}>
            <Search size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Buscar registros..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Filter Chips */}
        <View style={styles.filtersBar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersRow}
          >
            {[
              "Todos",
              "Informe",
              "Síntoma / Evento",
              "Hoja de Medicación",
              "Medicamento",
              "Prueba de Laboratorio",
              "Prueba de Imagen",
              "Enfermería",
              "Foto",
              "Vacuna",
              "Otros",
            ].map((label, idx) => (
              <TouchableOpacity
                key={label}
                style={[styles.chip, idx === 0 && styles.chipActive]}
                activeOpacity={0.8}
              >
                <ThemedText
                  style={idx === 0 ? styles.chipActiveText : styles.chipText}
                >
                  {label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Records List */}
        <View style={styles.listSection}>
          {/* Resultados de Análisis de Sangre */}
          <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderLeft}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#F6E8F0" }]}
                >
                  <FileText size={18} color="#CB4E8B" />
                </View>
                <View>
                  <ThemedText style={styles.cardTitle}>
                    Resultados de Análisis de Sangre
                  </ThemedText>
                  <ThemedText style={styles.cardMeta}>
                    Hematología • 15 de Marzo, 2024
                  </ThemedText>
                </View>
              </View>
              <ChevronRight size={22} color="#9CA3AF" />
            </View>
            {/* tags removed */}
          </TouchableOpacity>

          {/* Radiografía de Tórax */}
          <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderLeft}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#E9EEF6" }]}
                >
                  <ImageIcon size={18} color="#455581" />
                </View>
                <View>
                  <ThemedText style={styles.cardTitle}>
                    Radiografía de Tórax
                  </ThemedText>
                  <ThemedText style={styles.cardMeta}>
                    Radiología • 10 de Marzo, 2024
                  </ThemedText>
                </View>
              </View>
              <ChevronRight size={22} color="#9CA3AF" />
            </View>
            {/* tags removed */}
          </TouchableOpacity>

          {/* Receta - Antibióticos */}
          <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderLeft}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#F6E8F0" }]}
                >
                  <Pill size={18} color="#CB4E8B" />
                </View>
                <View>
                  <ThemedText style={styles.cardTitle}>
                    Receta - Antibióticos
                  </ThemedText>
                  <ThemedText style={styles.cardMeta}>
                    Medicina General • 8 de Marzo, 2024
                  </ThemedText>
                </View>
              </View>
              <ChevronRight size={22} color="#9CA3AF" />
            </View>
            {/* tags removed */}
          </TouchableOpacity>

          {/* Vacuna COVID-19 */}
          <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderLeft}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#E9EEF6" }]}
                >
                  <CalendarDays size={18} color="#455581" />
                </View>
                <View>
                  <ThemedText style={styles.cardTitle}>
                    Vacuna COVID-19
                  </ThemedText>
                  <ThemedText style={styles.cardMeta}>
                    Vacunación • 20 de Feb, 2024
                  </ThemedText>
                </View>
              </View>
              <ChevronRight size={22} color="#9CA3AF" />
            </View>
            {/* tags removed */}
          </TouchableOpacity>
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
    paddingTop: 64,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F3F4F6",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
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
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FD8006",
  },
  searchBar: {
    marginTop: 8,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: "#111827",
  },
  filtersBar: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F3F4F6",
  },
  filtersRow: {
    gap: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },
  chipText: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "600",
  },
  chipActive: {
    backgroundColor: "#FD8006",
  },
  chipActiveText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  listSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
  },
  card: {
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
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    minHeight: 48,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  cardMeta: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
  },
  tagRow: {
    flexDirection: "row",
    gap: 8,
  },
  tagPillLight: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },
  tagPillLightText: {
    color: "#455581",
    fontSize: 11,
    fontWeight: "700",
  },
  tagPillOutline: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(69,85,129,0.1)",
  },
  tagPillOutlineText: {
    color: "#455581",
    fontSize: 11,
    fontWeight: "700",
  },
  tagPillLightPink: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F3EEF5",
  },
  tagPillLightPinkText: {
    color: "#CB4E8B",
    fontSize: 11,
    fontWeight: "700",
  },
  tagPillTintPink: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(203,78,139,0.1)",
  },
  tagPillTintPinkText: {
    color: "#CB4E8B",
    fontSize: 11,
    fontWeight: "700",
  },
});
