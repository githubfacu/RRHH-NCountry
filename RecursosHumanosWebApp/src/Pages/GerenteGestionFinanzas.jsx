import { LinesChart } from "../Components/Gaficos/Lineas";
import { Pies } from "../Components/Gaficos/PiesChart";
import { Date_Finanzas } from "../Components/Finanzas/Date_Finanzas";
import { Date_Finanzas_2 } from "../Components/Finanzas/Date_Finanzas2";
import { Dashboard_Gerente1 } from "../Components/Finanzas/Dashboard_Gerente1";
import { Dashboard_Gerente2 } from "../Components/Finanzas/Dashboard_Gerente2";

export const GerenteGestionFinanzas = () => {
  return (
    <main className="">
      <section className="flex flex-row mr-10 border-solid w-[96%] h-[10rem]">
        <div className="flex flex-row items-center bg-azul w-[100%] rounded-xl p-1">
          <img className="" src="img/work.png" alt="" />
          <div className="flex flex-col flex-wrap ">
            <h1 className="ml-8 text-white font-bold text-[2rem]">
              Panel Administrativo
            </h1>
            <h2 className="text-white ml-[2rem] text-2xl"></h2>
            <p className="mt-1 ml-8 text-white w-[70%]">
              Panel administrativo para poder ver el balance de cada uno de los
              empleados. Dentro del mismo
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col flex-wrap mt-10 w-[96%]">
        <div className="flex flex-row w-full">
            <div className="w-[60%] mr-5 ">
              <LinesChart />
            </div>
            <div className="w-[40%]">
              <Dashboard_Gerente1 />
            </div>
        </div>
        <div className="flex flex-row flex-wrap w-full mt-6">
          <div className="w-[60%] mr-5 pr-7">
            <Date_Finanzas_2 /> 
          </div>
          <div className="w-[38%]">
            <Dashboard_Gerente2 />
          </div>
        </div>
      </section>
    </main>
  );
};
