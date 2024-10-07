import { useState } from "react"
import { CandidatesDashboard } from "../Components/Candidatos/CandidatesDashboard"
import { EmpleadosDashboard } from "../Components/Empleados/EmpleadosDashboard"
import { Spinner } from "../utils/Spinner"
import Swal from "sweetalert2"
import { getLastName } from "../utils/apellidoUtils"

export const GestionDeEmpleados = () => {

  const url = import.meta.env.VITE_API_KEY
  const token = JSON.parse(localStorage.getItem('token'))

  const [cambiosSwitch, setCambiosSwitch] = useState(false)
  const [spinnerSwitch, setSpinnerSwitch] = useState(false)

  const setearCambios = () => {
    setCambiosSwitch(!cambiosSwitch)
  }

  const payload = {
    password: '',
    last_login: '2024-04-16T21:24:05.931Z',
    first_name: '',
    last_name: '',
    email: '',
    dni: '',
    phone_number: '',
    secondary_phone_number: '',
    address: '',
    city: '',
    state: '',
    country: '',
    is_staff: false,
    is_superuser: false,
    is_active: true
  }

  const capturarDatosPostulante = (item) => {

    const randomNumber = Math.floor(10000000 + Math.random() * 90000000)

    const userNames = item.first_name.split(" ");

    const primeraPalabraMinuscula = userNames[0].toLowerCase();
    const apellido = getLastName(item).toLowerCase()

    payload.password = userNames[0]+'1234!'
    payload.first_name = item.first_name
    payload.last_name = item.last_name
    payload.email = primeraPalabraMinuscula+apellido+'@hrnexo.com'
    payload.dni = parseInt(item.state)
    payload.phone_number = item.phone_number
    payload.secondary_phone_number = item.country
    payload.address = item.address
    payload.city = item.city
    payload.state = item.state
    payload.country = item.state

  }

  const configDelete = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  const eliminarCandidatoContratado = (item) => {

    fetch(`${url}/api/v1/postulants/${item.id}`, configDelete)
    .then(res => {
      if (!res.ok) {
        throw new Error (res.status, res.text)
      }
      else{
        return res.json()
      }
    })
    .then((data) => {
      console.log(data)
    })
    .catch(error => {
      console.log(error,'Error al intentar eliminar candidato')
    })
  }


  const contratarEmpleado = (index) => {

    capturarDatosPostulante(index)

    const configPost = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    Swal.fire({
      title: `Confirma la contratación de ${index.first_name} ${index.last_name}`,
      showCancelButton: true,
      confirmButtonColor: '#0B0060',
      cancelButtonColor: "#626262",
      confirmButtonText: "Contratar",
      cancelButtonText: "Denegar",
    }).then((result) => {
      if (result.isConfirmed) {
        setSpinnerSwitch(true)

        fetch(`${url}/api/v1/employees`, configPost)
        .then(res => {
          if (!res.ok) {
            throw new Error (res.status)
          }
          else{
            return res.json()
          }
        })
        .then((data) => {
          setSpinnerSwitch(false)

          eliminarCandidatoContratado(index)
          setearCambios()
          Swal.fire({
            title: `Nuevo empleado admitido: ${payload.first_name} ${payload.last_name} \nDatos de acceso: \nEmail: ${payload.email} \nContraseña: ${payload.password}`,
            confirmButtonColor: '#0B0060',
            icon: "success",
          })
        })
        .catch(error =>{
          setSpinnerSwitch(false)
          Swal.fire({
            title: "Error al procesar la solicitud de contratación",
            icon: "error",
            confirmButtonColor: '#0B0060',
          })
        })
      }

      else{
        return
      }
    })
  }


  return (
    <>
      <h3 className="text-gray-900 text-2xl font-semibold ml-2">Empleados</h3>
      <EmpleadosDashboard cambiosSwitch={cambiosSwitch}/>

      <h3 className="text-gray-900 text-2xl font-semibold ml-2">Candidatos</h3>
      <CandidatesDashboard cambiosSwitch={cambiosSwitch} contratarEmpleado={contratarEmpleado}/>

      {
        spinnerSwitch &&         
        <div className="absolute w-full h-full flex justify-center items-center z-3 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20">
          <Spinner />
        </div>
      }       
    </>
  )
}
