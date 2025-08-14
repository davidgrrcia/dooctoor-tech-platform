import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Activity,
  ChevronLeft,
  HeartPulse,
  Plus,
  Search,
  Thermometer,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MemberMeasurementsScreen() {
  const router = useRouter();
  useLocalSearchParams<{ id: string }>();
  const chips: string[] = [
    "Peso (Kg)",
    "Altura (m)",
    "Azúcar en sangre (mg/dl)",
    "Temperatura (ºC)",
    "Presión arterial",
    "Menstruación",
    "Perímetro Cefálico (cm)",
  ];

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
              <ThemedText style={styles.headerTitle}>Mediciones</ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                Historial y registros
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
              placeholder="Buscar mediciones..."
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
            {chips.map((label, idx) => (
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

        {/* Measurements List */}
        <View style={styles.listSection}>
          {[
            {
              tipo: "Peso (Kg)",
              valor: "25.2 Kg",
              fecha: "12 Mar 2024, 09:14",
              icon: <Activity size={18} color="#CB4E8B" />,
              tint: "#F6E8F0",
            },
            {
              tipo: "Presión arterial",
              valor: "118/76 mmHg",
              fecha: "10 Mar 2024, 20:05",
              icon: <HeartPulse size={18} color="#455581" />,
              tint: "#E9EEF6",
            },
            {
              tipo: "Temperatura (ºC)",
              valor: "36.8 ºC",
              fecha: "08 Mar 2024, 07:45",
              icon: <Thermometer size={18} color="#455581" />,
              tint: "#E9EEF6",
            },
          ].map((m) => (
            <View key={`${m.tipo}-${m.fecha}`} style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                  <View
                    style={[styles.iconCircle, { backgroundColor: m.tint }]}
                  >
                    {m.icon}
                  </View>
                  <View>
                    <ThemedText style={styles.cardTitle}>{m.tipo}</ThemedText>
                    <ThemedText style={styles.cardMeta}>{m.fecha}</ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.measureValue}>{m.valor}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F9FAFB" },
  scrollContent: { paddingBottom: 24 },
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
    marginBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleBlock: { flex: 1, marginHorizontal: 8 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#111827" },
  headerSubtitle: { marginTop: 2, fontSize: 14, color: "#4B5563" },
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
  filtersRow: { gap: 10 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },
  chipText: { color: "#4B5563", fontSize: 13, fontWeight: "600" },
  chipActive: { backgroundColor: "#FD8006" },
  chipActiveText: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  listSection: { paddingHorizontal: 24, paddingTop: 16, gap: 12 },
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
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: "#F3F4F6",
  },
  cardTitle: { fontSize: 14, fontWeight: "600", color: "#111827" },
  cardMeta: { marginTop: 2, fontSize: 12, color: "#6B7280" },
  measureValue: { fontSize: 18, fontWeight: "700", color: "#111827" },
});
