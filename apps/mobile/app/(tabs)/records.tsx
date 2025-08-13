import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function RecordsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Registros</ThemedText>
      <ThemedText>Placeholder de la lista de registros</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
