import { LogoNexo } from "@/Components/Icons/LogoNexo";
import { Link } from "react-router-dom";

export function Error404() {
  return (
    <section className="flex justify-center items-center h-dvh">
      <article>
        <header className="h-32 flex justify-center items-center">
            <Link to={'/'}>
            <LogoNexo />
            </Link>
        </header>
        <div className="text-center">
          <h1 className=" text-[80px] font-bold text-[#0B0060]">404</h1>
          <h3 className=" text-4xl mb-4">Parece que algo nos falta</h3>
          <p className=" text-2xl">
            La Página que intentas solicitar no está en el servidor (Error404)
          </p>
          <p className="text-2xl">
            vuelve al{" "}
            <Link to={"/"}>
              <span className=" text-3xl font-semibold underline text-[#0B0060] ">Inicio</span>
            </Link>
          </p>
        </div>
      </article>
    </section>
  );
}
