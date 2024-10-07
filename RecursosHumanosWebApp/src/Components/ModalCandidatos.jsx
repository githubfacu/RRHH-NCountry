import React, { useContext } from "react";
import { FormularioRegistro } from "./Form/FormularioRegistro";
import { FormContext } from "../Context/FormContext";

export function ModalCandidatos({ formSwitch }) {
    const { paso } = useContext(FormContext);
    return (
        <section className="flex flex-col items-center justify-center w-full h-[480px]">
            <header className="flex items-center justify-center w-full mb-14 relative">
                <div
                    className={`text-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center ${
                        paso < 4 ? "bg-primary" : "bg-gray-400"
                    } rounded-xl`}
                >
                    1
                </div>
                <div
                    className={`h-[3px] w-[100px] ${
                        paso > 1 && paso < 4 ? "bg-primary" : "bg-gray-400"
                    }`}
                ></div>
                <div
                    className={`text-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center ${
                        paso > 1 && paso < 4 ? "bg-primary" : "bg-gray-400"
                    } rounded-xl`}
                >
                    2
                </div>
                <div
                    className={`h-[3px] w-[100px] ${
                        paso === 3 ? "bg-primary" : "bg-gray-400"
                    }`}
                ></div>
                <div
                    className={`text-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center ${
                        paso > 2 ? "bg-primary" : "bg-gray-400"
                    } rounded-xl`}
                >
                    3
                </div>
                {paso === 4 && (
                    <h4 className="font-semibold text-gray-600 absolute bottom-[-30px] right-0">
                        Confirma tus datos
                    </h4>
                )}
            </header>

            <div className="flex flex-col w-full">
                {paso === 1 && (
                    <h2 className="text-center text-2xl font-semibold text-gray-600">
                        Datos personales
                    </h2>
                )}
                {paso === 2 && (
                    <h2 className="text-center text-2xl font-semibold text-gray-600">
                        Datos de contacto
                    </h2>
                )}
                {paso === 3 && (
                    <h2 className="text-center text-2xl font-semibold text-gray-600">
                        Datos laborales
                    </h2>
                )}
                {paso === 4 && (
                    <h2 className="text-center text-2xl font-semibold text-gray-600">
                        Tus datos de postulación
                    </h2>
                )}
                <FormularioRegistro />
            </div>
        </section>
    );
}
