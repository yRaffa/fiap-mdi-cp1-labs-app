import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import Botao from "../components/Botao";
import { Colors, Spacing, Radius } from "../constants/theme";
import { useReservas } from "../context/ReservasContext";

export default function Home() {
  const router = useRouter();
  const { reservas } = useReservas();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroLogo}>
          <Image
            source={require("../assets/fiap_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.titulo}>FIAP Labs</Text>
        <Text style={styles.subtitulo}>
          Reserve laboratórios e salas da FIAP em segundos, direto do seu celular.
        </Text>

        <View style={styles.cardDestaque}>
          <Text style={styles.cardTitulo}>Suas reservas</Text>
          <Text style={styles.cardNumero}>{reservas.length}</Text>
          <Text style={styles.cardLegenda}>
            {reservas.length === 1 ? "reserva ativa" : "reservas ativas"}
          </Text>
        </View>

        <View style={styles.botoes}>
          <Botao
            titulo="Ver laboratórios disponíveis"
            onPress={() => router.push("/labs")}
          />
          <View style={{ height: Spacing.md }} />
          <Botao
            titulo="Minhas reservas"
            variante="secundario"
            onPress={() => router.push("/minhas-reservas")}
          />
        </View>

        <Text style={styles.rodape}>
          Mobile Development & IoT • Engenharia de Software
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  container: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl * 2,
  },

  heroLogo: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  logo: {
    width: 120,
    height: 60,
  },

  titulo: {
    color: Colors.text,
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitulo: {
    color: Colors.textMuted,
    fontSize: 15,
    textAlign: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },

  cardDestaque: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: Spacing.xl,
  },

  cardTitulo: {
    color: Colors.textMuted,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  cardNumero: {
    color: Colors.primary,
    fontSize: 56,
    fontWeight: "800",
    marginVertical: Spacing.sm,
  },

  cardLegenda: {
    color: Colors.text,
    fontSize: 14,
  },

  botoes: {
    marginBottom: Spacing.xl,
  },

  rodape: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: "center",
    marginTop: Spacing.lg,
  },
});
