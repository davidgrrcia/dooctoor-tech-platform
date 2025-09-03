import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { api } from "@repo/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ChevronLeft,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
} from "lucide-react-native";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function MemberInfoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Convex hooks - simplified for display only
  // Using hardcoded ID for now
  const member = useQuery(api.members.getMemberById, {
    id: "p575b1f9mtgts3qbb7hgw160197pw0sn" as any,
  });

  // COMMENTED OUT FOR NOW - EDITING FUNCTIONALITY
  /*
  useEffect(() => {
    if (member && !formData) {
      setFormData({
        nickname: member.nickname,
        name: member.name,
        surname: member.surname,
        gender: member.gender,
        dateOfBirth: member.dateOfBirth,
        bloodType: member.bloodType,
        rh: member.rh,
        allergies: member.allergies,
        medication: member.medication,
        majorDiseases: member.majorDiseases,
        background: member.background,
        email: member.email,
        phone: member.phone,
        address: member.address,
        emergencyContacts: member.emergencyContacts,
        insurance: member.insurance,
      });
    }
  }, [member, formData]);
  */

  // COMMENTED OUT FOR NOW - EDITING FUNCTIONALITY
  /*
  const handleSave = async () => {
    if (!formData || !member) return;

    try {
      await updateMember({
        id: member._id,
        ...formData,
      });
      setIsEditing(false);
      Alert.alert("Éxito", "Información actualizada correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la información");
    }
  };

  const handleCancel = () => {
    if (member) {
      setFormData({
        nickname: member.nickname,
        name: member.name,
        surname: member.surname,
        gender: member.gender,
        dateOfBirth: member.dateOfBirth,
        bloodType: member.bloodType,
        rh: member.rh,
        allergies: member.allergies,
        medication: member.medication,
        majorDiseases: member.majorDiseases,
        background: member.background,
        email: member.email,
        phone: member.phone,
        address: member.address,
        emergencyContacts: member.emergencyContacts,
        insurance: member.insurance,
      });
    }
    setIsEditing(false);
  };

  const updateFormField = (field: keyof MemberFormData, value: any) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: value });
  };

  const updateEmergencyContact = (
    index: number,
    field: string,
    value: string,
  ) => {
    if (!formData) return;
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  const addEmergencyContact = () => {
    if (!formData) return;
    const newContact = { name: "", relationship: "", phone: "" };
    setFormData({
      ...formData,
      emergencyContacts: [...formData.emergencyContacts, newContact],
    });
  };

  const removeEmergencyContact = (index: number) => {
    if (!formData) return;
    const updatedContacts = formData.emergencyContacts.filter(
      (_, i) => i !== index,
    );
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  const updateInsurance = (field: string, value: string) => {
    if (!formData) return;
    setFormData({
      ...formData,
      insurance: { ...formData.insurance, [field]: value },
    });
  };
  */

  if (member === undefined) {
    // Loading state
    return (
      <LoadingSpinner message="Cargando información..." fullScreen={true} />
    );
  }

  if (!member) {
    return (
      <ThemedView style={styles.screen}>
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
              <ThemedText style={styles.headerTitle}>
                Miembro no encontrado
              </ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                No se encontró un miembro con ID: {id}
              </ThemedText>
            </View>
            <View style={{ width: 40 }} />
          </View>
        </View>
      </ThemedView>
    );
  }

  const displayId = member._id.slice(-12);

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
              <ThemedText style={styles.headerTitle}>
                Información de {member.name} {member.surname}
              </ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                ID: {displayId}
              </ThemedText>
            </View>
            <View style={{ width: 40 }} />
            {/* COMMENTED OUT EDIT BUTTON
            <TouchableOpacity
              style={styles.editBtn}
              activeOpacity={0.8}
              onPress={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? (
                <Save size={18} color="#059669" />
              ) : (
                <Edit3 size={18} color="#4B5563" />
              )}
            </TouchableOpacity>
            {isEditing && (
              <TouchableOpacity
                style={[styles.editBtn, { marginLeft: 8 }]}
                activeOpacity={0.8}
                onPress={handleCancel}
              >
                <X size={18} color="#DC2626" />
              </TouchableOpacity>
            )}
            */}
          </View>
        </View>

        {/* Resumen de salud */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Resumen de salud</ThemedText>
          <View style={styles.card}>
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Apodo</ThemedText>
              <ThemedText style={styles.fieldValue}>
                {member.nickname}
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Nombre</ThemedText>
              <ThemedText style={styles.fieldValue}>{member.name}</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Apellido</ThemedText>
              <ThemedText style={styles.fieldValue}>
                {member.surname}
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Género</ThemedText>
              <ThemedText style={styles.fieldValue}>{member.gender}</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>
                Fecha de nacimiento
              </ThemedText>
              <ThemedText style={styles.fieldValue}>
                {member.dateOfBirth}
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Grupo sanguíneo</ThemedText>
              <ThemedText style={styles.fieldValue}>
                {member.bloodType}
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>RH</ThemedText>
              <ThemedText style={styles.fieldValue}>{member.rh}</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Altura</ThemedText>
              <ThemedText style={styles.fieldValue}>
                {member.height} cm
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.fieldRow}>
              <ThemedText style={styles.fieldLabel}>Peso</ThemedText>
              <ThemedText style={styles.fieldValue}>
                {member.weight} kg
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.textareaBlock}>
              <ThemedText style={styles.fieldLabel}>
                Alergias / Intolerancias
              </ThemedText>
              <ThemedText style={styles.textareaValue}>
                {member.allergies}
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.textareaBlock}>
              <ThemedText style={styles.fieldLabel}>Medicación</ThemedText>
              <ThemedText style={styles.textareaValue}>
                {member.medication}
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.textareaBlock}>
              <ThemedText style={styles.fieldLabel}>
                Enfermedades importantes
              </ThemedText>
              <ThemedText style={styles.textareaValue}>
                {member.majorDiseases}
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.textareaBlock}>
              <ThemedText style={styles.fieldLabel}>Antecedentes</ThemedText>
              <ThemedText style={styles.textareaValue}>
                {member.background}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Datos de contacto de la persona */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Datos de contacto de la persona
          </ThemedText>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: "#E9EEF6" }]}>
                <Mail size={18} color="#455581" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.cardTitle}>Correo</ThemedText>
                <ThemedText style={styles.cardMeta}>{member.email}</ThemedText>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: "#E9EEF6" }]}>
                <Phone size={18} color="#455581" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.cardTitle}>Teléfono</ThemedText>
                <ThemedText style={styles.cardMeta}>{member.phone}</ThemedText>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: "#E9EEF6" }]}>
                <MapPin size={18} color="#455581" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.cardTitle}>Dirección</ThemedText>
                <ThemedText style={styles.cardMeta}>
                  {member.address}
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Contactos de emergencia */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Contactos de emergencia
          </ThemedText>
          <View style={styles.card}>
            {member.emergencyContacts.map((contact, index) => (
              <View key={index}>
                {index > 0 && <View style={styles.divider} />}
                <View style={styles.rowSpaceBetween}>
                  <View>
                    <ThemedText style={styles.cardTitle}>
                      {contact.name} ({contact.relationship})
                    </ThemedText>
                    <ThemedText style={styles.cardMeta}>
                      {contact.phone}
                    </ThemedText>
                  </View>
                  <Phone size={18} color="#6B7280" />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Datos de los seguros */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Datos de los seguros
          </ThemedText>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={[styles.iconCircle, { backgroundColor: "#FFF3E6" }]}>
                <ShieldAlert size={18} color="#C2410C" />
              </View>
              <View style={styles.cardTextBlock}>
                <ThemedText style={styles.cardTitle}>Aseguradora</ThemedText>
                <ThemedText style={styles.cardMeta}>
                  {member.insurance.company} — Póliza{" "}
                  {member.insurance.policyNumber}
                </ThemedText>
              </View>
            </View>
            <View style={styles.divider} />
            <View>
              <ThemedText style={styles.cardTitle}>Coberturas</ThemedText>
              <ThemedText style={styles.cardMeta}>
                {member.insurance.coverages}
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View>
              <ThemedText style={styles.cardTitle}>Vigencia</ThemedText>
              <ThemedText style={styles.cardMeta}>
                {member.insurance.validFrom} - {member.insurance.validTo}
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
    marginBottom: 4,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  editBtn: {
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
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F0FDF4",
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 12,
    color: "#059669",
    fontWeight: "500",
  },
  removeButton: {
    padding: 8,
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
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
    gap: 12,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldLabel: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    textAlign: "right",
  },
  fieldInput: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    textAlign: "right",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 4,
  },
  textareaBlock: {
    gap: 6,
  },
  textareaValue: {
    fontSize: 14,
    color: "#111827",
  },
  textareaInput: {
    fontSize: 14,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
  },
  input: {
    fontSize: 14,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
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
  emergencyContactEdit: {
    gap: 8,
  },
  emergencyInput: {
    marginBottom: 0,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  dateSeparator: {
    fontSize: 14,
    color: "#6B7280",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
  },
});
