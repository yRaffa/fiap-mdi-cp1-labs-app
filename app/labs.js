import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import CardLab from "../components/CardLab";
import CabecalhoTela from "../components/CabecalhoTela";
import EstadoVazio from "../components/EstadoVazio";
import { Colors, Spacing, Radius } from "../constants/theme";
import { LABS } from "../data/labs";

export default function TelaLabs() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [labs, setLabs] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLabs(LABS);
      setCarregando(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const labsFiltrados =
    filtro === "todos" ? labs : labs.filter((l) => l.status === filtro);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.carregandoTexto}>Carregando laboratórios...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CabecalhoTela
        titulo="Laboratórios"
        subtitulo={`${labsFiltrados.length} encontrado(s)`}
      />

      <View style={styles.filtros}>
        {[
          { chave: "todos", label: "Todos" },
          { chave: "livre", label: "Livres" },
          { chave: "ocupado", label: "Ocupados" },
        ].map((opt) => (
          <TouchableOpacity
            key={opt.chave}
            style={[
              styles.chip,
              filtro === opt.chave && styles.chipAtivo,
            ]}
            onPress={() => setFiltro(opt.chave)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.chipTexto,
                filtro === opt.chave && styles.chipTextoAtivo,
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={labsFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <CardLab
            lab={item}
            onPress={() => router.push(`/lab/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <EstadoVazio
            titulo="Nenhum laboratório encontrado"
            mensagem="Tente trocar o filtro selecionado."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  centro: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  carregandoTexto: {
    color: Colors.textMuted,
    marginTop: Spacing.md,
    fontSize: 14,
  },

  filtros: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },

  chip: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  chipAtivo: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  chipTexto: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },

  chipTextoAtivo: {
    color: Colors.text,
  },

  lista: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    flexGrow: 1,
  },
});
