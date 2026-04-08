import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ReservasProvider } from "../context/ReservasContext";
import { Colors } from "../constants/theme";

export default function RootLayout() {
  return (
    <ReservasProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="labs" options={{ title: "Laboratórios" }} />
        <Stack.Screen name="lab/[id]" options={{ title: "Detalhes do Lab" }} />
        <Stack.Screen name="reservar/[id]" options={{ title: "Reservar" }} />
        <Stack.Screen
          name="minhas-reservas"
          options={{ title: "Minhas Reservas" }}
        />
      </Stack>
    </ReservasProvider>
  );
}
