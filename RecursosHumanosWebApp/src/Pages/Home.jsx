import { useEffect } from "react";
import {ComunicacionCard} from "../Components/Cards/ComunicacionCard";
import { NameCard } from "../Components/Cards/NameCard";
import {ProyectosActivosCard} from "../Components/Cards/ProyectosActivosCard";
import useUserRole from "../Hook/useUserRol";
import {QuienEstaAdentroCard} from "../Components/Cards/QuienEstaAdentroCard";


export function Home() {
  const { rol } = useUserRole();

  useEffect(() => {
  }, [rol]);

  return (
    <section>
      {rol === 'ADMIN' || rol === 'GERENTE' ? (
        <section className="flex justify-between" >
          <article className="HomeCard-Container">
            <NameCard />
            <div className="flex mt-4 gap-5">
            <ComunicacionCard rol={rol} />
            <ProyectosActivosCard />
            </div>
          </article>
          <aside className="">
            <QuienEstaAdentroCard />
          </aside>
        </section>
      ) : (
        <section>
          <div className="NameCard">
            <NameCard />
          </div>
          <div className="ComunicacionCard">
            <ComunicacionCard rol={rol} />
          </div>
        </section>
      )}
    </section>
  );
}
