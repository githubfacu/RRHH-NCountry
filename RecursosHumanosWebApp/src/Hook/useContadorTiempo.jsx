import { useState, useEffect } from "react";
import { DateTime } from "luxon";

export const useContadorTiempo = () => {
  const [tiempoActual, setTiempoActual] = useState(DateTime.local().startOf('day'));
  const [inicio, setInicio] = useState(false);
  const [pausa, setPausa] = useState(false);
  const [tiempoPausado, setTiempoPausado] = useState(null);

  useEffect(() => {
    let interval;
    if (inicio && !pausa) {
      interval = setInterval(() => {
        setTiempoActual(prev => prev.plus({ seconds: 1 }));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [inicio, pausa]);

  const iniciarContador = () => {
    setInicio(true);
    setPausa(false);
  };

  const pausarContador = () => {
    setPausa(true);
    setTiempoPausado(tiempoActual);
  };

  const reanudarContador = () => {
    setPausa(false);
    setTiempoActual(tiempoPausado);
  };

  const detenerContador = () => {
    setInicio(false);
    setPausa(false);
    setTiempoActual(DateTime.local().startOf('day'));
    setTiempoPausado(null);
  };

  const tiempoFormateado = tiempoActual.toFormat("HH'h' mm'min' ss'seg'");

  return {
    tiempoFormateado,
    iniciarContador,
    pausarContador,
    reanudarContador,
    detenerContador,
    inicio,
    pausa,
  };
};
