import { useState, useContext } from "react";
import { FormContext } from "../../Context/FormContext";
import Swal from "sweetalert2";
import { Box, Modal } from "@mui/material";
import { FormularioRegistro } from "./FormularioRegistro";
import muiStyles from "../../Styles/LoginFormRegis.module.css";

export const LoginFormRegis = ({ formPostulants }) => {
    // const [verFormRegistro, setVerFormRegistro] = useState(false);
    // const formSwitch = () => {
    //     setVerFormRegistro(!verFormRegistro);
    // };

    const {
        puestoDeTrabajo,
        setPuestoDeTrabajo,
        setCandidate,
        verFormRegistro,
        setVerFormRegistro,
        formSwitch,
    } = useContext(FormContext);

    const style = {
        position: "absolute",
        top: "20%",
        bgcolor: "background.paper",
        boxShadow: 15,
    };

    const selectOnChange = (event) => {
        setPuestoDeTrabajo(event.target.value);
    };

    const registrateClick = (event) => {
        event.preventDefault();
        if (puestoDeTrabajo === "") {
            return Swal.fire({
                title: "Selecciona un Puesto de trabajo",
                confirmButtonColor: "#0B0060",
            });
        }
        return formPostulants();
    };

    return (
        <>
            <form onSubmit={registrateClick} className="flex flex-col">
                <h2 className="text-gray-600 text-3xl font-semibold">
                    Trabaja con nosotros!
                </h2>
                <p className="text-sm text-gray-600">
                    Tu próximo desafío laboral comienza aquí
                </p>
                <div className={muiStyles.select}>
                    <select
                        value={puestoDeTrabajo}
                        onChange={selectOnChange}
                        className="text-gray-600 rounded-full border border-gray-400 mt-7 mb-8 p-2 box-border"
                    >
                        <option value="">
                            Selecciona un puesto de trabajo
                        </option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                    </select>
                </div>

                <button className="text-white text-lg  p-2 rounded-full bg-primary hover:bg-blue-900">
                    Regístrate
                </button>
            </form>

            {/* <Modal
          open={verFormRegistro}
          onClose={formSwitch}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box className={muiStyles.Container}>
          <FormularioRegistro formSwitch={formSwitch} puestoDeTrabajo={puestoDeTrabajo}/>
        </Box>
      </Modal> */}
        </>
    );
};
