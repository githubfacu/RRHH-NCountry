import { useContext } from "react"
import { AppRoutes } from "./Routes/AppRoutes"
import { FormContext } from "./Context/FormContext"


export function App() {

  const {comicSans} = useContext(FormContext)


  return (
    <div style={{fontFamily: comicSans && 'comic-sans, serif'}}>
      <AppRoutes />
    </div>
  )
}
