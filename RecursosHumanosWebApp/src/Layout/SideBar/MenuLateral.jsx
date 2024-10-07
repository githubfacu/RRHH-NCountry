import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo, LogoGira } from "../../assets/img/Logo";
import {
  Rol,
  Empleado,
  Finanzas,
  Comunicación,
  Tiempo,
  Entrada,
  Perfil,
  Salir,
  Config,
} from "../../../public/img/Categorias";
import { Panel } from "../../../public/img/Panel";

export const MenuLateral = ({ rol, cerrarSesion, userId }) => {
  const [open, setOpen] = useState(true);

  const administrador = [
    // Administrador
    { title: "Gestión de Usuarios", src: "Rol" },
  ];

  const gerente = [
    // Gerente
    { title: "Gestión de empleados", src: "User", gap: true },
    { title: "Gestión Financiera", src: "Calendar" },
    { title: "Comunicación", src: "Search" },
    { title: "Registro de Horarios", src: "Search" },
  ];

  const empleado = [
    { title: "Datos Personales", src: "Setting" },
    { title: "Registro de Horarios", src: "Chart" },
    { title: "Gestión Financiera" },
  ];

  const apartado = [
    {
      title: "Salir",
    },
  ];

  return (
    <aside className="mr-5 ">
      <nav className="flex flex-col flex-wrap shadow-2xl shadow-black ">
        <div className={`flex flex-col flex-wrap items-start ml-0 pl-4 ${open ? "w-72 duration-500" : "w-24 h-max duration-500 "} duration-500  relative  h-dvh bg-white `}>
          <div className={`absolute right-[2.3rem] cursor-pointer rounded-full  top-[.9rem] w-7 border-2 border-dark-purple bg-white 
            ${!open && "rotate-180 absolute -right-[-45px] top-[15px]  pt-[-7%] px-[3%]"}`}>
            <button onClick={() => setOpen(!open)} className="relative">
              <i className={`fa-solid fa-arrow-left pt-[-7%] px-[37%]  ${!open && "pt-[-8%] mx-[-20%]"}`}></i>
            </button>
          </div>
          <div className={`flex flex-row items-center ml-4 `}>
            <div className={`mt-1 pt-2${open && " "} ${!open && "mt-2 hidden"}`}>
              <LogoGira />
            </div>
            <div className={`ml-5  ${!open && "opacity-0"}`}>
              <Link to={"/"}>
                <Logo />
              </Link>
            </div>
          </div>
          <div className={`flex flex-row items-center content-center  ${!open ? "ml-5" : "ml-6"} mt-10 mb-2 `}>
            <Link to={"/"}>
              <Panel width={18} height={18} />
            </Link>
            {!open == "" && (
              <Link to={"/"}>
                <h1 className="ml-3 font-normal text-[1rem] pb-[.01rem] text-[#0B0060]">
                  Panel
                </h1>
              </Link>
            )}
          </div>

          <div className={` ${!open ? "h-[42rem]" : "mt-32 ml-[-14.3rem] h-dvh"}`}>

            {rol === "ADMIN" && (
              <div className="ml-4">
                {administrador.map((adm, index) => (
                  <ul className="border-t-[1px] border-solid border-gris pt-4" key={index}>
                    <li className={`flex rounded-md cursor-pointer hover:bg-light-white text-gris text-sm items-center gap-x-2`}>
                      <div className="ml-1">
                        <Link to={"/gestiondeusuarios"}>
                          {index === 0 && <Rol width={16} height={16} />}
                        </Link>
                      </div>
                      <span
                        className={`${!open && "hidden"} origin-left duration-200 text-[#474747]`}>
                        <Link to={"/gestiondeusuarios"}>
                          {index === 0 && `${adm.title}`}
                        </Link>
                      </span>
                    </li>
                  </ul>
                ))}
              </div>
            )}

            {(rol === "ADMIN" || rol === "GERENTE") && (
              <div className="pt-6 ml-3 mb-5 mt-5 border-t-[1px] border-solid border-gris ">
                {gerente.map((ger, index) => (
                  <div key={index} className="">
                    <li
                      className={`flex rounded-md p-2 pt-[0px] cursor-pointer hover:bg-light-white text-gris text-sm items-center gap-x-2 
                   ${ger.gap ? "mt-[.1px]" : "mt-[.1px]"} `}>
                      <div>
                        <Link to={"/gestiondeempleados"}>
                          {index == 0 && <Empleado width={16} height={16} />}
                        </Link>
                        <Link to={"/gestionfinancieragerente"}>
                          {index == 1 && <Finanzas width={16} height={16} />}
                        </Link>
                        <Link to={"/comunicacion"}>
                          {index == 2 && (
                            <Comunicación width={16} height={16} />
                          )}
                        </Link>

                        <Link to={""}>
                          {/* {index == 3 && <Tiempo width={16} height={16} />} */}
                        </Link>
                      </div>
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200 text-[#474747]`}
                      >
                        <Link to={"/gestiondeempleados"}>
                          {index == 0 && `${ger.title}`}
                        </Link>
                        <Link to={"/gestionfinancieragerente"}>
                          {index == 1 && `${ger.title}`}
                        </Link>
                        <Link to={"/comunicacion"}>
                          {index == 2 && `${ger.title}`}
                          </Link>
                        <Link to={"/"}>
                          {/* {index == 3 && `${ger.title}`} */}
                          </Link>
                      </span>
                    </li>
                  </div>
                ))}
              </div>
            )}

            {(rol === "ADMIN" || rol === "EMPLEADO") && (
              <div className={`pt-6 ml-3 border-t-[1px] border-gris border-solid  ${!open && " "}`}>
                {empleado.map((emp, index) => (
                  <div key={index}>
                    <li className={`flex rounded-md p-2 pt-[0px] cursor-pointer hover:bg-light-white text-gris text-sm items-center gap-x-2 
                   ${emp.gap ? "mt-[.1px]" : "mt-[.1px]"}`}>
                      <div>
                        <Link to={"/gestionfinancieraempleados"}>
                          {index == 2 && <Finanzas width={16} height={16} />}
                        </Link>
                        <Link to={`/datospersonales/${userId}`}>
                          {index == 0 && <Perfil width={16} height={16} />}
                        </Link>
                        <Link to={""}>
                          {/* {index == 1 && <Entrada width={16} height={16} />} */}
                        </Link>
                      </div>

                      <span
                        className={`${!open && "hidden"} origin-left duration-200 text-[#474747]`}>
                        <Link to={`/gestionfinancieraempleados/${userId}`}>
                          {index == 2 && ` ${emp.title}`}
                        </Link>
                        <Link to={`/datospersonales/${userId}`}>
                          {index == 0 && ` ${emp.title}`}
                        </Link>
                        <Link to={""}> 
                          {/* {index == 1 && ` ${emp.title}`}  */}
                        </Link>
                      </span>
                    </li>
                  </div>
                ))}
              </div>
            )}

            {rol === "ADMIN" && (
              <div className={`ml-5 ${!open ? "w-[100%] " : "min-h-[19vh]"}`}>
                <div className="absolute bottom-10 mb-3">
                  <ul className={`${!open ? "" : ""}`}>
                    <li className="flex cursor-pointer items-center">
                      {/* <Config width={16} height={16} /> */}
                      {!open == "" && (
                        <p className="pl-1 text-sm">
                          {/* Configuracion y seguridad */}
                        </p>
                      )}
                    </li>
                  </ul>
                  <ul className="">
                    <li className="flex cursor-pointer items-center" onClick={cerrarSesion}>
                      <Salir width={16} height={16} />
                      {!open == "" && <p className="pl-1 text-sm ">Salir</p>}
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {rol === "GERENTE" && (
              <div
                className={`ml-5 mt-5 ${
                  !open
                    ? "min-h-[68vh] w-[100%] flex gap-1"
                    : "min-h-[56vh] w-[100%] flex gap-2"
                } `}
              >
                <div className="mt-auto mb-3">
                  <ul className={`${!open ? "mb-1" : "mb-2"}`}>
                    <li className="flex cursor-pointer items-center">
                      <Config width={16} height={16} />

                      {!open == "" && (
                        <p className="pl-1 text-sm">
                          Configuracion y seguridad
                        </p>
                      )}
                    </li>
                  </ul>

                  <ul className="">
                    <li
                      className="flex cursor-pointer items-center"
                      onClick={cerrarSesion}
                    >
                      <Salir width={16} height={16} />
                      {!open == "" && <p className="pl-1 text-sm ">Salir</p>}
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {rol === "EMPLEADO" && (
              <div className={`ml-5 mt-8 ${!open ? "min-h-[74vh] w-[100%] flex gap-1" : "min-h-[62vh] w-[100%] flex gap-2"} `}>
                <div className="mt-auto mb-3">
                  <ul className={`${!open ? "mb-1" : "mb-2"}`}>
                    <li className="flex cursor-pointer items-center">
                      {/* <Config width={16} height={16} /> */}
                      {!open == "" && (
                        <p className="pl-1 text-sm">
                          {/* Configuracion y seguridad */}
                        </p>
                      )}
                    </li>
                  </ul>
                  <ul className="">
                    <li className="flex cursor-pointer items-center" onClick={cerrarSesion}>
                      <Salir width={16} height={16} />
                      {!open == "" && <p className="pl-1 text-sm ">Salir</p>}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};
