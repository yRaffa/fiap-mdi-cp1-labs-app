import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing } from "../constants/theme";

export default function EstadoVazio({ titulo, mensagem }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icone}>📭</Text>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
  },

  icone: {
    fontSize: 56,
    marginBottom: Spacing.md,
  },

  titulo: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  
  mensagem: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
