import loginstyles from "../Styles/Login.module.css";
import { FormularioLogin } from "../Components/Form/FormularioLogin";
import { LoginFormRegis } from "../Components/Form/LoginFormRegis";
import { useEffect, useState, useContext } from "react";
import { FormContext } from "../Context/FormContext";
import { ModalCandidatos } from "../Components/ModalCandidatos";
import { Box, Modal, Typography } from "@mui/material";

export const Login = () => {
    const [divEmergenteSize, setDivEmergenteSIze] = useState("0");
    const [formOpacity, setFormOpacity] = useState("0");
    const [indexZ, setIndexZ] = useState("-1");

    const [loginSwitch, setLoginSwitch] = useState(false);
    const [verFormRegistro, setVerFormRegistro] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalMsj, setModalMsj] = useState(false);
    const [modalInputValue, setModalInputValue] = useState("");

    const { setPaso, comicSansToggle, puestoDeTrabajo } = useContext(FormContext);

    const onChangeModalInput = (e) => {
        setModalInputValue(e.target.value);
    };

    const modalSwitch = () => {
        setModalInputValue("");
        setModalMsj(false);
        setModal(!modal);
    };

    const modalMsjSwitch = () => {
        if (modalInputValue.includes("@")) {
            setModalMsj(!modalMsj);
            setModalInputValue("");
        }
    };

    const formPostulants = () => {
        setPaso(1);
        setVerFormRegistro(!verFormRegistro);
    };

    const cambiarForm = () => {
        setLoginSwitch(!loginSwitch);
    };

    useEffect(() => {
        if (verFormRegistro) {
            setDivEmergenteSIze("700px");
            setIndexZ("2");
            const timer = setTimeout(() => {
                setFormOpacity("1");
            }, 400);

            return () => clearTimeout(timer);
        } else {
            setDivEmergenteSIze("0");
            setFormOpacity("0");

            const timer2 = setTimeout(() => {
                setIndexZ("-1");
            }, 400);

            return () => clearTimeout(timer2);
        }
    }, [verFormRegistro]);

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "3px",
        height: "190px",
        userSelect: "none",
    };

    return (
        <>
            <header className={loginstyles.header}>
                <nav className={loginstyles.nav}>
                    <figure>
                        <img
                            className={loginstyles.imgLogo}
                            src="/images/HR-Nexo-2.png"
                            alt="logo-Nexo-RecursosHumanos"
                        />
                    </figure>
                    {!loginSwitch ? (
                        <h2
                            onClick={cambiarForm}
                            className="cursor-pointer text-primary text-xl"
                        >
                            Trabaja con Nosotros
                        </h2>
                    ) : (
                        <h2
                            onClick={cambiarForm}
                            className="cursor-pointer text-primary text-xl"
                        >
                            Iniciar Sesión
                        </h2>
                    )}
                </nav>
            </header>

            <div className={loginstyles.Container}>
                <div className={loginstyles.formulariosDiv}>
                    {!loginSwitch ? (
                        <div className={loginstyles.formLoginDiv}>
                            <FormularioLogin modalSwitch={modalSwitch} />

                            <h3 onClick={comicSansToggle}
                                className="cursor-pointer">Cambiar fuente</h3>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full items-center">
                            <div className={loginstyles.formRegistro}>
                                <LoginFormRegis formPostulants={formPostulants} />
                                <div className={loginstyles.formImg}>
                                    <img src="/images/img-login-1.png" alt="Claudia" />
                                </div>

                            </div>
                                {
                                    puestoDeTrabajo === 'Frontend' &&
                                    <div className={loginstyles.requisitos}>
                                        <h3 className="mt-2 py-2 font-semibold">Requisitos para el Puesto</h3>
                                        <ul className="px-2 list-disc gap-1">
                                            <li>Sólidos conocimientos en HTML, CSS, JavaScript</li>
                                            <li>Metodología de trabajo Scrum</li>
                                            <li>Diseño adaptativo</li>
                                        </ul>
                                    </div>
                                }
                                {
                                    puestoDeTrabajo === 'Backend' &&
                                    <div className={loginstyles.requisitos}>
                                        <h3 className="mt-2 py-2 font-semibold">Requisitos para el Puesto</h3>
                                        <ul className="px-2 list-disc gap-1">
                                            <li>Lenguaje de programación Phyton, Django REST</li>
                                            <li>Metodología de trabajo Scrum</li>
                                            <li>Seguridad de datos</li>
                                        </ul>
                                    </div>

                                }   
                        </div>

                    )}
                </div>

                <div
                    className={loginstyles.formEmergenteExterior}
                    style={{
                        backgroundColor: verFormRegistro
                            ? "rgb(0, 0, 0,.2)"
                            : "transparent",
                        zIndex: indexZ,
                    }}
                >
                    <div
                        className={loginstyles.formEmergenteContainer}
                        style={{ width: divEmergenteSize }}
                    >
                        <span
                            onClick={formPostulants}
                            style={{
                                display: verFormRegistro ? "block" : "none",
                            }}
                        >
                            <i className="fas fa-x fa-2x text-gray-900"></i>
                        </span>
                        {verFormRegistro && (
                            <div
                                className={loginstyles.formEmergenteDiv}
                                style={{
                                    opacity: formOpacity,
                                    transition: "opacity .2s ease",
                                }}
                            >
                                <ModalCandidatos />
                            </div>
                        )}
                    </div>
                </div>

                <Modal
                    open={modal}
                    onClose={modalSwitch}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            style={{ textAlign: "start", width: "100%" }}
                        >
                            Restablecer mi contraseña
                        </Typography>
                        {modalMsj ? (
                            <Typography id="modal-modal-description">
                                Te enviaremos un link por mail para que puedas
                                crear una nueva contraseña
                            </Typography>
                        ) : (
                            <>
                                <input
                                    value={modalInputValue}
                                    onChange={onChangeModalInput}
                                    type="email"
                                    placeholder="Mail"
                                    style={{
                                        border: "2px solid grey",
                                        borderRadius: "3px",
                                        padding: "2px 4px",
                                        width: "100%",
                                    }}
                                />
                                <button
                                    onClick={modalMsjSwitch}
                                    className=" text-lg"
                                >
                                    Enviar
                                </button>
                            </>
                        )}
                    </Box>
                </Modal>


            </div>
        </>
    );
};
