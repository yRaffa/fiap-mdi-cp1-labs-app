import React, { createContext, useContext, useState } from "react";

const ReservasContext = createContext(null);

export function ReservasProvider({ children }) {
  const [reservas, setReservas] = useState([]);

  const adicionarReserva = (novaReserva) => {
    const reservaComId = {
      ...novaReserva,
      id: Date.now().toString(),
      criadaEm: new Date().toISOString(),
    };
    setReservas((anteriores) => [...anteriores, reservaComId]);
    return reservaComId;
  };

  const cancelarReserva = (id) => {
    setReservas((anteriores) => anteriores.filter((r) => r.id !== id));
  };

  return (
    <ReservasContext.Provider
      value={{ reservas, adicionarReserva, cancelarReserva }}
    >
      {children}
    </ReservasContext.Provider>
  );
}

export function useReservas() {
  const ctx = useContext(ReservasContext);
  if (!ctx) {
    throw new Error("useReservas precisa estar dentro de ReservasProvider");
  }
  return ctx;
}
