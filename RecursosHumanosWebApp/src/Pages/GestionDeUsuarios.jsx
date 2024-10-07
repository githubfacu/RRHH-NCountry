import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const GestionDeUsuarios = () => {

  const navigate = useNavigate()
  const url = import.meta.env.VITE_API_KEY

  useEffect(()=>{
    window.open(`${url}/admin`)
    const timer = setTimeout(() => {
      navigate(-1)
    },50)

    return () => clearTimeout(timer)
  },[])

  return (
    <>
    </>
  )
}
