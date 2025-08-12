import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Calendar,
  ChevronRight,
  Pill,
  Plus,
  Share2,
  User,
} from "lucide-react-native";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.headerTitle}>
              Buenos días, Sarah
            </ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Este es tu resumen de salud familiar
            </ThemedText>
          </View>
        </View>

        {/* Family Members */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>
              Miembros de la Familia
            </ThemedText>
            <TouchableOpacity activeOpacity={0.8}>
              <ThemedText style={styles.linkButton}>Añadir Miembro</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.cardList}>
            <TouchableOpacity style={styles.card} activeOpacity={0.9}>
              <View style={styles.cardRow}>
                <View style={styles.avatarCircle}>
                  <User size={24} color="#6B7280" />
                </View>
                <View style={styles.cardTextBlock}>
                  <ThemedText style={styles.cardTitle}>
                    Sarah Johnson
                  </ThemedText>
                  <ThemedText style={styles.cardSubtitle}>
                    Administradora Principal
                  </ThemedText>
                </View>
                <ChevronRight size={22} color="#9CA3AF" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} activeOpacity={0.9}>
              <View style={styles.cardRow}>
                <View style={styles.avatarCircle}>
                  <User size={24} color="#6B7280" />
                </View>
                <View style={styles.cardTextBlock}>
                  <ThemedText style={styles.cardTitle}>Mike Johnson</ThemedText>
                  <ThemedText style={styles.cardSubtitle}>
                    Miembro Familiar
                  </ThemedText>
                </View>
                <ChevronRight size={22} color="#9CA3AF" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} activeOpacity={0.9}>
              <View style={styles.cardRow}>
                <View style={styles.avatarCircle}>
                  <User size={24} color="#6B7280" />
                </View>
                <View style={styles.cardTextBlock}>
                  <ThemedText style={styles.cardTitle}>Emma Johnson</ThemedText>
                  <ThemedText style={styles.cardSubtitle}>
                    Dependiente (Hija)
                  </ThemedText>
                </View>
                <ChevronRight size={22} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Acciones Rápidas</ThemedText>
          <View style={styles.quickGrid}>
            <TouchableOpacity style={styles.quickCard} activeOpacity={0.9}>
              <View
                style={[styles.quickIconCircle, { backgroundColor: "#FDE8EA" }]}
              >
                <Plus size={18} color="#f9545d" />
              </View>
              <ThemedText style={styles.quickLabel}>Añadir Registro</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickCard} activeOpacity={0.9}>
              <View
                style={[styles.quickIconCircle, { backgroundColor: "#E9EEF6" }]}
              >
                <Calendar size={18} color="#455581" />
              </View>
              <ThemedText style={styles.quickLabel}>Programar Cita</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickCard} activeOpacity={0.9}>
              <View
                style={[styles.quickIconCircle, { backgroundColor: "#F6E8F0" }]}
              >
                <Pill size={18} color="#CB4E8B" />
              </View>
              <ThemedText style={styles.quickLabel}>Medicamentos</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickCard} activeOpacity={0.9}>
              <View
                style={[styles.quickIconCircle, { backgroundColor: "#EEE6F4" }]}
              >
                <Share2 size={18} color="#855798" />
              </View>
              <ThemedText style={styles.quickLabel}>Compartir Info</ThemedText>
            </TouchableOpacity>
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
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#4B5563",
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
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
  cardList: {
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
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  cardTextBlock: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  cardSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    width: "48%",
  },
  quickIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  quickLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
});
