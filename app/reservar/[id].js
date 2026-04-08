import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Botao from "../../components/Botao";
import { Colors, Radius, Spacing } from "../../constants/theme";
import { LABS, HORARIOS_DISPONIVEIS } from "../../data/labs";
import { useReservas } from "../../context/ReservasContext";

export default function Reservar() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { adicionarReserva } = useReservas();

  const lab = LABS.find((l) => l.id === id);

  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [enviando, setEnviando] = useState(false);

  if (!lab) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>Laboratório não encontrado.</Text>
      </View>
    );
  }

  const confirmar = () => {
    if (!horarioSelecionado) {
      Alert.alert("Atenção", "Selecione um horário para continuar.");
      return;
    }

    setEnviando(true);

    setTimeout(() => {
      adicionarReserva({
        labId: lab.id,
        labNome: lab.nome,
        andar: lab.andar,
        horario: horarioSelecionado,
        data: new Date().toLocaleDateString("pt-BR"),
      });
      setEnviando(false);
      Alert.alert(
        "Reserva confirmada! ✅",
        `${lab.nome} reservado para ${horarioSelecionado}.`,
        [{ text: "OK", onPress: () => router.replace("/minhas-reservas") }]
      );
    }, 900);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.titulo}>Reservar</Text>
      <Text style={styles.labNome}>{lab.nome}</Text>
      <Text style={styles.subtitulo}>{lab.andar}</Text>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Escolha um horário</Text>
        <View style={styles.gridHorarios}>
          {HORARIOS_DISPONIVEIS.map((h) => {
            const selecionado = h === horarioSelecionado;
            return (
              <TouchableOpacity
                key={h}
                style={[
                  styles.horarioChip,
                  selecionado && styles.horarioChipAtivo,
                ]}
                onPress={() => setHorarioSelecionado(h)}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.horarioTexto,
                    selecionado && styles.horarioTextoAtivo,
                  ]}
                >
                  {h}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {horarioSelecionado && (
        <View style={styles.resumo}>
          <Text style={styles.resumoTitulo}>Resumo</Text>
          <Text style={styles.resumoTexto}>📍 {lab.nome}</Text>
          <Text style={styles.resumoTexto}>🕐 {horarioSelecionado}</Text>
          <Text style={styles.resumoTexto}>
            📅 {new Date().toLocaleDateString("pt-BR")}
          </Text>
        </View>
      )}

      <View style={styles.acoes}>
        <Botao
          titulo="Confirmar reserva"
          onPress={confirmar}
          carregando={enviando}
          desabilitado={!horarioSelecionado}
        />
        <View style={{ height: Spacing.sm }} />
        <Botao
          titulo="Cancelar"
          variante="secundario"
          onPress={() => router.back()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  conteudo: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  centro: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  erro: {
    color: Colors.text,
    fontSize: 16,
  },

  titulo: {
    color: Colors.textMuted,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  labNome: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "800",
    marginTop: Spacing.xs,
  },

  subtitulo: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: Spacing.lg,
  },

  secao: {
    marginTop: Spacing.lg,
  },

  secaoTitulo: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },

  gridHorarios: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },

  horarioChip: {
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  horarioChipAtivo: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  horarioTexto: {
    color: Colors.textMuted,
    fontWeight: "600",
    fontSize: 13,
  },

  horarioTextoAtivo: {
    color: Colors.text,
  },

  resumo: {
    marginTop: Spacing.xl,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
  },

  resumoTitulo: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },

  resumoTexto: {
    color: Colors.text,
    fontSize: 14,
    marginBottom: Spacing.xs,
  },
  
  acoes: {
    marginTop: Spacing.xl,
  },
});
