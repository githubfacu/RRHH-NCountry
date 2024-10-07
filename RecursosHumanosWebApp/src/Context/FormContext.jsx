import { createContext } from "react";
import { useState } from "react";
import {
    validateName,
    validateDNI,
    validateEmail,
    validatePhoneNumber,
    validateText,
    validateSelect,
    validateCurrentJob,
} from "../utils/regexValidation";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const FormContext = createContext();

function FormProvider({ children }) {
    const [count, setCount] = useState(3);
    const [paso, setPaso] = useState(1);
    const [candidate, setCandidate] = useState({});
    const [error, setError] = useState({ firstState: true });
    const [puestoDeTrabajo, setPuestoDeTrabajo] = useState("");
    const [verFormRegistro, setVerFormRegistro] = useState(false);
    const [usuarioLogueado, setUsuarioLogueado] = useState(false);
    const [comicSans, setComicSans] = useState(false);
    const navigate = useNavigate();

    const endpoint = import.meta.env.VITE_API_KEY;

    const validateFirstStepFields = (candidate) => {
        setError({
            first_name: !validateName(candidate.first_name),
            last_name: !validateName(candidate.last_name),
            state: !validateDNI(candidate.state),
        });
        return {
            first_name: !validateName(candidate.first_name),
            last_name: !validateName(candidate.last_name),
            state: !validateDNI(candidate.state),
        };
    };

    const validateSecondStepFields = (candidate) => {
        setError({
            email: !validateEmail(candidate.email),
            phone_number: !validatePhoneNumber(candidate.phone_number),
            address: !validateText(candidate.address),
        });
        return {
            email: !validateEmail(candidate.email),
            phone_number: !validatePhoneNumber(candidate.phone_number),
            address: !validateText(candidate.address),
        };
    };

    const validateThirdStepFields = (candidate) => {
        setError({
            city: !validateCurrentJob(candidate.city),
            country: !validateSelect(candidate.country),
        });
        return {
            city: !validateCurrentJob(candidate.city),
            country: !validateSelect(candidate.country),
        };
    };

    const pasoSiguiente = (e) => {
        e.preventDefault();
        if (paso === 1) {
            if (
                !candidate.first_name ||
                !candidate.last_name ||
                !candidate.state ||
                !candidate.secondary_phone_number
            ) {
                return setError({ allFields: true });
            }
            const validatedFields = validateFirstStepFields(candidate);
            if (
                validatedFields.firstState ||
                validatedFields.first_name ||
                validatedFields.last_name ||
                validatedFields.secondary_phone_number ||
                validatedFields.state
            ) {
                console.log(validatedFields);
                return;
            }
            setPaso((prev) => prev + 1);

            console.log(paso);
        }

        if (paso === 2) {
            if (
                !candidate.email ||
                !candidate.phone_number ||
                !candidate.address
            ) {
                return setError({ allFields: true });
            }
            const validatedFields = validateSecondStepFields(candidate);
            if (
                validatedFields.firstState ||
                validatedFields.email ||
                validatedFields.phone_number ||
                validatedFields.address ||
                validatedFields.city ||
                validatedFields.state ||
                validatedFields.country
            ) {
                console.log(validatedFields);
                return;
            }
            setPaso((prev) => prev + 1);

            console.log(paso);
        }

        if (paso === 3) {
            if (!candidate.city || !candidate.country) {
                return setError({ allFields: true });
            }
            const validatedFields = validateThirdStepFields(candidate);
            if (validatedFields.city || validatedFields.country) {
                console.log(validatedFields);
                return;
            }
            setPaso((prev) => prev + 1);
        }
    };

    const pasoAnterior = (e) => {
        e.preventDefault();
        setPaso((prev) => prev - 1);
        console.log(paso);
    };

    const formSwitch = (e) => {
        e.preventDefault();
        console.log(candidate);
        Swal.fire({
            title: "Enviar postulación",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "rgb(22,163,74)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Enviar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${endpoint}/api/v1/postulants`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(candidate),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        Swal.fire({
                            title: "Registro exitoso",
                            text: "Tu postulación ha sido registrada con éxito",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                            confirmButtonColor: "#0B0060",
                        }).then(() => {
                            setCandidate({});
                            setPaso(1)
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error",
                            text: "Ha ocurrido un error al registrar tu postulación",
                            icon: "error",
                            confirmButtonText: "Aceptar",
                        });
                        console.error("Error:", error);
                    });
            }
        });
        setVerFormRegistro(!verFormRegistro);
    };

    const comicSansToggle = () => {
        setComicSans(!comicSans)
    }

    return (
        <FormContext.Provider
            value={{
                count,
                setCount,
                puestoDeTrabajo,
                setPuestoDeTrabajo,
                verFormRegistro,
                setVerFormRegistro,
                formSwitch,
                setPaso,
                paso,
                pasoSiguiente,
                pasoAnterior,
                candidate,
                setCandidate,
                error,
                setError,
                usuarioLogueado,
                setUsuarioLogueado,
                comicSans,
                comicSansToggle
            }}
        >
            {children}
        </FormContext.Provider>
    );
}

export default FormProvider;
