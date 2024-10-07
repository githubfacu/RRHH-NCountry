/* eslint-disable no-undef */
// NameCard.js
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import useUserRole from "../../Hook/useUserRol";

export function NameCard() {
  const { rol, usuario } = useUserRole();

  const [fechaActual, setFechaActual] = useState(null);

  useEffect(() => {
    // Obtener la fecha actual usando Luxon
    const fecha = DateTime.now().setLocale("es");
    const fechaDescriptiva = fecha.toFormat("EEEE, d 'de' MMMM 'del' yyyy");
    setFechaActual(fechaDescriptiva);
  }, [usuario]);

  // Color del Card según Rol
  const getBgColor = () => {
    switch (rol) {
      case 'ADMIN':
        return "bg-[#092E20]";
      case 'GERENTE':
        return "bg-[rgb(11,0,96)]";
      case 'EMPLEADO':
        return "bg-blue-950";
      default:
        return "";
    }
  };

  return (
    <article
      className={`flex flex-col justify-between w-72 h-[136px] p-3 rounded-xl text-white ${getBgColor()}`}
    >
      <div className="absolute top-0 right-4"></div>
      <header className="flex flex-col gap-3">
        <div className="z-10 w-48 py-[2px] text-white rounded-xl text-sm capitalize">
          {rol}
        </div>
        <h1 className="text-lg z-10">{`Hola ${usuario ? usuario : "Admin"}, bienvenido!`}</h1>
      </header>
      <small className="text-xs z-10">{fechaActual}</small>
    </article>
  );
}
