import { useContext } from "react";
import { FormContext } from "../../Context/FormContext";

export const FormularioRegistro2 = () => {
    const { paso, pasoSiguiente, pasoAnterior } = useContext(FormContext);

    return (
        <div className="p-5 space-y-5">
            <div className="flex gap-5">
                <p>Actualmente:</p>
                <div className="flex gap-1">
                    <input type="radio" name="trabajo" id="" />
                    <label htmlFor="">Tengo trabajo</label>
                </div>
                <div className="flex gap-1">
                    <input type="radio" name="trabajo" id="" />
                    <label htmlFor="">Busco empleo</label>
                </div>
                <div className="flex gap-1">
                    <input type="radio" name="trabajo" id="" />
                    <label htmlFor="">Estudio</label>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="cargo">Cargo:</label>
                <input
                    type="text"
                    name="cargo"
                    id="cargo"
                    className="px-2 py-0.5 border-2 border-gray-300 rounded-md"
                    placeholder="Docente"
                />
            </div>
        </div>
    );
};

{
    /* <div
    className={`flex ${
        paso === 1 ? "justify-end" : "justify-between"
    }`}
>
    {paso !== 1 && (
        <button
            onClick={pasoAnterior}
            className=" w-32 p-1 rounded-2xl border border-primary hover:bg-primary hover:text-white hover:border-none"
        >
            Regresar
        </button>
    )}
    {paso !== 3 ? (
        <button
            className=" w-32 p-1 rounded-2xl border border-primary hover:bg-primary hover:text-white hover:border-none"
            onClick={pasoSiguiente}
        >
            Próximo
        </button>
    ) : (
        <button
            className=" w-32 p-1 rounded-2xl border border-primary hover:bg-primary hover:text-white hover:border-none"
            onClick={formSwitch}
        >
            Finalizar
        </button>
    )}
</div> */
}
