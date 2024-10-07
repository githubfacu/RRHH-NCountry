import { useState, useEffect } from 'react';
import { Modal, Button, TextField, TextareaAutosize, Tooltip } from '@mui/material';
import { Comunicación } from "@/../public/img/Categorias";
import { DateTime } from 'luxon'; // Importar DateTime desde Luxon

export function Comunicacion() {
  const [openModal, setOpenModal] = useState(false);
  const [openReadModal, setOpenReadModal] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [anuncios, setAnuncios] = useState([]);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);

  useEffect(() => {
    const storedAnuncios = sessionStorage.getItem('anuncios');
    if (storedAnuncios) {
      setAnuncios(JSON.parse(storedAnuncios));
    }
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseReadModal = () => setOpenReadModal(false);

  const handleEnviarMensaje = () => {
    const nuevoAnuncio = {
      id: DateTime.local().toISO(),
      titulo,
      mensaje,
      fecha: DateTime.local().toString(),
    };
    const nuevosAnuncios = [...anuncios, nuevoAnuncio];
    setAnuncios(nuevosAnuncios);
    sessionStorage.setItem('anuncios', JSON.stringify(nuevosAnuncios));
    setTitulo('')
    setMensaje('')
    handleCloseModal();
  };

  const handleReadMensaje = (index) => {
    setMensajeSeleccionado(anuncios[index]);
    setOpenReadModal(true);
  };

  const handleDeleteMensaje = (index) => {
    const mensajeSeleccionado = anuncios[index];
    if (!mensajeSeleccionado) {
      console.error('No se ha seleccionado ningún mensaje para eliminar.');
      return;
    }
  
    const nuevosAnuncios = anuncios.filter((anuncio) => anuncio.id !== mensajeSeleccionado.id);
    setAnuncios(nuevosAnuncios);
    sessionStorage.setItem('anuncios', JSON.stringify(nuevosAnuncios));
    handleCloseReadModal();
  };
  
  

  const renderAnuncios = () => {
    if (anuncios.length === 0) {
      return null; 
    }
    return (
      <table className="w-full mt-5">
        <thead >
          <tr>
            <th className=' text-gray-500 text-left'>Título</th>
            <th className=' text-gray-500 text-left'>Fecha</th>
            <th className=' text-gray-500 text-left'>Hora</th>
            <th className=' text-gray-500 text-center'>Ver</th>
          </tr>
        </thead>
        <tbody>
          {anuncios.map((anuncio, index) => (
            <tr className='p-2' key={index} /* onClick={() => handleReadMensaje(index)} */ >
              <td className='flex gap-2'>

                <Comunicación height="25px" />
                <span className='pb-1'>
                {anuncio.titulo}
                </span>
              </td>
              <td >{DateTime.fromISO(anuncio.fecha).toFormat('dd/MM/yyyy')}</td>
              <td >{DateTime.fromISO(anuncio.fecha).toFormat('HH:mm')}</td>
              <td className='text-center' >
                <Tooltip title='Ver mensaje'>
                <Button onClick={(e) => { e.stopPropagation(); handleReadMensaje(index); }}><span role="img" aria-label="Ver mensaje" data-tooltip="Ver mensaje">👁️</span></Button>

                </Tooltip>
              </td>
              <td>
                <Button onClick={(e) => { e.stopPropagation(); handleDeleteMensaje(index); }}>
                  <span role="img" aria-label="Borrar mensaje" style={{ color: 'red' }}>❌</span></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  

  return (
    <section className="px-6">
      <header className="text-end">
        <button className="bg-blue-950 text-white p-2 rounded-2xl hover:bg-blue-900" onClick={handleOpenModal}>Crear anuncio</button>
      </header>
          {renderAnuncios()}
      <div className='h-dvh flex flex-col items-center justify-center'>
        <div className='w-96 text-center'>
          {anuncios.length === 0 && (
            <div className='flex flex-col items-center'>
              <Comunicación height="115px" />
              <h3 className='text-xl text-gray-500 font-semibold mb-4'>Aun no se han creado anuncios</h3>
              <p>Mantenga informados a sus empleados enviando recordatorios de forma fácil y cómoda a través de un sistema de comunicación interna.</p>
            </div>
          )}
        </div>
      </div>
      <Modal open={openModal} onClose={handleCloseModal} className="flex justify-center items-center">
        <article className="modal-container bg-white w-[600px] h-96 rounded-md p-4">
          <header className='flex gap-2 items-center'>
          <Comunicación height="25px" />
          <h2 className='text-xl text-gray-500 font-semibold pb-2'>Crear Anuncio</h2>
          </header>
          <TextField
            label="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextareaAutosize
            rowsMin={3}
            placeholder="Mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            style={{ height: '170px', resize: 'none' }}
            className="border w-full p-3"
          />
          <div className='text-end'>
          <Button variant="contained" color="secondary" onClick={handleEnviarMensaje}>Enviar</Button>
          </div>
        </article>
      </Modal>
      <Modal open={openReadModal} onClose={handleCloseReadModal} className="flex justify-center items-center">
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
          <Button variant="contained" color="secondary" onClick={handleCloseReadModal}>Cerrar</Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
