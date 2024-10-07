export const Personal_Info = ({ data }) => {
    
  const [sueldo_Neto, sueldo_Bruto, mes, nombre] = data;

  return (
    <section className="w-[96%] mt-[1rem] mb-[5rem]">
      <div className="flex flex-row items-center bg-azul w-[100%]  rounded-xl p-1">
        <img className="" src="../../public/img/work.png" alt="" />
        <div className="flex flex-col flex-wrap ">
          <h2 className="text-white ml-[2rem]  text-2xl">{nombre}</h2>
          <p className="mt-1 ml-8 text-white w-[70%]">
            You have two projects to finish, you had completed from your montly
            level, Keep going to your level
          </p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap w-full  justify-around mt-2">
        <div>
          <h3 className="font-bold text-[1rem]">{sueldo}</h3>
          <p className="text-[13px] text-gris">Ingreso neto del mes</p>
          <h4 className="font-bold text-[1.3rem]">%{sueldo_Neto}</h4>
        </div>
        <div>
          <h3 className="">{mes}</h3>
          <p></p>
          <h4>{mes}</h4>
        </div>
        <div>
          <h3>Ingreso Total</h3>
          <p> Previous month vs this months </p>
          <h4>${sueldo_Bruto}</h4>
        </div>
      </div>
    </section>
  );
};
