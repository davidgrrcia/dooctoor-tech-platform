import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react-native";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function AppointmentsScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.headerBackBtn} activeOpacity={0.8}>
              <ChevronLeft size={18} color="#4B5563" />
            </TouchableOpacity>
            <View style={styles.headerTitleBlock}>
              <ThemedText style={styles.headerTitle}>Agenda</ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                Citas y eventos médicos
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.headerAddBtn} activeOpacity={0.9}>
              <Plus size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Month Navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity style={styles.monthBtn} activeOpacity={0.8}>
            <ChevronLeft size={18} color="#4B5563" />
          </TouchableOpacity>
          <ThemedText style={styles.monthLabel}>Marzo 2024</ThemedText>
          <TouchableOpacity style={styles.monthBtn} activeOpacity={0.8}>
            <ChevronRight size={18} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <View style={styles.calendar}>
          {/* Weekdays */}
          <View style={styles.weekdaysRow}>
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
              <ThemedText key={d} style={styles.weekday}>
                {d}
              </ThemedText>
            ))}
          </View>
          {/* Days grid (static) */}
          <View style={styles.daysGrid}>
            {[
              // Week 1
              { label: "25", dim: true },
              { label: "26", dim: true },
              { label: "27", dim: true },
              { label: "28", dim: true },
              { label: "29", dim: true },
              { label: "1" },
              { label: "2" },
              // Week 2
              { label: "3" },
              { label: "4" },
              { label: "5" },
              { label: "6" },
              { label: "7" },
              { label: "8" },
              { label: "9" },
              // Week 3
              { label: "10" },
              { label: "11" },
              { label: "12" },
              { label: "13" },
              { label: "14" },
              { label: "15", current: true, dot: "orange" },
              { label: "16" },
              // Week 4
              { label: "17" },
              { label: "18", dot: "pink" },
              { label: "19" },
              { label: "20" },
              { label: "21", dot: "blue" },
              { label: "22" },
              { label: "23" },
              // Week 5
              { label: "24" },
              { label: "25" },
              { label: "26" },
              { label: "27" },
              { label: "28" },
              { label: "29" },
              { label: "30" },
              // Week 6
              { label: "31" },
              { label: "1", dim: true },
              { label: "2", dim: true },
              { label: "3", dim: true },
              { label: "4", dim: true },
              { label: "5", dim: true },
              { label: "6", dim: true },
            ].map((d, idx) => (
              <View key={`${d.label}-${idx}`} style={styles.dayCell}>
                {d.current ? (
                  <View style={styles.currentDayCircle}>
                    <ThemedText style={styles.currentDayText}>
                      {d.label}
                    </ThemedText>
                  </View>
                ) : (
                  <ThemedText
                    style={[styles.dayText, d.dim && styles.dayTextDim]}
                  >
                    {d.label}
                  </ThemedText>
                )}
                {d.dot && (
                  <View
                    style={[
                      styles.dayDot,
                      d.dot === "orange"
                        ? styles.dotOrange
                        : d.dot === "pink"
                          ? styles.dotPink
                          : styles.dotBlue,
                    ]}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Today's Appointments */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Hoy - 15 de Marzo</ThemedText>
          <View style={styles.card}>
            <View style={[styles.leftBar, { backgroundColor: "#FD8006" }]} />
            <View style={styles.cardBody}>
              <View style={styles.cardHeaderRow}>
                <ThemedText style={styles.cardTitle}>
                  Chequeo General - Mike
                </ThemedText>
                <ThemedText style={styles.cardTime}>10:30 AM</ThemedText>
              </View>
              <ThemedText style={styles.cardMeta}>
                Dr. García • Clínica Central
              </ThemedText>
              <ThemedText style={styles.cardMeta}>
                Revisión anual programada
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Próximas Citas</ThemedText>
          <View style={styles.card}>
            <View style={[styles.leftBar, { backgroundColor: "#CB4E8B" }]} />
            <View style={styles.cardBody}>
              <View style={styles.cardHeaderRow}>
                <ThemedText style={styles.cardTitle}>
                  Vacunación - Emma
                </ThemedText>
                <ThemedText style={styles.cardTime}>18 Mar</ThemedText>
              </View>
              <ThemedText style={styles.cardMeta}>
                Dr. López • 2:00 PM
              </ThemedText>
              <ThemedText style={styles.cardMeta}>
                Vacuna anual contra la gripe
              </ThemedText>
            </View>
          </View>

          <View style={styles.card}>
            <View style={[styles.leftBar, { backgroundColor: "#455581" }]} />
            <View style={styles.cardBody}>
              <View style={styles.cardHeaderRow}>
                <ThemedText style={styles.cardTitle}>
                  Control Oftalmológico - Sarah
                </ThemedText>
                <ThemedText style={styles.cardTime}>21 Mar</ThemedText>
              </View>
              <ThemedText style={styles.cardMeta}>
                Dr. Martínez • 4:15 PM
              </ThemedText>
              <ThemedText style={styles.cardMeta}>
                Revisión de la vista anual
              </ThemedText>
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
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F3F4F6",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerBackBtn: {
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
  headerAddBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FD8006",
  },
  monthNav: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  monthBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  calendar: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    overflow: "hidden",
    marginBottom: 12,
  },
  weekdaysRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  weekday: {
    width: `${100 / 7}%`,
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  dayCell: {
    width: `${100 / 7}%`,
    alignItems: "center",
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 12,
    color: "#111827",
  },
  dayTextDim: {
    color: "#D1D5DB",
  },
  currentDayCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FD8006",
    alignItems: "center",
    justifyContent: "center",
  },
  currentDayText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  dayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
  dotOrange: { backgroundColor: "#FD8006" },
  dotPink: { backgroundColor: "#CB4E8B" },
  dotBlue: { backgroundColor: "#455581" },
  section: {
    paddingHorizontal: 24,
    paddingTop: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    flexDirection: "row",
    overflow: "hidden",
  },
  leftBar: {
    width: 6,
  },
  cardBody: {
    flex: 1,
    padding: 12,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  cardTime: {
    fontSize: 12,
    color: "#6B7280",
  },
  cardMeta: {
    fontSize: 12,
    color: "#6B7280",
  },
});
