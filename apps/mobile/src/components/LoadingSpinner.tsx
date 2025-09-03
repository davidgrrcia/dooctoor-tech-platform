import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
  fullScreen?: boolean;
}

export function LoadingSpinner({
  message = "Cargando...",
  size = "large",
  fullScreen = true,
}: LoadingSpinnerProps) {
  const containerStyle = fullScreen
    ? styles.fullScreenContainer
    : styles.inlineContainer;

  return (
    <ThemedView style={containerStyle}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size={size} color="#FD8006" style={styles.spinner} />
        {message && <ThemedText style={styles.message}>{message}</ThemedText>}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  inlineContainer: {
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    marginBottom: 16,
  },
  message: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});
