import { useState } from "react";

export const useForm = (initialForm) => {
const [form, setForm] = useState(initialForm)
    const onChangeInputs = (event) => {
        const {name, value} = event.target
        setForm({...form, [name]: value})
    }
    const clearInputs = () => {
        setForm(initialForm)
    }
    return [form, onChangeInputs, clearInputs]
}