import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";

const useUserRole = () => {
  const [rol, setRol] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);
  const [isStaff, setIsStaff] = useState(false);
  const [usuario, setUsuario] = useState(null); // Nuevo estado para el nombre de usuario

  const url = import.meta.env.VITE_API_KEY;
  const secret = import.meta.env.VITE_SECRET_KEY;
  const token = JSON.parse(localStorage.getItem('token'));

  const { decodedToken } = useJwt(token, secret);
  useEffect(() => {
    if (!decodedToken) {
      console.error('Error al intentar decodificar el token.');
      setUsuarioId(JSON.parse(localStorage.getItem('userId')));
      return;
    }

    const userId = decodedToken.user_id;
    setUsuarioId(userId);
    localStorage.setItem('userId', JSON.stringify(userId));

    fetch(`${url}/api/v1/employees/${userId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error (res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setIsStaff(data.is_staff);
        setUsuario(data.first_name); // Guardar el nombre de usuario
        localStorage.setItem('userName', JSON.stringify(data.first_name));
        localStorage.setItem('isStaff', JSON.stringify(data.is_staff));
      })
      .catch(error => {
        console.error(error);
      });
  }, [decodedToken]);

  useEffect(() => {
    // Aquí puedes implementar la lógica para definir el rol basado en usuarioId y isStaff
    if (usuarioId === 1) {
      setRol('ADMIN');
    } else if (usuarioId && isStaff) {
      setRol('GERENTE');
    } else if (usuarioId && !isStaff) {
      setRol('EMPLEADO');
    }
  }, [usuarioId, isStaff]);

  return { rol, usuario }; // Devolver también el nombre de usuario
};

export default useUserRole;
