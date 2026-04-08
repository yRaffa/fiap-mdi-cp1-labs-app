import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing } from "../constants/theme";

export default function CabecalhoTela({ titulo, subtitulo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
      <View style={styles.linha} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },

  titulo: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "800",
  },

  subtitulo: {
    color: Colors.textMuted,
    fontSize: 14,
    marginTop: Spacing.xs,
  },

  linha: {
    height: 3,
    width: 40,
    backgroundColor: Colors.primary,
    marginTop: Spacing.md,
    borderRadius: 2,
  },
});
