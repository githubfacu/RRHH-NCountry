import { useState } from "react"

const useInput = (type) => {

    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value.trim())
    }

    return { value, onChange, type}
}

export default useInput