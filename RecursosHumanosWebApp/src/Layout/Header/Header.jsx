/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import { HeaderCard } from "@/Components/Cards/HeaderCard";

const rutasNombres = {
  "gestiondeempleados": "Gestion de Empleados",
  "gestionfinanciera": "Gestion Financiera",
  "comunicacion": "Comunicación",
  "registrodehorarios": "Registro de Horarios",
  "datospersonales": "Datos Personales",
  "gestiondeusuarios": "Gestion de Usuarios",
  "":"Panel"
};

export function Header({ nombreUsuario }) {
  const location = useLocation();
  const rutaActual =
    location.pathname === "/" ? "Panel" : location.pathname.split("/").pop();

    const nombreARenderizar = Object.keys(rutasNombres).find(ruta => rutaActual.includes(ruta));


  return (
    <section className="flex items-center justify-between py-4 ">
      <h2 className="text-2xl font-bold text-blue-950">{rutasNombres[nombreARenderizar]}</h2>
      <div className="flex items-center justify-between gap-4">
        <HeaderCard nombreUsuario={nombreUsuario} />
      </div>
    </section>
  );
}
