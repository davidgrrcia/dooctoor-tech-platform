import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ChevronRight, User, Users } from "lucide-react-native";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Summary */}
        <View style={styles.profileSummary}>
          <View style={styles.avatarCircleLg}>
            <User size={32} color="#6B7280" />
          </View>
          <View style={styles.profileTextBlock}>
            <ThemedText style={styles.profileName}>Sarah Johnson</ThemedText>
            <ThemedText style={styles.profileMeta}>
              sarah.johnson@email.com
            </ThemedText>
            <ThemedText style={styles.profileMeta}>
              Administrador Familiar
            </ThemedText>
          </View>
          <ChevronRight size={22} color="#9CA3AF" />
        </View>

        {/* Gestión Familiar */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Gestión Familiar</ThemedText>
          <TouchableOpacity style={styles.cardRowItem} activeOpacity={0.9}>
            <View style={[styles.iconCircle, { backgroundColor: "#F3F4F6" }]}>
              <Users size={18} color="#CB4E8B" />
            </View>
            <View style={styles.itemTextBlock}>
              <ThemedText style={styles.itemTitle}>
                Gestionar Miembros de la Familia
              </ThemedText>
              <ThemedText style={styles.itemSubtitle}>
                Añadir, editar o eliminar miembros
              </ThemedText>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardRowItem} activeOpacity={0.9}>
            <View style={[styles.iconCircle, { backgroundColor: "#F3F4F6" }]}>
              <Users size={18} color="#855798" />
            </View>
            <View style={styles.itemTextBlock}>
              <ThemedText style={styles.itemTitle}>
                Permisos de Compartir
              </ThemedText>
              <ThemedText style={styles.itemSubtitle}>
                Controla quién puede acceder a los registros
              </ThemedText>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Privacidad y Seguridad */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Privacidad y Seguridad
          </ThemedText>
          <TouchableOpacity style={styles.cardRowItem} activeOpacity={0.9}>
            <View style={[styles.iconCircle, { backgroundColor: "#E9EEF6" }]}>
              <User size={18} color="#455581" />
            </View>
            <View style={styles.itemTextBlock}>
              <ThemedText style={styles.itemTitle}>
                Cambiar Contraseña
              </ThemedText>
              <ThemedText style={styles.itemSubtitle}>
                Actualiza la contraseña de tu cuenta
              </ThemedText>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardRowItem} activeOpacity={0.9}>
            <View style={[styles.iconCircle, { backgroundColor: "#F3F4F6" }]}>
              <User size={18} color="#6B7280" />
            </View>
            <View style={styles.itemTextBlock}>
              <ThemedText style={styles.itemTitle}>
                Inicio Biométrico
              </ThemedText>
              <ThemedText style={styles.itemSubtitle}>
                Habilitar desbloqueo por huella/rostro
              </ThemedText>
            </View>
            {/* Toggle placeholder */}
            <View style={styles.toggleMock}>
              <View style={styles.toggleKnob} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Preferencias de la App */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Preferencias de la App
          </ThemedText>
          <TouchableOpacity style={styles.cardRowItem} activeOpacity={0.9}>
            <View style={[styles.iconCircle, { backgroundColor: "#F3F4F6" }]}>
              <User size={18} color="#CB4E8B" />
            </View>
            <View style={styles.itemTextBlock}>
              <ThemedText style={styles.itemTitle}>Notificaciones</ThemedText>
              <ThemedText style={styles.itemSubtitle}>
                Gestionar preferencias de alertas
              </ThemedText>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardRowItem} activeOpacity={0.9}>
            <View style={[styles.iconCircle, { backgroundColor: "#F3F4F6" }]}>
              <User size={18} color="#6B7280" />
            </View>
            <View style={styles.itemTextBlock}>
              <ThemedText style={styles.itemTitle}>Exportar Datos</ThemedText>
              <ThemedText style={styles.itemSubtitle}>
                Descarga tus datos de salud
              </ThemedText>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
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
  profileSummary: {
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
    marginTop: 64,
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarCircleLg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  profileTextBlock: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: "700", color: "#111827" },
  profileMeta: { fontSize: 14, color: "#4B5563" },
  section: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  cardRowItem: {
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
  itemTextBlock: { flex: 1 },
  itemTitle: { fontSize: 14, fontWeight: "600", color: "#111827" },
  itemSubtitle: { fontSize: 12, color: "#6B7280" },
  toggleMock: {
    width: 48,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FD8006",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 4,
  },
  toggleKnob: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
});
