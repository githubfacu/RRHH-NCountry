/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal, Button } from '@mui/material';
import { Comunicación } from "@/../public/img/Categorias";

export function ComunicacionCard({ rol }) {
  const [comunicadosList, setComunicadosList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);

  useEffect(() => {
    const storedComunicados = sessionStorage.getItem('anuncios');
    if (storedComunicados) {
      setComunicadosList(JSON.parse(storedComunicados));
    }
  }, []);

  const handleEliminarComunicado = (id) => {
    const nuevosComunicados = comunicadosList.filter((comunicado) => comunicado.id !== id);
    setComunicadosList(nuevosComunicados);
    sessionStorage.setItem('anuncios', JSON.stringify(nuevosComunicados)); 
  };

  const handleAbrirModal = (mensaje) => {
    setMensajeSeleccionado(mensaje);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setMensajeSeleccionado(null);
  };

  return (
    <div>
      <div className="relative shadow-[4px_5px_10px_1px_rgba(0,0,0,0.3)] w-96 h-80 rounded-xl p-4">
        <header className="flex items-center gap-1 p-2">
        <Comunicación height="20px" />
          <h1 className="pb-1">Anuncios</h1>
        </header>
        <div className="p-2 max-h-28 overflow-y-auto">
          <ul>
            {comunicadosList.length > 0 ? (
              comunicadosList.map((comunicado) => (
                <li
                  key={comunicado.id}
                  className="text-sm flex items-center gap-1 mb-1"
                 
                >
                  <div  onClick={() => handleAbrirModal(comunicado)} className="flex items-center gap-1 cursor-pointer ">
                  <Comunicación height="15px" />
                  <small className="text-blue-950 font-medium">{comunicado.titulo}</small>
                  </div>
                  {(rol === "GERENTE" || rol === "ADMIN") && (
                    <button onClick={() => handleEliminarComunicado(comunicado.id)} className="ml-auto text-red-700">
                      X
                    </button>
                  )}
                </li>
              ))
            ) : (
              <li className="absolute top-1/2 left-1/2 -translate-x-1/2">No hay anuncios recientes</li>
            )}
          </ul>
        </div>
      </div>
      <Modal open={openModal} onClose={handleCloseModal} className="flex justify-center items-center">
        <div className="modal-container bg-white w-[600px] h-96 rounded-md p-4 flex flex-col justify-between">
          <article>
          <header className=''>
            <div className='flex gap-1 items-center'>
            <Comunicación height="25px" />
            <h1 className='text-xl text-gray-500 font-semibold pb-2'>Anuncio</h1>
            </div>
            <div className='py-4 border px-2 border-b-blue-950'>
              <h2>{mensajeSeleccionado?.titulo}</h2>
            </div>
          </header>
          <div className='border h-full mt-4 p-4'>
            <p>{mensajeSeleccionado?.mensaje}</p>
          </div>
          </article>
          <div className='text-end'>
          <Button variant="contained" color="secondary" onClick={handleCloseModal}>Cerrar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
