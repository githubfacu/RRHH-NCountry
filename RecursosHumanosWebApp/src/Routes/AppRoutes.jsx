import { Routes, Route, Outlet, useNavigate, json } from "react-router-dom";
import { Header } from "@/Layout/Header/Header";
import { MenuLateral } from "@/Layout/SideBar/MenuLateral";
import { useContext, useEffect, useState } from "react";
import { FormularioRegistro } from "../Components/Form/FormularioRegistro";
import { FormularioRegistro2 } from "../Components/Form/FormularioRegistro2";
import { Home, Candidates, Error404, GestionDeEmpleados, GestionDeUsuarios, GerenteGestionFinanzas, EmpleadoGestionFinanzas, DatosPersonales, Login } from '@/Pages';
import { useJwt } from "react-jwt";
import Swal from "sweetalert2";
import ErrorBoundary from "../utils/ErrorBoundary";
import { Comunicacion } from "../Pages/Comunicacion";
import { FormContext } from "../Context/FormContext";


export function AppRoutes() {

    return (
        <ErrorBoundary>      
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<FormularioRegistro />} />
            <Route path="/register-2" element={<FormularioRegistro2 />} />
            <Route element={<Layout/>}>
                <Route path="/" element={<Home />} />
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/gestiondeusuarios" element={<GestionDeUsuarios />} />
                <Route path="/gestiondeempleados" element={<GestionDeEmpleados />} />
                <Route path="/gestionfinancieragerente" element={<GerenteGestionFinanzas />} />
                <Route path="/gestionfinancieraempleados/:id" element={<EmpleadoGestionFinanzas />} />
                <Route path="/datospersonales/:id" element={<DatosPersonales />} />
                <Route path="/comunicacion" element={<Comunicacion />} />
            </Route>
            <Route path="*" element={<Error404 />} />
        </Routes>
        </ErrorBoundary>        
    );
}

export function Layout() {

    const [userName, setUserName] = useState(null);
    const [ususarioId, setUsusarioId] = useState(null);
    const [isStaff, setIsStaff] = useState(false);
    const navigate = useNavigate()
    const {usuarioLogueado, setUsuarioLogueado} = useContext(FormContext)

    const url = import.meta.env.VITE_API_KEY
    const secret = import.meta.env.VITE_SECRET_KEY
    const token = JSON.parse(localStorage.getItem('token'))

    const { decodedToken } = useJwt(token, secret);


    useEffect(() => {

      if(!usuarioLogueado && !token){
        return navigate('/login')
      }

      if (decodedToken) {
        console.log('Token decodificado:', decodedToken);
        setUserName(decodedToken.first_name)
        setIsStaff(decodedToken.is_staff)
        setUsusarioId(decodedToken.user_id)

        localStorage.setItem('userId', JSON.stringify(decodedToken.user_id))
        localStorage.setItem('userName', JSON.stringify(decodedToken.first_name))
        localStorage.setItem('isStaff', JSON.stringify(decodedToken.is_staff))        

      } 
      else {
        console.log('Error al intentar decodificar el token.');
        setUsusarioId(JSON.parse(localStorage.getItem('userId')))
      }
    }, [decodedToken]);


    const cerrarSesionClick = () => {
        Swal.fire({
          title: "Desea Cerrar Sesión?",
          showCancelButton: true,
          confirmButtonColor: '#0B0060',
          cancelButtonColor: "#626262",
          confirmButtonText: "Si!",
          cancelButtonText: "No!",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            localStorage.removeItem('userName');
            localStorage.removeItem('isStaff');
            setUsuarioLogueado(false)
            navigate("/login");
          }
        });
    };


    return (
        <div className="flex max-h-screen ">
            <MenuLateral rol={ususarioId === 1 ? "ADMIN" : (ususarioId !== 1 && isStaff) ? "GERENTE" : "EMPLEADO"} userId={ususarioId !== null ? ususarioId : 0} cerrarSesion={cerrarSesionClick}/>
            <div className="flex flex-col w-full overflow-y-auto">
                <Header nombreUsuario={userName} />
                <div className="">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
