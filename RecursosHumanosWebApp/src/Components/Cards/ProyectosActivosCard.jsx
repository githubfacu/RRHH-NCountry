import { useState, useEffect } from "react";
/* import ProyectosActivos from "../Icons/ProyectosActivos"; */
import { Modal, Button, TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem,Tooltip } from "@mui/material";

export function ProyectosActivosCard() {
  const [task, setTask] = useState([]);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tituloTarea, setTituloTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [clienteTarea, setClienteTarea] = useState("");
  const [equipoTarea, setEquipoTarea] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTask(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleOpenCreateModal = () => setModalCreateOpen(true);
  const handleCloseCreateModal = () => setModalCreateOpen(false);

  const handleOpenDetailsModal = (index) => {
    setSelectedTask(task[index]);
    setModalDetailsOpen(true);
  };

  const handleCloseDetailsModal = () => setModalDetailsOpen(false);

  const handleCrearTarea = () => {
    const nuevaTarea = { titulo: tituloTarea, descripcion: descripcionTarea, cliente: clienteTarea, equipo: equipoTarea };
    const nuevasTareas = [...task, nuevaTarea];
    setTask(nuevasTareas);
    saveTasksToLocalStorage(nuevasTareas);
    setTituloTarea("");
    setDescripcionTarea("");
    setClienteTarea("");
    setEquipoTarea("");
    handleCloseCreateModal();
  };

  const handleEliminarTarea = (index) => {
    const nuevasTareas = [...task];
    nuevasTareas.splice(index, 1); // Elimina la tarea del array
    setTask(nuevasTareas); // Actualiza el estado de las tareas

    // Guarda las tareas actualizadas en el almacenamiento local
    saveTasksToLocalStorage(nuevasTareas);
  };

  const cortarPalabra = (titulo)=> {
     return titulo.length > 15 ? titulo.slice(0,15) + '...' : titulo
  }


  return (
    <section className="shadow-[4px_5px_10px_1px_rgba(0,0,0,0.3)] w-80 h-80 rounded-xl p-4">
      <header className="flex items-center gap-1 p-2">
   {/*      <ProyectosActivos /> */}
        <h1>Proyectos activos</h1>
      </header>
      {task.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center mb-4">Ninguna tarea activa en este momento.</p>
          <Button onClick={handleOpenCreateModal} variant="contained" color="primary">
            Crear tarea
          </Button>
        </div>
      ) : (
        <section className="flex flex-col justify-between h-60">
          <div className="w-full">
          {task.map((tarea, index) => (
            <div key={index} className="py-2  px-2 flex text-xs">
              <div className="flex w-full cursor-pointer" onClick={() => handleOpenDetailsModal(index)}>
                <Tooltip title={tarea.titulo}>
                <h3 className="font-semibold w-32  p-1" >
                  {cortarPalabra(tarea.titulo)}
                </h3>
                </Tooltip>
                <p className=" p-1">{tarea.cliente}</p>
                <p className={`rounded-r-lg px-2 p-1 ${tarea.equipo === 'Front-end' ? '' : 'bg-blue-500'} text-white`}>{tarea.equipo}</p>
              </div>
              <button onClick={() => handleEliminarTarea(index)} className="text-red-700">X</button>
            </div>
          ))}
          </div>
          <Button className="w-full text-xs" onClick={handleOpenCreateModal} variant="contained" color="primary">
            <small>Crear tarea</small>
          </Button>
        </section>
      )}
      <Modal open={modalCreateOpen} onClose={handleCloseCreateModal} className="flex justify-center items-center">
        <div className="modal-container bg-white w-[600px] rounded-md p-4">
          <header className="flex gap-2 items-center ">
           {/*  <ProyectosActivos height="25px" /> */}
            <h2 className="text-xl text-gray-500 font-semibold pb-2">Crear Tarea</h2>
          </header>
          <TextField
            label="Título de la tarea"
            value={tituloTarea}
            onChange={(e) => setTituloTarea(e.target.value)}
            fullWidth
            margin="normal"
          />
          <div className="flex gap-3">
            <TextField
              label="Cliente"
              value={clienteTarea}
              onChange={(e) => setClienteTarea(e.target.value)}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="equipo-label">Equipo</InputLabel>
              <Select
                labelId="equipo-label"
                value={equipoTarea}
                onChange={(e) => setEquipoTarea(e.target.value)}
              >
                <MenuItem value="Front-end">Front-end</MenuItem>
                <MenuItem value="Back-end">Back-end</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextareaAutosize
            rowsMin={3}
            placeholder="Descripción de la tarea"
            value={descripcionTarea}
            onChange={(e) => setDescripcionTarea(e.target.value)}
            style={{ height: "170px", resize: "none", marginBottom: "1rem" }}
            className="border w-full p-3"
          />
          <div className="text-end mt-3">
            <Button variant="contained" color="primary" onClick={handleCrearTarea}>
              Crear
            </Button>
            <Button variant="outlined" onClick={handleCloseCreateModal} className="ml-2">
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
      <Modal open={modalDetailsOpen} onClose={handleCloseDetailsModal} className="flex justify-center items-center">
        <div className="modal-container bg-white w-[600px] rounded-md p-4">
          {selectedTask && (
            <>
              <header className="flex gap-2 items-center ">
              {/*   <ProyectosActivos height="25px" /> */}
                <h2 className="text-xl text-gray-500 font-semibold pb-2">Detalles de Tarea</h2>
              </header>
              <div className="mb-4">
                <h3 className="font-semibold">Título: {selectedTask.titulo}</h3>
                <p>Cliente: {selectedTask.cliente}</p>
                <p>Equipo: {selectedTask.equipo}</p>
              </div>
              <p className="mb-4">{selectedTask.descripcion}</p>
            </>
          )}
          <div className="text-end mt-3">
            <Button variant="contained" color="primary" onClick={handleCloseDetailsModal}>
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
