import { useEffect, useState } from "react";
import { LinesChart } from "../Components/Gaficos/Lineas";
import { Date_Finanzas_2 } from "../Components/Finanzas/Date_Finanzas2";
import { Date_Finanzas } from "../Components/Finanzas/Date_Finanzas";
import { useParams } from "react-router-dom";
import { getLastName } from "../utils/apellidoUtils";

export const EmpleadoGestionFinanzas = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  const url = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetch(`${url}/api/v1/employees/${id}`)
    .then(res => {
      if (!res.ok) {
          throw new Error(res.status)
      }
      else {
          return res.json()
      }
  })
      .then((date) => {
        setData(date);
      });
  }, []);

  const apellido = getLastName(data)

  return (
    <div>
        <main className="flex flex-row flex-wrap min-w-[87%]">
          <section className="w-[96%] mb-[4rem]">
            <div className="flex flex-row items-center bg-azul w-[100%] rounded-xl p-1">
              <img className="" src="/img/work.png" alt="" />
              <div className="flex flex-col flex-wrap ">
                <h2 className="text-white ml-[2rem] text-2xl">
                  {data.first_name} {apellido}
                </h2>
                <p className="mt-1 ml-8 text-white w-[70%]">
                  You have two projects to finish, you had completed from your
                  montly level, Keep going to your level
                </p>
              </div>
            </div>
            <div className="flex flex-row flex-wrap w-full justify-around mt-7">
              <div className="shadow-2xl px-5 py-4 rounded-lg">
                <h3 className="font-bold text-[1rem]">INGRESO TOTAL</h3>
                <p className="text-[13px] text-gris">Ingreso neto del mes</p>
                <h4 className="font-bold text-[1.3rem]">$8900</h4>
              </div>

              <div className=" shadow-2xl px-5 py-4 rounded-lg">
                <h3 className="font-bold text-[1rem]">DESCUENTO</h3>
                <p className="text-[13px] text-gris">Ingreso neto del mes</p>

                <h4 className="text-red-400 font-bold text-[1.3rem]">$-3000</h4>
              </div>
              <div className=" shadow-2xl px-5 py-4 rounded-lg">
                <h3 className="font-bold text-[1rem]">INGRESO NETO</h3>
                <p className="text-[13px] text-gris">Ingreso neto del mes</p>
                <h4 className="font-bold text-[1.3rem]">$5900</h4>
              </div>
            </div>
          </section>

          <section className="flex flex-row mr-10 border-solid ml-1 w-[96%] h-[20rem] rounded-xl ">
            <div className="p-3 w-[96%] pl-3">
              <LinesChart />
            </div>
          </section>
          <section className="flex flex-row pt-10 pb-10 w-full justify-center mr-8 ">
            <div className="mr-[3rem] shadow-2xl rounded-xl">
              <Date_Finanzas_2 />
            </div>
            <div className="shadow-2xl rounded-xl">
              <Date_Finanzas />
            </div>
          </section>
        </main>
    
    </div>
  );
};
