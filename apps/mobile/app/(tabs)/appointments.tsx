import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function AppointmentsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Agenda</ThemedText>
      <ThemedText>Placeholder de la agenda</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
