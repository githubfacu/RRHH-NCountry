import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLastName } from "../utils/apellidoUtils";


export const DatosPersonales = () => {
    const [empleado, setEmpleado] = useState({});

    const { id } = useParams();
    const url = import.meta.env.VITE_API_KEY

    useEffect(() => {
        fetch(`${url}/api/v1/employees/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                else {
                    return res.json()
                }
            })
            .then((data) => {
                console.log(data);
                setEmpleado(data);
            })
            .catch(error => {
                console.error(error)
            })
    }
        , [])

    // Función para obtener las iniciales del nombre y apellido
    function obtenerIniciales(nombre, apellido) {
        // Verificar si se proporcionaron nombre y apellido
        if (nombre && apellido) {
            // Obtener la primera letra de cada palabra y convertirlas a mayúsculas
            const inicialNombre = nombre.charAt(0).toUpperCase();
            const inicialApellido = apellido.charAt(0).toUpperCase();
            // Devolver las iniciales concatenadas
            return inicialNombre + inicialApellido;
        } else {
            // Si falta alguna de las dos, devolver un valor predeterminado
            return "NN"; // NN para "Nombre No Disponible"
        }
    }

    // Obtener el span donde se mostrarán las iniciales
    const spanInicial = document.querySelector('.flex .bg-gray-200 span');

    // Verificar si se encontró el span
    if (spanInicial) {
        // Llamar a la función con el nombre y apellido del empleado
        const iniciales = obtenerIniciales(empleado.first_name, empleado.last_name);
        // Establecer el contenido del span con las iniciales
        spanInicial.textContent = iniciales;
    }


    return (
        <div className="flex items-center justify-center mt-8">
            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-gray-700 text-lg font-bold">
                    {/* Aquí se mostrarán las iniciales */}
                </span> {/* Inciales de la persona */}
            </div>
            <div className="max-w-4xl w-full ">
                <div className="flex flex-col md:flex-row md:flex-wrap items-center">
                    <div className="flex mb-16 md:w-1/3">
                        <div className="mr-4">
                            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                            <input id="nombre" className="shadow appearance-none border rounded-full w-full md:w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={empleado.first_name ? empleado.first_name : "Juan"} />
                        </div>
                    </div>
                    <div className="flex mb-16 md:w-1/3">
                        <div className="mr-4">
                            <label htmlFor="apellido" className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                            <input id="apellido" className="shadow appearance-none border rounded-full w-full md:w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={empleado.last_name ? getLastName(empleado) : "Perez"} />
                        </div>
                    </div>
                    <div className="flex mb-16 md:w-1/3">
                        <div className="mr-4">
                            <label htmlFor="documento" className="block text-gray-700 text-sm font-bold mb-2">DNI</label>
                            <input id="documento" className="shadow appearance-none border rounded-full w-full md:w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder={empleado.dni ? empleado.dni : "12345678"} />
                        </div>
                    </div>
                    <div className="flex mb-16 md:w-1/3">
                        <div className="mr-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
                            <input id="email" className="shadow appearance-none border rounded-full w-full md:w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email"
                                placeholder={empleado.email ? empleado.email : "juanperez@correo.com"} />
                        </div>
                    </div>
                    <div className="flex mb-16 md:w-1/3">
                        <div className="mr-4">
                            <label htmlFor="contacto" className="block text-gray-700 text-sm font-bold mb-2">Contacto</label>
                            <input id="contacto" className="shadow appearance-none border rounded-full w-full md:w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                placeholder={empleado.phone_number ? empleado.phone_number : "541112345678"} />
                        </div>
                    </div>
                    <div className="flex mb-16 md:w-1/3">
                        <div className="mr-4">
                            <label htmlFor="contacto-secundario" className="block text-gray-700 text-sm font-bold mb-2">Contacto Secundario</label>
                            <input id="contacto-secundario" className="shadow appearance-none border rounded-full w-full md:w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                placeholder={empleado.secondary_phone_number ? empleado.secondary_phone_number : "541112345678"} />
                        </div>
                    </div>
                    <div className="flex mb-3 md:w-1/3">
                        <div className="mr-4">
                            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Direccion</label>
                            <input id="address" className="shadow appearance-none border rounded-full w-full md:w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={empleado.address ? empleado.address : "Calle 11 Nro 1"} />
                        </div>
                    </div>
                    <div className="flex mb-3 md:w-1/3">
                        <div className="mr-4">
                            <label htmlFor="ciudad" className="block text-gray-700 text-sm font-bold mb-2">Ciudad</label>
                            <input id="ciudad" className="shadow appearance-none border rounded-full w-full md:w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={empleado.city ? empleado.city : "Ciudad"} />
                        </div>
                    </div>
                    <div className="flex mb-3 md:w-1/3">
                        <div className="mr-4">
                            <label htmlFor="pais" className="block text-gray-700 text-sm font-bold mb-2">País</label>
                            <input id="pais" className="shadow appearance-none border rounded-full w-full md:w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={empleado.state ? empleado.state : "Argentina"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

