import { useState, useEffect } from "react";
import { EmpleadoOnline } from "../Icons/EmpleadoOnline";
import {getPuestoDeTrabajo,getLastName} from '../../utils/apellidoUtils'

const ordenarEmpleados = (empleados) => {
  if (!empleados) {
    return [];
  }
  return empleados.sort((a, b) =>
    a.status === b.status ? 0 : a.status ? -1 : 1
  );
};

export function QuienEstaAdentroCard() {
  const [verSoloOnline, setVerSoloOnline] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [filteredName, setFilteredName] = useState("");
  const [data, setData] = useState(null);

  const url = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/v1/employees`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("La respuesta de la red no fue exitosa");
        }

        const data = await response.json();
        const modifiedData = data.results.map((empleado) => ({
          ...empleado,
          status: Math.random() < 0.5,
        }));

        setData(modifiedData);
        setCandidates(modifiedData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [url]);


const handleFilterButtonClick = () => {
  const inputText = filteredName.toLowerCase();
  if (inputText.trim() === "") {
    setCandidates(data); 
  } else {

    const filteredEmployees = data.filter((empleado) => {
      const nameMatch =
        empleado.first_name &&
        empleado.first_name.toLowerCase().includes(inputText);
      const statusMatch = verSoloOnline ? empleado.status : true;
      return nameMatch && statusMatch;
    });
    setCandidates(filteredEmployees);
  }
};

const handleRenderOnlineButtonClick = () => {
  setVerSoloOnline((prevState) => !prevState);

  if (!verSoloOnline) {
    const onlineEmployees = data.filter((empleado) => empleado.status);
    setCandidates(onlineEmployees);
  } else {

    setCandidates(data);
  }
};


  const handleNameFilterChange = (e) => {
    setFilteredName(e.target.value);
  };

  const empleadosOrdenados = ordenarEmpleados(candidates);

  return (
    <section className="shadow-[4px_5px_10px_1px_rgba(0,0,0,0.3)] w-96 h-dvh  p-4 overflow-y-hidden">
      <header className="flex flex-col gap-1 mb-3">
        <div className="flex items-center">
          <EmpleadoOnline />
          <h1 className="">En Línea</h1>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar"
            value={filteredName}
            onChange={handleNameFilterChange}
            className=" border border-gray-300 rounded px-2 py-1"
          />
          <button
            onClick={handleFilterButtonClick}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Filtrar
          </button>
        </div>
        <div>
          <button
            onClick={handleRenderOnlineButtonClick}
            className={`mt-2 ${
              verSoloOnline ? " bg-green-600 text-white" : "bg-gray-200"
            } px-2 py-1 rounded`}
          >
            {verSoloOnline ? "Mostrar todos" : "Ver solo En Línea"}
          </button>
        </div>
      </header>
      <div className="flex flex-col justify-between h-dvh py-2">
        <ul className="max-h-dvh overflow-y-auto flex flex-col gap-3">
          {empleadosOrdenados.map((empleado, index) => (
            <li key={index} className="flex items-center">
              <div>
                <header>
                  <span
                    className={`inline-block h-2 w-2 rounded-full mr-3 ${
                      empleado.status ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></span>
                  <span className="text-sm font-medium mr-2">
                    {empleado.first_name}
                  </span>
                  <span className="text-sm">{getLastName(empleado)}</span>
                </header>
                <small className="ml-6 text-xs">{empleado.email}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
